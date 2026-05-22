'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function useClientSideData<T>(factory: () => T[], deps: React.DependencyList = []): T[] {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    setData(factory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return data;
}

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

export const FloatingHearts: React.FC = () => {
  const isMobile = useIsMobile();
  const hearts = useClientSideData(() =>
    Array.from({ length: isMobile ? 2 : 4 }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${20 + Math.random() * 60}%`,
      scale: 0.5 + Math.random() * 0.8,
      delay: Math.random() * 4,
      duration: 8 + Math.random() * 8,
    }))
  );

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          style={{ position: 'absolute', left: heart.left, top: heart.top }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.3, 0.3, 0], y: [0, -40, -80, -120], x: [0, 15, -15, 0], scale: heart.scale }}
          transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: 'easeInOut' }}
          className="w-6 h-6 text-primary-pink/25 fill-primary-pink/10"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      ))}
    </div>
  );
};

export const FloatingParticles: React.FC = () => {
  const isMobile = useIsMobile();
  const particles = useClientSideData(() =>
    Array.from({ length: isMobile ? 4 : 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }))
  );

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ position: 'absolute', left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], x: [0, 20, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          className="rounded-full bg-primary-pink/30 shadow-inner"
        />
      ))}
    </div>
  );
};

export const SparkleLayer: React.FC = () => {
  const isMobile = useIsMobile();
  const sparkles = useClientSideData(() =>
    Array.from({ length: isMobile ? 2 : 5 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      scale: 0.4 + Math.random() * 0.7,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 5,
    }))
  );

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sp) => (
        <motion.svg
          key={sp.id}
          style={{ position: 'absolute', left: sp.left, top: sp.top, transform: `scale(${sp.scale})` }}
          animate={{ opacity: [0, 0.6, 0], scale: [sp.scale * 0.8, sp.scale * 1.2, sp.scale * 0.8], rotate: [0, 90, 180] }}
          transition={{ duration: sp.duration, repeat: Infinity, delay: sp.delay, ease: 'easeInOut' }}
          className="w-5 h-5 text-amber-200/70 fill-amber-100/30"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
        </motion.svg>
      ))}
    </div>
  );
};

export const FloatingPetals: React.FC = () => {
  const isMobile = useIsMobile();
  const petals = useClientSideData(() =>
    Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 14 + Math.random() * 10,
      scale: 0.5 + Math.random() * 0.6,
    }))
  );

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          style={{ position: 'absolute', left: petal.left }}
          initial={{ y: '-10%', opacity: 0 }}
          animate={{ y: ['-10%', '110%'], x: [0, 50, -50, 20], rotate: [0, 180, 360], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'linear' }}
          className="w-4 h-4 bg-gradient-to-tr from-soft-pink to-primary-pink/20 rounded-bl-[10px] rounded-tr-[10px] shadow-sm"
        />
      ))}
    </div>
  );
};
