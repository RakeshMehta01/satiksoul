'use client';

import React from 'react';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { GlowCard, GlassCard } from '../cards/Cards';
import { PrimaryButton, SecondaryButton } from '../buttons/Buttons';
import { ScrollReveal } from '../animations/ScrollReveal';

export const Pricing: React.FC = () => {
  return (
    <SectionWrapper id="pricing" className="bg-white">
      <Container className="space-y-6 md:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-primary-pink uppercase">
              The Spaces
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>
              Choose a home for <br />
              <GradientText>your memories</GradientText>.
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto">
              Start writing down your coffee chats and date nights today. No credit card required to begin your shared room.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Pricing Cards Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          
          {/* Tier 1: Free */}
          <ScrollReveal delay={0.1} className="w-full md:w-[45%]">
            <GlassCard className="flex flex-col justify-between p-5 md:p-8 min-h-[420px] md:min-h-[480px] text-left border-primary-pink/10">
              <div className="space-y-6">
                <div>
                  <h4 className="font-playfair text-xl font-bold text-dark-text">The Safe Room</h4>
                  <p className="font-sans text-xs text-secondary-text mt-1">A quiet corner to start writing down your days.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="font-playfair text-4xl font-extrabold text-dark-text">$0</span>
                  <span className="font-sans text-xs text-secondary-text">/ forever</span>
                </div>

                <div className="border-t border-pink-50/50 my-6" />

                <ul className="space-y-4 font-sans text-sm text-secondary-text">
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> 10 Memory entries per month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> Simple voice transcripts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> Private shared timeline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> 1 Printable QR keepsake
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <SecondaryButton
                  id="pricing-free-cta"
                  className="w-full !py-3 !text-sm cursor-pointer"
                  onClick={() => alert('Welcome to SatikSoul! Opening signup...')}
                >
                  Create Free Room
                </SecondaryButton>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Tier 2: Pro */}
          <ScrollReveal delay={0.25} className="w-full md:w-[50%]">
            <GlowCard className="flex flex-col justify-between p-5 md:p-10 min-h-[460px] md:min-h-[520px] text-left border-primary-pink/30 relative overflow-visible scale-100 md:scale-105 rounded-2xl md:rounded-3xl">
              
              {/* Floating Badge */}
              <div className="absolute top-[-18px] right-6 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-md">
                RECOMMENDED
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-playfair text-2xl font-bold text-dark-text">The Timeless Vault</h4>
                  <p className="font-sans text-xs text-secondary-text mt-1">Unlimited space for your letters, voice diaries, and keepsakes.</p>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="font-playfair text-5xl font-black text-dark-text">$8</span>
                  <span className="font-sans text-sm text-secondary-text">/ month</span>
                </div>

                <div className="border-t border-pink-50/50 my-6" />

                <ul className="space-y-4 font-sans text-sm text-secondary-text">
                  <li className="flex items-center gap-2 font-medium text-dark-text/90">
                    <span className="text-primary-pink">✨</span> Unlimited memory entries & storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> Gentle AI prompts & reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> Sound recording & transcripts
                  </li>
                  <li className="flex items-center gap-2 font-medium text-dark-text/90">
                    <span className="text-primary-pink">✓</span> Unlimited QR keepsakes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary-pink">✓</span> Private page passcode locks
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <PrimaryButton
                  id="pricing-pro-cta"
                  className="w-full !py-3.5 !text-sm cursor-pointer"
                  onClick={() => alert('Starting your shared space setup...')}
                >
                  Unlock Your Vault
                </PrimaryButton>
              </div>
            </GlowCard>
          </ScrollReveal>

        </div>

        {/* Extra text */}
        <div className="text-center pt-6">
          <ScriptText className="rotate-[-2deg]">
            designed to build lifelong memories
          </ScriptText>
        </div>

      </Container>
    </SectionWrapper>
  );
};
