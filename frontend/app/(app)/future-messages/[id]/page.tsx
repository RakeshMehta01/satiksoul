'use client';
import React, { use, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { futureMessageApi, FutureMessage } from '@/lib/api/futureMessages';
import { useCountdown } from '@/lib/hooks/useCountdown';

// Map emotional tags to custom styling & color themes
const THEMES: Record<string, { bg: string; seal: string; accent: string; font: string; emoji: string }> = {
  'Love': { bg: 'bg-[#fff5f6]', seal: '#ff3d8d', accent: 'text-rose-500 bg-rose-50 border-rose-100', font: 'font-cursive', emoji: '❤️' },
  'Anniversary': { bg: 'bg-[#fffcf4]', seal: '#d97706', accent: 'text-amber-600 bg-amber-50 border-amber-100', font: 'font-cursive', emoji: '🎊' },
  'Missing You': { bg: 'bg-[#f5f3ff]', seal: '#7c3aed', accent: 'text-violet-500 bg-violet-50 border-violet-100', font: 'font-cursive', emoji: '🌙' },
  'Apology': { bg: 'bg-[#f8fafc]', seal: '#475569', accent: 'text-slate-600 bg-slate-50 border-slate-200', font: 'font-sans', emoji: '🕊️' },
  'Motivation': { bg: 'bg-[#fffaf5]', seal: '#ea580c', accent: 'text-orange-500 bg-orange-50 border-orange-100', font: 'font-sans', emoji: '⚡' },
  'Wedding': { bg: 'bg-[#fefce8]', seal: '#ca8a04', accent: 'text-yellow-600 bg-yellow-50 border-yellow-100', font: 'font-cursive', emoji: '💍' },
  'Long Distance': { bg: 'bg-[#eef2ff]', seal: '#4f46e5', accent: 'text-indigo-500 bg-indigo-50 border-indigo-100', font: 'font-cursive', emoji: '✈️' },
  'Comfort': { bg: 'bg-[#f0fdf4]', seal: '#0d9488', accent: 'text-teal-600 bg-teal-50 border-teal-100', font: 'font-sans', emoji: '🤍' },
  'Future Dreams': { bg: 'bg-[#f0f9ff]', seal: '#0284c7', accent: 'text-sky-500 bg-sky-50 border-sky-100', font: 'font-cursive', emoji: '🌟' },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5003';

// Ambient Falling Petals Effect
function FallingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: string; delay: string; duration: string; scale: number }>>([]);
  
  useEffect(() => {
    // Generate random petals
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 8}s`,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute text-pink-300/30 text-lg animate-petal-fall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `scale(${p.scale})`,
            top: '-20px',
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}

// Custom Luxury Audio Player
function CustomAudioPlayer({ src, name }: { src: string; name: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = parseFloat(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white/80 border border-pink-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-primary-pink text-white flex items-center justify-center shadow-md hover:bg-dark-pink transition-all active:scale-95 cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Audio Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-dark-text truncate">{name}</p>
          <p className="text-[10px] text-secondary-text">Voice Memory</p>
        </div>

        {/* Waveform Micro-animation */}
        <div className="flex items-end gap-0.5 h-6 shrink-0 pr-1">
          {[0.6, 0.3, 0.8, 0.4, 0.9, 0.5, 0.7].map((h, i) => (
            <span
              key={i}
              className="w-0.75 bg-primary-pink/80 rounded-full transition-all"
              style={{
                height: isPlaying ? `${h * 100}%` : '20%',
                animation: isPlaying ? `float ${1 + i * 0.2}s ease-in-out infinite alternate` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar & Seek */}
      <div className="space-y-1">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-primary-pink focus:outline-none"
        />
        <div className="flex justify-between text-[9px] font-semibold text-secondary-text px-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function MessageDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const router = useRouter();
  const { getToken } = useAuth();

  const [msg, setMsg] = useState<FutureMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic state elements
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [useSignatureFont, setUseSignatureFont] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Unauthenticated');
        const data = await futureMessageApi.getOne(id, token);
        setMsg(data);
        
        // Auto-open if we unlocked it previously in this session
        const wasOpened = localStorage.getItem(`satiksoul-opened-${id}`);
        if (wasOpened === 'true') {
          setIsOpened(true);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Letter not found';
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getToken]);

  const handleDelete = async () => {
    if (!confirm('Are you absolutely sure you want to delete this future letter? This action is permanent.')) return;
    try {
      const token = await getToken();
      await futureMessageApi.delete(id, token!);
      router.push('/future-messages');
    } catch {
      alert('Could not delete letter.');
    }
  };

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      localStorage.setItem(`satiksoul-opened-${id}`, 'true');
    }, 1800); // 1.8s break and slide animation duration
  };

  const handlePrint = () => {
    window.print();
  };

  // Countdown calculations
  const c = useCountdown(msg?.unlockDate || new Date().toISOString());

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-3 border-pink-100 border-t-primary-pink animate-spin" />
        <p className="text-xs font-semibold text-secondary-text font-playfair italic">Retrieving sealed artifact...</p>
      </div>
    );
  }

  if (error || !msg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 space-y-4">
        <span className="text-5xl">🕊️</span>
        <h3 className="font-playfair text-xl font-bold text-dark-text">Memory Sealed or Missing</h3>
        <p className="text-xs text-secondary-text max-w-xs leading-relaxed">
          {error || 'We could not locate this future letter. It may have been deleted or lives on another vault.'}
        </p>
        <button onClick={() => router.push('/future-messages')} className="px-6 py-2.5 rounded-xl bg-primary-pink text-white text-xs font-semibold shadow-luxury">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const theme = THEMES[msg.emotionalTag] || THEMES['Love'];
  const formattedUnlockDate = new Date(msg.unlockDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`min-h-full ${theme.bg} transition-colors duration-500 relative flex flex-col pb-16`}>
      {/* Falling blossom effect */}
      {msg.isUnlocked && isOpened && <FallingPetals />}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-pink-100/30 px-4 md:px-8 py-3 flex items-center justify-between print:hidden">
        <button
          onClick={() => router.push('/future-messages')}
          className="text-secondary-text text-sm hover:text-primary-pink transition-colors font-semibold flex items-center gap-1 cursor-pointer"
        >
          ← Letters
        </button>
        <div className="flex items-center gap-2">
          {/* Print button - unlocked letter only */}
          {msg.isUnlocked && isOpened && (
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-white hover:bg-pink-50 border border-pink-100 text-secondary-text hover:text-primary-pink transition-all text-xs font-semibold cursor-pointer shadow-sm"
              title="Print keepsake letter"
            >
              🖨️ Print
            </button>
          )}

          {/* Delete letter - only if locked (can't delete/edit once opened for authentic permanent legacy, or optionally allow delete for safety) */}
          <button
            onClick={handleDelete}
            className="p-2.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-100 text-secondary-text hover:text-rose-600 transition-all text-xs font-semibold cursor-pointer shadow-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 z-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* ================= STATE 1: LOCKED & TIMED SEAL ================= */}
          {!msg.isUnlocked && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-center"
            >
              {/* Cinematic Sealed Envelope Cover */}
              <div className="relative max-w-md mx-auto aspect-[1.4] bg-white rounded-3xl border-2 border-pink-100/50 shadow-luxury overflow-hidden flex flex-col justify-between p-8 md:p-10 select-none">
                {/* Envelope lining design */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffd9e8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200" />
                
                {/* Envelope Top Left Stamp / Tag */}
                <div className="text-left">
                  <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border tracking-wider uppercase ${theme.accent}`}>
                    {theme.emoji} {msg.emotionalTag}
                  </span>
                </div>

                {/* Center Recipient Message Box */}
                <div className="space-y-2 z-10">
                  <span className="text-2xl md:text-3xl text-pink-300/40 font-cursive leading-none">&ldquo;</span>
                  <p className="font-playfair text-base md:text-lg font-bold text-dark-text italic px-4 leading-relaxed">
                    {msg.recipientNote || 'A message meant for a future sunrise...'}
                  </p>
                  <span className="text-2xl md:text-3xl text-pink-300/40 font-cursive leading-none">&rdquo;</span>
                </div>

                {/* 3D Wax Seal Mockup at Envelope base */}
                <div className="flex justify-center relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative border-2 border-white/20"
                    style={{
                      backgroundColor: theme.seal,
                      boxShadow: `0 10px 25px -5px ${theme.seal}80, inset 0 -4px 10px rgba(0,0,0,0.2), inset 0 4px 10px rgba(255,255,255,0.3)`
                    }}
                  >
                    {/* Inner seal pattern */}
                    <div className="w-12 h-12 rounded-full border border-dashed border-white/40 flex items-center justify-center text-xl text-white font-bold">
                      🔐
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Ticking Live Countdown Board */}
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase font-semibold text-secondary-text">Sealed countdown</p>
                
                <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
                  {[
                    { val: c.days, label: 'days' },
                    { val: c.hours, label: 'hours' },
                    { val: c.minutes, label: 'mins' },
                    { val: c.seconds, label: 'secs' },
                  ].map((unit, i) => (
                    <div key={i} className="bg-white/80 border border-pink-100 rounded-2xl p-2.5 shadow-sm">
                      <span className="font-playfair text-xl md:text-2xl font-bold text-primary-pink block tabular-nums">
                        {unit.val}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-secondary-text font-bold">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Private encryption banner */}
              <div className="max-w-md mx-auto bg-white/40 border border-pink-100/40 rounded-2xl p-4 space-y-1">
                <p className="text-xs text-dark-text font-semibold">🔒 Private Time Capsule Locked</p>
                <p className="text-[11px] text-secondary-text leading-relaxed">
                  This message is encrypted and sealed. It cannot be read or modified by anyone until it unlocks on{' '}
                  <span className="font-semibold text-primary-pink">{formattedUnlockDate}</span>.
                </p>
              </div>
            </motion.div>
          )}

          {/* ================= STATE 2: UNLOCKED BUT ENVELOPE IS STILL SEALED ================= */}
          {msg.isUnlocked && !isOpened && (
            <motion.div
              key="unlocked-sealed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 py-6"
            >
              <div className="relative max-w-md mx-auto aspect-[1.4] bg-white rounded-3xl border-2 border-pink-100/50 shadow-luxury overflow-hidden flex flex-col justify-between p-8 md:p-10 select-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffd9e8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                
                <div className="text-left">
                  <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full border tracking-wider uppercase bg-emerald-50 text-emerald-600 border-emerald-100 animate-pulse">
                    ✨ Unlocked
                  </span>
                </div>

                <div className="space-y-1 z-10">
                  <h4 className="font-playfair text-lg font-bold text-dark-text">{msg.title}</h4>
                  <p className="font-sans text-xs text-secondary-text italic px-4">
                    {msg.recipientNote || 'Your sealed letter is ready to be opened.'}
                  </p>
                </div>

                {/* Wax Seal with Break Visualizer */}
                <div className="flex justify-center relative">
                  <motion.button
                    onClick={handleOpenEnvelope}
                    disabled={isOpening}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-18 h-18 rounded-full flex flex-col items-center justify-center shadow-luxury cursor-pointer relative border-2 border-white/20 select-none z-10"
                    style={{
                      backgroundColor: theme.seal,
                      boxShadow: `0 12px 30px -5px ${theme.seal}80, inset 0 -4px 10px rgba(0,0,0,0.2), inset 0 4px 10px rgba(255,255,255,0.3)`
                    }}
                  >
                    {isOpening ? (
                      <span className="text-white text-lg font-bold animate-ping">🌸</span>
                    ) : (
                      <>
                        <span className="text-xl">🕯️</span>
                        <span className="text-[7px] text-white/90 font-bold uppercase tracking-widest mt-0.5">Open</span>
                      </>
                    )}
                  </motion.button>

                  {/* Pulsing ring */}
                  <div className="absolute inset-0 w-18 h-18 mx-auto rounded-full bg-primary-pink/15 animate-ping -z-10 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5 max-w-xs mx-auto">
                <h3 className="font-playfair text-base font-bold text-dark-text">Your moment has arrived.</h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  The seal is ready to break. Press the wax seal to open this letter and unfold the memories.
                </p>
              </div>
            </motion.div>
          )}

          {/* ================= STATE 3: FULLY OPENED KEEPSAKE LETTER ================= */}
          {msg.isUnlocked && isOpened && (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 80 }}
              className="space-y-8"
            >
              {/* Premium Print Layout and Screen Card */}
              <div className="bg-white rounded-3xl border border-pink-100/50 shadow-luxury overflow-hidden relative print:border-none print:shadow-none print:bg-white bg-luxury-radial">
                {/* Watermark/Letter Accent Line */}
                <div className="h-1.5 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 print:hidden" />
                
                <div className="p-6 md:p-10 space-y-6 md:space-y-8 print:p-0">
                  {/* Decorative Letterhead */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-pink-100/40 pb-4 gap-4 print:border-pink-200 print:pb-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl print:text-lg">🌸</span>
                        <span className="font-playfair text-xs tracking-wider text-secondary-text font-bold uppercase">SatikSoul Keepsake Letter</span>
                      </div>
                      <h1 className="font-playfair text-2xl md:text-3xl font-extrabold text-dark-text print:text-xl">{msg.title}</h1>
                      {msg.recipientNote && (
                        <p className="text-xs text-secondary-text/80 italic font-medium print:text-[11px]">&ldquo;{msg.recipientNote}&rdquo;</p>
                      )}
                    </div>
                    
                    {/* Emotional Tag & Timestamp Stamp */}
                    <div className="text-left md:text-right shrink-0 print:text-right">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase print:text-[9px] ${theme.accent}`}>
                        {msg.emotionalTag}
                      </span>
                      <p className="text-[10px] text-secondary-text mt-1.5 font-semibold print:text-[9px]">
                        Written: {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold print:text-[9px]">
                        Unlocked: {new Date(msg.unlockDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* FONT STYLE CONTROLLER - Toggle Cursive Handwriting vs Serif for accessibility */}
                  <div className="flex justify-end print:hidden">
                    <button
                      onClick={() => setUseSignatureFont(!useSignatureFont)}
                      className="text-[10px] font-bold text-primary-pink/80 hover:text-primary-pink flex items-center gap-1.5 px-3 py-1 bg-pink-50/50 hover:bg-pink-50 rounded-lg border border-pink-100/40 transition-colors cursor-pointer"
                    >
                      ✍️ {useSignatureFont ? 'Use Modern Font' : 'Use Handwriting'}
                    </button>
                  </div>

                  {/* LETTER BODY CONTENT */}
                  <div className="relative">
                    {/* Opening large quote design */}
                    <span className="absolute -top-6 -left-3 text-7xl font-playfair text-soft-pink/40 select-none pointer-events-none leading-none print:text-pink-100">&ldquo;</span>
                    
                    {/* Content text */}
                    <p
                      className={`text-dark-text/95 leading-loose text-justify whitespace-pre-wrap pl-4 pr-2 select-text ${
                        useSignatureFont ? 'font-cursive text-2xl md:text-3xl leading-relaxed text-[#2c1d1d]' : 'font-playfair text-base md:text-lg leading-loose'
                      }`}
                      style={{ textShadow: useSignatureFont ? '0.2px 0.2px 0px rgba(0,0,0,0.05)' : 'none' }}
                    >
                      {msg.content}
                    </p>
                  </div>

                  {/* RICH MEDIA ATTACHMENTS (Only shown if loaded and unlocked) */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="border-t border-pink-100/40 pt-6 space-y-5 print:pt-4 print:border-pink-200">
                      <h4 className="font-playfair text-sm font-bold text-dark-text flex items-center gap-1.5 print:text-xs">
                        <span>📎</span> Attached Memories ({msg.attachments.length})
                      </h4>

                      {/* Divide by Images and Audio */}
                      <div className="space-y-4">
                        {/* Audio Recordings */}
                        {msg.attachments.filter(a => a.type === 'audio').map((audio, i) => (
                          <div key={i} className="max-w-md print:hidden">
                            <CustomAudioPlayer
                              src={`${API_URL}${audio.url}`}
                              name={audio.name}
                            />
                          </div>
                        ))}

                        {/* Image scrapbook grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                          {msg.attachments.filter(a => a.type === 'image').map((img, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                              onClick={() => setSelectedPhoto(`${API_URL}${img.url}`)}
                              className="bg-white p-2 pb-5 border border-pink-100/70 rounded-xl shadow-sm cursor-pointer transform hover:shadow-md transition-all shrink-0 print:border-none print:shadow-none print:p-0"
                            >
                              <div className="aspect-square w-full relative overflow-hidden rounded-lg bg-pink-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`${API_URL}${img.url}`}
                                  alt={img.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <p className="text-[9px] text-secondary-text font-semibold text-center mt-2 truncate px-1 print:hidden">
                                {img.name}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Print signature footer */}
                  <div className="hidden print:block border-t border-pink-200 pt-4 mt-8 flex justify-between items-center text-[10px] text-secondary-text">
                    <p>SatikSoul Private Keepsake System · End-to-End Encrypted Legacy</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Navigation help */}
              <div className="text-center print:hidden">
                <button
                  onClick={() => router.push('/future-messages')}
                  className="px-6 py-2.5 rounded-xl bg-primary-pink text-white text-xs font-semibold shadow-luxury hover:bg-dark-pink transition-all cursor-pointer"
                >
                  Back to All Letters
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FULLSCREEN LIGHTBOX DIALOG */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out print:hidden"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-pink-300 transition-colors text-3xl font-bold bg-white/10 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto}
                alt="Fullscreen Attachment Memory"
                className="object-contain max-w-full max-h-[85vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
