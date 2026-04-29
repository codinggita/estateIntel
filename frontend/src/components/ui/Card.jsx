import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  animate = true,
  ...props 
}) => {
  const baseStyles = 'rounded-3xl transition-all duration-300';
  
  const variants = {
    default: 'bg-card border border-white/5 shadow-premium text-text',
    glass: 'glass shadow-xl text-text',
    outline: 'bg-transparent border-2 border-white/10 text-text',
    primary: 'bg-primary text-white shadow-xl shadow-primary/20',
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      whileHover={animate ? { y: -8, scale: 1.02 } : {}}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
