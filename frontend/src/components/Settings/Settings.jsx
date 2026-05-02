import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Shield, Sliders, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import SecurityCard from './SecurityCard';
import PreferencesCard from './PreferencesCard';
import { auth } from '../../firebase';
import { signOut, updateProfile } from 'firebase/auth';

const SettingsPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileUpdate = async (data) => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Settings
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-4 space-y-2 bg-gray-50/50 dark:bg-gray-800/50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <User className="w-5 h-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Sliders className="w-5 h-5" />
              Preferences
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'security'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Shield className="w-5 h-5" />
              Security
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-6 bg-white dark:bg-gray-800">
            {activeTab === 'profile' && (
              <ProfileCard user={user} onUpdate={handleProfileUpdate} loading={loading} />
            )}
            {activeTab === 'preferences' && (
              <PreferencesCard />
            )}
            {activeTab === 'security' && (
              <SecurityCard user={user} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
