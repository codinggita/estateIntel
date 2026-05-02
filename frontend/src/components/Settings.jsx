import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, updateProfile } from '../firebase';
import { useTheme } from '../context/ThemeContext';
import ProfileCard from './Settings/ProfileCard';
import SecurityCard from './Settings/SecurityCard';
import PreferencesCard from './Settings/PreferencesCard';

const Settings = ({ user, onLogout }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user || auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification toast
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Update user profile
  const handleProfileUpdate = async (updates) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user logged in');
      }

      // Validate photo URL length before sending to Firebase
      if (updates.photoURL && updates.photoURL.length > 1000) {
        throw new Error('Profile image is too large. Please choose a smaller image.');
      }

      // Update Firebase profile
      await updateProfile(user, {
        displayName: updates.displayName,
        photoURL: updates.photoURL
      });

      // Update local state
      setCurrentUser(prev => ({
        ...prev,
        displayName: updates.displayName,
        photoURL: updates.photoURL
      }));

      showNotification('Profile updated successfully!');
    } catch (error) {
      logger.error('Error updating profile:', error);
      
      // Provide specific error messages for common issues
      let errorMessage = 'Failed to update profile';
      if (error.message.includes('Photo URL too long') || error.message.includes('invalid-profile-attribute')) {
        errorMessage = 'Profile image is too large. Please choose a smaller image (max 1MB).';
      } else if (error.message.includes('displayName')) {
        errorMessage = 'Display name is invalid. Please use a shorter name.';
      }
      
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      logger.error('Error signing out:', error);
      showNotification('Failed to sign out', 'error');
    }
  };

  // Theme-aware classes
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';
  const sidebarCardClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${textClass}`}>Settings</h1>
              <p className={`${subtextClass} mt-1 sm:mt-2 text-sm sm:text-base`}>Manage your account settings and preferences</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className={`px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg rounded-full ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-500'
                  : 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-400'
              }`}
            >
              <span className="hidden sm:inline">← Go to Dashboard</span>
              <span className="sm:hidden">← Dashboard</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <ProfileCard 
              user={currentUser}
              onUpdate={handleProfileUpdate}
              loading={loading}
            />

            {/* Security Card */}
            <SecurityCard 
              user={currentUser}
              onLogout={handleLogout}
            />

            {/* Preferences Card */}
            <PreferencesCard />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${sidebarCardClass} rounded-xl shadow-sm border p-4 sm:p-6`}>
              <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Quick Actions</h3>
              
              {/* Prominent Rounded Button */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    // Add functionality for a prominent action
                    showNotification('Feature coming soon!', 'success');
                  }}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                  }`}
                >
                  <span className="hidden sm:inline">🚀 Upgrade Account</span>
                  <span className="sm:hidden">🚀 Upgrade</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}>
                  <div className="font-medium">View Profile</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                    See your public profile
                  </div>
                </button>
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}>
                  <div className="font-medium">Download Data</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`}>
                    Get your account data
                  </div>
                </button>
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}>
                  <div className="font-medium">Delete Account</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
                    Permanently delete account
                  </div>
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className={`${sidebarCardClass} rounded-xl shadow-sm border p-6 mt-6`}>
              <h3 className={`text-lg font-semibold ${textClass} mb-4`}>Account Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    User ID
                  </div>
                  <div className={`font-mono ${textClass} break-all`}>
                    {currentUser?.uid}
                  </div>
                </div>
                <div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    Account Type
                  </div>
                  <div className={textClass}>Standard Account</div>
                </div>
                <div>
                  <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                    Member Since
                  </div>
                  <div className={textClass}>
                    {currentUser?.metadata?.creationTime 
                      ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                      : 'Unknown'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
