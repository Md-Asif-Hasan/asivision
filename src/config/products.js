export const PRODUCTS = {
  universal_monthly: {
    id: "universal_monthly",
    name: "Universal Monthly",
    tagline: "Total flexibility for month-to-month access",
    type: "subscription",
    billingPeriod: "month",
    periodLabel: "/ month",
    durationDays: 30,
    productId: 1294310,
    variantId: 2025070,
    price: 199.99,
    currency: "BDT",
    priceFormatted: "BDT 199.99",
    checkoutUrl: "https://asivision-payments.lemonsqueezy.com/buy/d5b4a09a-cf2d-45db-b956-62136e05ad98",
    entitlement: "universal_pro",
    badge: null,
    features: [
      "Full access to MindForge Arena Pro features",
      "Full access to Eternora Life Simulator Pro",
      "All future Asivision SaaS ecosystem apps unlocked",
      "Multi-device cloud synchronization",
      "Cancel anytime in one click"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents"]
  },
  universal_4month: {
    id: "universal_4month",
    name: "Universal 4 Months",
    tagline: "Optimal medium-term focus plan",
    type: "subscription",
    billingPeriod: "4_months",
    periodLabel: "/ 4 months",
    durationDays: 120,
    productId: 1294369,
    variantId: 2025168,
    price: 999.99,
    currency: "BDT",
    priceFormatted: "BDT 999.99",
    savings: "Best for semester / milestone goals",
    checkoutUrl: "https://asivision-payments.lemonsqueezy.com/buy/f44b0dd5-768a-40a2-9a03-68d7120df01a",
    entitlement: "universal_pro",
    badge: "RECOMMENDED",
    features: [
      "All features from Monthly plan",
      "Unlocked across MindForge Arena & Eternora",
      "Priority performance & AI generation tier",
      "Priority technical support & cloud backup",
      "Auto-renewal with instant customer portal access"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync"]
  },
  universal_yearly: {
    id: "universal_yearly",
    name: "Universal Yearly",
    badge: "MOST POPULAR",
    tagline: "Our most popular plan for dedicated creators",
    type: "subscription",
    billingPeriod: "year",
    periodLabel: "/ year",
    durationDays: 365,
    productId: 1294408,
    variantId: 2025225,
    price: 1999.99,
    currency: "BDT",
    priceFormatted: "BDT 1,999.99",
    savings: "Save over 58% vs monthly",
    popular: true,
    checkoutUrl: "https://asivision-payments.lemonsqueezy.com/buy/b0e5015b-97e3-4638-89c2-55ce4d3ae22e",
    entitlement: "universal_pro",
    features: [
      "Everything in Monthly & 4-Month plans",
      "Instant Pro access to MindForge Arena & Eternora",
      "Guaranteed day-1 access to all new SaaS app releases",
      "Exclusive Pro badges & competitive leaderboards",
      "Best value recurring annual subscription",
      "Early beta access to AI Automation agents"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync", "beta_access"]
  },
  universal_lifetime: {
    id: "universal_lifetime",
    name: "Universal Lifetime",
    badge: "ULTIMATE VALUE",
    tagline: "Pay once. Own Universal Pro forever across all apps.",
    type: "lifetime",
    periodLabel: "one-time payment",
    durationDays: 36500, // 100 years
    productId: 1294412,
    variantId: 2025229,
    price: 19999.99,
    currency: "BDT",
    priceFormatted: "BDT 19,999.99",
    savings: "Pay once, never pay again",
    bestValue: true,
    checkoutUrl: "https://asivision-payments.lemonsqueezy.com/buy/78e7c10b-d242-498c-8f19-3549045ea64e",
    entitlement: "universal_pro",
    features: [
      "Permanent Lifetime Pro entitlement across all apps",
      "Unlimited unlocks across MindForge Arena & Eternora",
      "Lifetime guarantee on ALL future Asivision SaaS tools",
      "VIP Founder status & community recognition",
      "Zero renewals, zero recurring billing, forever access",
      "Maximum priority server bandwidth & unlimited AI tokens"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync", "beta_access", "vip_founder"]
  }
};

export const PRODUCT_LIST = Object.values(PRODUCTS);

export const SAAS_APPS = [
  {
    id: "mindforge_arena",
    name: "MindForge Arena Pro",
    category: "Cognitive Esports & IQ Games",
    description: "Pro assessments, unlimited multiplayer arena battles, and neural analytics.",
    icon: "🧠",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "eternora",
    name: "Eternora Life Simulator Pro",
    category: "Metaverse & Legacy Simulator",
    description: "Unlimited life choices, family legacies, ad-free experience, and AI assistant.",
    icon: "🌐",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "taka_jachai",
    name: "Taka Jachai AI Vision",
    category: "Finance & Counterfeit Detection",
    description: "Computer vision counterfeit banknote detection and financial management.",
    icon: "⚡",
    isSaas: true,
    status: "Beta Pro Features"
  },
  {
    id: "ai_scrapers",
    name: "AI Automation Agents & Scrapers",
    category: "Cloud Automation Suite",
    description: "Autonomous web data extraction, multi-source scraping bots, and automated workflows.",
    icon: "🤖",
    isSaas: true,
    status: "Incoming Pro Feature"
  }
];
