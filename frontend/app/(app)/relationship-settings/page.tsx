'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { relationshipApi, Relationship } from '@/lib/api/relationship';

const THEMES = [
  { id: 'blush', name: 'Blush Pink 🌸', class: 'from-pink-100 to-rose-50' },
  { id: 'sunset', name: 'Warm Sunset 🌅', class: 'from-orange-100 to-amber-50' },
  { id: 'lavender', name: 'Soft Lavender 🪻', class: 'from-violet-100 to-purple-50' },
  { id: 'mint', name: 'Sage Mint 🌿', class: 'from-teal-100 to-emerald-50' },
];

export default function RelationshipSettingsPage() {
  const { getToken } = useAuth();
  const router = useRouter();

  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [name, setName] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [theme, setTheme] = useState('blush');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const rel = await relationshipApi.getMine(token);
        if (!rel) {
          router.push('/create-relationship');
          return;
        }
        setRelationship(rel);
        setName(rel.relationshipName || '');
        setTheme(rel.relationshipTheme || 'blush');
        if (rel.anniversaryDate) {
          setAnniversaryDate(new Date(rel.anniversaryDate).toISOString().split('T')[0]);
        }
      } catch (err: unknown) {
        setError((err as { message?: string }).message || 'Failed to load relationship settings.');
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationship) return;
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      
      const updated = await relationshipApi.update(
        relationship._id,
        { relationshipName: name, anniversaryDate: anniversaryDate || undefined, relationshipTheme: theme },
        token
      );
      setRelationship(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Failed to save space settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-pink-100 border-t-primary-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 md:p-8 max-w-xl mx-auto space-y-8 relative">
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-radial from-pink-100/30 to-transparent blur-[80px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-radial from-orange-100/20 to-transparent blur-[90px] pointer-events-none -z-10 animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#fffefc] border border-pink-100/40 p-6 md:p-8 rounded-[36px] shadow-luxury relative overflow-hidden"
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-white/70 border-b border-pink-100/30 rotate-[-1.5deg] shadow-sm pointer-events-none" />

        <div className="text-center space-y-3 pb-6 border-b border-pink-100/20">
          <div className="w-14 h-14 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-2xl shadow-sm">
            ⚙️
          </div>
          <h1 className="font-playfair text-2xl md:text-3xl font-black text-dark-text tracking-tight">
            Space Settings
          </h1>
          <p className="text-xs text-secondary-text font-semibold">
            Customize and adjust the settings of your private world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-primary-pink border border-rose-100 rounded-2xl text-center font-bold">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-center font-bold">
              Settings updated successfully! ✨
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
              Space Name 💗
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              className="w-full px-5 py-3.5 rounded-2xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text placeholder-secondary-text/40 focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink transition-all shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
              Anniversary Date 📅
            </label>
            <input
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              disabled={saving}
              className="w-full px-5 py-3.5 rounded-2xl bg-pink-50/20 border border-pink-100/40 text-xs font-bold text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-pink/20 focus:border-primary-pink transition-all shadow-inner"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-[11px] uppercase tracking-widest font-black text-secondary-text/80 pl-1">
              Sanctuary Theme 🎨
            </label>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  disabled={saving}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    theme === t.id
                      ? 'border-primary-pink bg-pink-50/25 ring-2 ring-primary-pink/15 shadow-sm'
                      : 'border-pink-100/40 bg-white/60 hover:bg-pink-50/10'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${t.class} border border-white shadow-sm mb-2`} />
                  <p className="text-[10px] font-black text-dark-text">{t.name}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-pink to-dark-pink text-white text-xs font-bold tracking-wider shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer font-playfair"
          >
            {saving ? 'Saving Settings... ✨' : 'Save Changes 💗'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
