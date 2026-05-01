import React, { useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../Avatar';

const ProfileCard = ({ user, onUpdate, loading }) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 1MB to avoid Firebase URL length issues)
      if (file.size > 1024 * 1024) {
        alert('Image size should be less than 1MB for Firebase compatibility');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        // Check if the base64 string would be too long for Firebase
        if (dataUrl.length > 1000) {
          alert('Image is too large. Please choose a smaller image (max 1MB)');
          return;
        }
        setPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let photoURL = formData.photoURL;
    
    // If a new image was selected, convert it to base64
    if (selectedFile && preview) {
      photoURL = preview;
    }

    await onUpdate({
      displayName: formData.displayName,
      photoURL: photoURL
    });

    setIsEditing(false);
    setSelectedFile(null);
    setPreview(null);
  };

  // Handle remove photo
  const handleRemovePhoto = () => {
    setPreview(null);
    setSelectedFile(null);
    setFormData(prev => ({
      ...prev,
      photoURL: ''
    }));
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    });
    setIsEditing(false);
    setSelectedFile(null);
    setPreview(null);
  };

  // Get initials for fallback
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${cardClass} rounded-xl shadow-sm border p-4 sm:p-6`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
        <h2 className={`text-lg sm:text-xl font-semibold ${textClass}`}>Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-colors rounded-full ${
              theme === 'dark'
                ? 'text-blue-400 bg-blue-900/30 hover:bg-blue-900/50'
                : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
            }`}
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar 
                user={{ ...user, photoURL: preview || formData.photoURL }}
                size="lg"
                className="w-20 h-20"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <h3 className={`text-sm font-medium ${textClass}`}>Profile Picture</h3>
              <p className={`text-sm ${subtextClass}`}>JPG, PNG or GIF. Max 1MB for Firebase compatibility.</p>
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className={`block text-sm font-medium ${labelClass} mb-2`}>
              Full Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClass}`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className={`block text-sm font-medium ${labelClass} mb-2`}>
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={`w-full px-4 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-50 text-gray-500'}`}
              placeholder="No email available"
            />
            <p className={`text-sm ${subtextClass} mt-1`}>Email cannot be changed</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-4 py-2 text-sm font-medium ${secondaryButtonClass} rounded-lg transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium ${buttonClass} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Profile Display */}
          <div className="flex items-center space-x-6">
            <Avatar user={user} size="lg" className="w-20 h-20" />
            <div>
              <h3 className={`text-lg font-medium ${textClass}`}>
                {user?.displayName || 'No name set'}
              </h3>
              <p className={subtextClass}>{user?.email || 'No email available'}</p>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className={`text-sm font-medium ${subtextClass}`}>Display Name</h4>
              <p className={textClass}>{user?.displayName || 'Not set'}</p>
            </div>
            <div>
              <h4 className={`text-sm font-medium ${subtextClass}`}>Email</h4>
              <p className={textClass}>{user?.email || 'Not available'}</p>
            </div>
            <div>
              <h4 className={`text-sm font-medium ${subtextClass}`}>Account ID</h4>
              <p className={`text-gray-900 font-mono text-sm ${textClass}`}>{user?.uid?.slice(0, 8)}...</p>
            </div>
            <div>
              <h4 className={`text-sm font-medium ${subtextClass}`}>Member Since</h4>
              <p className={textClass}>
                {user?.metadata?.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Unknown'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
