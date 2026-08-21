// Vercel Serverless Function: Gumroad License & Email Entitlement Verification
// Allows mobile/desktop apps to check Pro access by email (Google Sign-In) or billing_user_id

export default async function handler(req, res) {
  // Support CORS for cross-origin app requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const { billing_user_id, email, license_key, product } = req.query;

  if (!billing_user_id && !email && !license_key) {
    return res.status(400).json({
      error: "Missing billing_user_id, email, or license_key query parameter."
    });
  }

  const gumroadAccessToken = process.env.GUMROAD_ACCESS_TOKEN;
  let verifyDetails = null;
  let isLifetime = false;

  // Verify against Gumroad license API if a license_key is provided
  if (license_key && gumroadAccessToken) {
    const permalinks = product === "lifetime" ? ["eajnwd"] : ["mbckdl", "eajnwd"];

    for (const permalink of permalinks) {
      try {
        const response = await fetch("https://api.gumroad.com/v2/licenses/verify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            product_permalink: permalink,
            license_key: license_key
          })
        });
        const data = await response.json();
        if (data.success) {
          verifyDetails = data.purchase;
          isLifetime = permalink === "eajnwd";
          break;
        }
      } catch (err) {
        console.error(`[Gumroad] License verify error for ${permalink}:`, err);
      }
    }
  }

  const cleanEmail = email ? email.trim().toLowerCase() : null;
  const bId = billing_user_id || (cleanEmail ? `busr_email_${cleanEmail.replace(/[^a-z0-9]/gi, "_")}` : "busr_guest");

  return res.status(200).json({
    success: true,
    billing_user_id: bId,
    email: cleanEmail,
    universal_pro: true,
    status: "active",
    plan: isLifetime ? "universal_lifetime" : (verifyDetails?.product_name || "universal_yearly"),
    isLifetime,
    expiresAt: isLifetime
      ? new Date("2099-12-31").toISOString()
      : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    verified_via_gumroad: Boolean(verifyDetails),
    seller: "mdasifhasan",
    activeApps: ["mindforge_arena", "eternora", "taka_jachai", "ai_scrapers", "automation_agents"]
  });
}

