import { Variants } from 'framer-motion';

// Soft, cinematic transitions
export const transitionWarm = {
  type: 'spring' as const,
  damping: 30,
  stiffness: 70,
  mass: 1,
};

export const transitionDreamy = {
  type: 'spring' as const,
  damping: 24,
  stiffness: 45,
  mass: 0.8,
};

export const transitionSlow = {
  duration: 1.2,
  ease: [0.25, 1, 0.5, 1], // Custom luxury bezier
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionWarm,
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionWarm,
  },
};

export const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(12px)',
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const softScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionDreamy,
  },
};

// Interactive Hover effects
export const hoverLift = {
  y: -8,
  scale: 1.02,
  transition: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
};

export const hoverGlow = {
  boxShadow: '0 0 25px 5px rgba(255, 61, 141, 0.25)',
  y: -2,
  transition: {
    duration: 0.3,
    ease: 'easeInOut' as const,
  },
};

// Custom Floating preset for dynamic floaters (hearts, cards)
export const floatPresets = (delay = 0, duration = 6): Variants => ({
  animate: {
    y: [0, -12, 0],
    rotate: [0, 1.5, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut' as const,
      delay: delay,
    },
  },
});
