'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

const moods = ['Missing you', 'I love you because...', 'I am sorry', 'Good morning', 'You are my home'];

const letters: Record<string, string[]> = {
  'Missing you': [
    'Even after all this time,',
    'you still feel like home to me.',
    '',
    'The distance isn\'t in the miles.',
    'It\'s in the quiet hours when',
    'I reach for you and you\'re not there.',
    '',
    'Come back to me soon.',
  ],
  'I love you because...': [
    'Because you laugh at your own jokes',
    'before you finish telling them.',
    '',
    'Because you hold my hand tighter',
    'when you think I\'m nervous.',
    '',
    'Because existing next to you',
    'is the calmest I\'ve ever been.',
  ],
  'I am sorry': [
    'I said words I didn\'t mean,',
    'and held back the ones I did.',
    '',
    'I\'m sorry for the walls I build',
    'when what I really need',
    'is to let you in.',
    '',
    'You deserve more than my silence.',
  ],
  'Good morning': [
    'Good morning, you.',
    '',
    'I woke up thinking about',
    'how lucky I am that out of',
    'all the mornings in the world,',
    'I get to share mine with you.',
    '',
    'Have a day as warm as you are.',
  ],
  'You are my home': [
    'Home isn\'t a place.',
    'I know that now.',
    '',
    'It\'s the particular way',
    'you say my name.',
    '',
    'It\'s everywhere you are.',
    'It\'s you.',
  ],
};

export const LoveLetter: React.FC = () => {
  const [mood, setMood] = useState(moods[0]);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleMood = (m: string) => {
    if (m === mood) return;
    setGenerating(true);
    setSaved(false);
    setTimeout(() => { setMood(m); setGenerating(false); }, 900);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const lines = letters[mood] || letters['Missing you'];

  return (
    <SectionWrapper id="love-letter" className="bg-bg-lavender">
      <Container className="space-y-6 md:space-y-14">

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">Love Letter Generator</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>Words that feel like <GradientText>yours, not AI&apos;s</GradientText>.</SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Tell SatikSoul how you feel. It writes the words that have been living in you — in a voice that sounds like you on your best day.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        <div className="max-w-lg mx-auto space-y-4">

          {/* Mood chips */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2 justify-center">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => handleMood(m)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans border transition-all cursor-pointer ${
                    mood === m
                      ? 'bg-primary-pink text-white border-primary-pink shadow-luxury'
                      : 'bg-white text-secondary-text border-pink-100 hover:border-primary-pink/40'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Letter card */}
          <ScrollReveal delay={0.3}>
            <div className="relative bg-white rounded-3xl border border-pink-100/50 shadow-luxury overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-pink to-dark-pink" />
              <div className="p-6 sm:p-8 min-h-[280px] flex flex-col">

                {/* Decorative quote mark */}
                <span className="absolute top-6 left-6 text-6xl font-playfair text-soft-pink select-none leading-none opacity-60">&ldquo;</span>

                {/* Letter body */}
                <AnimatePresence mode="wait">
                  {generating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-center gap-1.5 pt-8"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
                          className="w-2 h-2 rounded-full bg-primary-pink/50"
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={mood}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 pt-8 pl-4"
                    >
                      {lines.map((line, i) =>
                        line === '' ? (
                          <div key={i} className="h-3" />
                        ) : (
                          <p key={i} className="font-cursive text-lg sm:text-xl text-dark-text/90 leading-snug">{line}</p>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-pink-50">
                  <button
                    onClick={() => handleMood(mood)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-pink-100 text-xs font-semibold text-secondary-text hover:border-primary-pink/40 transition-colors cursor-pointer bg-white"
                  >
                    <span>✨</span> Regenerate
                  </button>
                  <button
                    onClick={handleSave}
                    className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-pink text-white text-xs font-semibold shadow-luxury hover:shadow-luxury-hover transition-shadow cursor-pointer"
                  >
                    {saved ? '✓ Saved to vault' : '💾 Save to Memory'}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </Container>
    </SectionWrapper>
  );
};
