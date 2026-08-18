const CHECKOUT_URLS = {
  universal_monthly: "https://asivision-payments.lemonsqueezy.com/buy/d5b4a09a-cf2d-45db-b956-62136e05ad98",
  universal_4month: "https://asivision-payments.lemonsqueezy.com/buy/f44b0dd5-768a-40a2-9a03-68d7120df01a",
  universal_yearly: "https://asivision-payments.lemonsqueezy.com/buy/b0e5015b-97e3-4638-89c2-55ce4d3ae22e",
  universal_lifetime: "https://asivision-payments.lemonsqueezy.com/buy/78e7c10b-d242-498c-8f19-3549045ea64e"
};

// Vercel Serverless Function: Redirect to Lemon Squeezy Checkout with prefilled billing_user_id
export default async function handler(req, res) {
  const { plan = "universal_yearly", billing_user_id = "busr_guest" } = req.query;

  const baseUrl = CHECKOUT_URLS[plan] || CHECKOUT_URLS.universal_yearly;
  const redirectUrl = `${baseUrl}?checkout[custom][billing_user_id]=${encodeURIComponent(billing_user_id)}`;

  if (req.query.redirect === "true") {
    return res.redirect(302, redirectUrl);
  }

  return res.status(200).json({
    plan,
    billing_user_id,
    checkoutUrl: redirectUrl
  });
}
