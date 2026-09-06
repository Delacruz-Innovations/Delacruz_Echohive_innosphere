import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyCX1BkFYOkcugd1CL00usfLnwaVejpn4GM",
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "delacruzxinnospherxechohive.firebaseapp.com",
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "delacruzxinnospherxechohive",
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "delacruzxinnospherxechohive.firebasestorage.app",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "337003804857",
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:337003804857:web:09e010137be55095a94368",
    measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-PJM1ZDNSGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence (optional but recommended)
try {
    enableIndexedDbPersistence(db).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('Innosphere: Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
            console.warn('Innosphere: The current browser does not support offline persistence');
        }
    });
} catch (err) {
    console.error('Innosphere: Error enabling persistence:', err);
}

export { db };
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

