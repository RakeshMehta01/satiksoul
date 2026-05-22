import React from 'react';
import { ScriptText } from '../typography/Typography';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-primary-pink/5 py-10 md:py-24 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-radial from-soft-pink/10 to-transparent blur-[50px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex flex-col md:flex-row items-stretch justify-between gap-12 relative z-10">
        
        {/* Left Column: Brand & Tagline */}
        <div className="flex-1 space-y-6 text-left max-w-sm">
          <a href="#" className="font-playfair text-2xl font-black text-dark-text tracking-tight flex items-center gap-1 select-none">
            Satik<span className="bg-gradient-to-r from-primary-pink to-dark-pink bg-clip-text text-transparent">Soul</span>
          </a>
          <p className="font-sans text-secondary-text text-sm leading-relaxed">
            Turn emotions into timeless memories. The world&apos;s first luxury AI-powered emotional scrapbook and private relationship diary.
          </p>
          <div className="text-xs text-secondary-text/80 pt-4">
            © {new Date().getFullYear()} SatikSoul Inc. All rights reserved. <br />
            Designed to build strong relations and lifelong memories.
          </div>
        </div>

        {/* Right Columns: Links */}
        <div className="flex flex-wrap gap-12 md:gap-20 text-left">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h5 className="font-playfair text-base font-bold text-dark-text">Experience</h5>
            <ul className="space-y-3 font-sans text-sm text-secondary-text">
              <li><a href="#story" className="hover:text-primary-pink transition-colors">Our Story</a></li>
              <li><a href="#features" className="hover:text-primary-pink transition-colors">AI Curator</a></li>
              <li><a href="#timeline" className="hover:text-primary-pink transition-colors">Memory Lane</a></li>
              <li><a href="#pricing" className="hover:text-primary-pink transition-colors">Premium Plans</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h5 className="font-playfair text-base font-bold text-dark-text">Privacy & Trust</h5>
            <ul className="space-y-3 font-sans text-sm text-secondary-text">
              <li><a href="#faq" className="hover:text-primary-pink transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-pink transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-pink transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-pink transition-colors">Data Export</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h5 className="font-playfair text-base font-bold text-dark-text">Whisper</h5>
            <ul className="space-y-3 font-sans text-sm text-secondary-text">
              <li><span className="text-secondary-text">hello@satiksoul.com</span></li>
              <li className="pt-2">
                <ScriptText className="!text-xl select-none">
                  crafted with love
                </ScriptText>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};
