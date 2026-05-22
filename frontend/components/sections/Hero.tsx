'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, SectionWrapper } from './SectionWrapper';
import { HeroTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { PrimaryButton, SecondaryButton } from '../buttons/Buttons';
import { ScrollReveal } from '../animations/ScrollReveal';
import { FloatingPetals, SparkleLayer } from '../effects/Atmosphere';
import { GlowOrbs } from '../background/Background';

export const Hero: React.FC = () => {
  return (
    <SectionWrapper id="hero" className="pt-20 md:pt-40 pb-10 md:pb-28 bg-luxury-radial flex items-center justify-center relative overflow-hidden">
      <GlowOrbs />
      <FloatingPetals />
      <SparkleLayer />

      <Container className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 z-10 w-full">
        
        {/* Text: always visible */}
        <div className="flex-1 text-left space-y-4 md:space-y-8 max-w-xl w-full">
          {/* Badge */}
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-primary-pink/10 backdrop-blur-md">
              <span className="text-xs">✨</span>
              <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wide text-primary-pink uppercase">
                Memories deserve more than disappearing chats
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.2}>
            <HeroTitle className="font-bold text-dark-text leading-[1.12] tracking-tight">
              Write a love story{' '}
              <GradientText>that never fades</GradientText>.
            </HeroTitle>
          </ScrollReveal>

          {/* Subtitle — shorter on mobile */}
          <ScrollReveal delay={0.35}>
            <LuxuryParagraph className="text-secondary-text text-left">
              A private, quiet space for your relationship. Save late-night texts, voice notes, and little moments before they disappear.
            </LuxuryParagraph>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.5}>
            <div className="space-y-3">
              {/* Mobile: stacked full-width buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <PrimaryButton
                  id="hero-primary"
                  className="w-full sm:w-auto !justify-center"
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Your Safe Room
                </PrimaryButton>
                <SecondaryButton
                  id="hero-secondary"
                  className="w-full sm:w-auto !justify-center"
                  onClick={() => {
                    const el = document.getElementById('story');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Read Our Story
                </SecondaryButton>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary-text/70 pl-1">
                <span>🔒</span>
                <span>End-to-end encrypted. Just for the two of you.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Polaroid: hidden on mobile, visible on lg+ */}
        <div className="hidden lg:flex flex-1 justify-end w-full">
          <ScrollReveal delay={0.3}>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [1.5, 2.5, 1.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white p-4 pb-8 rounded-3xl shadow-luxury border border-pink-100/30 flex flex-col items-center max-w-[380px] w-full"
            >
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative bg-pink-50/20">
                <img src="/images/hero_couple.png" alt="Our captured memory" className="w-full h-full object-cover select-none pointer-events-none" />
              </div>
              <div className="pt-5 pb-1 flex flex-col items-center">
                <ScriptText className="text-3xl rotate-[-2deg]">laughing with you, always</ScriptText>
                <span className="text-[10px] uppercase tracking-widest text-secondary-text/60 mt-1 font-semibold">Oct 2026 • Yosemite</span>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Mobile-only: small floating accent card */}
        <div className="lg:hidden w-full flex justify-center">
          <ScrollReveal delay={0.4}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-pink-100/40 shadow-luxury p-4 flex items-center gap-4 max-w-[320px] w-full">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                <img src="/images/hero_couple.png" alt="Memory" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] font-semibold text-secondary-text uppercase tracking-wider">New memory saved</span>
                </div>
                <p className="font-cursive text-base text-primary-pink leading-tight">laughing with you, always</p>
                <p className="text-[10px] text-secondary-text/60 mt-0.5 uppercase tracking-widest">Oct 2026 • Yosemite</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </Container>
    </SectionWrapper>
  );
};
