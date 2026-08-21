// Central Dynamic Apps Manager Store
// Supports custom apps, logos, Cloudflare image URLs, sectioned privacy policy forms, and service accounts.

export const DEFAULT_SAAS_APPS = [
  {
    id: "mindforge_arena",
    name: "MindForge Arena Pro",
    category: "Cognitive Esports & IQ Games",
    description: "Pro assessments, unlimited multiplayer arena battles, and neural analytics.",
    icon: "🧠",
    logoUrl: "",
    previewImageUrl: "",
    linkUrl: "https://play.google.com/store/apps/details?id=com.devstudio.iqpro",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.devstudio.iqpro",
    effectiveDate: "August 20, 2026",
    disclaimers: "MindForge Arena Pro is a cognitive esports and brain assessment platform. Scores and neural analytics are for educational and training purposes.",
    collectedInfo: "Account Details: Name, email, and user UID.\nAssessment Data: IQ test answers, reaction speeds, and multiplayer battle history.\nDevice Info: OS version and screen resolution for diagnostic compatibility.",
    howUsed: "Deliver real-time multiplayer arena matchmaking.\nSync cognitive progress across web and mobile devices.\nProvide analytical skill performance breakdowns.",
    storageSecurity: "Passwords are encrypted using bcrypt.\nSessions are secured with HttpOnly cookies and HTTPS/TLS encryption.\nAnalytics stored on secure cloud database servers.",
    userRights: "Users may request data deletion or account export at any time by contacting asifhasan10122000@gmail.com.",
    serviceAccountEmail: "mindforge-service@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n(Configured for MindForge Arena)\n-----END PRIVATE KEY-----",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "eternora",
    name: "Eternora Life Simulator Pro",
    category: "Metaverse & Legacy Simulator",
    description: "Unlimited life choices, family legacies, ad-free experience, and AI assistant.",
    icon: "🌐",
    logoUrl: "",
    previewImageUrl: "",
    linkUrl: "https://play.google.com/store/apps/details?id=com.Eternora.app&pli=1",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.Eternora.app&pli=1",
    effectiveDate: "August 20, 2026",
    disclaimers: "Eternora is an open-ended life simulation application. All story events, choices, and world generation are fictional.",
    collectedInfo: "Account Data: Email, username, and Pro entitlement status.\nSimulation State: Saved family tree legacies, story choices, and character attributes.",
    howUsed: "Generate personalized life simulation stories and legacy timelines.\nProvide an ad-free Pro user experience.",
    storageSecurity: "Encrypted HTTPS telemetry and secure cloud database backups.",
    userRights: "Request full account data wipe via support email: asifhasan10122000@gmail.com.",
    serviceAccountEmail: "eternora-service@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n(Configured for Eternora)\n-----END PRIVATE KEY-----",
    isSaas: true,
    status: "Live & Pro-Enabled"
  },
  {
    id: "taka_jachai",
    name: "Taka Jachai AI Vision",
    category: "Finance & Counterfeit Detection",
    description: "Computer vision counterfeit banknote detection and financial management.",
    icon: "⚡",
    logoUrl: "",
    previewImageUrl: "",
    linkUrl: "https://play.google.com/store/apps/details?id=com.takajachai.app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.takajachai.app",
    effectiveDate: "July 13, 2026",
    disclaimers: "TAKAJACHAI is NOT an official currency verification tool and is NOT affiliated with any government or central bank. Counterfeit detection is an AI aid and not 100% guaranteed.",
    collectedInfo: "Account Data: Business name, email, and authentication details.\nCamera Data: Banknote images captured solely for computer vision verification.\nBusiness Records: Sales logs and expense tracking data.",
    howUsed: "Process camera frames for real-time banknote feature verification.\nManage local business inventory and financial reporting.",
    storageSecurity: "Bcrypt hashed passwords, HttpOnly cookies, and HTTPS/TLS encrypted transmission.",
    userRights: "Camera permissions can be revoked at any time in device settings. Contact asifhasan10122000@gmail.com for account deletion.",
    serviceAccountEmail: "takajachai-service@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n(Configured for Taka Jachai)\n-----END PRIVATE KEY-----",
    isSaas: true,
    status: "Beta Pro Features"
  },
  {
    id: "ai_scrapers",
    name: "AI Automation Agents & Scrapers",
    category: "Cloud Automation Suite",
    description: "Autonomous web data extraction, multi-source scraping bots, and automated workflows.",
    icon: "🤖",
    logoUrl: "",
    previewImageUrl: "",
    linkUrl: "https://scrapers.asivision.com",
    effectiveDate: "August 20, 2026",
    disclaimers: "Scraping bots adhere strictly to target website terms of service and robots.txt protocols.",
    collectedInfo: "Scraping Jobs: Target URLs, extraction schemas, and API authentication keys.",
    howUsed: "Execute cloud data extraction pipelines and deliver automated reports.",
    storageSecurity: "API keys and pipeline outputs stored in encrypted Cloudflare R2 / KV databases.",
    userRights: "Full control to delete automation tasks via customer dashboard.",
    serviceAccountEmail: "scrapers-service@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\n(Configured for Scrapers)\n-----END PRIVATE KEY-----",
    isSaas: true,
    status: "Incoming Pro Feature"
  }
];

