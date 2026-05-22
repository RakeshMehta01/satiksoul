'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { futureMessageApi, CreateMessageDto } from '@/lib/api/futureMessages';
import { motion } from 'framer-motion';

const TAGS = ['Love','Anniversary','Missing You','Apology','Motivation','Wedding','Long Distance','Comfort','Future Dreams'];
const DRAFT_KEY = 'satiksoul-fm-draft';

const TAG_EMOJI: Record<string, string> = {
  'Love': '❤️', 'Anniversary': '🎊', 'Missing You': '🌙', 'Apology': '🕊️',
  'Motivation': '⚡', 'Wedding': '💍', 'Long Distance': '✈️', 'Comfort': '🤍', 'Future Dreams': '🌟',
};

export default function CreateFutureMessage() {
  const { getToken } = useAuth();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<CreateMessageDto>({
    title: '', content: '', unlockDate: '', emotionalTag: 'Love', recipientNote: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);

  // Restore draft
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) { try { setForm(JSON.parse(draft)); } catch {} }
  }, []);

  // Auto-save draft every 30s
  useEffect(() => {
    const id = setInterval(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 2000);
    }, 30000);
    return () => clearInterval(id);
  }, [form]);

  const set = (k: keyof CreateMessageDto, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content || !form.unlockDate) return;
    setSaving(true);
    try {
      const token = await getToken();
      await futureMessageApi.create(form, files, token!);
      localStorage.removeItem(DRAFT_KEY);
      router.push('/future-messages');
    } catch (err) {
      console.error(err);
    } finally { setSaving(false); }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <div className="min-h-full bg-transparent relative overflow-hidden pb-12">
      {/* Decorative ambient glowing backdrops inside viewport */}
      <div className="absolute top-[10%] left-[-20%] w-[350px] h-[350px] rounded-full bg-radial from-pink-100/40 to-transparent blur-[80px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] rounded-full bg-radial from-orange-100/30 to-transparent blur-[90px] pointer-events-none -z-10 animate-float-slow" />

      {/* Sticky paper-textured header with cute details */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-pink-100/30 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <button onClick={() => router.back()} className="text-secondary-text text-xs hover:text-primary-pink transition-colors cursor-pointer font-bold flex items-center gap-1">
          ← Return to Vault
        </button>
        <div className="flex items-center gap-3">
          {autoSaved && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-[10px] text-emerald-500 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50 shadow-sm"
            >
              ✓ Draft Saved
            </motion.span>
          )}
          <button type="submit" form="create-form" disabled={saving || !form.title || !form.content || !form.unlockDate}
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-black tracking-wider shadow-luxury hover:shadow-luxury-hover hover:scale-[1.01] transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Sealing...' : 'Seal Letter 🔐'}
          </button>
        </div>
      </div>

      {/* Main Form container */}
      <form id="create-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 md:px-8 py-8 space-y-7 relative z-10">
        
        {/* Scrapbook Intro note */}
        <div className="bg-[#fffefc] border border-pink-100/40 p-5 rounded-3xl shadow-sm space-y-1 relative overflow-hidden">
          <div className="absolute right-3 top-3 text-2xl select-none opacity-40">✍️</div>
          <h2 className="font-playfair text-base font-black text-dark-text">Write something they’ll smile at later</h2>
          <p className="text-xs text-secondary-text/80 leading-relaxed font-medium">
            Draft a digital letter, attach emotional couple polaroids, or record a sweet voice note. It will remain locked and encrypted in your vault until your chosen day.
          </p>
        </div>

        {/* Letter Title */}
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">Letter Title</label>
          <input
            value={form.title} onChange={e => set('title', e.target.value)}
            placeholder="To my forever person..."
            maxLength={120}
            required
            className="w-full font-playfair text-2xl md:text-3xl font-extrabold text-dark-text bg-transparent border-none outline-none placeholder:text-secondary-text/20 resize-none focus:ring-0 focus:border-none p-0"
          />
        </div>

        {/* Recipient note / hint prompt */}
        <div className="space-y-1.5">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">When to open</label>
          <input
            value={form.recipientNote} onChange={e => set('recipientNote', e.target.value)}
            placeholder="Read this when you miss me... / For our wedding morning... 💗"
            maxLength={200}
            className="w-full font-sans text-xs text-secondary-text/90 italic bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-pink-100/40 outline-none focus:border-primary-pink/30 placeholder:text-secondary-text/40 shadow-sm"
          />
        </div>

        {/* Emotional tags */}
        <div className="space-y-2">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">Emotional Vibe Tag</label>
          <div className="flex flex-wrap gap-2">
            {TAGS.map(tag => (
              <button key={tag} type="button" onClick={() => set('emotionalTag', tag)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                  form.emotionalTag === tag
                    ? 'bg-primary-pink text-white border-primary-pink shadow-md scale-[1.03]'
                    : 'bg-white/80 text-secondary-text/80 border-pink-100/60 hover:border-primary-pink/30 hover:bg-white'
                }`}
              >
                <span className="text-[13px]">{TAG_EMOJI[tag]}</span> 
                <span className="font-playfair tracking-wide">{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content editor styled as physical lined page */}
        <div className="space-y-2">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">Your Message</label>
          <div className="relative bg-[#fffefc] rounded-[28px] border border-pink-100/40 shadow-luxury overflow-hidden">
            {/* Lined paper visual elements */}
            <div className="absolute top-0 bottom-0 left-10 w-0.5 bg-pink-100/40 pointer-events-none" />
            <span className="absolute top-4 left-6 text-5xl font-playfair text-soft-pink/40 select-none leading-none pointer-events-none">&ldquo;</span>
            <textarea
              value={form.content} onChange={e => set('content', e.target.value)}
              placeholder="Keep the little moments safe. Put your feelings into words..."
              maxLength={5000}
              rows={11}
              required
              className="w-full font-cursive text-2xl text-dark-text/90 bg-transparent outline-none resize-none px-7 pt-12 pb-6 leading-relaxed placeholder:text-secondary-text/30 placeholder:not-italic placeholder:font-sans placeholder:text-xs focus:ring-0"
            />
            <div className="px-6 pb-3 text-[9px] font-bold text-secondary-text/40 text-right select-none">{form.content.length}/5000 characters</div>
          </div>
        </div>

        {/* Unlock date */}
        <div className="space-y-2">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">Delivery Unlock Date</label>
          <div className="flex items-center gap-3.5 bg-white/90 backdrop-blur-sm rounded-2xl border border-pink-100/40 px-4 py-3.5 shadow-sm">
            <span className="text-xl select-none">📅</span>
            <div className="flex-1 flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-secondary-text/50 font-bold">Unlocks at sunrise on</span>
              <input
                type="date" value={form.unlockDate} onChange={e => set('unlockDate', e.target.value)}
                min={minDate.toISOString().split('T')[0]}
                required
                className="bg-transparent outline-none text-xs font-bold text-dark-text cursor-pointer mt-0.5 focus:ring-0 p-0 border-none"
              />
            </div>
          </div>
        </div>

        {/* File upload */}
        <div className="space-y-2">
          <label className="text-[9px] uppercase tracking-widest text-secondary-text/60 font-black">Attach Photos or Voice ({files.length}/5)</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-pink-100/80 rounded-[24px] p-8 text-center cursor-pointer hover:border-primary-pink/30 hover:bg-white/80 transition-all duration-300 bg-white/40 shadow-sm"
          >
            <span className="text-3xl select-none animate-bounce inline-block">📎</span>
            <p className="text-xs text-dark-text font-bold mt-2.5">Tap to attach memories</p>
            <p className="text-[9px] text-secondary-text/60 mt-1 font-medium">Select sweet polaroids or cute voice notes (JPG, PNG, MP3) · Max 10MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*,audio/*" multiple className="hidden"
            onChange={e => {
              const selected = Array.from(e.target.files || []).slice(0, 5 - files.length);
              setFiles(f => [...f, ...selected].slice(0, 5));
            }}
          />
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-white border border-pink-100/40 rounded-xl px-3.5 py-2 shadow-sm animate-float [animation-duration:5s]">
                  <span className="text-xs">{f.type.startsWith('image') ? '🖼️' : '🎵'}</span>
                  <span className="text-[10px] text-dark-text font-semibold max-w-[120px] truncate">{f.name}</span>
                  <button type="button" onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}
                    className="text-secondary-text/40 hover:text-rose-500 text-xs cursor-pointer ml-1 font-bold">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spacer for mobile */}
        <div className="h-4" />
      </form>
    </div>
  );
}
