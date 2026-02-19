import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCX1BkFYOkcugd1CL00usfLnwaVejpn4GM",
    authDomain: "delacruzxinnospherxechohive.firebaseapp.com",
    projectId: "delacruzxinnospherxechohive",
    storageBucket: "delacruzxinnospherxechohive.firebasestorage.app",
    messagingSenderId: "337003804857",
    appId: "1:337003804857:web:09e010137be55095a94368",
    measurementId: "G-PJM1ZDNSGG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
