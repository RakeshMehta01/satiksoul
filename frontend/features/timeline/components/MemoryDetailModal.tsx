'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimelineItem } from '@/lib/api/timeline';

interface MemoryDetailModalProps {
  item: TimelineItem | null;
  isOpen: boolean;
  onClose: () => void;
  onReact: (emoji: string) => void;
  currentUserId: string;
}

const EMOJIS = ['💗', '🥺', '😭', '✨', '🫶', '🌙'];

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onReact,
  currentUserId,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!item) return null;

  const nextImage = () => {
    if (item.images.length > 1) {
      setActiveImageIdx((activeImageIdx + 1) % item.images.length);
    }
  };

  const prevImage = () => {
    if (item.images.length > 1) {
      setActiveImageIdx((activeImageIdx - 1 + item.images.length) % item.images.length);
    }
  };

  const getEmojiReactors = (emoji: string) => {
    return item.reactions.filter(r => r.emoji === emoji);
  };

  const hasReacted = (emoji: string) => {
    return item.reactions.some(r => r.userId === currentUserId && r.emoji === emoji);
  };

  const formatReactorsTooltip = (reactors: { userName: string }[]) => {
    if (reactors.length === 0) return '';
    return reactors.map(r => r.userName).join(', ');
  };

  const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[80vh] overflow-hidden rounded-3xl glass-panel shadow-luxury border border-white/50 bg-white/95 flex flex-col md:flex-row"
          >
            {/* Left: Polaroid Carousel */}
            <div className="w-full md:w-1/2 bg-stone-50 border-r border-rose-100/40 p-6 flex flex-col justify-center items-center relative aspect-[4/3] md:aspect-auto">
              <div className="relative w-full max-w-[340px] aspect-[4/5] bg-white border border-stone-200/80 p-3 pb-8 shadow-md rounded-lg flex flex-col justify-between hover:rotate-1 transition-all duration-300">
                {/* Images Container */}
                <div className="relative w-full h-[85%] bg-stone-100 rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${API_HOST}${item.images[activeImageIdx]}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Left / Right arrows for carousel */}
                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/70 hover:bg-white text-stone-700 shadow-sm transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/70 hover:bg-white text-stone-700 shadow-sm transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Polaroid bottom caption */}
                <div className="h-[15%] flex flex-col justify-end items-center pt-2">
                  <span className="font-cursive text-primary-pink text-lg truncate w-full text-center">
                    {item.title}
                  </span>
                  {item.images.length > 1 && (
                    <span className="text-[10px] text-stone-400 mt-0.5">
                      {activeImageIdx + 1} of {item.images.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Scrapbook Diary Story */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between h-[50vh] md:h-auto overflow-y-auto">
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose-50 text-primary-pink border border-rose-100">
                    {item.emotionalTag}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-rose-50 text-secondary-text hover:text-primary-pink transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-bold text-dark-text tracking-wide mb-3">
                  {item.title}
                </h3>

                {/* Date & Poster metadata */}
                <div className="flex flex-wrap gap-4 text-xs text-secondary-text mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-pink/60" />
                    <span>{new Date(item.memoryDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-primary-pink/60" />
                    <span>Posted by {item.createdBy === currentUserId ? 'You' : 'Partner'}</span>
                  </div>
                </div>

                {/* Caption / Content - styled like diary letter */}
                <div className="relative p-5 rounded-2xl bg-amber-50/30 border border-amber-100/50 shadow-sm mb-6">
                  <div className="absolute top-3 right-3 text-2xl opacity-10 pointer-events-none font-serif">“</div>
                  <p className="font-serif text-sm text-dark-text leading-relaxed whitespace-pre-wrap">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom: Emotional Reactions Strip */}
              <div className="border-t border-rose-100/60 pt-4">
                <span className="text-xs font-semibold text-dark-text block mb-3 uppercase tracking-wider">
                  How does it make you feel?
                </span>
                
                <div className="flex gap-2">
                  {EMOJIS.map(emoji => {
                    const reactors = getEmojiReactors(emoji);
                    const count = reactors.length;
                    const active = hasReacted(emoji);
                    const namesList = formatReactorsTooltip(reactors);

                    return (
                      <button
                        key={emoji}
                        onClick={() => onReact(emoji)}
                        title={namesList || `React with ${emoji}`}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                          active
                            ? 'bg-rose-50 border-primary-pink/30 text-primary-pink scale-105 shadow-sm'
                            : 'bg-white border-stone-200/60 hover:border-rose-200 text-stone-600 hover:scale-102'
                        }`}
                      >
                        <span className="text-lg">{emoji}</span>
                        {count > 0 && <span className="text-xs font-semibold">{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
