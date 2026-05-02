import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ active, onChange, leftLabel, rightLabel }) => {
  return (
    <div 
      className="flex items-center gap-4 bg-card/50 p-1 rounded-2xl border border-white/5 shadow-inner"
      role="group"
      aria-label="Payment plan selector"
    >
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!active}
        aria-label={`Select ${leftLabel} plan`}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
          !active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-subtext hover:text-text'
        }`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={active}
        aria-label={`Select ${rightLabel} plan`}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
          active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-subtext hover:text-text'
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default ToggleSwitch;
