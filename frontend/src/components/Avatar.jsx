// Avatar Component with Fallback System
import React, { useState } from 'react';
import { getInitials, getAvatarGradient, getNameFromEmail } from '../utils/avatar';

const Avatar = ({ 
  user, 
  size = 'md', 
  className = '', 
  showBorder = true,
  onError 
}) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = user?.photo && !imageError;

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  // Handle image error
  const handleImageError = (e) => {
    setImageError(true);
    if (onError) {
      onError(e);
    }
  };

  // Get user initials
  const initials = getInitials(user);

  // Get background gradient
  const gradientClass = getAvatarGradient(user?.email);

  // Border classes
  const borderClasses = showBorder ? 'border-2 border-white/20' : '';

  if (hasImage) {
    return (
      <img
        src={user.photo}
        alt={getNameFromEmail(user) || user.email}
        className={`${currentSizeClass} ${borderClasses} rounded-full object-cover ${className}`}
        onError={handleImageError}
      />
    );
  }

  return (
    <div
      className={`
        ${currentSizeClass} 
        ${borderClasses} 
        ${gradientClass}
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-semibold 
        flex-shrink-0
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;
