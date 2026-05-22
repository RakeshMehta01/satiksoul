'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { relationshipApi, Relationship, CouplePresence, SharedActivity } from '@/lib/api/relationship';
import { futureMessageApi, FutureMessage } from '@/lib/api/futureMessages';
import Link from 'next/link';

function HeartBeatProgress({ days }: { days: number }) {
  return (
    <div className="relative w-full py-4 flex flex-col items-center">
      <div className="w-full h-1 bg-pink-100 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-pink to-dark-pink rounded-full relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-primary-pink shadow-sm" />
        </motion.div>
      </div>
      <span className="font-cursive text-sm text-primary-pink/80 mt-2 rotate-[-1deg]">
        Holding hands for {days} beautiful days 💗
      </span>
    </div>
  );
}

export default function SharedHomePage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [presence, setPresence] = useState<CouplePresence[]>([]);
  const [activities, setActivities] = useState<SharedActivity[]>([]);
  const [messages, setMessages] = useState<FutureMessage[]>([]);
  const [customStatus, setCustomStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingPresence, setUpdatingPresence] = useState(false);

  const fetchAllData = useCallback(async () => {
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

      // Parallel fetches for presence, activities, future messages
      const [presData, actData, msgData] = await Promise.all([
        relationshipApi.getPresence(rel._id, token),
        relationshipApi.getActivities(rel._id, token),
        futureMessageApi.getAll(token),
      ]);

      setPresence(presData);
      setActivities(actData);
      setMessages(msgData);

      // Find current user's presence state
      const myPres = presData.find(p => p.userId === user?.id);
      if (myPres) {
        setCustomStatus(myPres.customStatus || '');
      }
    } catch (err) {
      console.error('Failed to load shared home data:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken, router, user]);

  useEffect(() => {
    fetchAllData();
    // Refresh activities & presence every 30 seconds
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationship) return;
    setUpdatingPresence(true);
    try {
      const token = await getToken();
      if (!token) return;
      await relationshipApi.updatePresence(relationship._id, 'online', customStatus, token);
      await fetchAllData();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingPresence(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-pink-100 border-t-primary-pink animate-spin" />
      </div>
    );
  }

  if (!relationship) return null;

  // Calculate days count since anniversary or space creation
  const relativeDate = relationship.anniversaryDate
    ? new Date(relationship.anniversaryDate)
    : new Date(relationship.createdAt);
  const diffTime = Math.abs(Date.now() - relativeDate.getTime());
  const daysCount = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Determine partner details
  const partnerPresence = presence.find(p => p.userId !== user?.id);
  const isPartnerOnline = partnerPresence?.status === 'online';

  const sealedMsgs = messages.filter(m => !m.isUnlocked);
  const nextUnlockMsg = sealedMsgs.sort((a, b) => new Date(a.unlockDate).getTime() - new Date(b.unlockDate).getTime())[0];

  return (
    <div className="min-h-full p-4 md:p-8 max-w-4xl mx-auto space-y-8 relative">
      {/* Soft Background glow blobs */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-radial from-pink-100/30 to-transparent blur-[80px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-radial from-orange-100/20 to-transparent blur-[90px] pointer-events-none -z-10 animate-float-slow" />

      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pink-100/20 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🏰</span>
            <h1 className="font-playfair text-3xl font-black text-dark-text tracking-tight">
              {relationship.relationshipName}
            </h1>
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100/40 rounded-full px-2.5 py-0.5 shadow-sm">
              Our Space ✨
            </span>
          </div>
          <p className="text-xs text-secondary-text font-semibold pl-1">
            Welcome back to your shared private sanctuary.
          </p>
        </div>

        {/* Dynamic Presence Dot */}
        <div className="flex items-center gap-3 bg-[#fffefc] border border-pink-100/30 px-4 py-2.5 rounded-2xl shadow-sm self-start">
          <span className={`w-2.5 h-2.5 rounded-full ${isPartnerOnline ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-300'}`} />
          <div className="text-[10px] font-bold text-dark-text">
            {isPartnerOnline ? 'Your partner is online' : 'Partner is offline'}
            {partnerPresence?.customStatus && (
              <span className="block font-cursive text-sm text-primary-pink mt-0.5">
                &ldquo;{partnerPresence.customStatus}&rdquo;
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Quick Stats & Presence updates */}
        <div className="md:col-span-1 space-y-6">
          {/* Anniversary card (Scrapbook Polaroid design) */}
          <div className="bg-white border border-pink-100/40 p-5 rounded-[28px] shadow-luxury rotate-[-1deg] relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute -top-1 left-8 w-12 h-3.5 bg-white/60 border-b border-pink-100/30 rotate-[3deg] opacity-70 pointer-events-none" />
            
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-inner bg-pink-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="relative z-10 text-white font-cursive text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] select-none">
                anniversary 💗
              </span>
            </div>

            <div className="mt-4 w-full">
              <h3 className="font-playfair text-lg font-black text-dark-text">Days Counting</h3>
              <HeartBeatProgress days={daysCount} />
              <p className="text-[10px] text-secondary-text/80 font-bold uppercase tracking-wider mt-1">
                Anniversary: {relationship.anniversaryDate ? new Date(relationship.anniversaryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not set'}
              </p>
            </div>
          </div>

          {/* Quick status update card */}
          <div className="bg-[#fffefc] border border-pink-100/40 p-5 rounded-[28px] shadow-luxury">
            <h3 className="font-playfair text-base font-black text-dark-text mb-3 flex items-center gap-1.5">
              <span>✍️</span> Status Note
            </h3>
            <form onSubmit={handleUpdateStatus} className="space-y-3">
              <input
                type="text"
                placeholder="What is on your mind? (e.g. Missing you)"
                value={customStatus}
                onChange={(e) => setCustomStatus(e.target.value)}
                disabled={updatingPresence}
                maxLength={40}
                className="w-full px-4 py-2.5 rounded-xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text placeholder-secondary-text/40 focus:outline-none focus:ring-1 focus:ring-primary-pink/30 focus:border-primary-pink transition-all"
              />
              <button
                type="submit"
                disabled={updatingPresence}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {updatingPresence ? 'Saving status...' : 'Update status note 💗'}
              </button>
            </form>
          </div>
        </div>

        {/* Right columns: Future Messages teaser + activities */}
        <div className="md:col-span-2 space-y-6">
          {/* Future messages preview box */}
          <div className="bg-[#fffefc] border border-pink-100/40 p-6 rounded-[32px] shadow-luxury space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-playfair text-lg font-black text-dark-text flex items-center gap-1.5">
                <span>💌</span> Capsule Inbox
              </h3>
              <Link href="/future-messages" className="text-[10px] font-black text-primary-pink hover:underline uppercase tracking-wider">
                View All Vault →
              </Link>
            </div>

            {nextUnlockMsg ? (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/50 via-white to-pink-50/10 border border-pink-100/30 flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔐</span>
                    <h4 className="font-playfair text-sm font-extrabold text-dark-text truncate">
                      {nextUnlockMsg.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-secondary-text/80 font-bold">
                    Recipient: {nextUnlockMsg.recipientNote || 'My Person'}
                  </p>
                </div>
                <div className="shrink-0 text-right space-y-1">
                  <span className="text-[10px] font-black text-primary-pink bg-pink-50/80 px-2 py-0.5 border border-pink-100 rounded-full">
                    Sealed ✦
                  </span>
                  <p className="text-[10px] font-mono text-secondary-text/60 mt-1">
                    Opens {new Date(nextUnlockMsg.unlockDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-pink-100 rounded-2xl space-y-2">
                <p className="text-xs font-semibold text-secondary-text">No letters are currently sealed.</p>
                <Link href="/future-messages/create" className="text-xs font-extrabold text-primary-pink hover:underline">
                  Write one now ✍️
                </Link>
              </div>
            )}
          </div>

          {/* Shared activity timeline list */}
          <div className="bg-[#fffefc] border border-pink-100/40 p-6 rounded-[32px] shadow-luxury space-y-4">
            <h3 className="font-playfair text-lg font-black text-dark-text flex items-center gap-1.5">
              <span>⏰</span> Shared activity feed
            </h3>

            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {activities.length > 0 ? (
                activities.map((act) => (
                  <div key={act._id} className="flex gap-3 text-xs">
                    <span className="text-lg select-none">
                      {act.activityType === 'space_created' ? '✨' : act.activityType === 'partner_joined' ? '💖' : '🌸'}
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-bold text-dark-text leading-relaxed">
                        {act.description}
                      </p>
                      <p className="text-[9px] font-mono text-secondary-text/60">
                        {new Date(act.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-xs text-secondary-text/60 font-bold">
                  No activity logged yet. Add memories or letters to write history. 💗
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
