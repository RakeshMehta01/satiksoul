'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth, useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { relationshipApi } from '@/lib/api/relationship';

interface InviteDetails {
  inviteCode: string;
  relationshipName: string;
  anniversaryDate?: string;
  relationshipTheme?: string;
  inviterName: string;
  inviterImage?: string;
  createdAt: string;
}

export default function InviteCodePage() {
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const { isSignedIn, isLoaded } = useUser();
  const code = params?.code as string;

  const [details, setDetails] = useState<InviteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accepting, setAccepting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        const data = await relationshipApi.getInviteDetails(code);
        setDetails(data);
      } catch (err: unknown) {
        setError((err as Error).message || 'Invalid or expired invitation link');
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  const handleAccept = async () => {
    if (!code) return;
    setAccepting(true);
    setError('');
    try {
      const token = await getToken();
      if (!token) throw new Error('You must be signed in to accept this invitation.');
      
      await relationshipApi.acceptInvite(code, token);
      setSuccess(true);
      
      // Delay redirect slightly for cinematic transition to play out
      setTimeout(() => {
        router.push('/shared-home');
      }, 3000);
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to accept invitation. Please try again.');
      setAccepting(false);
    }
  };


  if (loading) {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full border-4 border-pink-100 border-t-primary-pink animate-spin" />
        <p className="font-playfair text-xs font-semibold text-secondary-text/80">
          Unwrapping your invitation... ✉️
        </p>
      </div>
    );
  }

  if (error || !details) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-pink-100/50 p-8 rounded-[36px] shadow-luxury text-center space-y-6"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-3xl">
          🥀
        </div>
        <div className="space-y-2">
          <h1 className="font-playfair text-2xl font-black text-dark-text">Invitation Expired</h1>
          <p className="text-xs text-secondary-text font-semibold leading-relaxed">
            {error || 'This invitation code is invalid or has already been accepted.'}
          </p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-full py-3.5 rounded-2xl bg-white border border-pink-100 text-xs font-bold text-dark-text hover:bg-pink-50/20 transition-all shadow-sm"
        >
          Go Back Home 🌸
        </button>
      </motion.div>
    );
  }

  const redirectUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="relative w-full">
      {/* Fullscreen Success Cinematic Transition overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#fffcfb] z-50 flex flex-col items-center justify-center"
          >
            {/* Animated growing golden-pink glow circle */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 2, 4], opacity: [0.3, 0.6, 0] }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-primary-pink to-orange-200 blur-3xl pointer-events-none"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center space-y-6 max-w-sm px-4"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-5xl shadow-lg border border-pink-100 select-none animate-pulse">
                💖
              </div>
              <div className="space-y-2">
                <h2 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
                  Welcome Home
                </h2>
                <p className="font-cursive text-2xl text-primary-pink tracking-wide">
                  your private world is unlocked... 💗
                </p>
              </div>
              <p className="text-[10px] text-secondary-text/80 font-semibold tracking-wider uppercase animate-pulse">
                Entering Sanctuary
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoaded && !isSignedIn ? (
          /* STATE A: Fullscreen Emotional Invitation Page (Unauthenticated) */
          <motion.div
            key="unauth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-[#fffefc]/95 border border-pink-100/40 p-8 rounded-[36px] shadow-luxury relative overflow-hidden text-center space-y-8"
          >
            {/* Soft taped visual mockup */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/80 border-b border-pink-100/20 rotate-[-1.5deg] shadow-sm pointer-events-none" />

            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-50/70 border border-pink-100/30 flex items-center justify-center text-3xl shadow-sm animate-bounce" style={{ animationDuration: '4s' }}>
                ✉️
              </div>
              <h2 className="font-playfair text-xl font-bold tracking-tight text-secondary-text/80 uppercase tracking-widest text-[10px]">
                You have been invited
              </h2>
              <h1 className="font-playfair text-2xl font-black text-dark-text leading-tight px-2">
                <span className="text-primary-pink">{details.inviterName}</span> invited you into your private little world.
              </h1>
              <p className="text-xs text-secondary-text max-w-xs mx-auto font-semibold leading-relaxed">
                Save memories, future letters, and moments together. A safe, premium, and intimate space made for two.
              </p>
            </div>

            {/* Polaroid Memory Preview Mockup to draw them in */}
            <div className="bg-white border border-pink-100/30 p-3 pb-5 rounded-2xl shadow-md rotate-[2deg] max-w-[200px] mx-auto relative group overflow-hidden">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-pink-50 relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center filter grayscale-[20%] group-hover:scale-105 transition-transform duration-700" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&q=80&w=400')` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-transparent" />
              </div>
              <p className="mt-3 font-cursive text-sm text-primary-pink/80 font-bold">our private space 💗</p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <SignInButton mode="redirect" forceRedirectUrl={redirectUrl}>
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer font-playfair">
                  Login to Continue 🌸
                </button>
              </SignInButton>

              <SignUpButton mode="redirect" forceRedirectUrl={redirectUrl}>
                <button className="w-full py-4 rounded-2xl bg-white border border-pink-100/80 text-dark-text hover:bg-pink-50/20 text-xs font-bold tracking-wider shadow-sm hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer">
                  Create Account 💌
                </button>
              </SignUpButton>
            </div>
          </motion.div>
        ) : (
          /* STATE B: Premium Relationship Acceptance Screen (Authenticated) */
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-[#fffefc]/95 border border-pink-100/40 p-8 rounded-[36px] shadow-luxury relative overflow-hidden text-center space-y-6"
          >
            {/* Subtle decorative sticker */}
            <div className="absolute -top-1.5 left-12 w-14 h-4 bg-white/80 border-b border-pink-100/20 rotate-[-5deg]" />

            <div className="space-y-4">
              {/* Partner Avatar / Identity Circle */}
              <div className="relative w-20 h-20 mx-auto">
                {details.inviterImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={details.inviterImage}
                    alt={details.inviterName}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-pink-100 flex items-center justify-center text-4xl border-4 border-white shadow-md select-none">
                    💝
                  </div>
                )}
                <span className="absolute bottom-0 right-0 text-2xl select-none animate-bounce">💗</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-cursive text-2xl text-primary-pink font-extrabold leading-tight">
                  {details.inviterName} wants to build a little world with you 💗
                </h2>
                <p className="text-xs text-secondary-text font-semibold">
                  You are invited to join their private relationship space.
                </p>
              </div>
            </div>

            {/* Relationship Info Box */}
            <div className="bg-[#faf8f2] border border-pink-100/30 p-5 rounded-2xl text-left space-y-3 relative overflow-hidden">
              <div className="absolute -right-3 -bottom-3 text-5xl opacity-[0.05] select-none">🏡</div>
              
              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-secondary-text/80">Space Name</p>
                <p className="text-xs font-extrabold text-dark-text mt-0.5">{details.relationshipName}</p>
              </div>

              {details.anniversaryDate && (
                <div>
                  <p className="text-[9px] uppercase font-black tracking-widest text-secondary-text/80">Anniversary</p>
                  <p className="text-xs font-extrabold text-dark-text mt-0.5">
                    {new Date(details.anniversaryDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-secondary-text/80">Theme Style</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink shadow-sm`} />
                  <span className="text-[10px] font-bold text-secondary-text capitalize">
                    {details.relationshipTheme?.replace('-', ' ') || 'Classic Blush'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer font-playfair transition-all duration-300"
              >
                {accepting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Unlocking space...</span>
                  </>
                ) : (
                  <span>Join Our Space ✨</span>
                )}
              </button>

              <button
                onClick={() => router.push('/')}
                disabled={accepting}
                className="w-full py-4 rounded-2xl bg-white border border-pink-100/80 text-secondary-text hover:bg-pink-50/20 text-xs font-bold tracking-wider shadow-sm hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
