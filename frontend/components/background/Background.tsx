'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export const GlowOrbs: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Static orbs on mobile - no animation to save GPU
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[10%] w-[200px] h-[200px] rounded-full bg-radial from-primary-pink/10 to-transparent blur-[60px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[220px] h-[220px] rounded-full bg-radial from-glow-pink/12 to-transparent blur-[65px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Pink Glowing Orb */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-radial from-primary-pink/15 to-transparent blur-[60px] md:blur-[100px]"
      />
      {/* Lavender Glowing Orb */}
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] right-[-10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] rounded-full bg-radial from-glow-pink/20 to-transparent blur-[65px] md:blur-[110px]"
      />
      {/* Soft Yellow/Gold Highlight */}
      <motion.div
        animate={{ x: [0, 20, -10, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[35%] right-[20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-radial from-amber-100/10 to-transparent blur-[80px]"
      />
    </div>
  );
};

export const GradientBlobs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Light Luxury Pink Radial Base */}
      <div className="absolute top-0 left-0 w-full h-[150vh] bg-luxury-radial" />
      <div className="absolute bottom-0 right-0 w-full h-[150vh] bg-lavender-radial" />
    </div>
  );
};

export const NoiseTexture: React.FC = () => {
  return <div className="noise-texture" />;
};
