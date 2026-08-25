// Partnership Program Manager
// Handles partner status, app registrations, and user management via Firestore + localStorage fallback

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firestore";

// ─── FIRESTORE COLLECTIONS ─────────────────────────────────────────────────
// /users/{uid}           — user profile & partner status
// /partnerApps/{appId}   — partner app registrations

// ─── PARTNERSHIP STATUS (localStorage cache + Firestore) ──────────────────
const PARTNER_CACHE_KEY = "asivision_partner_status_cache_v1";

export function getCachedPartnerStatus(uid) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PARTNER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[uid] || null;
  } catch (e) {
    return null;
  }
}

export function setCachedPartnerStatus(uid, status) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(PARTNER_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[uid] = status;
    localStorage.setItem(PARTNER_CACHE_KEY, JSON.stringify(parsed));
  } catch (e) {}
}

// ─── USER PROFILE (Firestore) ──────────────────────────────────────────────

export async function getUserProfile(uid) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  } catch (e) {
    console.error("[getUserProfile]", e);
    return null;
  }
}

export async function createOrUpdateUserProfile(uid, data) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
    } else {
      await setDoc(ref, {
        uid,
        isPartner: false,
        partnerActivated: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...data,
      });
    }
    return true;
  } catch (e) {
    console.error("[createOrUpdateUserProfile]", e);
    return false;
  }
}

export async function getAllUsers() {
  try {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("[getAllUsers]", e);
    return [];
  }
}

export async function deleteUser(uid) {
  try {
    await deleteDoc(doc(db, "users", uid));
    return true;
  } catch (e) {
    console.error("[deleteUser]", e);
    return false;
  }
}

// ─── ACTIVATE / DEACTIVATE PARTNERSHIP ────────────────────────────────────

export async function activatePartnership(uid, email) {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(
      ref,
      {
        uid,
        email: email || "",
        isPartner: true,
        partnerActivated: true,
        partnerActivatedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setCachedPartnerStatus(uid, true);
    window.dispatchEvent(new Event("asivision_partner_updated"));
    return true;
  } catch (e) {
    console.error("[activatePartnership]", e);
    return false;
  }
}

export async function deactivatePartnership(uid) {
  try {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
      isPartner: false,
      partnerActivated: false,
      partnerDeactivatedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setCachedPartnerStatus(uid, false);
    window.dispatchEvent(new Event("asivision_partner_updated"));
    return true;
  } catch (e) {
    console.error("[deactivatePartnership]", e);
    return false;
  }
}

export async function checkIsPartner(uid) {
  // Check cache first
  const cached = getCachedPartnerStatus(uid);
  if (cached !== null) return cached;

  // Fallback to Firestore
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const isPartner = snap.data().isPartner === true;
      setCachedPartnerStatus(uid, isPartner);
      return isPartner;
    }
    return false;
  } catch (e) {
    console.error("[checkIsPartner]", e);
    return false;
  }
}

// ─── PARTNER APPS (Firestore) ──────────────────────────────────────────────

export async function savePartnerApp(uid, email, appData) {
  try {
    const appId = appData.appId || `partner_${uid}_${Date.now()}`;
    const ref = doc(db, "partnerApps", appId);
    await setDoc(ref, {
      ...appData,
      appId,
      ownerUid: uid,
      ownerEmail: email || "",
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: "active",
    }, { merge: true });
    window.dispatchEvent(new Event("asivision_partner_apps_updated"));
    return appId;
  } catch (e) {
    console.error("[savePartnerApp]", e);
    return null;
  }
}

export async function getPartnerAppsByUser(uid) {
  try {
    const snap = await getDocs(collection(db, "partnerApps"));
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((a) => a.ownerUid === uid);
  } catch (e) {
    console.error("[getPartnerAppsByUser]", e);
    return [];
  }
}

export async function getAllPartnerApps() {
  try {
    const snap = await getDocs(collection(db, "partnerApps"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("[getAllPartnerApps]", e);
    return [];
  }
}

export async function deletePartnerApp(appId) {
  try {
    await deleteDoc(doc(db, "partnerApps", appId));
    window.dispatchEvent(new Event("asivision_partner_apps_updated"));
    return true;
  } catch (e) {
    console.error("[deletePartnerApp]", e);
    return false;
  }
}

// ─── QUOTE REQUESTS (Firestore) ───────────────────────────────────────────

export async function submitQuoteRequest(uid, email, data) {
  try {
    const id = `quote_${uid}_${Date.now()}`;
    const ref = doc(db, "quoteRequests", id);
    await setDoc(ref, {
      id,
      uid,
      email,
      ...data,
      status: "pending",
      submittedAt: serverTimestamp(),
    });
    return id;
  } catch (e) {
    console.error("[submitQuoteRequest]", e);
    return null;
  }
}

export async function getAllQuoteRequests() {
  try {
    const snap = await getDocs(collection(db, "quoteRequests"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("[getAllQuoteRequests]", e);
    return [];
  }
}
