// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBunnKOijLPdGD49fs4pza-u2QGdSpuevo",
  authDomain: "estateintel-140e9.firebaseapp.com",
  projectId: "estateintel-140e9",
  storageBucket: "estateintel-140e9.firebasestorage.app",
  messagingSenderId: "212088236733",
  appId: "1:212088236733:web:8060f65d6673416aeda5d4",
  measurementId: "G-4Z50RNVSQS"
};

// Initialize Firebase with error handling
let app;
let auth;

try {
  console.log('🔧 Firebase Config:', firebaseConfig);
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Create fallback auth for development
  auth = getAuth();
  console.warn('⚠️ Using fallback auth - Firebase initialization failed');
}
const provider = new GoogleAuthProvider();

// Configure Google Provider
provider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

export { auth, provider };
