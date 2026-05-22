'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

function useDaysUntil(targetDate: Date) {
  const [days, setDays] = useState(142);
  useEffect(() => {
    const calc = () => setDays(Math.max(0, Math.floor((targetDate.getTime() - Date.now()) / 86400000)));
    calc();
  }, []); // eslint-disable-line
  return days;
}

export const FutureMessage: React.FC = () => {
  const days = useDaysUntil(new Date('2025-10-12'));
  const [unlocked, setUnlocked] = useState(false);

  return (
    <SectionWrapper id="future-message" className="bg-bg-lavender">
      <Container className="space-y-6 md:space-y-14">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">Time Capsule Letters</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>Write today. <GradientText>Read when it matters most.</GradientText></SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Seal letters, voice notes, and photos for a future date — an anniversary, a difficult day, or just because.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Main: Locked Letter Card */}
        <ScrollReveal delay={0.3}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="max-w-sm mx-auto bg-white rounded-3xl border border-pink-100/60 shadow-luxury overflow-hidden"
          >
            {/* Color accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary-pink to-dark-pink" />

            <div className="p-5 space-y-4">
              {/* Card header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-soft-pink flex items-center justify-center text-lg">🔐</div>
                  <div>
                    <p className="font-playfair font-bold text-dark-text text-sm">Sealed Letter</p>
                    <p className="text-[10px] text-secondary-text">Written 6 months ago</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-semibold text-amber-600">Locked</span>
              </div>

              {/* Letter preview with blur */}
              <div className="relative rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100/40 p-4 overflow-hidden min-h-[140px]">
                <p className="font-cursive text-xl text-primary-pink mb-2">To my future wife,</p>
                <div className={`space-y-1.5 transition-all duration-500 ${unlocked ? '' : 'blur-[3.5px] select-none pointer-events-none'}`}>
                  <p className="text-sm text-dark-text/80 leading-relaxed">By the time you read this, we&apos;ll have danced. I wrote this on the night I decided to...</p>
                  <p className="text-sm text-dark-text/80 leading-relaxed">I want you to know that every ordinary Tuesday with you has felt extraordinary to me...</p>
                  <p className="text-sm text-dark-text/80 leading-relaxed">I chose you then. I choose you now. And I&apos;ll choose you every morning after this.</p>
                </div>
                {/* Fade at bottom */}
                {!unlocked && (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-pink-50/90 to-transparent" />
                )}
                {/* Lock overlay button */}
                <AnimatePresence>
                  {!unlocked && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <button
                        onClick={() => setUnlocked(true)}
                        className="bg-white/90 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm border border-pink-100/50 cursor-pointer hover:bg-white transition-colors"
                      >
                        <span>🔒</span>
                        <span className="text-xs font-semibold text-dark-text">Open on wedding morning</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-between bg-gradient-to-r from-primary-pink/5 to-transparent rounded-2xl p-3.5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-secondary-text font-semibold">Unlocks in</p>
                  <p className="font-playfair text-2xl font-black text-dark-text">{days} <span className="text-sm font-normal text-secondary-text">days</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-secondary-text font-semibold">Unlock date</p>
                  <p className="text-sm font-medium text-dark-text">Oct 12, 2025</p>
                </div>
              </div>

              {/* Authors */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-6 h-6 rounded-full bg-soft-pink border border-pink-100 flex items-center justify-center text-[10px] font-bold text-primary-pink">A</div>
                <div className="w-6 h-6 rounded-full bg-primary-pink/10 border border-pink-100 -ml-2 flex items-center justify-center text-[10px] font-bold text-dark-pink">M</div>
                <span className="text-[11px] text-secondary-text ml-1">Ariana wrote this for Marcus</span>
                <span className="ml-auto text-[10px] text-primary-pink font-semibold">♥ Sealed</span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Feature pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            { e: '📅', label: 'Schedule unlock dates', desc: 'Anniversary, birthday, or any day' },
            { e: '🎙️', label: 'Voice + text + photos', desc: 'Every format, beautifully organized' },
            { e: '💌', label: 'Surprise notification', desc: 'They get notified on unlock day' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-panel gradient-border rounded-2xl p-4 text-center space-y-1">
                <span className="text-xl">{item.e}</span>
                <p className="font-playfair text-sm font-bold text-dark-text">{item.label}</p>
                <p className="text-xs text-secondary-text">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
};