const APPS_STORAGE_KEY = "asivision_custom_apps_v3";

// A policy page is available for every app ID. This keeps older saved apps and
// newly-created apps complete even if an editor leaves an optional field blank.
export function toPrivacySlug(value = "") {
  return String(value).trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
}

const PRIVACY_POLICY_DEFAULTS = {
  effectiveDate: "August 20, 2026",
  disclaimers: "This application is provided by Asivision Technology & Innovation. Please review this policy before using the service.",
  collectedInfo: "Account information needed to provide the service.\nDevice and diagnostic information needed to keep the application reliable.",
  howUsed: "Deliver the features and services you request.\nMaintain security, reliability, and support for the application.",
  storageSecurity: "Information is protected using reasonable technical and organizational safeguards.\nAccess is limited to authorized systems and personnel where required.",
  userRights: "You may request access, correction, export, or deletion of eligible personal information by contacting our privacy team."
};

export function withPrivacyPolicyDefaults(appData = {}) {
  return {
    ...PRIVACY_POLICY_DEFAULTS,
    ...appData,
    effectiveDate: appData.effectiveDate || PRIVACY_POLICY_DEFAULTS.effectiveDate,
    collectedInfo: appData.collectedInfo || PRIVACY_POLICY_DEFAULTS.collectedInfo,
    howUsed: appData.howUsed || PRIVACY_POLICY_DEFAULTS.howUsed,
    storageSecurity: appData.storageSecurity || PRIVACY_POLICY_DEFAULTS.storageSecurity,
    userRights: appData.userRights || PRIVACY_POLICY_DEFAULTS.userRights,
  };
}

export function getAppsList() {
  if (typeof window === "undefined") return DEFAULT_SAAS_APPS;
  try {
    const raw = localStorage.getItem(APPS_STORAGE_KEY);
    if (!raw) return DEFAULT_SAAS_APPS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(app => {
        const defaultApp = DEFAULT_SAAS_APPS.find(d => d.id === app.id);
        if (defaultApp && defaultApp.playStoreUrl) {
          return {
            ...app,
            playStoreUrl: defaultApp.playStoreUrl,
            linkUrl: defaultApp.linkUrl
          };
        }
        return app;
      });
    }
    return DEFAULT_SAAS_APPS;
  } catch (e) {
    console.error("Failed to parse stored apps:", e);
    return DEFAULT_SAAS_APPS;
  }
}

export function saveApp(appData) {
  if (typeof window === "undefined") return;
  try {
    const current = getAppsList();
    const existingIndex = current.findIndex(a => a.id === appData.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = withPrivacyPolicyDefaults({ ...updated[existingIndex], ...appData });
    } else {
      updated = [...current, withPrivacyPolicyDefaults(appData)];
    }
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_apps_updated"));
    return updated;
  } catch (e) {
    console.error("Failed to save app data:", e);
  }
}

export function deleteApp(appId) {
  if (typeof window === "undefined") return;
  try {
    const current = getAppsList();
    const updated = current.filter(a => a.id !== appId);
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_apps_updated"));
    return updated;
  } catch (e) {
    console.error("Failed to delete app:", e);
  }
}

export function resetAppsList() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(APPS_STORAGE_KEY);
  window.dispatchEvent(new Event("asivision_apps_updated"));
  return DEFAULT_SAAS_APPS;
}
