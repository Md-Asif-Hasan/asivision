import { db } from "../lib/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const DEFAULT_SETTINGS = {
  payoneer: {
    recipientEmail: "asifhasan10122000@gmail.com",
    receivingAccountStatus: "Under Verification Review",
    statusNote: "Our Payoneer receiving account is currently undergoing verification review. Custom service invoices and payment links are issued manually upon consultation.",
    customPaymentRequestUrl: "https://login.payoneer.com/",
    defaultCurrency: "USD",
    acceptedMethods: ["Payoneer Account Balance", "Credit/Debit Card via Payoneer", "Local Bank Transfer via Payoneer Invoicing"]
  },
  contact: {
    primaryEmail: "asifhasan10122000@gmail.com",
    primaryPhone: "+880 1769-920324",
    whatsappNumber: "+8801769920324",
    whatsappLink: "https://wa.me/8801769920324",
    location: "608/1, Kazla, Rajshahi, Bangladesh",
    officeHours: "Monday - Saturday: 9:00 AM - 6:00 PM (GMT+6) | Sunday: Closed",
    registrationNo: "ASI-TECH-2026-BD"
  },
  gumroad: {
    accessToken: "SxxZCJMxEjYCCxzSnSQHp15ySE7kzeyI09V4Z7x-LHM",
    sellerId: "mdasifhasan",
    appId: "QgobwsOV3ycAl-LcKRjHaehFpgx2LGLZHf9oLm61aaw",
    appSecret: "H9yKE8PMPIAX98vKE4KZp5x_tIMIsf5Klxj73VsEcUo",
    membershipPermalink: "mbckdl",
    lifetimePermalink: "eajnwd"
  },
  firebase: {
    apiKey: "AIzaSyBEFAaFYhVL1qwUKDrn5iM6Mv7UYRZbFA0",
    authDomain: "asivision-payments.firebaseapp.com",
    databaseURL: "https://asivision-payments-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "asivision-payments",
    storageBucket: "asivision-payments.firebasestorage.app",
    messagingSenderId: "996245699731",
    appId: "1:996245699731:web:7ff651c00bd15e9b3fe166",
    measurementId: "G-VXW6P5YYHE",
    serviceAccountEmail: "gumroad-access@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4Pg88Ng3uaK5B\nTk9H9Q1+dZh2a4QdLS3lQwiIemf6gOjqV5oYlaWmXGwpk5VI9vwno3VhRW4QD8O1\nuuCssjXavUKyHWAoAJyGdYD4VJgirbBzWJ6AOjOWttUnz40gE1rXkBQ3Anf6JQax\nCMsCawKFrMOPvBts0Zqm5EdqkJXWioHYzUavggG80E1MpXYhJqg47ZozGyQ98zV3\nxueGfUJtmRka7Ni6Li3xtQ4MOmsBaVoel9ArzHVl+MXMhB0zIPt//S24cMhm/C2i\n82fALe1spL7NxVuwR0j0nhMZKM6IYWk5t5gF84695/xcb7GzgsijGnslBHIghVdz\ngS2El+7RAgMBAAECggEAFyE3YWw50IHUyn8Nxe9WO9eAhfFWeyE2X09MjXGshw7S\n7sSDpG15B8sXixqrhab4HfPP4x/Hwv1vqOtmlFelGipjap/0d+EnxVuQDtzz4nqi\nqcBo2Zk068lVNjPAuFOltmUwnH1TWZR3ZBdCATI09VosjOllGgKwYx5Kdu7i2LWA\n/U8WCodtMpfogSm104JBFwyOD6PHE/L01wkE5bPshFWKGicSB86pj/+Wi8FD6kNd\n5oegsBSTHLpRgAo3CaBAg+9yTu+5fbIixzvug6H/l0B053ncn7Tg+o5/H7btImcW\nHTK6hPAojW3tnbuqOJ9XZlW06mX3CtaAEuehlRRA3wKBgQDtFLjfYHG+BzgBFKJV\nysild1SnDxXS5LVY5Xgso1uNp/4bKdi3UdBQWOvfwEHkKcCf1WHLVAI51TNCMSXs\nbChBdWxaZC1Ctuo3Q+ftJtTGZcPZMzVn5QaVSQe7jtNqn3Yvn4PvUa40efvkyqNm\n6cTQQKF9puSbrBeanBOyvvHphwKBgQDG8ej0tUchB+gi3VIE5wzb/iyWeUQKBo1S\nG/sgLP0zgvB/l7XkfO2DR7HvuqNEEYJLnNELHyj08LOlmskdiZaB32EKZB2sQesl\no6Wxh+RqvcGjCPNctk/pUJd800gP53sN6GYq7nde2iGb1cahb1HIOnx/mPMIolZ3\nXUNdmFWa5wKBgG+FS+FnkJl+880uU55foTqUg3GCGxX1F4kViA4XWb2sxE8qxBKX\nnZHuAiZiXZxiN4X37eSjQ9jIfTApxlkMF3OTNMDgVpoHSO1uN+7KUVRyEkpdWEXi\n6dHXZJfJe5GwKPwF4R32Iif1KZRZ7bs/Q6FihZSBqQ/BR+kmee2e/FSJAoGAZ6nD\nzkbrMk3xasFSLJXMQJGX4Cx+BI9XchJ8b06h/QZclM+TiuSBymdAU3839Y7+CrJC\nxv3MlJ0brs4Rv59i2ndwFD8IqyqKAcnc273IisonrPFMBeJFj3hcB0H8ibT/jMas\n/e/WKYmV+6KP5qyfu6qmFsK22KfmUDo7kPiAmr8CgYADUOyGx0YmanQ0qiEHRTWV\nOO/KAzfNazquklpwUFhWci3zvy4BHSZWcGCtJAZxn2YnyqDmTSnBXt5KVDJXtS7c\nUnA6lMNN6DWf4s8vnNlsRqshvAMzvZKEB61ZzEkBbIPn1eKiem+vv0JL+G/pYQfR\n2kSEzcaYiEJFkLO/EAl/Bw==\n-----END PRIVATE KEY-----\n"
  },
  cloudflare: {
    accountId: "ce183a072f5c0f81a67c9e948e3d3520",
    bucketName: "asivision-bucket",
    publicDevUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev",
    imagesFolder: "/application-images/",
    imagesBaseUrl: "https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/",
    s3ApiEndpoint: "https://ce183a072f5c0f81a67c9e948e3d3520.r2.cloudflarestorage.com/asivision-bucket",
    accessKeyId: "",
    secretAccessKey: ""
  },
  appConfig: {
    mindforgeArenaStatus: "Live & Pro-Enabled",
    eternoraStatus: "Live & Pro-Enabled",
    takaJachaiStatus: "Beta Pro Features",
    aiScrapersStatus: "Incoming Pro Feature",
    customLogoUrl: "",
    customAppPreviewUrl: ""
  },
  adminEmails: [
    "asifhasan10122000@gmail.com"
  ],
  coadminEmails: [
    "coadmin@asivision.com"
  ]
};

