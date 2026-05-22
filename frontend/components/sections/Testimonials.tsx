'use client';

import React from 'react';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { TestimonialCard } from '../cards/Cards';
import { ScrollReveal } from '../animations/ScrollReveal';

export const Testimonials: React.FC = () => {
  return (
    <SectionWrapper id="testimonials" className="bg-bg-lavender">
      <Container className="space-y-6 md:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-primary-pink uppercase">
              Shared Hearts
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>
              Whispers from <GradientText>real couples</GradientText>.
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Couples around the world use SatikSoul to anchor their love story, ensuring their most precious chats and voicemails don&apos;t get lost in the noise.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Mobile: horizontal scroll carousel. Desktop: Pinterest wrap grid */}
        <div
          id="testimonials-carousel"
          className="flex md:flex-wrap items-stretch md:justify-center gap-5 md:gap-8
            overflow-x-auto md:overflow-x-visible pb-4 md:pb-0
            -mx-4 px-4 md:mx-0 md:px-0
            snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <ScrollReveal delay={0.1} className="snap-center shrink-0 md:shrink">
            <TestimonialCard
              quote="I used to screenshot our texts and forget them in my camera roll. Now, we record a joint voice note every Sunday. It feels like our own private podcast of our life together."
              names="Aria & Marcus"
              date="2021"
              rotation={-1.5}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="snap-center shrink-0 md:shrink">
            <TestimonialCard
              quote="For our anniversary, Liam gifted me a wooden box with a SatikSoul QR card. When I scanned it, I was in tears. It was a beautiful cinematic timeline of our 5 years of dating."
              names="Chloe & Liam"
              date="2019"
              rotation={1.2}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="snap-center shrink-0 md:shrink">
            <TestimonialCard
              quote="It&apos;s so much more than a journal. It feels like a safe, warm space where our relationship can breathe. The AI summaries show us how much we've supported each other."
              names="Elena & Julian"
              date="2023"
              rotation={-0.8}
            />
          </ScrollReveal>
        </div>

        {/* Cursive Accent */}
        <div className="text-center pt-2 md:pt-4">
          <ScriptText className="rotate-[-1deg]">
            love is in the small details
          </ScriptText>
        </div>

      </Container>
    </SectionWrapper>
  );
};
