'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { relationshipApi, Relationship, RelationshipInvite } from '@/lib/api/relationship';

export default function InvitePartnerPage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [invite, setInvite] = useState<RelationshipInvite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [checkingPartner, setCheckingPartner] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const inviteUrl = invite ? `${origin}/invite/${invite.inviteCode}` : '';


  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.push('/sign-in');
          return;
        }

        const rel = await relationshipApi.getMine(token);
        if (!rel) {
          router.push('/create-relationship');
          return;
        }

        setRelationship(rel);

        if (rel.relationshipStatus === 'active') {
          // Already connected! Redirect to the shared home dashboard
          router.push('/shared-home');
          return;
        }

        // Fetch or create an active invite
        let activeInvite = await relationshipApi.getInvite(rel._id, token);
        if (!activeInvite) {
          activeInvite = await relationshipApi.createInvite(rel._id, undefined, token);
        }
        setInvite(activeInvite);
      } catch (err: unknown) {
        setError((err as { message?: string }).message || 'Failed to fetch relationship space info.');
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken, router]);

  // Heartbeat check to see if the partner has joined yet
  const handleCheckConnection = async () => {
    setCheckingPartner(true);
    try {
      const token = await getToken();
      if (!token) return;
      const rel = await relationshipApi.getMine(token);
      if (rel && rel.relationshipStatus === 'active') {
        router.push('/shared-home');
      } else {
        // Show subtle notification or alert that they are still waiting
        const notification = document.getElementById('conn-toast');
        if (notification) {
          notification.classList.remove('opacity-0');
          setTimeout(() => notification.classList.add('opacity-0'), 3000);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingPartner(false);
    }
  };

  const handleCopyLink = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-pink-100 border-t-primary-pink animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="bg-white border border-pink-100 p-8 rounded-3xl text-center max-w-sm">
          <p className="text-sm font-bold text-primary-pink mb-4">{error}</p>
          <button onClick={() => router.push('/create-relationship')} className="px-5 py-2.5 rounded-xl bg-primary-pink text-white text-xs font-bold shadow-luxury">
            Retry Creation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center p-4 md:p-8 relative">
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-radial from-pink-100/40 to-transparent blur-[70px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-radial from-orange-100/30 to-transparent blur-[80px] pointer-events-none -z-10 animate-float-slow" />

      {/* Toast popup */}
      <div id="conn-toast" className="fixed top-10 left-1/2 -translate-x-1/2 bg-[#faf8f2]/95 border border-pink-200/50 px-6 py-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 pointer-events-none z-50 text-xs font-bold text-dark-text flex items-center gap-2">
        <span>🕯️</span> Still waiting for your person to enter the space... 💗
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-[#fffefc] border border-pink-100/40 p-8 rounded-[36px] shadow-luxury relative overflow-hidden text-center"
      >
        {/* Subtle taped sticker corner feel */}
        <div className="absolute -top-1 left-12 w-12 h-4 bg-white/60 border-b border-pink-100/30 rotate-[-5deg] opacity-70 pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-pink bg-pink-50 border border-pink-100/50 rounded-full px-3 py-1 inline-block shadow-sm">
            Step 2: Invite Your Person 💌
          </span>
          <h1 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
            {relationship?.relationshipName || 'Your Private World'} is Awaiting
          </h1>
          <p className="text-xs text-secondary-text max-w-sm mx-auto font-semibold leading-relaxed">
            Every beautiful scrapbook is written by two hands. Invite your person into this sanctuary to unlock the workspace. ✨
          </p>
        </div>

        {/* The Emotional Polaroid Invite Card */}
        <div className="mt-8 mx-auto max-w-xs bg-white border border-pink-100/40 p-4 pb-6 rounded-[28px] shadow-luxury rotate-[-1.5deg] relative group overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-repeat bg-[size:80px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
          
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-inner bg-pink-50 flex items-center justify-center">
            {/* Elegant high quality landscape placeholder bg */}
            <div className="absolute inset-0 bg-cover bg-center opacity-85" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-transparent" />
            <div className="relative z-10 text-white font-cursive text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] select-none">
              our sanctuary 💗
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="font-cursive text-xl text-primary-pink font-extrabold rotate-[-0.5deg]">
              {user?.firstName || 'Rakesh'} wants to build a little world with you 💗
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-[11px] font-extrabold text-primary-pink select-all">
              {invite?.inviteCode}
            </div>
          </div>
        </div>

        {/* Interactive copy share buttons */}
        <div className="mt-8 space-y-4 max-w-sm mx-auto">
          <button
            onClick={handleCopyLink}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-playfair"
          >
            <span>{copied ? '💖 Copied Romantic Link!' : 'Copy Invitation Link 💌'}</span>
          </button>

          <button
            onClick={handleCheckConnection}
            disabled={checkingPartner}
            className="w-full py-4 rounded-2xl bg-white border border-pink-100 text-dark-text hover:bg-pink-50/20 text-xs font-bold tracking-wider shadow-sm transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            {checkingPartner ? (
              <span className="w-4 h-4 rounded-full border-2 border-pink-200 border-t-primary-pink animate-spin" />
            ) : (
              <span>🕯️ Check If Partner Joined</span>
            )}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-pink-100/30 text-center">
          <p className="text-[10px] text-secondary-text/80 font-bold max-w-xs mx-auto leading-relaxed">
            Need to restart or configure your details?{' '}
            <button
              onClick={() => router.push('/create-relationship')}
              className="text-primary-pink hover:text-dark-pink transition-colors font-extrabold underline decoration-pink-300 decoration-2 underline-offset-4 cursor-pointer"
            >
              Reset World Space →
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
