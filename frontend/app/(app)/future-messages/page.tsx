'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { futureMessageApi, FutureMessage } from '@/lib/api/futureMessages';
import { useCountdown } from '@/lib/hooks/useCountdown';

// Mappings for high-quality, authentic romantic photography for each emotional vibe
const TAG_IMAGES: Record<string, string> = {
  'Love': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
  'Anniversary': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
  'Missing You': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
  'Apology': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&q=80&w=600',
  'Motivation': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
  'Wedding': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
  'Long Distance': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600',
  'Comfort': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
  'Future Dreams': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
};

const TAG_COLORS: Record<string, string> = {
  'Love': 'bg-rose-500/90 text-white border-rose-300/40',
  'Anniversary': 'bg-amber-500/90 text-white border-amber-300/40',
  'Missing You': 'bg-violet-500/90 text-white border-violet-300/40',
  'Apology': 'bg-slate-500/90 text-white border-slate-300/40',
  'Motivation': 'bg-orange-500/90 text-white border-orange-300/40',
  'Wedding': 'bg-yellow-500/90 text-white border-yellow-300/40',
  'Long Distance': 'bg-indigo-500/90 text-white border-indigo-300/40',
  'Comfort': 'bg-teal-500/90 text-white border-teal-300/40',
  'Future Dreams': 'bg-sky-500/90 text-white border-sky-300/40',
};

function CountdownBadge({ unlockDate }: { unlockDate: string }) {
  const c = useCountdown(unlockDate);
  if (c.isExpired) {
    return (
      <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50 flex items-center gap-1 select-none shadow-sm">
        ✨ Opened 💗
      </span>
    );
  }
  return (
    <span className="text-xs font-bold text-primary-pink drop-shadow-sm flex items-center gap-1">
      Opens in {c.days > 0 ? `${c.days} days` : `${c.hours}h ${c.minutes}m`} 💗
    </span>
  );
}

