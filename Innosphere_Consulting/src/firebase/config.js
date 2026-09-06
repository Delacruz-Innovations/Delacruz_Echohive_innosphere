import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Unified Firebase configuration matching Blog_Admin_Dashboard
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
const db = getFirestore(app);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics not supported in this environment:", err);
    });
}

export { app, db, analytics };
