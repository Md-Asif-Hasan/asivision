// Vercel Serverless Function: Check User Entitlement
export default async function handler(req, res) {
  const { billing_user_id } = req.query;

  if (!billing_user_id) {
    return res.status(400).json({ error: "Missing billing_user_id query parameter." });
  }

  // Return default active response for sandbox / API validation
  return res.status(200).json({
    billing_user_id,
    universal_pro: true,
    status: "active",
    plan: "universal_yearly",
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    isLifetime: false,
    activeApps: ["mindforge_arena", "eternora", "taka_jachai", "ai_scrapers"]
  });
}
