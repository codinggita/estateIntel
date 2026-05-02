// Avatar Utility Functions

/**
 * Get proper name from user object, never returns "User"
 * @param {Object} user - User object with displayName or email
 * @returns {string} - Proper user name
 */
export const getNameFromEmail = (user) => {
  if (!user) return 'Guest';
  
  // Try displayName first (but not "User")
  if (user.displayName && user.displayName !== "User") {
    return user.displayName;
  }
  
  // Try fullName field (from backend)
  if (user.fullName && user.fullName !== "User") {
    return user.fullName;
  }
  
  // Try name field
  if (user.name && user.name !== "User") {
    return user.name;
  }
  
  // Generate name from email
  if (user.email) {
    const namePart = user.email.split("@")[0]; // e.g. dhruvi.patel
    const cleanName = namePart
      .replace(/[0-9]/g, "") // Remove numbers
      .replace(/[^a-zA-Z]/g, " ") // Replace non-letters with spaces
      .split(" ")
      .filter(Boolean) // Remove empty strings
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(" ");
    
    return cleanName || "Guest";
  }
  
  return "Guest";
};

/**
 * Get initials from user object
 * @param {Object} user - User object with displayName or email
 * @returns {string} - User initials (max 2 characters)
 */
export const getInitials = (user) => {
  if (!user) return 'G';
  
  // Get proper name first
  const properName = getNameFromEmail(user);
  
  if (properName && properName !== "Guest") {
    const names = properName.split(' ').filter(n => n.length > 0);
    if (names.length >= 2) {
      return names.map(n => n[0]).join('').toUpperCase().slice(0, 2);
    } else {
      return properName.substring(0, 2).toUpperCase();
    }
  }
  
  // Fallback to email
  if (user.email) {
    return user.email[0].toUpperCase();
  }
  
  // Final fallback
  return 'G';
};

/**
 * Generate background color based on user email
 * @param {string} email - User email
 * @returns {string} - CSS class for background color
 */
export const getAvatarColor = (email) => {
  if (!email) return 'bg-gray-500';
  
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-rose-500'
  ];
  
  // Generate consistent index based on email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * Generate gradient background based on user email
 * @param {string} email - User email
 * @returns {string} - CSS gradient class
 */
export const getAvatarGradient = (email) => {
  if (!email) return 'bg-gradient-to-br from-gray-400 to-gray-600';
  
  const gradients = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-red-400 to-red-600',
    'bg-gradient-to-br from-yellow-400 to-yellow-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-indigo-400 to-indigo-600',
    'bg-gradient-to-br from-teal-400 to-teal-600',
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600',
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
    'bg-gradient-to-br from-rose-400 to-rose-600'
  ];
  
  // Generate consistent index based on email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};
