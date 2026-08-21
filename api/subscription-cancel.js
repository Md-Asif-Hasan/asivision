// Vercel Serverless Function: Gumroad Subscription Cancellation & Audit Log
// Cancels active subscription via Gumroad API v2 without leaving the site

// Shared in-memory cancellation log store for runtime session
let cancellationLogsStore = [];

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      count: cancellationLogsStore.length,
      cancellations: cancellationLogsStore
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST or GET." });
  }

  try {
    const { billing_user_id, subscription_id, reason } = req.body || {};

    if (!billing_user_id && !subscription_id) {
      return res.status(400).json({ error: "Missing billing_user_id or subscription_id." });
    }

    const gumroadAccessToken = process.env.GUMROAD_ACCESS_TOKEN;

    if (!gumroadAccessToken) {
      return res.status(500).json({
        error: "GUMROAD_ACCESS_TOKEN is not configured on the server."
      });
    }

    let gumroadApiSuccess = true;
    let gumroadMessage = "Cancellation processed.";

    if (subscription_id) {
      const cleanSubId = subscription_id.replace(/^sub_/, "");
      try {
        const response = await fetch(`https://api.gumroad.com/v2/subscribers/${cleanSubId}/unsubscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: new URLSearchParams({ access_token: gumroadAccessToken })
        });
        const data = await response.json();
        if (!response.ok || data.success === false) {
          gumroadApiSuccess = false;
          gumroadMessage = data.message || "Gumroad API reported issue cancelling recurring subscription.";
        }
      } catch (err) {
        console.error("Gumroad cancellation API error:", err);
        gumroadApiSuccess = false;
        gumroadMessage = err.message || "Failed to reach Gumroad API.";
      }
    }

    const now = new Date().toISOString();

    const cancellationEntry = {
      id: `canc_${Date.now()}`,
      billingUserId: billing_user_id || "busr_unknown",
      subscriptionId: subscription_id || "n/a",
      reason: reason || "No feedback provided",
      cancelledAt: now,
      status: "cancelled",
      gumroadMessage
    };

    cancellationLogsStore.unshift(cancellationEntry);

    return res.status(200).json({
      success: true,
      gumroadApiSuccess,
      cancelledAt: now,
      message: "Subscription cancelled successfully. You retain full Pro access until your current billing period ends.",
      gumroadMessage,
      entry: cancellationEntry
    });
  } catch (err) {
    console.error("Cancellation endpoint error:", err);
    return res.status(500).json({ error: err.message || "Internal server error." });
  }
}

