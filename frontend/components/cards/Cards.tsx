'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hoverLift, floatPresets } from '../../motion/presets';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-panel gradient-border p-5 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden transition-all ${className}`}
    >
      {children}
    </div>
  );
};

export const FloatingCard: React.FC<CardProps & { delay?: number; duration?: number }> = ({
  children,
  className = '',
  delay = 0,
  duration = 6,
}) => {
  const floatAnim = floatPresets(delay, duration);
  return (
    <motion.div
      variants={floatAnim}
      animate="animate"
      className={`glass-panel gradient-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-luxury relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const GlowCard: React.FC<CardProps> = ({ children, className = '', id }) => {
  return (
    <motion.div
      id={id}
      whileHover={hoverLift}
      className={`glass-panel gradient-border p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-luxury relative group transition-all cursor-pointer ${className}`}
    >
      {/* Background Glow Layer */}
      <span className="absolute inset-0 rounded-3xl bg-radial from-primary-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      {children}
    </motion.div>
  );
};

export const FeatureCard: React.FC<CardProps & { title: string; description: string; visual: React.ReactNode }> = ({
  title,
  description,
  visual,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-panel gradient-border p-5 md:p-10 rounded-2xl md:rounded-[32px] shadow-luxury flex flex-col md:flex-row items-center gap-5 md:gap-12 relative overflow-hidden ${className}`}
    >
      <div className="flex-1 text-left space-y-3 md:space-y-4">
        <h3 className="font-playfair text-xl md:text-3xl font-bold text-dark-text">{title}</h3>
        <p className="font-sans text-secondary-text leading-relaxed text-sm">{description}</p>
      </div>
      <div className="w-full md:w-[220px] lg:w-[260px] h-[130px] md:h-[220px] flex items-center justify-center relative bg-pink-50/20 rounded-2xl overflow-hidden">
        {visual}
      </div>
    </motion.div>
  );
};

export const StoryCard: React.FC<CardProps & { quote: string; author: string }> = ({
  quote,
  author,
  className = '',
}) => {
  return (
    <div className={`glass-panel p-5 md:p-8 rounded-2xl md:rounded-[28px] max-w-lg border-primary-pink/10 relative text-left ${className}`}>
      <span className="absolute top-4 left-6 text-7xl font-playfair text-soft-pink select-none leading-none">“</span>
      <p className="font-sans italic text-secondary-text text-base md:text-lg relative z-10 leading-relaxed pl-6 pt-4">
        {quote}
      </p>
      <div className="mt-4 text-right">
        <span className="font-cursive text-2xl text-primary-pink">— {author}</span>
      </div>
    </div>
  );
};

export const TimelineCard: React.FC<CardProps & { date: string; title: string }> = ({
  date,
  title,
  children,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass-panel gradient-border p-4 md:p-8 rounded-xl md:rounded-2xl shadow-luxury max-w-md w-full relative space-y-2 text-left ${className}`}
    >
      <span className="font-cursive text-xl text-primary-pink font-semibold">{date}</span>
      <h4 className="font-playfair text-xl font-bold text-dark-text">{title}</h4>
      <div className="font-sans text-secondary-text text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
};

export const TestimonialCard: React.FC<CardProps & { quote: string; names: string; date: string; rotation?: number }> = ({
  quote,
  names,
  date,
  rotation = 0,
  className = '',
}) => {
  // Extract initials, e.g. "Aria & Marcus" -> "A&M"
  const initials = names
    .split('&')
    .map(name => name.trim().charAt(0))
    .join('&');

  return (
    <motion.div
      style={{ rotate: rotation }}
      whileHover={{ y: -8, rotate: rotation > 0 ? rotation + 0.5 : rotation - 0.5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 15 }}
      className={`p-5 md:p-8 bg-white border border-pink-100 shadow-[0_12px_24px_-10px_rgba(255,61,141,0.08)] rounded-[20px] max-w-[340px] w-[290px] md:w-auto flex flex-col justify-between text-left cursor-pointer transition-shadow hover:shadow-[0_20px_40px_-8px_rgba(255,61,141,0.12)] ${className}`}
    >
      <div className="space-y-4">
        <p className="font-sans text-dark-text/90 italic leading-relaxed text-sm md:text-base">
          &quot;{quote}&quot;
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-pink-50/50 flex justify-between items-center gap-4">
        <div>
          <h5 className="font-playfair font-bold text-dark-text text-sm md:text-base">{names}</h5>
          <span className="font-cursive text-sm text-primary-pink">Together since {date}</span>
        </div>
        {/* Soft Monogram Avatar */}
        <div className="w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center text-[10px] font-bold text-primary-pink border border-primary-pink/15 shrink-0 select-none">
          {initials}
        </div>
      </div>
    </motion.div>
  );
};