function MessageCard({ msg }: { msg: FutureMessage }) {
  const imageUrl = TAG_IMAGES[msg.emotionalTag] || TAG_IMAGES['Love'];
  const tagClass = TAG_COLORS[msg.emotionalTag] || 'bg-pink-500/90 text-white border-pink-300/40';

  // Add random cute tape tilt degree for handcrafted scrapbooking feeling
  const tapeRotation = (msg._id.charCodeAt(0) % 2 === 0) ? 'rotate-[-3deg]' : 'rotate-[2.5deg]';

  return (
    <Link href={`/future-messages/${msg._id}`}>
      <motion.div
        whileHover={{ y: -6, rotate: (msg._id.charCodeAt(msg._id.length - 1) % 2 === 0) ? 0.5 : -0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative group bg-[#fffefc] border border-pink-100/40 p-4 pb-5 rounded-[28px] shadow-luxury hover:shadow-luxury-hover cursor-pointer flex flex-col justify-between"
      >
        {/* Cinematic polaroid frame style */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm bg-pink-50">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]" 
            style={{ backgroundImage: `url("${imageUrl}")` }} 
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Subtle noise and paper texture overlays for physical polaroid depth */}
          <div className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none bg-repeat bg-[size:80px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

          {/* Rotated handwritten masking paper tape tag containing the title */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`${tapeRotation} bg-[#faf8f2]/95 backdrop-blur-sm px-4 py-1.5 rounded shadow-md border border-amber-100/50 flex items-center gap-1.5 max-w-[200px]`}>
              <span className="text-xs select-none">💌</span>
              <p className="font-cursive text-lg text-dark-text font-black leading-none truncate tracking-wide">{msg.title}</p>
            </div>
          </div>

          {/* Emotional tag overlay indicator */}
          <span className={`absolute bottom-3 right-3 z-10 text-[8px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm border ${tagClass}`}>
            {msg.emotionalTag}
          </span>
        </div>

        {/* Sealed Blur Overlay or Cursive Content Preview */}
        {!msg.isUnlocked ? (
          <div className="bg-gradient-to-br from-white/95 to-pink-50/50 rounded-2xl p-4 border border-pink-100/20 shadow-sm mt-3 relative overflow-hidden">
            {msg.recipientNote && (
              <p className="text-secondary-text/90 text-xs italic font-semibold mb-2.5 leading-relaxed">&ldquo;{msg.recipientNote}&rdquo;</p>
            )}
            <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-pink-100/10">
              <CountdownBadge unlockDate={msg.unlockDate} />
              <span className="text-[9px] font-black text-white bg-primary-pink/90 px-2.5 py-0.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1 tracking-wider uppercase select-none">
                Sealed ✦
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/95 to-[#fffbf9]/80 rounded-2xl p-4 border border-pink-100/20 shadow-sm mt-3 relative overflow-hidden">
            {msg.recipientNote && (
              <p className="text-secondary-text/70 text-[9px] italic font-semibold mb-1 leading-none">&ldquo;{msg.recipientNote}&rdquo;</p>
            )}
            <p className="text-dark-text/90 leading-relaxed font-cursive text-2xl truncate mt-1">
              {msg.content}
            </p>
            <div className="mt-2.5 flex items-center justify-between border-t border-pink-100/10 pt-2.5">
              <CountdownBadge unlockDate={msg.unlockDate} />
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50 shadow-sm flex items-center gap-1 tracking-wider uppercase select-none">
                Revealed 💗
              </span>
            </div>
          </div>
        )}

        {/* Card footer — romantic details and metadata */}
        <div className="flex items-center justify-between text-[10px] text-secondary-text/80 font-bold px-1 mt-3.5 select-none">
          <div className="flex items-center gap-2">
            {msg.attachmentCount > 0 ? (
              <span className="flex items-center gap-1 bg-pink-50/50 border border-pink-100/20 px-2.5 py-0.5 rounded-lg text-primary-pink">
                📸 {msg.attachmentCount} memories
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-pink-50/30 px-2.5 py-0.5 rounded-lg">
                💌 Letter
              </span>
            )}
          </div>
          <span className="bg-pink-50/30 px-2 py-0.5 rounded-lg font-mono text-[9px]">
            {new Date(msg.unlockDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 text-center space-y-7 px-6 max-w-md mx-auto relative bg-[#fffefc] border border-pink-100/40 rounded-3xl shadow-luxury mt-4"
    >
      {/* Decorative cute envelopes and floating flower blossom petals */}
      <div className="relative select-none flex items-center justify-center w-28 h-28">
        {/* Soft glowing base */}
        <div className="absolute w-24 h-24 rounded-full bg-radial from-pink-300/40 to-transparent blur-md animate-pulse" />
        <span className="text-7xl z-10 animate-float">💌</span>
        <span className="absolute text-xl top-0 right-2 animate-float [animation-delay:1.5s]">🌸</span>
        <span className="absolute text-lg bottom-1 left-2 animate-float [animation-delay:3s]">💗</span>
      </div>

      <div className="space-y-3">
        <h3 className="font-playfair text-xl md:text-2xl font-black text-dark-text tracking-tight">Some feelings deserve to be opened later.</h3>
        <p className="text-xs text-secondary-text/80 max-w-xs leading-relaxed font-medium">
          Seal a sweet thought, a private polaroid moment, or a voice memo today, to make them smile on a special morning in the future.
        </p>
      </div>

      <div className="pt-2">
        <Link href="/future-messages/create"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 group"
        >
          <span>Write your first future letter 💌</span>
        </Link>
      </div>
    </motion.div>
  );
}

function RecentlyRevealedSection({ msgs }: { msgs: FutureMessage[] }) {
  if (msgs.length === 0) return null;
  return (
    <div className="space-y-4 pt-8 border-t border-pink-100/30">
      <div className="flex items-center gap-2.5 px-1">
        <span className="text-xl select-none animate-pulse">💗</span>
        <h2 className="font-playfair text-lg font-black text-dark-text tracking-tight">Recently Opened</h2>
        <span className="text-[9px] font-black uppercase tracking-wider text-primary-pink bg-pink-50 border border-pink-100/50 rounded-full px-2.5 py-0.5 select-none shadow-sm">
          Nostalgia Vault
        </span>
      </div>

      {/* Polaroid-style revealed feed slider */}
      <div className="flex gap-5 overflow-x-auto pb-4 pt-1.5 snap-x scrollbar-thin px-1">
        {msgs.slice(0, 5).map((msg, i) => {
          const imageUrl = TAG_IMAGES[msg.emotionalTag] || TAG_IMAGES['Love'];
          const tilt = (i % 2 === 0) ? 'rotate-[-1.5deg]' : 'rotate-[1.5deg]';
          return (
            <motion.div
              key={msg._id}
              whileHover={{ y: -4, rotate: 0 }}
              className={`flex-shrink-0 w-54 snap-start bg-[#fffefc] rounded-2xl p-3 border border-pink-100/40 shadow-sm space-y-3 relative overflow-hidden transition-all ${tilt}`}
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/3.2] rounded-xl overflow-hidden shadow-inner bg-pink-50">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl}")` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-widest font-black text-white bg-primary-pink/90 px-2 py-0.5 rounded-full">
                  {msg.emotionalTag}
                </span>
              </div>

              <div className="space-y-1 px-1">
                <h4 className="font-playfair text-xs font-extrabold text-dark-text truncate leading-snug">{msg.title}</h4>
                <p className="text-secondary-text/80 line-clamp-2 leading-snug font-cursive text-xl">
                  {msg.content || 'A beautiful sealed memory from the past.'}
                </p>
              </div>

              <div className="pt-2 border-t border-pink-100/20 flex items-center justify-between">
                <span className="text-[8px] text-secondary-text/60 font-bold font-mono">
                  Opened {new Date(msg.unlockDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <Link href={`/future-messages/${msg._id}`}
                  className="text-[9px] font-black text-primary-pink hover:text-dark-pink transition-colors cursor-pointer font-playfair tracking-wide"
                >
                  Read Again →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function FutureMessagesDashboard() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [messages, setMessages] = useState<FutureMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'sealed' | 'revealed'>('sealed');

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (token) setMessages(await futureMessageApi.getAll(token));
      } finally { setLoading(false); }
    })();
  }, [getToken]);

  const sealed = messages.filter(m => !m.isUnlocked);
  const revealed = messages.filter(m => m.isUnlocked);
  const list = tab === 'sealed' ? sealed : revealed;

  return (
    <div className="min-h-full p-4 md:p-8 max-w-2xl mx-auto space-y-8 relative">
      {/* Decorative animated background glow inside page viewport for warm peach-pink lighting */}
      <div className="absolute top-[20%] left-[-20%] w-[300px] h-[300px] rounded-full bg-radial from-pink-100/30 to-transparent blur-[60px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[-20%] w-[350px] h-[350px] rounded-full bg-radial from-orange-100/20 to-transparent blur-[70px] pointer-events-none -z-10 animate-float-slow" />

      {/* Top Header Personalized & Emotional Experience */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-3 pb-3 relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {/* Couple avatar polaroids decoration */}
            <div className="flex -space-x-2 mr-1">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center font-playfair text-[10px] font-bold text-primary-pink shadow-md select-none">
                {user?.firstName?.substring(0, 1) || 'R'}
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center font-playfair text-[10px] font-bold text-orange-500 shadow-md select-none">
                {user?.firstName === 'Rakesh' ? 'S' : 'R'}
              </div>
            </div>
            
            <h1 className="font-playfair text-2xl md:text-3xl font-extrabold text-dark-text tracking-tight flex items-center gap-1.5">
              Hey {user?.firstName || 'Rakesh'} <span className="text-primary-pink select-none animate-pulse">💗</span>
            </h1>
            <span className="text-[9px] font-black uppercase tracking-wider text-primary-pink bg-pink-50 border border-pink-100/40 rounded-full px-2.5 py-0.5 shadow-sm select-none">
              Private Vault
            </span>
          </div>
          <p className="text-xs text-secondary-text font-semibold pl-[64px]">
            &ldquo;Every message today becomes a memory tomorrow.&rdquo;
          </p>
        </div>

        {/* Quick romantic summary stats inside scrapbook polaroid tag */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-pink-50/50 via-rose-50/20 to-cream/40 border border-pink-100/30 p-2.5 rounded-2xl shadow-sm self-start pl-[64px] md:pl-2.5">
          <div className="text-center px-2 py-0.5">
            <p className="text-[11px] font-extrabold text-primary-pink">{sealed.length}</p>
            <p className="text-[8px] uppercase tracking-wider font-extrabold text-secondary-text/70">Sealed</p>
          </div>
          <div className="w-px h-6 bg-pink-100/30" />
          <div className="text-center px-2 py-0.5">
            <p className="text-[11px] font-extrabold text-emerald-600">{revealed.length}</p>
            <p className="text-[8px] uppercase tracking-wider font-extrabold text-secondary-text/70">Revealed</p>
          </div>
        </div>
      </div>

      {/* Tabs and Quick Write Actions Row */}
      <div className="flex items-center justify-between border-b border-pink-100/10 pb-2">
        <div className="flex gap-1.5 bg-pink-50/30 border border-pink-100/30 rounded-2xl p-1 shadow-inner">
          {(['sealed', 'revealed'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                tab === t 
                  ? 'bg-white text-primary-pink shadow-sm font-black' 
                  : 'text-secondary-text/80 hover:text-dark-text'
              }`}
            >
              {t === 'sealed' ? 'Sealed Letters 🔐' : 'Opened Memories 💌'}
            </button>
          ))}
        </div>

        <Link href="/future-messages/create"
          className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:scale-[1.02] transition-all hover:shadow-luxury-hover"
        >
          <span>✍️</span> Write Letter
        </Link>
      </div>

      {/* Content list block */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map(i => (
            <div key={i} className="aspect-[16/10] md:aspect-[16/9.5] rounded-3xl bg-[#fffefc] border border-pink-100/10 p-4 animate-pulse">
              <div className="w-full h-full bg-pink-50/30 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-7">
          {list.map(msg => <MessageCard key={msg._id} msg={msg} />)}
        </div>
      )}

      {/* Recently Opened Nostalgia section */}
      {tab === 'sealed' && <RecentlyRevealedSection msgs={revealed} />}

      {/* Floating compose button on mobile view */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <Link href="/future-messages/create"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary-pink to-dark-pink text-white shadow-luxury hover:shadow-luxury-hover flex items-center justify-center text-xl hover:scale-105 active:scale-95 transition-transform"
        >
          ✍️
        </Link>
      </div>
    </div>
  );
}
