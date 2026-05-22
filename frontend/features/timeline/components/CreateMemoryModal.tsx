'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { timelineApi } from '@/lib/api/timeline';

interface CreateMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TAG_OPTIONS = [
  { value: 'Happy', label: '😊 Happy', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'Romantic', label: '💖 Romantic', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
  { value: 'Missing You', label: '🥺 Missing You', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { value: 'Milestone', label: '✨ Milestone', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'Adventure', label: '🌊 Adventure', bg: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { value: 'Anniversary', label: '🎁 Anniversary', bg: 'bg-purple-50 text-purple-700 border-purple-200' },
];

export const CreateMemoryModal: React.FC<CreateMemoryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { getToken } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [memoryDate, setMemoryDate] = useState(new Date().toISOString().split('T')[0]);
  const [emotionalTag, setEmotionalTag] = useState('Romantic');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const updatedFiles = [...files, ...selected].slice(0, 6); // Limit to 6
      setFiles(updatedFiles);

      const updatedPreviews = updatedFiles.map(file => URL.createObjectURL(file));
      setPreviews(updatedPreviews);
    }
  };

  const removePhoto = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please add at least one polaroid photo to save this memory 📸');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error('Unauthenticated');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('caption', caption);
      formData.append('memoryDate', memoryDate);
      formData.append('emotionalTag', emotionalTag);
      files.forEach(file => {
        formData.append('images', file);
      });

      await timelineApi.create(formData, token);
      
      // Reset form
      setTitle('');
      setCaption('');
      setMemoryDate(new Date().toISOString().split('T')[0]);
      setEmotionalTag('Romantic');
      setFiles([]);
      setPreviews([]);
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while sealing your memory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel p-6 md:p-8 shadow-luxury border border-white/50 bg-white/95"
          >
            {/* Ambient Soft Orb */}
            <div className="absolute top-0 right-0 -z-10 w-48 h-48 rounded-full bg-soft-pink/30 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-dark-text tracking-wide">Seal a New Memory</h3>
                <p className="text-sm text-secondary-text mt-1">Capture a beautiful moment in your private digital scrapbook.</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-rose-50 text-secondary-text hover:text-primary-pink transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-800 text-sm flex items-start gap-2.5"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload Grid */}
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">Polaroid Photos (Max 6)</label>
                
                <div className="grid grid-cols-3 gap-3">
                  {previews.map((preview, i) => (
                    <motion.div
                      layout
                      key={preview}
                      className="relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-50 border border-stone-200/60 p-2 shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative w-full h-[80%] bg-stone-100 rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[20%] flex justify-center items-center">
                        <span className="text-[10px] text-stone-400 font-cursive">Polaroid {i + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-3 right-3 p-1 rounded-full bg-black/60 hover:bg-black/80 text-white hover:scale-105 transition-all duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}

                  {previews.length < 6 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[4/5] rounded-xl border-2 border-dashed border-rose-200 hover:border-primary-pink/50 hover:bg-rose-50/20 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                    >
                      <div className="p-2.5 rounded-full bg-rose-50/80 text-primary-pink">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-secondary-text">Add Photo</span>
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="memory-title" className="block text-sm font-medium text-dark-text mb-2">Memory Title</label>
                <input
                  type="text"
                  id="memory-title"
                  required
                  placeholder="e.g. Picnic under the Sakura trees 🌸"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary-pink/40 bg-white/50 focus:bg-white text-dark-text outline-none transition-all duration-200"
                />
              </div>

              {/* Caption */}
              <div>
                <label htmlFor="memory-caption" className="block text-sm font-medium text-dark-text mb-2">Write Your Story</label>
                <textarea
                  id="memory-caption"
                  required
                  rows={4}
                  placeholder="Tell the story behind this moment... What did you talk about? How did it feel?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-rose-100 focus:border-primary-pink/40 bg-white/50 focus:bg-white text-dark-text outline-none transition-all duration-200 resize-none font-serif text-sm leading-relaxed"
                />
              </div>

              {/* Date & Tag Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="memory-date" className="block text-sm font-medium text-dark-text mb-2">Memory Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="memory-date"
                      required
                      value={memoryDate}
                      onChange={(e) => setMemoryDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-100 focus:border-primary-pink/40 bg-white/50 focus:bg-white text-dark-text outline-none transition-all duration-200"
                    />
                    <Calendar className="w-4 h-4 text-primary-pink absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label htmlFor="memory-tag" className="block text-sm font-medium text-dark-text mb-2">Emotional Vibe</label>
                  <div className="relative">
                    <select
                      id="memory-tag"
                      value={emotionalTag}
                      onChange={(e) => setEmotionalTag(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-rose-100 focus:border-primary-pink/40 bg-white/50 focus:bg-white text-dark-text outline-none transition-all duration-200 appearance-none"
                    >
                      {TAG_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <Tag className="w-4 h-4 text-primary-pink absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-rose-100/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl hover:bg-rose-50 text-secondary-text hover:text-primary-pink transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-pink to-dark-pink text-white hover:shadow-lg hover:shadow-primary-pink/20 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer font-medium"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sealing Memory...
                    </>
                  ) : (
                    'Seal Memory 💗'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
