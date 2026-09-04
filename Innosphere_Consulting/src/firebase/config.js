import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZhhCCRWGQ-qUw8xjoUMXyzBBWq3VzVf0",
  authDomain: "innosphereconsulting-7a5e6.firebaseapp.com",
  projectId: "innosphereconsulting-7a5e6",
  storageBucket: "innosphereconsulting-7a5e6.firebasestorage.app",
  messagingSenderId: "539954518372",
  appId: "1:539954518372:web:54134b5107d214da2a4271",
  measurementId: "G-CTQB0KL4T9"
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
