import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_DELACRUZ_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_DELACRUZ_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_DELACRUZ_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_DELACRUZ_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_DELACRUZ_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_DELACRUZ_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_DELACRUZ_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig, "delacruz");

// Initialize Firestore with settings
const db = getFirestore(app);

// Enable offline persistence (optional but recommended)
try {
    enableIndexedDbPersistence(db).catch((err) => {
        if (err.code === 'failed-precondition') {
            console.warn('Delacruz: Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
            console.warn('Delacruz: The current browser does not support offline persistence');
        }
    });
} catch (err) {
    console.error('Delacruz: Error enabling persistence:', err);
}

export { db };
export const storage = getStorage(app);

