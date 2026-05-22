import React from 'react';
import { GlowOrbs } from '../background/Background';
import { FloatingParticles, SparkleLayer } from '../effects/Atmosphere';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-20 w-full relative ${className}`}>
      {children}
    </div>
  );
};

export const SectionWrapper: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section
      id={id}
      className={`py-12 md:py-36 relative overflow-hidden w-full ${className}`}
    >
      {children}
    </section>
  );
};

export const GlowSection: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section
      id={id}
      className={`py-12 md:py-36 relative overflow-hidden w-full ${className}`}
    >
      <GlowOrbs />
      <FloatingParticles />
      <SparkleLayer />
      <Container>{children}</Container>
    </section>
  );
};

export const StorySection: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section
      id={id}
      className={`py-12 md:py-40 bg-luxury-radial border-y border-primary-pink/5 relative overflow-hidden w-full ${className}`}
    >
      <FloatingParticles />
      <Container>{children}</Container>
    </section>
  );
};
