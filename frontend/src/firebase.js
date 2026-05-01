// Firebase Configuration - EstateIntel Project
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBunnKOijLPdGD49fs4pza-u2QGdSpuevo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "estateintel-140e9.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "estateintel-140e9",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "estateintel-140e9.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "212088236733",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:212088236733:web:8060f65d6673416aeda5d4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4Z50RNVSQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

export { auth, googleProvider, updateProfile };
