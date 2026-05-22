'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText } from '../typography/Typography';
import { ScrollReveal } from '../animations/ScrollReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How does SatikSoul help us build a stronger relationship?',
    answer: 'SatikSoul provides a private, quiet space just for the two of you, away from noisy group chats and algorithm feeds. By prompting you with gentle starters and capturing your daily conversations and voice diaries, it creates a sanctuary that celebrates your bond and helps build a collection of lifelong memories.',
  },
  {
    question: 'What happens when we generate a physical QR keepsake?',
    answer: 'SatikSoul generates a private, beautifully styled memory page that you can access by scanning a printable QR card. You can tape these to the back of polaroid photos, slip them inside handwritten letters, or place them in a wallet. You can also set a passcode (like your anniversary date) so the memory page is shared only between you two.',
  },
  {
    question: 'Can we export our scrapbook data at any time?',
    answer: 'Absolutely. We believe you own your love legacy. You can export your entire memory scrapbook as a structured ZIP file containing high-resolution images, original audio recordings (WAV), and an editorial, beautifully formatted PDF diary.',
  },
  {
    question: 'How does the AI Memory Curator work?',
    answer: 'Our Curator operates as a gentle helper. It checks in periodically with subtle conversation starters, transcribes voice entries, and automatically organizes layout assets. It is designed to encourage communication, not replace it.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" className="bg-bg-lavender">
      <Container className="space-y-6 md:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-widest text-primary-pink uppercase">
              Common Questions
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>
              Frequently asked <GradientText>queries</GradientText>.
            </SectionTitle>
          </ScrollReveal>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="glass-panel gradient-border rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/40 transition-colors"
                  >
                    <span className="font-playfair text-base md:text-lg font-bold text-dark-text">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-pink font-bold text-lg select-none"
                    >
                      ↓
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-4 pb-5 pt-2 md:px-6 md:pb-6 font-sans text-secondary-text text-sm leading-relaxed border-t border-pink-50/20">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </Container>
    </SectionWrapper>
  );
};
