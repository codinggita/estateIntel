import React from 'react';
import { motion } from 'framer-motion';

export const SectionWrapper = ({ children, className = '', id = '', ...props }) => {
  return (
    <section 
      id={id}
      className={`py-20 md:py-32 px-6 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const Heading = ({ 
  children, 
  subtitle, 
  badge, 
  centered = false, 
  className = '', 
  ...props 
}) => {
  const alignment = centered ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignment} ${className}`} {...props}>
      {badge && (
        <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 px-4 py-1 rounded-full bg-primary/10">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text leading-[1.1]">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-6 text-xl text-subtext max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
