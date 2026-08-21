// Central dynamic settings store for Payoneer, Gumroad, Firebase, App Config, Contact, Inquiries, and Service parameters.
// Stored in localStorage with fallback defaults and editable via /admin page.

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
    projectId: "asivision-payments",
    storageBucket: "asivision-payments.appspot.com",
    messagingSenderId: "996245699731",
    appId: "1:996245699731:web:8662ff8e7b9fb605bf87da",
    serviceAccountEmail: "firebase-adminsdk-asivision@asivision-payments.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIICXAIBAAKBgQC7v... (configured service account private key)\n-----END PRIVATE KEY-----"
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

const STORAGE_KEY = "asivision_admin_settings_v1";
const INQUIRIES_KEY = "asivision_inquiries_v1";

export function getAdminSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      payoneer: { ...DEFAULT_SETTINGS.payoneer, ...(parsed.payoneer || {}) },
      contact: { ...DEFAULT_SETTINGS.contact, ...(parsed.contact || {}) },
      gumroad: { ...DEFAULT_SETTINGS.gumroad, ...(parsed.gumroad || {}) },
      firebase: { ...DEFAULT_SETTINGS.firebase, ...(parsed.firebase || {}) },
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
