import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase';

const SecurityCard = ({ user, onLogout }) => {
  const { theme } = useTheme();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Theme-aware classes
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const labelClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const inputClass = theme === 'dark'
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const buttonClass = theme === 'dark'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';
  const secondaryButtonClass = theme === 'dark'
    ? 'bg-gray-700 hover:bg-gray-600 text-white'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700';

  // Handle password input changes
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password change submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // For email/password users, we would reauthenticate and update password
      // For now, this is a placeholder since Firebase requires additional setup
      console.log('Password change requested');
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      
      alert('Password change functionality would require additional Firebase configuration');
    } catch (error) {
      setError('Failed to change password. Please try again.');
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get authentication provider
  const getAuthProvider = () => {
    if (!user) return 'unknown';
    
    if (user.providerData && user.providerData.length > 0) {
      const provider = user.providerData[0];
      if (provider.providerId === 'google.com') {
        return 'Google';
      } else if (provider.providerId === 'password') {
        return 'Email';
      }
    }
    
    return 'Email';
  };

  const authProvider = getAuthProvider();

  return (
    <div className={`${cardClass} rounded-xl shadow-sm border p-4 sm:p-6`}>
      <div className="mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-semibold ${textClass}`}>Security</h2>
        <p className={`${subtextClass} mt-1 text-sm sm:text-base`}>Manage your account security settings</p>
      </div>

      {/* Authentication Provider */}
      <div className="mb-6">
        <h3 className={`text-lg font-medium ${textClass} mb-3`}>Authentication Method</h3>
        <div className={`flex items-center space-x-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            {authProvider === 'Google' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div>
            <div className={`font-medium ${textClass}`}>{authProvider} Authentication</div>
            <div className={`text-sm ${subtextClass}`}>
              {authProvider === 'Google' 
                ? 'You signed in with your Google account' 
                : 'You signed in with email and password'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Password Change (only for email users) */}
      {authProvider === 'Email' && (
        <div className="mb-6">
          <h3 className={`text-lg font-medium ${textClass} mb-3`}>Password</h3>
          
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
              theme === 'dark'
                ? 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/50'
                : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
            }`}
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className={`block text-sm font-medium ${labelClass} mb-1`}>
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className={`block text-sm font-medium ${labelClass} mb-1`}>
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium ${labelClass} mb-1`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className={`text-sm ${theme === 'dark' ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'} p-3 rounded-lg`}>
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setError('');
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className={`px-4 py-2 text-sm font-medium ${secondaryButtonClass} rounded-lg transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-sm font-medium ${buttonClass} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Account Actions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className={`text-lg font-medium ${textClass} mb-3`}>Account Actions</h3>
        <div className="space-y-3">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-medium">Sign Out</div>
            <div className="text-sm text-gray-500">Sign out of your account on this device</div>
          </button>
          
          <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            <div className="font-medium">Download Your Data</div>
            <div className="text-sm text-yellow-600">Get a copy of your account information</div>
          </button>
          <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}>
            <div className="font-medium">Delete Account</div>
            <div className="text-sm text-red-600">Permanently delete your account and data</div>
          </button>
        </div>
      </div>

      {/* Last Login Info */}
      {user?.metadata?.lastSignInTime && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className={`text-lg font-medium ${textClass} mb-3`}>Session Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Last Sign In:</span>
              <span className={`ml-2 ${textClass}`}>
                {new Date(user.metadata.lastSignInTime).toLocaleString()}
              </span>
            </div>
            <div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Account Created:</span>
              <span className={`ml-2 ${textClass}`}>
                {new Date(user.metadata.creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityCard;
