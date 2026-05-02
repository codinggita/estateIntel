import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';
  
  const variants = {
    primary: 'bg-primary text-white hover:shadow-lg hover:shadow-primary/20',
    secondary: 'bg-secondary !text-black hover:shadow-lg hover:shadow-secondary/20 transition-colors',
    outline: 'bg-transparent text-text border-2 border-primary/20 hover:border-primary/50',
    ghost: 'bg-transparent text-text hover:bg-white/5',
    accent: 'bg-accent text-white hover:shadow-lg hover:shadow-accent/20',
    white: 'bg-white !text-primary hover:bg-white/90 shadow-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
