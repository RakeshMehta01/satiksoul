'use client';

import React from 'react';
import { StorySection } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph } from '../typography/Typography';
import { StoryCard } from '../cards/Cards';
import { ScrollReveal } from '../animations/ScrollReveal';

export const Story: React.FC = () => {
  return (
    <StorySection id="story">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 relative">
        
        {/* Text: always visible */}
        <div className="flex-1 space-y-5 md:space-y-8 text-left">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">Our Belief</span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <SectionTitle>
              Some things are too precious{' '}
              <GradientText>to let disappear</GradientText>.
            </SectionTitle>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-4">
              <LuxuryParagraph>
                We send thousands of messages a week. But where do the words that truly matter go? The late-night confession, the reassurance when you were anxious, or the joy of an ordinary Tuesday?
              </LuxuryParagraph>
              <LuxuryParagraph>
                SatikSoul is a digital sanctuary for your relationship — a quiet, shared diary that collects your favorite memories.
              </LuxuryParagraph>
            </div>
          </ScrollReveal>

          {/* Mobile-only: inline quote */}
          <ScrollReveal delay={0.4}>
            <div className="lg:hidden">
              <StoryCard
                quote="We didn't realize we were making memories, we just knew we were having fun."
                author="A.A. Milne"
                className="shadow-luxury"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: desktop-only polaroid + quote */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center gap-10 w-full">
          <div className="bg-white p-4 pb-8 rounded-3xl shadow-luxury border border-pink-100/40 rotate-[-1.5deg] max-w-[360px] w-full">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-pink-50/20">
              <img src="/images/story_polaroid.png" alt="Journaling our thoughts" className="w-full h-full object-cover select-none pointer-events-none" />
            </div>
            <div className="text-center pt-4">
              <span className="font-cursive text-xl text-primary-pink">written by hand, stored in heart</span>
            </div>
          </div>
          <StoryCard
            quote="We didn't realize we were making memories, we just knew we were having fun."
            author="A.A. Milne"
            className="shadow-luxury w-full max-w-md"
          />
        </div>

      </div>
    </StorySection>
  );
};
