// Central dynamic settings store for Payoneer, Contact, and Service parameters.
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
    location: "Dhaka, Bangladesh",
    officeHours: "Monday - Saturday: 9:00 AM - 6:00 PM (GMT+6) | Sunday: Closed",
    registrationNo: "ASI-TECH-2026-BD"
  },
  adminEmails: [
    "asifhasan10122000@gmail.com"
  ]
};

const STORAGE_KEY = "asivision_admin_settings_v1";

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
      adminEmails: parsed.adminEmails || DEFAULT_SETTINGS.adminEmails
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
