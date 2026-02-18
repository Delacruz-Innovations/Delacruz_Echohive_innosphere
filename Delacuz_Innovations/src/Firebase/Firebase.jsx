import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
   apiKey:"AIzaSyCHLnAO-ug2e-6h15qVP6PVM34iYmaox9I",
  authDomain: "delacruz-innovation.firebaseapp.com",
  projectId: "delacruz-innovation",
  storageBucket: "delacruz-innovation.firebasestorage.app",
  messagingSenderId: "350926550465",
  appId: "1:350926550465:web:b043f422440e1d4793eb40",
  measurementId: "G-VJJ3Z0N9V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };