'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { Plus, Image as ImageIcon, Calendar, Volume2, Play, Pause, Compass, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineApi, TimelineItem } from '@/lib/api/timeline';
import { relationshipApi, Relationship } from '@/lib/api/relationship';
import { CreateMemoryModal } from '@/features/timeline/components/CreateMemoryModal';
import { MemoryDetailModal } from '@/features/timeline/components/MemoryDetailModal';

const TAG_COLOR_MAP: Record<string, string> = {
  Happy: 'bg-amber-50 text-amber-800 border-amber-200',
  Romantic: 'bg-rose-50 text-rose-800 border-rose-200',
  'Missing You': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  Milestone: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  Adventure: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Anniversary: 'bg-purple-50 text-purple-800 border-purple-200',
};

const EMOTIONAL_TAG_EMOJIS: Record<string, string> = {
  Happy: '😊',
  Romantic: '💖',
  'Missing You': '🥺',
  Milestone: '✨',
  Adventure: '🌊',
  Anniversary: '🎁',
};

interface FloatingReact {
  id: number;
  emoji: string;
  x: number;
}

export default function TimelinePage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const currentUserId = user?.id || '';

  const [items, setItems] = useState<TimelineItem[]>([]);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  // Voice player simulations
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Interactive floating reactions
  const [floatingReacts, setFloatingReacts] = useState<FloatingReact[]>([]);

  const fetchTimeline = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) throw new Error('Unauthenticated');
      const data = await timelineApi.getAll(token);
      setItems(data);
    } catch (err: unknown) {
      console.error('Error fetching timeline:', err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Unable to load timeline. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const fetchRelationship = useCallback(async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await relationshipApi.getMine(token);
        setRelationship(data);
      }
    } catch (err) {
      console.error('Error fetching relationship in timeline:', err);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchTimeline();
      fetchRelationship();
    }
  }, [user, fetchTimeline, fetchRelationship]);

  const triggerFloatingReact = (emoji: string) => {
    const id = Date.now() + Math.random();
    const newReact = { id, emoji, x: Math.random() * 160 - 80 };
    setFloatingReacts(prev => [...prev, newReact]);
    setTimeout(() => {
      setFloatingReacts(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  const handleReact = async (itemId: string, emoji: string) => {
    try {
      const token = await getToken();
      if (!token) return;
      const updatedItem = await timelineApi.toggleReaction(itemId, emoji, token);
      
      // Spawn bubble animation
      triggerFloatingReact(emoji);

      setItems(prev => prev.map(item => item._id === itemId ? updatedItem : item));
      if (selectedItem && selectedItem._id === itemId) {
        setSelectedItem(updatedItem);
      }
    } catch (err) {
      console.error('Failed to react:', err);
    }
  };

  const getDaysTogether = () => {
    if (!relationship) return null;
    const startDate = relationship.anniversaryDate
      ? new Date(relationship.anniversaryDate)
      : new Date(relationship.createdAt);
    const diff = new Date().getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getOnThisDayMemory = () => {
    const today = new Date();
    return items.find(item => {
      const d = new Date(item.memoryDate);
      return d.getMonth() === today.getMonth() &&
             d.getDate() === today.getDate() &&
             d.getFullYear() < today.getFullYear();
    });
  };

  const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';
  const daysTogether = getDaysTogether();
  const onThisDay = getOnThisDayMemory();

  // Custom Scrapbook layout selector based on tags and title content
  const getCardLayout = (item: TimelineItem) => {
    const titleLower = item.title.toLowerCase();
    const captionLower = item.caption.toLowerCase();

    const isMilestone = item.emotionalTag === 'Milestone' || item.emotionalTag === 'Anniversary' || titleLower.includes('engagement') || titleLower.includes('anniversary') || titleLower.includes('proposal') || titleLower.includes('ring');
    const isPostcard = item.emotionalTag === 'Adventure' || titleLower.includes('trip') || titleLower.includes('travel') || titleLower.includes('flight') || titleLower.includes('beach') || titleLower.includes('goa') || titleLower.includes('vacation');
    const isCassette = titleLower.includes('voice') || titleLower.includes('cassette') || titleLower.includes('audio') || titleLower.includes('song') || titleLower.includes('sing') || captionLower.includes('voice note') || captionLower.includes('recorded');
    const isDiary = item.emotionalTag === 'Happy' || item.emotionalTag === 'Missing You';

    if (isMilestone) return 'milestone';
    if (isCassette) return 'cassette';
    if (isPostcard) return 'postcard';
    if (isDiary) return 'diary';
    return 'polaroid';
  };

  return (
    <div className="min-h-screen pb-24 relative bg-[radial-gradient(circle_at_top_left,#fffdf9_0%,#fff5f6_45%,#fffdfb_100%)] overflow-hidden">
      {/* Film grain and noise effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff69b4_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

      {/* Floating Sparkles & Light Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-soft-pink/30 blur-[100px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-rose-100/40 blur-[80px] pointer-events-none -z-10 animate-float" />

      {/* Main Header */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-cursive text-primary-pink text-3xl block mb-1">Our Private Scrapbook</span>
          <h1 className="font-playfair text-4xl font-extrabold text-dark-text tracking-wide flex items-center gap-2.5">
            Cinematic Journey
            {daysTogether && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-primary-pink border border-rose-100 font-sans tracking-normal select-none">
                {daysTogether} Days Together 💗
              </span>
            )}
          </h1>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white shadow-luxury hover:shadow-luxury-hover font-semibold transition-all duration-300 hover:scale-102 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>New Memory</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* On This Day Nostalgia Banner */}
        {onThisDay && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-3xl bg-[rgb(253,248,242)] border-2 border-dashed border-rose-200/60 shadow-glass flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:border-primary-pink/30 transition-all duration-300"
            onClick={() => {
              setSelectedItem(onThisDay);
              setDetailOpen(true);
            }}
          >
            <div className="relative w-28 aspect-[4/5] bg-white border border-stone-200 p-2 pb-5 rounded shadow-sm rotate-[-4deg] shrink-0">
              <div className="w-full h-[85%] bg-stone-100 rounded overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${API_HOST}${onThisDay.images[0]}`} alt={onThisDay.title} className="w-full h-full object-cover" />
              </div>
              <span className="font-cursive text-[9px] text-primary-pink text-center block pt-1 truncate">Flashback</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 fill-current" /> On This Day
              </span>
              <h4 className="font-playfair text-xl font-bold text-dark-text">{onThisDay.title}</h4>
              <p className="font-serif text-sm text-secondary-text mt-1.5 line-clamp-2 italic leading-relaxed">
                “{onThisDay.caption}”
              </p>
              <span className="text-[11px] text-primary-pink font-semibold block mt-3">
                Relive this memory from {new Date().getFullYear() - new Date(onThisDay.memoryDate).getFullYear()} years ago 💗
              </span>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-primary-pink/20 border-t-primary-pink rounded-full animate-spin" />
            <p className="text-secondary-text font-serif italic text-sm">Turning the scrapbook pages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button onClick={fetchTimeline} className="px-5 py-2.5 rounded-xl bg-white border border-rose-100 text-primary-pink hover:bg-rose-50 transition-all duration-200">
              Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl glass-panel border border-white/50 bg-white/70 max-w-lg mx-auto shadow-luxury mt-8"
          >
            <div className="p-4 rounded-full bg-rose-50 text-primary-pink mb-6">
              <ImageIcon className="w-10 h-10" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-dark-text mb-2">Your story starts here 💗</h2>
            <p className="text-sm text-secondary-text max-w-sm mb-8 leading-relaxed">
              Every coffee date, late night call, and trip away is a treasure. Open your scrapbooking space and pin your very first memory.
            </p>
            <button
              onClick={() => setCreateOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white font-semibold shadow-luxury hover:scale-103 cursor-pointer transition-all duration-200"
            >
              Add Your First Memory
            </button>
          </motion.div>
        ) : (
          /* Scrapbook Timeline */
          <div className="relative mt-8 pl-6 md:pl-0">
            {/* Soft decorative string spine */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-rose-200/50 via-primary-pink/30 to-rose-200/20 -translate-x-1/2 pointer-events-none" />

            <div className="space-y-20">
              {items.map((item, index) => {
                const isEven = index % 2 === 0;
                const cardLayout = getCardLayout(item);
                const rotation = index % 3 === 0 ? '-rotate-1.5' : index % 3 === 1 ? 'rotate-1' : 'rotate-2';

                // Display dynamic year/month separators
                const itemDate = new Date(item.memoryDate);
                const prevItem = index > 0 ? items[index - 1] : null;
                const prevDate = prevItem ? new Date(prevItem.memoryDate) : null;
                const showYearSeparator = !prevDate || itemDate.getFullYear() !== prevDate.getFullYear();
                const showMonthSeparator = !prevDate || itemDate.getMonth() !== prevDate.getMonth();

                return (
                  <div key={item._id} className="space-y-8">
                    {/* Time Separators */}
                    {showYearSeparator && (
                      <div className="flex justify-center my-12 pointer-events-none select-none">
                        <span className="font-playfair text-3xl font-extrabold px-6 py-2 rounded-2xl bg-white border border-rose-100 text-primary-pink shadow-glass">
                          {itemDate.getFullYear()}
                        </span>
                      </div>
                    )}
                    {showMonthSeparator && !showYearSeparator && (
                      <div className="flex justify-start md:justify-center pl-8 md:pl-0 my-6 pointer-events-none select-none">
                        <span className="font-cursive text-2xl text-rose-400">
                          {itemDate.toLocaleString('en-US', { month: 'long' })}
                        </span>
                      </div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                      className={`flex flex-col md:flex-row items-start ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } relative`}
                    >
                      {/* Anchor pin on spine */}
                      <div className="absolute left-[20px] md:left-1/2 top-10 w-4 h-4 rounded-full border-[3px] border-white bg-primary-pink shadow-sm -translate-x-1/2 z-10" />

                      <div className="w-full md:w-1/2 px-2 md:px-8">
                        {/* 1. MILESTONE LAYOUT (Highlight style) */}
                        {cardLayout === 'milestone' && (
                          <motion.div
                            whileHover={{ scale: 1.025, rotate: 0 }}
                            className="bg-[radial-gradient(circle_at_top_left,#fffdfb_0%,#fffafb_100%)] border-2 border-rose-200 p-6 rounded-3xl shadow-[0_15px_45px_rgba(255,61,141,0.08)] relative cursor-pointer group"
                            onClick={() => {
                              setSelectedItem(item);
                              setDetailOpen(true);
                            }}
                          >
                            {/* Tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6.5 bg-rose-50/90 border border-rose-100 shadow-xs rotate-[-1deg] pointer-events-none" />
                            
                            {/* Sparkle decorative */}
                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center border border-yellow-200 text-xs animate-pulse select-none">✨</div>

                            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-rose-50 border border-rose-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`${API_HOST}${item.images[0]}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              <div className="absolute bottom-4 left-4 z-10">
                                <span className="text-[10px] font-bold tracking-wider text-rose-200 uppercase">Special Milestone</span>
                                <h3 className="font-playfair text-xl font-extrabold text-white mt-0.5">{item.title}</h3>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="font-serif text-sm text-dark-text italic leading-relaxed line-clamp-3">
                                “{item.caption}”
                              </p>
                              
                              <div className="mt-4 pt-3 border-t border-rose-100/50 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-1.5 text-secondary-text">
                                  <Calendar className="w-3.5 h-3.5 text-primary-pink" />
                                  <span>{itemDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                                </div>
                                <span className="font-cursive text-primary-pink text-base font-semibold">Anniversary Vibe</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* 2. POSTCARD LAYOUT */}
                        {cardLayout === 'postcard' && (
                          <motion.div
                            whileHover={{ scale: 1.02, rotate: 0 }}
                            className={`bg-[rgb(249,245,238)] border border-stone-300 p-5 rounded-2xl shadow-luxury relative cursor-pointer transform ${rotation} flex flex-col gap-4`}
                            onClick={() => {
                              setSelectedItem(item);
                              setDetailOpen(true);
                            }}
                          >
                            <div className="absolute top-3 right-4 w-9 h-11 bg-stone-100 border border-stone-400 p-1 flex items-center justify-center text-[10px] select-none rounded rotate-3 shadow-xs">
                              ✈️
                            </div>

                            <div className="w-full aspect-[4/3] rounded overflow-hidden border border-stone-200 bg-stone-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`${API_HOST}${item.images[0]}`} alt={item.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="border-t-2 border-dotted border-stone-300 pt-3">
                              <span className="font-cursive text-primary-pink text-lg block leading-none">{item.title}</span>
                              <p className="font-serif text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                                {item.caption}
                              </p>
                              <div className="mt-3 flex items-center justify-between text-[10px] text-stone-400 font-sans">
                                <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-emerald-500" /> Adventure Tag</span>
                                <span>{itemDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* 3. CASSETTE / VOICE NOTE MEMORY */}
                        {cardLayout === 'cassette' && (
                          <motion.div
                            whileHover={{ scale: 1.025, rotate: 0 }}
                            className="bg-stone-900 text-stone-100 p-5 rounded-2xl shadow-2xl relative cursor-pointer overflow-hidden border border-stone-800"
                            onClick={() => {
                              setSelectedItem(item);
                              setDetailOpen(true);
                            }}
                          >
                            {/* Retro Cassette tape design wrapper */}
                            <div className="relative w-full aspect-[16/10] bg-rose-950/40 rounded-xl p-3 border-2 border-stone-700 flex flex-col justify-between">
                              <div className="flex justify-between items-center text-[8px] tracking-wider text-rose-400 uppercase font-mono">
                                <span>SatikSoul Tape 60</span>
                                <span>A SIDE</span>
                              </div>

                              {/* Reels spinning simulation */}
                              <div className="flex justify-center items-center gap-8 py-2">
                                <div className={`w-8 h-8 rounded-full border-4 border-dotted border-stone-600 flex items-center justify-center ${playingId === item._id ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                                  <div className="w-3.5 h-3.5 bg-stone-900 rounded-full" />
                                </div>
                                <div className={`w-8 h-8 rounded-full border-4 border-dotted border-stone-600 flex items-center justify-center ${playingId === item._id ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                                  <div className="w-3.5 h-3.5 bg-stone-900 rounded-full" />
                                </div>
                              </div>

                              {/* Cassette label text */}
                              <div className="bg-white text-stone-900 text-center py-1.5 rounded font-cursive text-sm truncate px-3 border border-stone-300">
                                📼 {item.title}
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1.5">
                                  <Volume2 className="w-3.5 h-3.5 text-primary-pink" /> Voice Diary
                                </span>
                                
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPlayingId(playingId === item._id ? null : item._id);
                                  }}
                                  className="p-2 rounded-full bg-primary-pink hover:bg-dark-pink text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
                                >
                                  {playingId === item._id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                </button>
                              </div>

                              {/* Waveform graphic */}
                              <div className="flex items-center gap-0.5 h-6 mt-3">
                                {Array.from({ length: 24 }).map((_, i) => {
                                  const height = playingId === item._id
                                    ? Math.max(3, Math.floor(Math.sin((i + Date.now() / 200)) * 12 + 12))
                                    : Math.max(3, (i % 3 === 0 ? 8 : i % 2 === 0 ? 12 : 5));
                                  return (
                                    <div
                                      key={i}
                                      style={{ height: `${height}px` }}
                                      className="flex-1 bg-gradient-to-t from-primary-pink to-pink-400 rounded-full transition-all duration-150"
                                    />
                                  );
                                })}
                              </div>

                              <p className="font-serif text-[11px] text-stone-400 italic line-clamp-1 mt-3">
                                “{item.caption}”
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* 4. DIARY PAGE LAYOUT */}
                        {cardLayout === 'diary' && (
                          <motion.div
                            whileHover={{ scale: 1.02, rotate: 0 }}
                            className={`bg-[rgb(254,253,248)] border border-stone-200 rounded-2xl shadow-luxury relative cursor-pointer transform ${rotation} overflow-hidden`}
                            onClick={() => {
                              setSelectedItem(item);
                              setDetailOpen(true);
                            }}
                          >
                            {/* Torn notebook paper binders simulation */}
                            <div className="flex gap-1.5 px-3 py-1 bg-stone-100/50 border-b border-stone-200/40">
                              <div className="w-2 h-2 rounded-full bg-stone-300" />
                              <div className="w-2 h-2 rounded-full bg-stone-300" />
                              <div className="w-2 h-2 rounded-full bg-stone-300" />
                            </div>

                            {/* Lined notebook texture */}
                            <div className="p-5 bg-[linear-gradient(rgba(224,242,254,0.3)_1px,transparent_1px)] [background-size:100%_20px] relative">
                              {/* Left margin red lines */}
                              <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200" />
                              <div className="absolute left-11 top-0 bottom-0 w-[1px] bg-red-200" />

                              <div className="pl-6">
                                <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] text-secondary-text font-mono uppercase">
                                    Page No. {index + 1}
                                  </span>
                                  <span className="text-[10px] text-rose-500 font-bold">
                                    {itemDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}
                                  </span>
                                </div>

                                <h3 className="font-cursive text-xl font-bold text-dark-text tracking-wide mb-3">
                                  {item.title}
                                </h3>

                                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shadow-xs mb-4">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={`${API_HOST}${item.images[0]}`} alt={item.title} className="w-full h-full object-cover" />
                                </div>

                                <p className="font-serif text-xs text-stone-700 leading-[20px] whitespace-pre-wrap italic">
                                  {item.caption}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* 5. POLAROID LAYOUT (Classic) */}
                        {cardLayout === 'polaroid' && (
                          <motion.div
                            whileHover={{ scale: 1.025, rotate: 0 }}
                            className={`bg-white border border-stone-200/80 p-4 pb-6 rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-all duration-300 transform ${rotation} cursor-pointer`}
                            onClick={() => {
                              setSelectedItem(item);
                              setDetailOpen(true);
                            }}
                          >
                            {/* Tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/80 backdrop-blur-xs border border-stone-100 shadow-xs rotate-[-2deg] pointer-events-none opacity-80" />

                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={`${API_HOST}${item.images[0]}`}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                              />
                              
                              <div className="absolute top-3 left-3 z-10 flex gap-1 items-center">
                                <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wide rounded-full border flex items-center gap-1 shadow-sm ${TAG_COLOR_MAP[item.emotionalTag] || 'bg-rose-50 text-rose-700'}`}>
                                  <span>{EMOTIONAL_TAG_EMOJIS[item.emotionalTag] || '💖'}</span>
                                  <span>{item.emotionalTag}</span>
                                </span>
                              </div>

                              {item.images.length > 1 && (
                                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-white text-[9px] font-semibold tracking-wider uppercase">
                                  +{item.images.length - 1} photos
                                </div>
                              )}
                            </div>

                            <div className="mt-4">
                              <div className="flex items-center gap-1.5 text-[10px] text-secondary-text mb-1 font-sans">
                                <Calendar className="w-3 h-3 text-primary-pink/50" />
                                <span>{itemDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                              </div>

                              <h3 className="font-playfair text-lg font-bold text-dark-text tracking-wide truncate">
                                {item.title}
                              </h3>

                              <p className="font-serif text-xs text-secondary-text mt-1 line-clamp-2 leading-relaxed">
                                {item.caption}
                              </p>

                              <div className="mt-4 pt-3 border-t border-rose-50 flex justify-between items-center">
                                <span className="text-[10px] font-medium text-stone-400 italic">
                                  Posted by {item.createdBy === currentUserId ? 'You' : 'Partner'}
                                </span>
                                
                                {item.reactions.length > 0 && (
                                  <div className="flex -space-x-1 overflow-hidden">
                                    {Array.from(new Set(item.reactions.map(r => r.emoji))).slice(0, 3).map((emoji, i) => (
                                      <span key={i} className="text-sm bg-stone-50 border border-stone-100 rounded-full w-5 h-5 flex items-center justify-center">
                                        {emoji}
                                      </span>
                                    ))}
                                    <span className="text-[10px] font-bold text-primary-pink pl-2">
                                      {item.reactions.length}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Spacer for layout symmetry */}
                      <div className="hidden md:block w-1/2" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {items.length > 0 && (
        <button
          onClick={() => setCreateOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-4 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink text-white shadow-luxury hover:shadow-luxury-hover hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Floating Reaction Bubble Canvas */}
      <div className="fixed bottom-24 right-8 z-50 pointer-events-none flex flex-col items-center">
        <AnimatePresence>
          {floatingReacts.map(r => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 0, scale: 0.5, x: r.x }}
              animate={{ opacity: [0, 1, 1, 0], y: -180, scale: [0.5, 1.4, 1.4, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="text-3xl filter drop-shadow-md select-none absolute"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <CreateMemoryModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={fetchTimeline}
      />

      <MemoryDetailModal
        item={selectedItem}
        isOpen={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedItem(null);
        }}
        onReact={(emoji) => selectedItem && handleReact(selectedItem._id, emoji)}
        currentUserId={currentUserId}
      />
    </div>
  );
}
