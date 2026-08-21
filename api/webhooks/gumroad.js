// Vercel Serverless Function: Gumroad Ping / Sale Notification Handler
// Handles sale events from both mbckdl (membership) and eajnwd (lifetime)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // Gumroad sends form-urlencoded pings
        const params = new URLSearchParams(body);
        body = Object.fromEntries(params.entries());
      }
    }

    const sellerUsername = body.seller_id || "mdasifhasan";
    const email = body.email;
    const productPermalink = body.product_permalink || body.short_product_id || "";
    const isLifetimeProduct = productPermalink === "eajnwd" ||
      body.product_name?.toLowerCase().includes("lifetime");

    // Extract billing_user_id from custom fields or URL params
    let customFields = {};
    try {
      customFields = typeof body.custom_fields === "string"
        ? JSON.parse(body.custom_fields)
        : (body.custom_fields || {});
    } catch { /* ignore parse errors */ }

    let urlParams = {};
    try {
      urlParams = typeof body.url_params === "string"
        ? JSON.parse(body.url_params)
        : (body.url_params || {});
    } catch { /* ignore parse errors */ }

    const billingUserId =
      customFields.billing_user_id ||
      urlParams.billing_user_id ||
      body.billing_user_id ||
      (email ? `busr_email_${email.replace(/[^a-z0-9]/gi, "_")}` : "busr_guest");

    const isRefund = body.refunded === "true" || body.refunded === true;
    const isSubscriptionCancel =
      body.is_subscription_cancel === "true" || body.is_subscription_cancel === true;

    const eventType = isRefund
      ? "refund"
      : isSubscriptionCancel
      ? "cancellation"
      : "sale";

    console.log(
      `[Gumroad Ping] Seller: ${sellerUsername} | User: ${billingUserId} | ` +
      `Product: ${body.product_name || productPermalink} | Lifetime: ${isLifetimeProduct} | Event: ${eventType}`
    );

    if (isRefund) {
      console.log(`[Revoke Entitlement] Refund received for ${billingUserId}`);
    } else if (isSubscriptionCancel) {
      console.log(`[Subscription Cancelled] ${billingUserId} cancelled.`);
    } else if (isLifetimeProduct) {
      console.log(`[Grant Lifetime] Permanent entitlement activated for ${billingUserId}`);
    } else {
      console.log(`[Grant Pro] Universal Pro subscription activated for ${billingUserId}`);
    }

    return res.status(200).json({
      received: true,
      provider: "gumroad",
      seller: sellerUsername,
      event: eventType,
      isLifetime: isLifetimeProduct,
      billingUserId,
      productPermalink
    });
  } catch (err) {
    console.error("Gumroad Ping Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error." });
  }
}
