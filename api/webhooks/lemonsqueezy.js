import crypto from "crypto";

// Vercel Serverless Function: Lemon Squeezy Webhook Handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const signature = req.headers["x-signature"];
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || process.env.LEMONSQUEEZY_SIGNING_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && signature) {
      const hmac = crypto.createHmac("sha256", webhookSecret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const signatureBuffer = Buffer.from(signature, "utf8");

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        console.error("Invalid Lemon Squeezy webhook signature.");
        return res.status(401).json({ error: "Invalid signature verification." });
      }
    }

    const payload = typeof req.body === "object" ? req.body : JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const billingUserId = customData.billing_user_id;

    console.log(`[LemonSqueezy Webhook] Received Event: ${eventName} for User: ${billingUserId}`);

    const attributes = payload.data?.attributes || {};
    const variantId = Number(attributes.first_order_item?.variant_id || attributes.variant_id || customData.variant_id);
    const isLifetime = variantId === 2025229 || attributes.first_order_item?.variant_name?.toLowerCase().includes("lifetime");

    switch (eventName) {
      case "order_created":
        if (billingUserId && isLifetime && attributes.status === "paid") {
          console.log(`[Grant Entitlement] Lifetime access granted to ${billingUserId}`);
        }
        break;

      case "subscription_created":
      case "subscription_payment_success":
      case "subscription_updated":
        if (billingUserId) {
          const renewsAt = attributes.renews_at || attributes.ends_at;
          console.log(`[Grant Entitlement] Universal Pro subscription active for ${billingUserId} until ${renewsAt}`);
        }
        break;

      case "subscription_cancelled":
        console.log(`[Subscription Cancelled] User ${billingUserId} cancelled renewal. Retains access until ${attributes.ends_at}`);
        break;

      case "subscription_expired":
      case "order_refunded":
        if (billingUserId) {
          console.log(`[Revoke Entitlement] Pro entitlement revoked for ${billingUserId}`);
        }
        break;

      default:
        console.log(`[LemonSqueezy Webhook] Unhandled event type: ${eventName}`);
    }

    return res.status(200).json({ received: true, event: eventName, billingUserId });
  } catch (err) {
    console.error("Lemon Squeezy Webhook Error:", err);
    return res.status(500).json({ error: err.message || "Internal server webhook error." });
  }
}
