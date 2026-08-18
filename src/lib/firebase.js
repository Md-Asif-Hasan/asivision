import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Public Firebase client configuration for asivision-payments / central identity
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBEFAaFYhVL1qwUKDrn5iM6Mv7UYRZbFA0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "asivision-payments.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "asivision-payments",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "asivision-payments.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "996245699731",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:996245699731:web:8662ff8e7b9fb605bf87da",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
