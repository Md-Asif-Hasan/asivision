import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getAdminSettings } from "../config/adminSettings";
import { PRODUCTS } from "../config/products";
import { checkIsPartner, getCachedPartnerStatus, setCachedPartnerStatus, createOrUpdateUserProfile } from "../config/partnershipManager";

const AuthContext = createContext(null);

const ENTITLEMENTS_STORE_KEY = "asivision_user_entitlements_v1";

function getStoredEntitlements() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ENTITLEMENTS_STORE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStoredEntitlements(map) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ENTITLEMENTS_STORE_KEY, JSON.stringify(map));
  } catch (e) {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [billingUserId, setBillingUserId] = useState(null);
  const [isPartner, setIsPartner] = useState(false);
  const [entitlement, setEntitlement] = useState({
    isPro: false,
    planId: null,
    planName: "Free Explorer",
    isLifetime: false,
    expiresAt: null,
    startedAt: null,
    source: null,
    activeApps: ["taka_jachai"]
  });

  const [adminSettings, setAdminSettings] = useState(getAdminSettings());

  // Listen for admin settings updates
  useEffect(() => {
    const handleSettingsUpdate = () => setAdminSettings(getAdminSettings());
    window.addEventListener("asivision_settings_updated", handleSettingsUpdate);
    return () => window.removeEventListener("asivision_settings_updated", handleSettingsUpdate);
  }, []);

  // Listen for partner status changes (e.g., admin activates from panel)
  useEffect(() => {
    const handlePartnerUpdate = () => {
      if (user) {
        checkIsPartner(user.uid).then(setIsPartner);
      }
    };
    window.addEventListener("asivision_partner_updated", handlePartnerUpdate);
    return () => window.removeEventListener("asivision_partner_updated", handlePartnerUpdate);
  }, [user]);

  // Compute entitlement for user
  const evaluateUserEntitlement = (bId, uEmail) => {
    const store = getStoredEntitlements();
    const userEnt = store[bId] || (uEmail && store[uEmail]);

    if (!userEnt) {
      setEntitlement({
        isPro: false,
        planId: null,
        planName: "Free Explorer",
        isLifetime: false,
        isCancelled: false,
        expiresAt: null,
        startedAt: null,
        source: null,
        activeApps: ["taka_jachai"]
      });
      return;
    }

    const now = Date.now();
    const isLifetime = userEnt.isLifetime || userEnt.planId === "universal_lifetime";
    
    // Ensure fixed, immutable expiresAt timestamp that never resets on re-login
    let fixedExpiresAt = userEnt.expiresAt;
    if (!isLifetime && !fixedExpiresAt) {
      const startMs = userEnt.startedAt ? new Date(userEnt.startedAt).getTime() : now;
      fixedExpiresAt = new Date(startMs + 30 * 24 * 60 * 60 * 1000).toISOString();
      store[bId] = { ...userEnt, expiresAt: fixedExpiresAt };
      saveStoredEntitlements(store);
    }

    const expiresTimestamp = fixedExpiresAt ? new Date(fixedExpiresAt).getTime() : null;
    const isExpired = !isLifetime && expiresTimestamp && expiresTimestamp < now;

    if (isExpired) {
      setEntitlement({
        isPro: false,
        planId: userEnt.planId,
        planName: "Expired Pro",
        isLifetime: false,
        isCancelled: userEnt.isCancelled || false,
        expiresAt: fixedExpiresAt,
        startedAt: userEnt.startedAt,
        source: userEnt.source,
        activeApps: ["taka_jachai"]
      });
    } else {
      const planConfig = PRODUCTS[userEnt.planId];
      setEntitlement({
        isPro: true,
        planId: userEnt.planId,
        planName: planConfig ? planConfig.name : (isLifetime ? "Universal Lifetime Pro" : "Universal Pro"),
        isLifetime: isLifetime,
        isCancelled: userEnt.isCancelled || false,
        expiresAt: isLifetime ? null : fixedExpiresAt,
        startedAt: userEnt.startedAt || new Date().toISOString(),
        source: userEnt.source || "central_billing",
        activeApps: ["mindforge_arena", "eternora", "taka_jachai", "ai_scrapers", "automation_agents"]
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const bId = `busr_${firebaseUser.uid.substring(0, 16)}`;
        setBillingUserId(bId);
        localStorage.setItem("asivision_billing_user_id", bId);
        evaluateUserEntitlement(bId, firebaseUser.email);
        // Check partner status (cache-first, then Firestore)
        const cached = getCachedPartnerStatus(firebaseUser.uid);
        if (cached !== null) {
          setIsPartner(cached);
        } else {
          checkIsPartner(firebaseUser.uid).then((status) => setIsPartner(status));
        }
        // Ensure user profile exists in Firestore
        createOrUpdateUserProfile(firebaseUser.uid, {
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
        });
      } else {
        const storedBId = localStorage.getItem("asivision_billing_user_id");
        if (storedBId) {
          setBillingUserId(storedBId);
          evaluateUserEntitlement(storedBId, null);
        } else {
          setBillingUserId(null);
          setEntitlement({
            isPro: false,
            planId: null,
            planName: "Free Explorer",
            isLifetime: false,
            expiresAt: null,
            startedAt: null,
            source: null,
            activeApps: ["taka_jachai"]
          });
        }
        setIsPartner(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const bId = `busr_${cred.user.uid.substring(0, 16)}`;
    setBillingUserId(bId);
    evaluateUserEntitlement(bId, cred.user.email);
    const partnerStatus = await checkIsPartner(cred.user.uid);
    setIsPartner(partnerStatus);
    return cred.user;
  };

  const registerWithEmail = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const bId = `busr_${cred.user.uid.substring(0, 16)}`;
    setBillingUserId(bId);
    evaluateUserEntitlement(bId, cred.user.email);
    await createOrUpdateUserProfile(cred.user.uid, { email, displayName: '' });
    setIsPartner(false);
    return cred.user;
  };

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const bId = `busr_${cred.user.uid.substring(0, 16)}`;
    setBillingUserId(bId);
    evaluateUserEntitlement(bId, cred.user.email);
    const partnerStatus = await checkIsPartner(cred.user.uid);
    setIsPartner(partnerStatus);
    await createOrUpdateUserProfile(cred.user.uid, {
      email: cred.user.email || '',
      displayName: cred.user.displayName || '',
      photoURL: cred.user.photoURL || '',
    });
    return cred.user;
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("asivision_billing_user_id");
    setBillingUserId(null);
    setIsPartner(false);
    setEntitlement({
      isPro: false,
      planId: null,
      planName: "Free Explorer",
      isLifetime: false,
      expiresAt: null,
      startedAt: null,
      source: null,
      activeApps: ["taka_jachai"]
    });
  };

  // Helper for manual / simulated Pro activation
  const grantProAccess = (targetBillingUserId, planId = "universal_yearly", durationValue = 365, isHours = false) => {
    const isLifetime = planId === "universal_lifetime";
    const durationMs = isHours ? durationValue * 60 * 60 * 1000 : durationValue * 24 * 60 * 60 * 1000;
    const expiresAt = isLifetime ? null : new Date(Date.now() + durationMs).toISOString();
    
    const store = getStoredEntitlements();
    store[targetBillingUserId] = {
      billingUserId: targetBillingUserId,
      planId,
      isLifetime,
      startedAt: new Date().toISOString(),
      expiresAt,
      source: isHours ? "instant_activation_sandbox" : "admin_override"
    };
    saveStoredEntitlements(store);

    if (billingUserId === targetBillingUserId || user?.email === targetBillingUserId) {
      evaluateUserEntitlement(targetBillingUserId, user?.email);
    }
  };

  const revokeProAccess = (targetBillingUserId) => {
    const store = getStoredEntitlements();
    delete store[targetBillingUserId];
    saveStoredEntitlements(store);

    if (billingUserId === targetBillingUserId || user?.email === targetBillingUserId) {
      evaluateUserEntitlement(targetBillingUserId, user?.email);
    }
  };

  const markSubscriptionCancelled = (reason = '') => {
    if (!billingUserId) return;
    const store = getStoredEntitlements();
    const current = store[billingUserId] || (user?.email && store[user.email]) || {};
    const updated = {
      ...current,
      isCancelled: true,
      cancelledAt: new Date().toISOString(),
      cancelReason: reason
    };
    store[billingUserId] = updated;
    if (user?.email) {
      store[user.email] = updated;
    }
    saveStoredEntitlements(store);
    evaluateUserEntitlement(billingUserId, user?.email);
  };

  const allAdminEmails = [
    ...(adminSettings.adminEmails || []),
    ...(adminSettings.coadminEmails || [])
  ].map(e => e.toLowerCase());

  const isAdmin = Boolean(
    user?.email && allAdminEmails.includes(user.email.toLowerCase())
  );

  const isCoadmin = Boolean(
    user?.email && (adminSettings.coadminEmails || []).map(e => e.toLowerCase()).includes(user.email.toLowerCase())
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        billingUserId,
        entitlement,
        isAdmin,
        isCoadmin,
        isPartner,
        adminSettings,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        resetPassword,
        logout,
        grantProAccess,
        revokeProAccess,
        markSubscriptionCancelled,
        refreshEntitlement: () => evaluateUserEntitlement(billingUserId, user?.email),
        refreshPartnerStatus: () => {
          if (user) checkIsPartner(user.uid).then(setIsPartner);
        }
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
