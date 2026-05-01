import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-2 border-blue-600 border-t-transparent rounded-full`}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
