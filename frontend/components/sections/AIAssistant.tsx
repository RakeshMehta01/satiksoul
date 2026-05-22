'use client';

import React, { useState } from 'react';
import { SectionWrapper, Container } from './SectionWrapper';
import { SectionTitle, GradientText, LuxuryParagraph } from '../typography/Typography';
import { GlassCard } from '../cards/Cards';
import { ScrollReveal } from '../animations/ScrollReveal';

export const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'metrics'>('chat');

  return (
    <SectionWrapper id="assistant" className="bg-bg-pink">
      <Container className="space-y-6 md:space-y-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <ScrollReveal delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-widest text-primary-pink uppercase">The Curator</span>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SectionTitle>
              A quiet helper for <GradientText>your story</GradientText>.
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LuxuryParagraph className="mx-auto text-center">
              Not a generic chatbot. An emotionally intelligent guide — warm, calm, and built only for the two of you.
            </LuxuryParagraph>
          </ScrollReveal>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-12 max-w-5xl mx-auto">

          {/* Left Panel: desktop only */}
          <div className="hidden lg:flex flex-1 flex-col justify-center text-left space-y-6">
            <ScrollReveal delay={0.2}>
              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-dark-text">
                Your private relationship scribe.
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.35}>
              <div className="space-y-4 font-sans text-secondary-text text-sm leading-relaxed">
                <p>SatikSoul doesn&apos;t collect data for ads or build feeds to keep you scrolling. It acts as a gentle observer of your bond.</p>
                <p>It transcribes voice whispers, organizes diary entries, and asks check-in questions when things get quiet — keeping your scrapbooks beautiful for years to come.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <div className="flex items-center gap-3">
                {(['chat', 'metrics'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-primary-pink text-white shadow-md'
                        : 'bg-white text-secondary-text hover:text-primary-pink border border-pink-50'
                    }`}
                  >
                    {tab === 'chat' ? 'Curator' : 'Weekly Insights'}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Panel: Glass Dashboard */}
          <div className="flex-1 flex items-center justify-center w-full">
            <ScrollReveal delay={0.3} className="w-full">
              <GlassCard className="w-full min-h-[300px] md:min-h-[380px] p-4 md:p-6 flex flex-col justify-between shadow-luxury border-primary-pink/5 rounded-2xl">

                {/* Card header */}
                <div className="flex items-center justify-between border-b border-pink-50/50 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
                    <div>
                      <h4 className="font-playfair text-sm font-bold text-dark-text">SatikSoul Curator</h4>
                      <span className="text-[10px] text-secondary-text">Listening to your heart</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-soft-pink text-primary-pink font-semibold uppercase tracking-wider">Private</span>
                </div>

                {/* Chat / Metrics content */}
                <div className="flex-1 py-4 flex flex-col justify-center">
                  {activeTab === 'chat' ? (
                    <div className="space-y-3 text-xs font-sans">
                      {/* Tone badges */}
                      <div className="flex gap-1.5 mb-2">
                        {['Supportive', 'Gentle', 'Healing'].map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-soft-pink text-primary-pink text-[10px] font-semibold">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-primary-pink text-white p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                          I hurt her during our argument. I said things I didn&apos;t mean. I don&apos;t know what to say now.
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary-pink flex items-center justify-center text-white text-[10px] font-bold shrink-0">M</div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-soft-pink flex items-center justify-center text-primary-pink text-[10px] font-bold shrink-0">AI</div>
                        <div className="bg-pink-50/70 p-2.5 rounded-2xl rounded-tl-sm text-secondary-text max-w-[85%] leading-relaxed space-y-1">
                          <p>Start small. Don&apos;t open with an explanation.</p>
                          <p>Just say: <em className="text-dark-text not-italic font-medium">&ldquo;I&apos;m sorry. What I said wasn&apos;t fair. You didn&apos;t deserve that.&rdquo;</em></p>
                          <p className="text-secondary-text/70">Don&apos;t defend yourself first. Be present before you&apos;re right.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-primary-pink text-white p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed">
                          What if she&apos;s not ready to talk yet?
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary-pink flex items-center justify-center text-white text-[10px] font-bold shrink-0">M</div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-soft-pink flex items-center justify-center text-primary-pink text-[10px] font-bold shrink-0">AI</div>
                        <div className="bg-pink-50/70 p-2.5 rounded-2xl rounded-tl-sm text-secondary-text max-w-[85%] leading-relaxed space-y-1">
                          <p>That&apos;s okay. Being there without pressure <em className="text-dark-text not-italic font-medium">is</em> love.</p>
                          <p className="text-secondary-text/70">Leave a note. Make her tea. Let your actions carry what words can&apos;t yet.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left">
                      <h5 className="font-playfair text-sm font-bold text-dark-text uppercase tracking-wider">Weekly Highlight Index</h5>
                      {[
                        { label: 'Warmth & Joy', pct: 94 },
                        { label: 'Reassurance & Peace', pct: 88 },
                        { label: 'Looking Back', pct: 76 },
                      ].map(({ label, pct }) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-secondary-text">
                            <span>{label}</span>
                            <span className="text-primary-pink">{pct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-pink-100/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary-pink to-dark-pink rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ))}
                      <p className="text-[11px] text-secondary-text italic pt-1">
                        Private insights to help you see the beautiful rhythm of your days together.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-pink-50/50 pt-3 text-center">
                  <span className="font-cursive text-base text-primary-pink">&quot;designed just for the two of you&quot;</span>
                </div>

              </GlassCard>
            </ScrollReveal>
          </div>

        </div>
      </Container>
    </SectionWrapper>
  );
};
