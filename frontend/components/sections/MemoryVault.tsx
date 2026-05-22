'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

// Gradient photo placeholders — different palettes per memory
const PhotoCard = ({ gradient, emoji, caption, date, reactions }: {
  gradient: string; emoji: string; caption: string; date: string; reactions: { e: string; n: number }[];
}) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-white rounded-2xl overflow-hidden border border-pink-100/40 shadow-[0_8px_24px_rgba(255,61,141,0.07)] cursor-pointer"
  >
    <div className={`${gradient} w-full h-32 sm:h-36 flex items-center justify-center relative`}>
      <span className="text-4xl filter drop-shadow-sm">{emoji}</span>
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full">
        <span className="text-[9px] text-white font-semibold uppercase tracking-wider">{date}</span>
      </div>
    </div>
    <div className="p-3 space-y-2">
      <p className="font-playfair text-sm font-bold text-dark-text">{caption}</p>
      <div className="flex items-center gap-2">
        {reactions.map((r, i) => (
          <span key={i} className="flex items-center gap-0.5 text-[11px] bg-pink-50 rounded-full px-2 py-0.5 text-secondary-text">
            {r.e} <span className="font-semibold">{r.n}</span>
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const VoiceCard = () => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-white rounded-2xl border border-pink-100/40 shadow-[0_8px_24px_rgba(255,61,141,0.07)] p-4 space-y-3 cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-soft-pink flex items-center justify-center text-primary-pink shadow-sm cursor-pointer">▶</div>
      <div className="flex-1">
        <p className="font-sans text-xs font-semibold text-dark-text">voice_rain_march.mp3</p>
        <p className="text-[10px] text-secondary-text">0:38 · Mar 14, 2025</p>
      </div>
    </div>
    {/* Waveform */}
    <div className="flex items-center gap-[3px] h-8 px-1">
      {[3,5,8,6,10,14,10,7,12,9,6,11,8,5,4,7,10,8,6,4,9,12,8,5,3].map((h, i) => (
        <span key={i} className={`rounded-full ${i < 10 ? 'bg-primary-pink' : 'bg-pink-200'}`} style={{ width: 3, height: h * 2 }} />
      ))}
    </div>
    <div className="bg-pink-50/60 rounded-xl p-2.5">
      <p className="text-[11px] italic text-dark-text/80 leading-relaxed font-sans">
        &ldquo;Listen to this rain... isn&apos;t it perfect? I never want to forget how this evening felt.&rdquo;
      </p>
    </div>
  </motion.div>
);

const NoteCard = () => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-[#fffdf9] rounded-2xl border border-amber-100/60 shadow-[0_8px_24px_rgba(255,200,100,0.08)] p-4 space-y-2 cursor-pointer relative"
  >
    <div className="absolute top-3 right-3 w-5 h-5 bg-amber-200/60 rounded-sm rotate-6 opacity-60" />
    <p className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold">Handwritten Note</p>
    <p className="font-cursive text-primary-pink text-lg leading-relaxed">
      You make every ordinary day feel like a little adventure. Thank you for choosing me again today.
    </p>
    <div className="flex items-center justify-between pt-1">
      <span className="text-[10px] text-secondary-text/70">Feb 14, 2025</span>
      <span className="text-xs">💛</span>
    </div>
  </motion.div>
);

const FolderCard = ({ name, count, gradient }: { name: string; count: number; gradient: string }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-white rounded-2xl border border-pink-100/40 shadow-[0_4px_16px_rgba(255,61,141,0.06)] p-4 cursor-pointer flex items-center gap-3"
  >
    <div className={`${gradient} w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0`}>📁</div>
    <div>
      <p className="font-playfair text-sm font-bold text-dark-text">{name}</p>
      <p className="text-[11px] text-secondary-text">{count} memories</p>
    </div>
    <span className="ml-auto text-secondary-text/40 text-xs">›</span>
  </motion.div>
);

export const MemoryVault: React.FC = () => {
  return (
    <SectionWrapper id="memory-vault" className="bg-white">
      <Container className="space-y-6 md:space-y-14">

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">Memory Vault</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>Every moment, <GradientText>beautifully kept</GradientText>.</SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Photos, voice notes, handwritten letters, and folders — all in one private, gorgeous space that&apos;s only yours.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Memory grid */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto space-y-3">
            {/* Row 1: 2 photo cards */}
            <div className="grid grid-cols-2 gap-3">
              <PhotoCard
                gradient="bg-gradient-to-br from-teal-300 via-blue-300 to-cyan-400"
                emoji="🌊"
                caption="Goa trip together"
                date="Jan 2025"
                reactions={[{ e: '❤️', n: 24 }, { e: '🌊', n: 8 }]}
              />
              <PhotoCard
                gradient="bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-300"
                emoji="☕"
                caption="First coffee date"
                date="Oct 2023"
                reactions={[{ e: '🥰', n: 31 }, { e: '☕', n: 12 }]}
              />
            </div>

            {/* Row 2: Voice + Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <VoiceCard />
              <NoteCard />
            </div>

            {/* Row 3: 1 wide photo + 1 photo */}
            <div className="grid grid-cols-2 gap-3">
              <PhotoCard
                gradient="bg-gradient-to-br from-indigo-400 via-purple-400 to-violet-500"
                emoji="✈️"
                caption="Late night airport goodbye"
                date="Mar 2025"
                reactions={[{ e: '😢', n: 5 }, { e: '❤️', n: 18 }]}
              />
              <PhotoCard
                gradient="bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-300"
                emoji="🌸"
                caption="Cherry blossom walk"
                date="Apr 2025"
                reactions={[{ e: '🌸', n: 14 }, { e: '💫', n: 9 }]}
              />
            </div>

            {/* Row 4: Folders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FolderCard name="Summer 2025" count={42} gradient="bg-gradient-to-br from-amber-100 to-orange-100" />
              <FolderCard name="Our First Year" count={127} gradient="bg-gradient-to-br from-pink-100 to-rose-100" />
            </div>
          </div>
        </ScrollReveal>

        <div className="text-center pt-2">
          <ScriptText className="rotate-[-1.5deg]">every little moment, safe forever</ScriptText>
        </div>

      </Container>
    </SectionWrapper>
  );
};
