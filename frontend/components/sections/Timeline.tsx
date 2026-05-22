'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

interface MemoryCardProps {
  date: string;
  title: string;
  body: string;
  gradient: string;
  emoji: string;
  reactions: { e: string; n: number }[];
  tag: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ date, title, body, gradient, emoji, reactions, tag }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="bg-white rounded-2xl border border-pink-100/40 shadow-[0_8px_24px_rgba(255,61,141,0.08)] overflow-hidden cursor-pointer max-w-md w-full text-left"
  >
    {/* Gradient photo */}
    <div className={`${gradient} h-28 flex items-center justify-center relative`}>
      <span className="text-4xl filter drop-shadow">{emoji}</span>
      <span className="absolute top-2 left-3 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] text-white font-semibold uppercase tracking-wider">{tag}</span>
      <span className="absolute top-2 right-3 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] text-white font-semibold">{date}</span>
    </div>

    <div className="p-4 space-y-2">
      <h4 className="font-playfair text-base font-bold text-dark-text">{title}</h4>
      <p className="font-sans text-xs text-secondary-text leading-relaxed">{body}</p>
      <div className="flex items-center gap-1.5 pt-1">
        {reactions.map((r, i) => (
          <span key={i} className="flex items-center gap-0.5 bg-pink-50 rounded-full px-2 py-0.5 text-[11px] text-secondary-text">
            {r.e} <span className="font-semibold ml-0.5">{r.n}</span>
          </span>
        ))}
        <span className="ml-auto text-[10px] text-primary-pink font-semibold uppercase tracking-wider">Memory</span>
      </div>
    </div>
  </motion.div>
);

export const Timeline: React.FC = () => {
  const memories: MemoryCardProps[] = [
    {
      date: 'Oct 14, 2023',
      title: 'The rainy day in Kyoto',
      body: 'We got completely lost. Ended up in a tiny vinyl record store for 3 hours while the rain poured outside.',
      gradient: 'bg-gradient-to-br from-slate-400 via-blue-300 to-indigo-400',
      emoji: '🌧️',
      reactions: [{ e: '❤️', n: 24 }, { e: '🎵', n: 8 }, { e: '😊', n: 16 }],
      tag: 'Trip',
    },
    {
      date: 'Dec 24, 2023',
      title: 'Gingerbread cookie disaster',
      body: 'Burned every batch. Ended up ordering cold pizza and eating it on the living room floor. Laughed until midnight.',
      gradient: 'bg-gradient-to-br from-amber-200 via-orange-300 to-red-300',
      emoji: '🍪',
      reactions: [{ e: '😂', n: 31 }, { e: '❤️', n: 18 }, { e: '🍕', n: 6 }],
      tag: 'Holiday',
    },
    {
      date: 'Feb 14, 2025',
      title: 'First capsule letter unlocked',
      body: 'The letter we wrote to each other on our first week. Reading what we thought of each other was the most beautiful gift.',
      gradient: 'bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-300',
      emoji: '💌',
      reactions: [{ e: '😭', n: 12 }, { e: '❤️', n: 42 }, { e: '✨', n: 9 }],
      tag: 'Anniversary',
    },
    {
      date: 'May 20, 2025',
      title: 'Late-night voice whisper',
      body: 'Recorded on the drive home from the beach. The wind, bad radio, and us singing terribly off-key.',
      gradient: 'bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500',
      emoji: '🌊',
      reactions: [{ e: '🎙️', n: 7 }, { e: '❤️', n: 22 }, { e: '🌙', n: 14 }],
      tag: 'Voice',
    },
  ];

  return (
    <SectionWrapper id="timeline" className="bg-bg-lavender">
      <Container className="space-y-6 md:space-y-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">The Scrapbook</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>Your history, <GradientText>written day by day</GradientText>.</SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              A private, scrolling record of the days you never want to forget. No likes. No feeds. Just your story.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">

          {/* Vertical line: left on mobile, center on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-pink/30 via-pink-300 to-primary-pink/10 md:-translate-x-1/2" />

          <div className="space-y-6 md:space-y-12 relative">
            {memories.map((mem, i) => {
              const isRight = i % 2 === 1;
              return (
                <div key={i} className="flex items-start w-full">

                  {/* Mobile layout: dot left, card offset right */}
                  <div className="md:hidden flex w-full items-start gap-4 pl-4">
                    {/* Node */}
                    <div className="relative shrink-0">
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-primary-pink flex items-center justify-center shadow-md -translate-x-1/2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-primary-pink" />
                      </div>
                    </div>
                    <ScrollReveal delay={i * 0.1} className="flex-1">
                      <MemoryCard {...mem} />
                    </ScrollReveal>
                  </div>

                  {/* Desktop layout: alternating left/right */}
                  <div className="hidden md:flex items-center w-full">
                    {/* Left slot */}
                    <div className="w-[45%] flex justify-end pr-8">
                      {!isRight && (
                        <ScrollReveal delay={i * 0.1}>
                          <MemoryCard {...mem} />
                        </ScrollReveal>
                      )}
                    </div>

                    {/* Center node */}
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white border-2 border-primary-pink flex items-center justify-center shadow-md z-10">
                      <span className="w-3 h-3 rounded-full bg-primary-pink" />
                    </div>

                    {/* Right slot */}
                    <div className="w-[45%] flex justify-start pl-8">
                      {isRight && (
                        <ScrollReveal delay={i * 0.1}>
                          <MemoryCard {...mem} />
                        </ScrollReveal>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-2">
          <ScriptText className="rotate-[-2deg]">designed to keep you closer</ScriptText>
        </div>

      </Container>
    </SectionWrapper>
  );
};
