import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Public Firebase client configuration for asivision-payments / central identity
// App ID matches: Firebase Console → asivision-payments → Asivision payments (web app)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBEFAaFYhVL1qwUKDrn5iM6Mv7UYRZbFA0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "asivision-payments.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://asivision-payments-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "asivision-payments",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "asivision-payments.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "996245699731",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:996245699731:web:7ff651c00bd15e9b3fe166",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VXW6P5YYHE",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
