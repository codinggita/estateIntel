// Google Authentication Component
import React, { useState, useEffect } from 'react';
import { LogOut, User, Mail, Shield } from 'lucide-react';
import { 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange, 
  storeUserSession, 
  clearUserSession,
  getUserSession 
} from '../../utils/auth';

const GoogleAuth = ({ onAuthSuccess, onAuthError, redirectTo = '/' }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = getUserSession();
    if (storedUser) {
      setUser(storedUser);
      onAuthSuccess?.(storedUser);
    }

    // Listen to auth state changes
    const unsubscribe = onAuthStateChange((authState) => {
      if (authState.isAuthenticated) {
        setUser(authState.user);
        storeUserSession(authState.user);
        onAuthSuccess?.(authState.user);
        setError('');
      } else {
        setUser(null);
        clearUserSession();
        setError('');
      }
    });

    return () => unsubscribe();
  }, [onAuthSuccess]);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        setUser(result.user);
        storeUserSession(result.user);
        onAuthSuccess?.(result.user);
        setError('');
        
        // Redirect after successful login
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Sign-in error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signOutUser();
      
      if (result.success) {
        setUser(null);
        clearUserSession();
        setError('');
        
        // Redirect to home after logout
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to sign out');
      console.error('Sign-out error:', err);
    } finally {
      setLoading(false);
    }
  };

  // If user is authenticated, show user info and logout
  if (user) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {/* User Profile Picture */}
        <div className="relative">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`}
            alt={user.displayName}
            className="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`;
            }}
          />
          {user.emailVerified && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="8" r="2"/>
  <path d="M12 2v2M12 6v2M12 10v2"/>
</svg>
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
            {user.emailVerified && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Verified</span>
            )}
          </div>
          <p className="text-sm text-gray-600 flex items-center space-x-1">
            <Mail size={12} />
            {user.email}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <LogOut size={16} />
          )}
          <span>{loading ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    );
  }

  // If user is not authenticated, show sign-in button
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="w-full max-w-md">
        {/* Authentication Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EstateIntel</h2>
          <p className="text-gray-600">Sign in to access smart property decisions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="8" r="2"/>
  <path d="M12 2v2M12 6v2M12 10v2"/>
</svg>
          )}
          <span className="text-gray-700 font-medium">
            {loading ? 'Signing in...' : 'Continue with Google'}
          </span>
        </button>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
              <Shield size={12} />
              <span>Secure authentication powered by Google</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="8" r="2"/>
  <path d="M12 2v2M12 6v2M12 10v2"/>
</svg>
              <span>Your data is safe and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
