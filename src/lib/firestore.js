import { getFirestore } from "firebase/firestore";
import app from "./firebase";

// Initialize Firestore using the same Firebase app instance
export const db = getFirestore(app);
