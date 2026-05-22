'use client';

import React from 'react';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { PrimaryButton } from '../buttons/Buttons';
import { FloatingHearts, FloatingParticles } from '../effects/Atmosphere';
import { ScrollReveal } from '../animations/ScrollReveal';

export const CTA: React.FC = () => {
  return (
    <SectionWrapper id="cta" className="bg-luxury-radial py-[76px] md:py-40 text-center relative overflow-hidden border-t border-primary-pink/10">
      
      {/* Dynamic background atmospherics */}
      <FloatingHearts />
      <FloatingParticles />

      <Container className="relative z-10 max-w-3xl mx-auto space-y-5 md:space-y-8">
        
        {/* Sparkle badge */}
        <ScrollReveal delay={0.1}>
          <span className="text-xl">✨ ❤️ ✨</span>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.25}>
          <SectionTitle className="leading-tight">
            Create a safe home <br />
            <GradientText>for your love story</GradientText>.
          </SectionTitle>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.4}>
          <LuxuryParagraph className="mx-auto text-center">
            Start writing today. Save your late-night check-ins, the songs you sent, and the memories you never want to lose. Free forever, no card needed.
          </LuxuryParagraph>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={0.55}>
          <div className="flex justify-center">
            <PrimaryButton
              id="cta-btn"
              className="cursor-pointer"
              onClick={() => alert('Starting account setup...')}
            >
              Start Writing Today, for Free
            </PrimaryButton>
          </div>
        </ScrollReveal>

        {/* Cursive Accent */}
        <ScrollReveal delay={0.7}>
          <div className="pt-4">
            <ScriptText className="rotate-[-1deg]">
              made with tenderness, for you
            </ScriptText>
          </div>
        </ScrollReveal>

      </Container>
    </SectionWrapper>
  );
};
