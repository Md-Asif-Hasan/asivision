// ============================================================
// PRODUCTS — aligned to live Gumroad products for mdasifhasan
//
// 1. MEMBERSHIP — Recurring subscription (mbckdl)
//    URL: mdasifhasan.gumroad.com/l/mbckdl?wanted=true
//    Tier option ID: DeEFIMR04odqjsr4QQq5WA==
//    Currency: USD | 1-week free trial | 30-day refund
//    Recurrence prices (from Gumroad API):
//      monthly=$2  quarterly=$6  biannually=$12  yearly=$24  every_two_years=$48
//
// 2. LIFETIME — One-time purchase (eajnwd)
//    URL: mdasifhasan.gumroad.com/l/eajnwd?wanted=true
//    Price: $999.00 one-time | No trial | Permanent access
// ============================================================

const MEMBERSHIP_OPTION_ID = "DeEFIMR04odqjsr4QQq5WA%3D%3D";
const MEMBERSHIP_BASE = "https://mdasifhasan.gumroad.com/l/mbckdl";
const LIFETIME_BASE   = "https://mdasifhasan.gumroad.com/l/eajnwd";

const membershipUrl = (recurrence) =>
  `${MEMBERSHIP_BASE}?option=${MEMBERSHIP_OPTION_ID}&recurrence=${recurrence}&wanted=true`;

export const PRODUCTS = {
  universal_monthly: {
    id: "universal_monthly",
    name: "Universal Monthly",
    tagline: "Total flexibility for month-to-month access",
    type: "subscription",
    billingPeriod: "monthly",
    periodLabel: "/ month",
    durationDays: 30,
    price: 2.00,
    currency: "USD",
    priceFormatted: "$2.00 / mo",
    checkoutUrl: membershipUrl("monthly"),
    entitlement: "universal_pro",
    badge: "1 WEEK FREE TRIAL",
    features: [
      "Includes 1-Week Free Trial",
      "Full access to MindForge Arena Pro features",
      "Full access to Eternora Life Simulator Pro",
      "All future Asivision SaaS ecosystem apps unlocked",
      "Multi-device cloud synchronization",
      "30-day money back guarantee"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents"]
  },
  universal_quarterly: {
    id: "universal_quarterly",
    name: "Universal Quarterly",
    tagline: "Optimal medium-term focus plan",
    type: "subscription",
    billingPeriod: "quarterly",
    periodLabel: "/ 3 months",
    durationDays: 90,
    price: 6.00,
    currency: "USD",
    priceFormatted: "$6.00 / 3 mos",
    savings: "Best for semester or milestone goals",
    checkoutUrl: membershipUrl("quarterly"),
    entitlement: "universal_pro",
    badge: "RECOMMENDED",
    features: [
      "Includes 1-Week Free Trial",
      "All features from Monthly plan",
      "Unlocked across MindForge Arena & Eternora",
      "Priority performance & AI generation tier",
      "Priority technical support & cloud backup",
      "30-day money back guarantee"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync"]
  },
  universal_biannual: {
    id: "universal_biannual",
    name: "Universal 6-Month",
    tagline: "Focused half-year access plan",
    type: "subscription",
    billingPeriod: "biannually",
    periodLabel: "/ 6 months",
    durationDays: 180,
    price: 12.00,
    currency: "USD",
    priceFormatted: "$12.00 / 6 mos",
    savings: "Equivalent to $2/mo",
    checkoutUrl: membershipUrl("biannually"),
    entitlement: "universal_pro",
    badge: null,
    features: [
      "Includes 1-Week Free Trial",
      "All features from Quarterly plan",
      "Full access to all current & upcoming apps",
      "Priority server bandwidth & AI tokens",
      "30-day money back guarantee"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync"]
  },
  universal_yearly: {
    id: "universal_yearly",
    name: "Universal Yearly",
    badge: "MOST POPULAR",
    tagline: "Our most popular annual plan for dedicated creators",
    type: "subscription",
    billingPeriod: "yearly",
    periodLabel: "/ year",
    durationDays: 365,
    price: 24.00,
    currency: "USD",
    priceFormatted: "$24.00 / yr",
    savings: "Equivalent to $2/mo — pay once for the full year",
    popular: true,
    checkoutUrl: membershipUrl("yearly"),
    entitlement: "universal_pro",
    features: [
      "Includes 1-Week Free Trial",
      "Everything in Monthly & Quarterly plans",
      "Instant Pro access to MindForge Arena & Eternora",
      "Guaranteed day-1 access to all new SaaS app releases",
      "Exclusive Pro badges & competitive leaderboards",
      "30-day money back guarantee"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync", "beta_access"]
  },
  universal_2year: {
    id: "universal_2year",
    name: "Universal 2-Year",
    badge: "BEST DEAL",
    tagline: "Maximum commitment, maximum savings",
    type: "subscription",
    billingPeriod: "every_two_years",
    periodLabel: "/ 2 years",
    durationDays: 730,
    price: 48.00,
    currency: "USD",
    priceFormatted: "$48.00 / 2 yrs",
    savings: "Equivalent to $2/mo — lowest total cost recurring",
    checkoutUrl: membershipUrl("every_two_years"),
    entitlement: "universal_pro",
    features: [
      "Includes 1-Week Free Trial",
      "Extended 2-Year access across all current and new apps",
      "Unlimited unlocks across MindForge Arena & Eternora",
      "VIP Founder status & community recognition",
      "Maximum priority server bandwidth & unlimited AI tokens",
      "30-day money back guarantee"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync", "beta_access", "vip_founder"]
  },
  universal_lifetime: {
    id: "universal_lifetime",
    name: "Universal Lifetime Access",
    badge: "ULTIMATE VALUE",
    tagline: "Pay once. Own Asivision Pro forever across all apps.",
    type: "lifetime",
    billingPeriod: "one_time",
    periodLabel: "one-time payment",
    durationDays: 36500,
    price: 999.00,
    currency: "USD",
    priceFormatted: "$999.00",
    savings: "Pay once, never pay again — forever access guaranteed",
    bestValue: true,
    checkoutUrl: `${LIFETIME_BASE}?wanted=true`,
    entitlement: "universal_pro",
    features: [
      "Permanent Lifetime Pro entitlement across all current apps",
      "Unlimited unlocks across MindForge Arena & Eternora",
      "Lifetime guarantee on ALL future Asivision SaaS tools",
      "VIP Founder status & community recognition",
      "Zero renewals, zero recurring billing — pay once, own forever",
      "Maximum priority server bandwidth & unlimited AI tokens"
    ],
    appAccess: ["mindforge_arena", "eternora", "ai_scrapers", "automation_agents", "cloud_sync", "beta_access", "vip_founder"]
  }
};

import { getAppsList } from './appsManager';

export const PRODUCT_LIST = Object.values(PRODUCTS);

export const SAAS_APPS = getAppsList();

