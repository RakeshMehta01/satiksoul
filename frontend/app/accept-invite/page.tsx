'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { relationshipApi } from '@/lib/api/relationship';

function AcceptInviteForm() {
  const { getToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode) {
      setCode(urlCode);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return setError('Please enter a pairing code');
    setLoading(true);
    setError('');
    
    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      
      await relationshipApi.acceptInvite(code.trim().toUpperCase(), token);
      setSuccess(true);
      
      // Delay redirect slightly for premium animation experience
      setTimeout(() => {
        router.push('/shared-home');
      }, 2500);
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Invalid or expired invitation code. Please check with your partner.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg bg-[#fffefc] border border-pink-100/40 p-8 rounded-[36px] shadow-luxury relative overflow-hidden"
    >
      {/* Decorative tapes and sparkles */}
      <div className="absolute -top-1 left-24 w-14 h-4 bg-white/70 border-b border-pink-100/30 rotate-[2deg] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-repeat bg-[size:120px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      {success ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-10 space-y-6 relative z-10"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-4xl shadow-md animate-pulse">
            💖
          </div>
          <div className="space-y-2">
            <h2 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
              Connected! ✨
            </h2>
            <p className="font-cursive text-xl text-primary-pink tracking-wide">
              Your little world is ready... 💗
            </p>
          </div>
          <p className="text-[10px] text-secondary-text/80 font-semibold tracking-wider uppercase animate-pulse">
            Initializing your shared workspace
          </p>
        </motion.div>
      ) : (
        <div className="relative z-10">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-3xl shadow-sm">
              💌
            </div>
            <h1 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
              Join Our Space
            </h1>
            <p className="text-xs text-secondary-text max-w-xs mx-auto font-semibold leading-relaxed">
              Step into your private couple universe. Enter the pairing code sent by your person to link your accounts. 💗
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="p-3 text-xs bg-rose-50 text-primary-pink border border-rose-100 rounded-2xl text-center font-bold">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
                Enter Pairing Code 💗
              </label>
              <input
                type="text"
                placeholder="e.g. LOVE-ABCD or SATIK-EFGH"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                className="w-full px-5 py-4 rounded-2xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text placeholder-secondary-text/40 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink transition-all shadow-inner uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer font-playfair"
            >
              {loading ? 'Entering our space... ✨' : 'Join Our Space 💗'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-pink-100/30 text-center">
            <p className="text-[10px] text-secondary-text/70 font-bold">
              Want to create a new space instead?{' '}
              <button
                onClick={() => router.push('/create-relationship')}
                className="text-primary-pink hover:text-dark-pink transition-colors font-extrabold underline decoration-pink-300 decoration-2 underline-offset-4 cursor-pointer"
              >
                Create Space →
              </button>
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function AcceptInvitePage() {
  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-radial from-pink-100/40 to-transparent blur-[70px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-radial from-orange-100/30 to-transparent blur-[80px] pointer-events-none -z-10 animate-float-slow" />

      <Suspense fallback={
        <div className="bg-white border border-pink-100 p-8 rounded-3xl text-center max-w-sm">
          <div className="w-10 h-10 mx-auto rounded-full border-4 border-pink-100 border-t-primary-pink animate-spin" />
        </div>
      }>
        <AcceptInviteForm />
      </Suspense>
    </div>
  );
}
