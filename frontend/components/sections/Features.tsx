'use client';

import React from 'react';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph } from '../typography/Typography';
import { FeatureCard } from '../cards/Cards';
import { ScrollReveal, StaggerContainer } from '../animations/ScrollReveal';

// Product UI Previews
const FutureCapsuleMockup = () => (
  <div className="w-[85%] max-w-[240px] p-4 bg-white/95 rounded-2xl border border-pink-100 shadow-[0_8px_20px_rgba(255,100,150,0.06)] space-y-3 text-left">
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-wider text-primary-pink font-bold bg-soft-pink px-2 py-0.5 rounded-full">Capsule</span>
      <span className="text-xs text-secondary-text">🔒 Locked</span>
    </div>
    <div>
      <h5 className="font-playfair text-sm font-bold text-dark-text">Our 5th Anniversary Letter</h5>
      <p className="text-[10px] text-secondary-text mt-0.5">Written on our first date</p>
    </div>
    <div className="border-t border-pink-50/50 pt-2 flex items-center justify-between">
      <span className="text-[10px] text-secondary-text font-semibold">Opens Oct 12, 2028</span>
      <span className="text-[10px] font-mono text-primary-pink">2 years left</span>
    </div>
  </div>
);

const VoiceWhisperMockup = () => (
  <div className="w-[90%] max-w-[250px] p-4 bg-white/95 rounded-2xl border border-pink-100 shadow-[0_8px_20px_rgba(255,100,150,0.06)] space-y-3 text-left">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-soft-pink flex items-center justify-center text-primary-pink text-xs cursor-pointer shadow-sm hover:scale-105 transition-transform pl-0.5">
        ▶
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-[10px] text-secondary-text font-semibold">
          <span>voice_whisper_03.mp3</span>
          <span>0:42</span>
        </div>
        {/* Waveform visualizer */}
        <div className="flex items-center gap-0.5 h-6">
          <span className="w-1 h-3 bg-primary-pink/30 rounded-full" />
          <span className="w-1 h-4 bg-primary-pink/50 rounded-full" />
          <span className="w-1 h-5 bg-primary-pink rounded-full" />
          <span className="w-1 h-3 bg-primary-pink rounded-full" />
          <span className="w-1 h-5 bg-primary-pink rounded-full" />
          <span className="w-1 h-6 bg-primary-pink rounded-full animate-pulse" />
          <span className="w-1 h-4 bg-primary-pink rounded-full" />
          <span className="w-1 h-5 bg-primary-pink/80 rounded-full" />
          <span className="w-1 h-3 bg-primary-pink/50 rounded-full" />
          <span className="w-1 h-2 bg-primary-pink/30 rounded-full" />
        </div>
      </div>
    </div>
    <div className="bg-pink-50/40 p-2.5 rounded-lg border border-pink-100/30 text-[10.5px] italic text-dark-text/90 leading-relaxed font-sans">
      &quot;...your laugh when the leaf fell. I want to remember this forever.&quot;
    </div>
  </div>
);

const PasscodeMockup = () => (
  <div className="w-[85%] max-w-[240px] p-4 bg-white/95 rounded-2xl border border-pink-100 shadow-[0_8px_20px_rgba(255,100,150,0.06)] space-y-3 text-center">
    <div className="text-xl">🗝️</div>
    <div className="space-y-0.5">
      <h5 className="font-playfair text-xs font-bold text-dark-text">Private Memory Room</h5>
      <p className="text-[9px] text-secondary-text">Enter anniversary code to open</p>
    </div>
    <div className="flex justify-center gap-2 py-1">
      <span className="w-2 h-2 rounded-full bg-primary-pink shadow-sm animate-pulse" />
      <span className="w-2 h-2 rounded-full bg-primary-pink shadow-sm animate-pulse" />
      <span className="w-2 h-2 rounded-full bg-pink-100 border border-pink-200" />
      <span className="w-2 h-2 rounded-full bg-pink-100 border border-pink-200" />
    </div>
    <div className="grid grid-cols-3 gap-1.5 text-[8px] font-bold text-secondary-text font-mono max-w-[120px] mx-auto pt-1">
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">1</span>
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">2</span>
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">3</span>
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">4</span>
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">5</span>
      <span className="p-1 bg-pink-50/45 rounded hover:bg-soft-pink cursor-pointer">6</span>
    </div>
  </div>
);

export const Features: React.FC = () => {
  return (
    <SectionWrapper id="features" className="bg-white">
      <Container className="space-y-10 md:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-primary-pink uppercase">
              How it feels
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>
              Built to capture <GradientText>every little detail</GradientText>.
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              A private, beautiful scrapbook that gives your memories the weight they deserve.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Feature Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 gap-5 md:gap-8 max-w-4xl mx-auto">
          
          <ScrollReveal delay={0.1}>
            <FeatureCard
              title="Write letters for the future"
              description="Lock letters, photos & voice notes for a special date. A warm surprise delivered exactly when they need it."
              visual={<FutureCapsuleMockup />}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <FeatureCard
              title="Save the sound of their voice"
              description="Record voice diaries and shared laughter. SatikSoul transcribes your words and keeps them beautifully organized for years to come."
              visual={<VoiceWhisperMockup />}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <FeatureCard
              title="Private shared rooms"
              description="Scan QR cards to open your private journal room. Protect it with a shared passcode — like your anniversary date — just for the two of you."
              visual={<PasscodeMockup />}
            />
          </ScrollReveal>

        </StaggerContainer>
 
      </Container>
    </SectionWrapper>
  );
};
