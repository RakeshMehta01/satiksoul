'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, className = '', onClick, id }) => {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`px-6 py-3 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white font-sans font-medium text-sm tracking-wide shadow-luxury cursor-pointer transition-shadow hover:shadow-luxury-hover border border-white/20 relative overflow-hidden group ${className}`}
    >
      {/* Light glow reflection effect */}
      <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      {children}
    </motion.button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ children, className = '', onClick, id }) => {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`px-6 py-3 md:px-8 md:py-4 rounded-full glass-panel gradient-border text-primary-pink font-sans font-medium text-sm tracking-wide cursor-pointer hover:bg-white/90 relative ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const GlowButton: React.FC<ButtonProps> = ({ children, className = '', onClick, id }) => {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-pink text-white font-sans font-semibold text-sm tracking-wide shadow-luxury cursor-pointer relative overflow-visible ${className}`}
    >
      <span className="absolute -inset-1 rounded-full bg-primary-pink/30 blur-md animate-glow-pulse -z-10" />
      {children}
    </motion.button>
  );
};

export const FloatingCTA: React.FC<ButtonProps> = ({ children, className = '', onClick, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 ${className}`}
    >
      <PrimaryButton id={id} onClick={onClick} className="!px-6 !py-3 shadow-2xl flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        {children}
      </PrimaryButton>
    </motion.div>
  );
};
