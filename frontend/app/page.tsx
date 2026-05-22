'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { FutureMessage } from '@/components/sections/FutureMessage';
import { Features } from '@/components/sections/Features';
import { MemoryVault } from '@/components/sections/MemoryVault';
import { Timeline } from '@/components/sections/Timeline';
import { QRSharing } from '@/components/sections/QRSharing';
import { AIAssistant } from '@/components/sections/AIAssistant';
import { LoveLetter } from '@/components/sections/LoveLetter';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/buttons/Buttons';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Story />
        <FutureMessage />      {/* Time Capsule Letters */}
        <Features />
        <MemoryVault />         {/* Memory Vault Gallery */}
        <Timeline />            {/* Couple Timeline — realistic cards */}
        <QRSharing />           {/* QR Love Page — interactive */}
        <AIAssistant />         {/* AI Emotional Curator */}
        <LoveLetter />          {/* Love Letter Generator */}
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />

      <FloatingCTA
        id="floating-cta"
        onClick={() => {
          const el = document.getElementById('pricing');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Lock Memories
      </FloatingCTA>
    </div>
  );
}
