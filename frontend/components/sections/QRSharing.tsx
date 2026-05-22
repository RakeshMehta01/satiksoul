'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph, ScriptText } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

export const QRSharing: React.FC = () => {
  const [scanned, setScanned] = useState(false);

  return (
    <SectionWrapper id="qr-sharing" className="bg-white">
      <Container className="space-y-6 md:space-y-14">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">Physical Anchors</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>A QR code that opens <GradientText>your heart</GradientText>.</SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Attach a SatikSoul card to flowers, letters, or a gift. When they scan it, a private page opens — just for them.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Interactive QR experience */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-sm mx-auto space-y-4">
            <AnimatePresence mode="wait">
              {!scanned ? (
                /* QR Card */
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-pink-100/50 shadow-luxury overflow-hidden"
                >
                  {/* Card header band */}
                  <div className="h-1.5 bg-gradient-to-r from-primary-pink to-dark-pink" />
                  <div className="p-6 space-y-5 text-center">
                    <div className="space-y-1">
                      <span className="text-2xl">💐</span>
                      <p className="font-playfair text-base font-bold text-dark-text">A gift from Marcus</p>
                      <p className="text-xs text-secondary-text">Scan to open your private page</p>
                    </div>

                    {/* QR visual */}
                    <div className="flex justify-center">
                      <div className="w-36 h-36 bg-white border-2 border-pink-100 rounded-2xl p-3 shadow-sm flex items-center justify-center relative">
                        {/* Simulated QR grid */}
                        <div className="grid grid-cols-7 gap-[3px] w-full h-full">
                          {Array.from({ length: 49 }).map((_, i) => {
                            const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48];
                            const solid = corners.includes(i) || (i % 3 === 0 && i > 10 && i < 38);
                            return (
                              <div key={i} className={`rounded-[1px] ${solid ? 'bg-dark-text/85' : 'bg-transparent'}`} />
                            );
                          })}
                        </div>
                        {/* Center heart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-lg p-1.5 shadow-sm">
                            <span className="text-lg">♥</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-secondary-text/60 font-semibold">SatikSoul · Private Page</p>
                      <p className="font-cursive text-primary-pink text-base">for you, always</p>
                    </div>

                    {/* Scan button (demo) */}
                    <button
                      onClick={() => setScanned(true)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-sm font-semibold shadow-luxury cursor-pointer hover:shadow-luxury-hover transition-shadow flex items-center justify-center gap-2"
                    >
                      <span>📱</span> Tap to scan (demo)
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Opened Love Page */
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl border border-pink-100/50 shadow-luxury overflow-hidden"
                >
                  <div className="h-1.5 bg-gradient-to-r from-primary-pink to-dark-pink" />
                  <div className="p-6 space-y-5 text-center">
                    {/* Opened header */}
                    <div className="space-y-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                        className="text-4xl"
                      >
                        💌
                      </motion.div>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-primary-pink font-semibold">A private page opened just for you</p>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-pink-100/40 text-left space-y-3"
                    >
                      <p className="font-cursive text-xl text-primary-pink">My love,</p>
                      <p className="font-sans text-sm text-dark-text/85 leading-relaxed italic">
                        These flowers are for you. But this page — this is the real gift. Everything I&apos;ve wanted to say but couldn&apos;t find the words for.
                      </p>
                      <p className="font-cursive text-lg text-dark-text/90">
                        You are the reason ordinary days feel like adventures.
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-7 h-7 rounded-full bg-primary-pink flex items-center justify-center text-white text-[10px] font-bold">M</div>
                        <div>
                          <p className="text-xs font-semibold text-dark-text">Marcus</p>
                          <p className="text-[10px] text-secondary-text">May 20, 2025</p>
                        </div>
                        <span className="ml-auto text-sm">❤️</span>
                      </div>
                    </motion.div>

                    {/* Photos strip */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2"
                    >
                      {[
                        { g: 'from-teal-200 to-blue-300', e: '🌊' },
                        { g: 'from-amber-200 to-orange-300', e: '☕' },
                        { g: 'from-rose-200 to-pink-300', e: '🌸' },
                      ].map((p, i) => (
                        <div key={i} className={`shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${p.g} flex items-center justify-center text-2xl`}>{p.e}</div>
                      ))}
                    </motion.div>

                    <button
                      onClick={() => setScanned(false)}
                      className="text-xs text-secondary-text hover:text-primary-pink transition-colors cursor-pointer underline underline-offset-2"
                    >
                      ← Back to QR card
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <div className="text-center">
          <ScriptText className="rotate-[1deg]">hold your memories in your hand</ScriptText>
        </div>

      </Container>
    </SectionWrapper>
  );
};
