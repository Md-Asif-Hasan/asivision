// Vercel Serverless Function: Gumroad Checkout Redirect
// Membership (recurring): mdasifhasan.gumroad.com/l/mbckdl
// Lifetime (one-time):    mdasifhasan.gumroad.com/l/eajnwd

const MEMBERSHIP_OPTION_ID = "DeEFIMR04odqjsr4QQq5WA%3D%3D";
const MEMBERSHIP_BASE = "https://mdasifhasan.gumroad.com/l/mbckdl";
const LIFETIME_BASE   = "https://mdasifhasan.gumroad.com/l/eajnwd";

const RECURRENCE_MAP = {
  universal_monthly:   "monthly",
  universal_quarterly: "quarterly",
  universal_biannual:  "biannually",
  universal_yearly:    "yearly",
  universal_2year:     "every_two_years",
  // legacy aliases
  universal_4month:    "quarterly",
};

export default async function handler(req, res) {
  const { plan = "universal_yearly", billing_user_id = "busr_guest" } = req.query;

  let checkoutUrl;

  if (plan === "universal_lifetime") {
    // One-time purchase — no recurrence or option params needed
    checkoutUrl =
      `${LIFETIME_BASE}?wanted=true` +
      `&billing_user_id=${encodeURIComponent(billing_user_id)}`;
  } else {
    const recurrence = RECURRENCE_MAP[plan] || "yearly";
    checkoutUrl =
      `${MEMBERSHIP_BASE}?option=${MEMBERSHIP_OPTION_ID}` +
      `&recurrence=${recurrence}&wanted=true` +
      `&billing_user_id=${encodeURIComponent(billing_user_id)}`;
  }

  if (req.query.redirect === "true") {
    return res.redirect(302, checkoutUrl);
  }

  return res.status(200).json({
    provider: "gumroad",
    seller: "mdasifhasan",
    plan,
    billing_user_id,
    checkoutUrl
  });
}
