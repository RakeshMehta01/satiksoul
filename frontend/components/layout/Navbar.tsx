'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrimaryButton } from '../buttons/Buttons';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#story', label: 'Our Story' },
    { href: '#features', label: 'AI Features' },
    { href: '#timeline', label: 'Memory Paths' },
    { href: '#assistant', label: 'AI Curator' },
    { href: '#pricing', label: 'Pricing' },
  ];

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] md:h-[82px] flex items-center transition-all duration-300 ${
          isScrolled || menuOpen
            ? 'glass-panel border-b border-primary-pink/10 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 w-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-playfair text-xl md:text-2xl font-black text-dark-text tracking-tight flex items-center gap-1 select-none">
            Satik<span className="bg-gradient-to-r from-primary-pink to-dark-pink bg-clip-text text-transparent">Soul</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-secondary-text hover:text-primary-pink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA + mobile menu toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <PrimaryButton
                id="nav-cta"
                className="!px-6 !py-2.5 !text-sm"
                onClick={() => handleNavClick('#cta')}
              >
                Start Diary
              </PrimaryButton>
            </div>

            {/* Mobile CTA (compact) */}
            <a
              href="#pricing"
              onClick={(e) => { e.preventDefault(); handleNavClick('#pricing'); }}
              className="md:hidden px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white font-sans font-medium text-xs tracking-wide shadow-luxury"
            >
              Start Free
            </a>

            {/* Hamburger toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-dark-text rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[2px] bg-dark-text rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-dark-text rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-[68px] left-0 right-0 z-40 glass-panel border-b border-primary-pink/10 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 px-2 font-sans text-base font-medium text-dark-text hover:text-primary-pink transition-colors border-b border-pink-50/60 last:border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4">
                <PrimaryButton
                  id="mobile-nav-cta"
                  className="w-full !py-3 !text-sm"
                  onClick={() => handleNavClick('#pricing')}
                >
                  Start Your Diary — Free
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
