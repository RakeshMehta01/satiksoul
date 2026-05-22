'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { relationshipApi } from '@/lib/api/relationship';

export default function CreateRelationshipPage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please name your private space');
    setLoading(true);
    setError('');
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      
      await relationshipApi.create(name, anniversaryDate || undefined, token);
      
      // Successfully created! Redirect to invite partner screen
      router.push('/invite-partner');
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Something went wrong while building your world.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-radial from-pink-100/40 to-transparent blur-[70px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-radial from-orange-100/30 to-transparent blur-[80px] pointer-events-none -z-10 animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-[#fffefc] border border-pink-100/40 p-8 rounded-[36px] shadow-luxury relative overflow-hidden"
      >
        {/* Decorative Tape & Sparkles */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/70 border-b border-pink-100/30 rotate-[-1deg] shadow-sm pointer-events-none" />
        <div className="absolute top-6 right-6 text-2xl select-none animate-pulse">✨</div>
        <div className="absolute bottom-6 left-6 text-2xl select-none animate-float">🌸</div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-repeat bg-[size:120px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-3xl shadow-sm animate-bounce">
            🌸
          </div>
          <h1 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
            Create Your Little World
          </h1>
          <p className="text-xs text-secondary-text max-w-xs mx-auto font-semibold leading-relaxed">
            Welcome to the start of your shared private workspace. Let&apos;s build a beautiful emotional home just for the two of you. 💗
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 relative z-10">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-primary-pink border border-rose-100 rounded-2xl text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
              What should we call your space? 💗
            </label>
            <input
              type="text"
              placeholder="e.g. Rakesh & Satik's Wonderland ✨"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text placeholder-secondary-text/40 focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
              Your Anniversary Date (Optional) 📅
            </label>
            <input
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text placeholder-secondary-text/40 focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer font-playfair"
          >
            {loading ? 'Building your universe... ✨' : 'Initialize Our Space 💗'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-pink-100/30 text-center relative z-10">
          <p className="text-[10px] text-secondary-text/70 font-bold">
            Already have an invitation code?{' '}
            <button
              onClick={() => router.push('/accept-invite')}
              className="text-primary-pink hover:text-dark-pink transition-colors font-extrabold underline decoration-pink-300 decoration-2 underline-offset-4 cursor-pointer"
            >
              Enter Code →
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
