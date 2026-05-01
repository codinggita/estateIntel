// Google Authentication Helper Functions
import { signInWithPopup, signOut, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axios from "axios";

/**
 * Handle Google Sign-In with popup
 * @returns {Promise<Object>} User data or error
 */
export const handleGoogleLogin = async () => {
  try {
    console.log('🔐 Starting Google sign-in...');
    
    // Determine backend URL based on environment
    const backendUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000' 
      : 'https://estateintel-backend.onrender.com'; // Replace with your production backend URL
    
    console.log('🌐 Using backend URL:', backendUrl);
    
    // Try popup first, fallback to redirect if blocked
    let result;
    try {
      result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Popup authentication successful');
    } catch (popupError) {
      if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
        console.log('⚠️ Popup blocked or closed, trying redirect method...');
        // Fallback to redirect method
        await signInWithRedirect(auth, googleProvider);
        return { success: false, error: 'Redirecting to Google for authentication...', isRedirect: true };
      }
      throw popupError;
    }
    
    const user = result.user;
    
    // Extract user details
    const firebaseUserData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      accessToken: result.user.accessToken,
      refreshToken: result.user.refreshToken
    };
    
    console.log('✅ Firebase sign-in successful:', firebaseUserData);
    
    // Send user data to backend for MongoDB storage
    try {
      const response = await axios.post(`${backendUrl}/api/auth/google`, {
        uid: firebaseUserData.uid,
        name: firebaseUserData.displayName,
        email: firebaseUserData.email,
        photo: firebaseUserData.photoURL,
        emailVerified: firebaseUserData.emailVerified
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (response.data.success) {
        console.log('✅ Backend authentication successful:', response.data.user);
        
        // Store user in localStorage for immediate access
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return {
          success: true,
          user: response.data.user,
          firebaseUser: firebaseUserData
        };
      } else {
        throw new Error(response.data.message || 'Backend authentication failed');
      }
    } catch (backendError) {
      console.error('❌ Backend authentication error:', backendError);
      
      // Still return Firebase user data even if backend fails
      const fallbackUserData = {
        id: firebaseUserData.uid,
        uid: firebaseUserData.uid,
        name: firebaseUserData.displayName,
        email: firebaseUserData.email,
        photo: firebaseUserData.photoURL,
        emailVerified: firebaseUserData.emailVerified,
        lastLogin: new Date(),
        loginCount: 1,
        createdAt: new Date(),
        isActive: true,
        isPremium: false,
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
      
      // Store fallback user data
      localStorage.setItem('user', JSON.stringify(fallbackUserData));
      
      return {
        success: true,
        user: fallbackUserData,
        firebaseUser: firebaseUserData,
        warning: 'Backend authentication failed, but Firebase login succeeded'
      };
    }
    
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    
    // Handle specific error codes
    let errorMessage = 'An error occurred during sign-in';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed before completion';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Sign-in popup was blocked by the browser. Please allow popups for this site.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Sign-in was cancelled';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error occurred. Please check your connection';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests. Please try again later';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This user account has been disabled';
        break;
      default:
        errorMessage = error.message || 'An unknown error occurred';
    }
    
    return {
      success: false,
      error: errorMessage,
      errorCode: error.code
    };
  }
};

/**
 * Handle user logout
 * @returns {Promise<Object>} Logout result
 */
export const handleLogout = async () => {
  try {
    console.log('🚪 Signing out user...');
    await signOut(auth);
    console.log('✅ User signed out successfully');
    return {
      success: true,
      message: 'User signed out successfully'
    };
  } catch (error) {
    console.error('❌ Sign out error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign out'
    };
  }
};

/**
 * Get current authenticated user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isUserAuthenticated = () => {
  return !!auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('👤 User is signed in:', user.displayName);
      callback({
        isAuthenticated: true,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        }
      });
    } else {
      console.log('👤 User is signed out');
      callback({
        isAuthenticated: false,
        user: null
      });
    }
  });
};

/**
 * Store user session in localStorage (fallback)
 * @param {Object} user - User information
 */
export const storeUserSession = (user) => {
  try {
    localStorage.setItem('firebaseUser', JSON.stringify(user));
    console.log('💾 User session stored in localStorage');
  } catch (error) {
    console.error('❌ Failed to store user session:', error);
  }
};

/**
 * Retrieve user session from localStorage
 * @returns {Object|null} User information or null
 */
export const getUserSession = () => {
  try {
    const storedUser = localStorage.getItem('firebaseUser');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('❌ Failed to retrieve user session:', error);
    return null;
  }
};

/**
 * Clear user session from localStorage
 */
export const clearUserSession = () => {
  try {
    localStorage.removeItem('firebaseUser');
    console.log('🗑️ User session cleared from localStorage');
  } catch (error) {
    console.error('❌ Failed to clear user session:', error);
  }
};
