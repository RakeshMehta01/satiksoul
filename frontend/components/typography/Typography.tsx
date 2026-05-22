import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const HeroTitle: React.FC<TypographyProps> = ({ children, className = '', id }) => {
  return (
    <h1
      id={id}
      className={`font-playfair text-[34px] sm:text-[40px] md:text-7xl font-extrabold leading-[1.15] tracking-tight text-dark-text ${className}`}
    >
      {children}
    </h1>
  );
};

export const SectionTitle: React.FC<TypographyProps> = ({ children, className = '', id }) => {
  return (
    <h2
      id={id}
      className={`font-playfair text-[26px] sm:text-[30px] md:text-5xl font-bold leading-[1.2] text-dark-text tracking-normal ${className}`}
    >
      {children}
    </h2>
  );
};

export const GradientText: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-gradient-to-r from-primary-pink to-dark-pink bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

export const ScriptText: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`font-cursive text-2xl sm:text-3xl md:text-4xl text-primary-pink select-none ${className}`}
    >
      {children}
    </span>
  );
};

export const LuxuryParagraph: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <p
      className={`font-sans text-sm sm:text-base md:text-lg text-secondary-text leading-relaxed md:leading-[1.9] max-w-[700px] ${className}`}
    >
      {children}
    </p>
  );
};