const STORAGE_KEY = "asivision_admin_settings_v3";
const INQUIRIES_KEY = "asivision_inquiries_v1";

// ─── CLOUD FIRESTORE SYNC HELPERS ─────────────────────────────────────────────

export async function syncAdminSettingsToCloud(settings) {
  try {
    if (!db) return;
    const ref = doc(db, "config", "adminSettings");
    await setDoc(ref, {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log("[Cloud Sync] Admin settings saved to Cloud Firestore.");
  } catch (e) {
    console.error("[Cloud Sync Error] Failed to save admin settings to Cloud Firestore:", e);
  }
}

export async function fetchAdminSettingsFromCloud() {
  try {
    if (!db) return null;
    const ref = doc(db, "config", "adminSettings");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const cloudSettings = snap.data();
      const merged = { ...DEFAULT_SETTINGS, ...cloudSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event("asivision_settings_updated"));
      }
      return merged;
    }
  } catch (e) {
    console.warn("[Cloud Fetch] Could not load admin settings from Cloud Firestore:", e);
  }
  return null;
}

export function getAdminSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      fetchAdminSettingsFromCloud();
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      payoneer: { ...DEFAULT_SETTINGS.payoneer, ...(parsed.payoneer || {}) },
      contact: { ...DEFAULT_SETTINGS.contact, ...(parsed.contact || {}) },
      gumroad: { ...DEFAULT_SETTINGS.gumroad, ...(parsed.gumroad || {}) },
      firebase: { ...DEFAULT_SETTINGS.firebase, ...(parsed.firebase || {}) },
      cloudflare: { ...DEFAULT_SETTINGS.cloudflare, ...(parsed.cloudflare || {}) },
      appConfig: { ...DEFAULT_SETTINGS.appConfig, ...(parsed.appConfig || {}) },
      adminEmails: parsed.adminEmails || DEFAULT_SETTINGS.adminEmails,
      coadminEmails: parsed.coadminEmails || DEFAULT_SETTINGS.coadminEmails || []
    };
  } catch (e) {
    console.error("Failed to parse stored admin settings:", e);
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(newSettings) {
  if (typeof window === "undefined") return;
  try {
    const merged = {
      ...getAdminSettings(),
      ...newSettings
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event("asivision_settings_updated"));
    syncAdminSettingsToCloud(merged);
    return merged;
  } catch (e) {
    console.error("Failed to persist admin settings:", e);
  }
}

export function resetAdminSettings() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("asivision_settings_updated"));
  return DEFAULT_SETTINGS;
}

// Inquiries / Support Tickets Helper Store
export function getInquiries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveInquiry(data) {
  if (typeof window === "undefined") return;
  try {
    const current = getInquiries();
    const newInquiry = {
      id: "inq_" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "new",
      ...data
    };
    const updated = [newInquiry, ...current];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_inquiries_updated"));
    return newInquiry;
  } catch (e) {
    console.error("Failed to save inquiry:", e);
  }
}

export function deleteInquiry(id) {
  if (typeof window === "undefined") return;
  try {
    const current = getInquiries();
    const updated = current.filter(i => i.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("asivision_inquiries_updated"));
  } catch (e) {}
}
