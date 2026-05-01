import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
            Settings
          </h1>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Profile Settings</h3>
              </div>
              <p className="text-sm text-gray-600">Manage your account information and preferences</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <p className="text-sm text-gray-600">Configure email and push notification preferences</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
              </div>
              <p className="text-sm text-gray-600">Manage your privacy settings and security options</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Appearance</h3>
              </div>
              <p className="text-sm text-gray-600">Customize the look and feel of your dashboard</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Language & Region</h3>
              </div>
              <p className="text-sm text-gray-600">Set your language and regional preferences</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Help & Support</h3>
              </div>
              <p className="text-sm text-gray-600">Get help and contact our support team</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
