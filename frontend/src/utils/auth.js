// Authentication Utility Functions
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../config/firebase';

/**
 * Sign in with Google using popup
 * @returns {Promise<Object>} User credentials and info
 */
export const signInWithGoogle = async () => {
  try {
    console.log('🔐 Starting Google sign-in...');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Extract user information
    const userInfo = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      accessToken: result.user.accessToken,
      refreshToken: result.user.refreshToken
    };
    
    console.log('✅ Google sign-in successful:', userInfo);
    return {
      success: true,
      user: userInfo
    };
    
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    
    // Handle specific error codes
    let errorMessage = 'An error occurred during sign-in';
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign-in popup was closed before completion';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Sign-in popup was blocked by the browser';
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
 * Sign out current user
 * @returns {Promise<Object>} Sign out result
 */
export const signOutUser = async () => {
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
