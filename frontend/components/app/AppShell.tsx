'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser, useAuth } from '@clerk/nextjs';
import { relationshipApi, Relationship } from '@/lib/api/relationship';

// Custom hand-drawn outline SVG icons that feel soft, unique, and premium
const HomeIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="rgba(255, 61, 141, 0.04)" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LettersIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 6.5c0-.8.7-1.5 1.5-1.5h16c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5z" fill="rgba(255, 61, 141, 0.04)" />
    <path d="M2.5 7.5l9.5 6 9.5-6" />
    <path d="M7 13.5l-4 4.5M17 13.5l4 4.5" />
    <path d="M12 15c.8 0 1.5-.5 1.5-1.2 0-.8-1.5-2.3-1.5-2.3s-1.5 1.5-1.5 2.3c0 .7.7 1.2 1.5 1.2z" fill="var(--color-primary-pink)" stroke="none" />
  </svg>
);

const MemoriesIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="15" rx="2" fill="rgba(255, 61, 141, 0.04)" />
    <circle cx="12" cy="11.5" r="4.5" />
    <circle cx="12" cy="11.5" r="1.5" fill="currentColor" className="text-primary-pink" />
    <circle cx="18" cy="7" r="1" fill="currentColor" />
    <path d="M4.5 7.5h1.5M5.2 6.8v1.4" strokeWidth="1" />
  </svg>
);

const TimelineIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h3l2.5-6.5L12 18.5 14.5 9 17 13.5h4" />
    <path d="M12 4.5c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8L12 10 9.2 7.3c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0z" fill="var(--color-soft-pink)" stroke="var(--color-primary-pink)" strokeWidth="1" />
  </svg>
);

const CuratorIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c.1 2.5 1.5 3.9 4 4-2.5.1-3.9 1.5-4 4-.1-2.5-1.5-3.9-4-4 2.5-.1 3.9-1.5 4-4z" fill="var(--color-soft-pink)" stroke="var(--color-primary-pink)" strokeWidth="1" />
    <path d="M6 16c.1 1.2.7 1.8 1.8 1.9-1.1.1-1.7.7-1.8 1.8-.1-1.1-.7-1.7-1.8-1.8 1.1-.1 1.7-.7 1.8-1.8z" fill="var(--color-primary-pink)" stroke="none" />
    <path d="M18 13c.1 1.2.7 1.8 1.8 1.9-1.1.1-1.7.7-1.8 1.8-.1-1.1-.7-1.7-1.8-1.8 1.1-.1 1.7-.7 1.8-1.8z" fill="var(--color-primary-pink)" stroke="none" />
  </svg>
);

const QRSharingIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h7v7H4z" fill="rgba(255, 61, 141, 0.04)" />
    <path d="M13 4h7v7h-7z" />
    <path d="M4 13h7v7H4z" />
    <path d="M14 14h2M18 14h2M14 16h6M14 18h3M18 18h2" strokeWidth="1.2" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="var(--color-primary-pink)" stroke="none" />
    <circle cx="16.5" cy="7.5" r="1.2" fill="var(--color-primary-pink)" stroke="none" />
    <circle cx="7.5" cy="16.5" r="1.2" fill="var(--color-primary-pink)" stroke="none" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill="rgba(255, 61, 141, 0.04)" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const nav = [
  { href: '/shared-home', Icon: HomeIcon, label: 'Sanctuary' },
  { href: '/future-messages', Icon: LettersIcon, label: 'Letters' },
  { href: '/memories', Icon: MemoriesIcon, label: 'Memories' },
  { href: '/timeline', Icon: TimelineIcon, label: 'Timeline' },
  { href: '/assistant', Icon: CuratorIcon, label: 'Curator' },
  { href: '/qr', Icon: QRSharingIcon, label: 'QR Pages' },
  { href: '/relationship-settings', Icon: SettingsIcon, label: 'Settings' },
];

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [loadingRel, setLoadingRel] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          const rel = await relationshipApi.getMine(token);
          setRelationship(rel);
        }
      } catch (err) {
        console.error('Error fetching relationship in AppShell:', err);
      } finally {
        setLoadingRel(false);
      }
    })();
  }, [getToken, pathname]);

  useEffect(() => {
    if (!loadingRel) {
      if (!relationship) {
        router.push('/create-relationship');
      }
    }
  }, [loadingRel, relationship, router]);

  // Determine days since anniversary or creation
  const getDaysCount = () => {
    if (!relationship) return 0;
    const date = relationship.anniversaryDate
      ? new Date(relationship.anniversaryDate)
      : new Date(relationship.createdAt);
    const diff = Math.abs(Date.now() - date.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const daysCount = getDaysCount();

  if (loadingRel || !relationship) {

    return (
      <div className="h-screen w-screen bg-[#fffcfb] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Soft floating blur orbs */}
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-radial from-pink-100/50 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-radial from-orange-100/40 to-transparent blur-3xl pointer-events-none" />
        
        <div className="text-center space-y-4 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center shadow-md">
            <span className="text-3xl animate-spin select-none" style={{ animationDuration: '3s' }}>🌸</span>
          </div>
          <p className="font-playfair text-lg font-bold text-dark-text tracking-wide">
            Opening your sanctuary...
          </p>
          <p className="font-cursive text-xl text-primary-pink animate-pulse">
            a private world for two 💗
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex h-screen bg-[#fffcfb] overflow-hidden relative">
      {/* Decorative premium ambient glowing backdrops for deep romance */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-pink-100/50 to-transparent blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-radial from-orange-100/40 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-radial from-pink-50/30 to-transparent blur-[90px] pointer-events-none z-0 animate-pulse" />

      {/* Sidebar — desktop floating luxurious scrapbook panel */}
      <aside className="hidden md:flex flex-col w-66 m-5 rounded-[32px] border border-white/60 bg-gradient-to-b from-white/95 via-pink-50/30 to-white/90 shadow-luxury shrink-0 z-10 relative overflow-hidden">
        {/* Ambient floating glow behind sidebar */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-pink/5 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/10 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Subtle physical paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-repeat bg-[size:150px] bg-center mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")` }} />

        {/* Logo and Brand Header */}
        <div className="px-7 py-7 border-b border-pink-100/40 relative">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-3xl transition-transform duration-500 group-hover:rotate-12 select-none">🌸</span>
            <span className="font-playfair text-xl font-extrabold tracking-tight text-dark-text bg-gradient-to-r from-dark-text via-primary-pink to-dark-pink bg-clip-text text-transparent">
              SatikSoul
            </span>
          </Link>
          <p className="text-[9px] uppercase tracking-[0.2em] text-secondary-text/60 mt-1 pl-9 font-bold">A private digital world</p>
        </div>

        {/* Relationship Status sticker */}
        {!loadingRel && (
          relationship ? (
            <div className="px-5 py-4 mx-4 mt-5 rounded-2xl bg-gradient-to-br from-pink-50/70 via-rose-50/30 to-cream/60 border border-white/80 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-1 left-8 w-10 h-3 bg-white/60 border-b border-pink-100/30 rotate-[-4deg] opacity-70" />
              <div className="absolute -right-6 -bottom-6 text-6xl opacity-[0.07] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 select-none">🫶</div>
              
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center font-playfair text-xs font-bold text-primary-pink shadow-md shrink-0">
                  💖
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-secondary-text/70">
                    {relationship.relationshipStatus === 'active' ? 'Holding hands for' : 'Waiting for partner'}
                  </p>
                  <p className="text-xs font-extrabold text-dark-text mt-0.5 flex items-center gap-1">
                    {relationship.relationshipStatus === 'active' ? `${daysCount} days` : 'Link Pending'} <span className="text-primary-pink animate-pulse">💗</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4 mx-4 mt-5 rounded-2xl bg-gradient-to-br from-pink-50/30 via-rose-50/10 to-orange-50/20 border border-dashed border-pink-200/50 relative overflow-hidden text-center">
              <p className="text-[10px] font-bold text-secondary-text/80 mb-2 leading-relaxed">
                Connect with your person to unlock the shared vault.
              </p>
              <button
                onClick={() => router.push('/create-relationship')}
                className="px-4 py-2 bg-gradient-to-r from-primary-pink to-dark-pink text-white rounded-xl text-[9px] font-black uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Create Sanctuary 🌸
              </button>
            </div>
          )
        )}

        {/* Custom Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 relative overflow-y-auto">
          {nav.map(({ href, Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 group relative ${
                  active
                    ? 'bg-gradient-to-r from-primary-pink/10 to-pink-50/40 text-primary-pink border border-pink-100/30 shadow-sm font-extrabold scale-[1.01]'
                    : 'text-secondary-text/80 hover:bg-pink-50/40 hover:text-dark-text border border-transparent hover:translate-x-1'
                }`}
              >
                <span className={`transition-all duration-300 ${active ? 'text-primary-pink drop-shadow-[0_2px_4px_var(--color-primary-pink)]' : 'text-secondary-text/60 group-hover:text-primary-pink'}`}>
                  <Icon />
                </span>
                <span className="font-playfair tracking-wide">{label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-pink to-dark-pink shadow-[0_0_8px_var(--color-primary-pink)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Handwritten Accent Decorator */}
        <div className="px-6 py-2 text-center select-none print:hidden mb-1">
          <span className="font-cursive text-xl text-primary-pink/70 rotate-[-1.5deg] inline-block tracking-wide hover:scale-105 transition-transform">
            for two people 💗
          </span>
        </div>

        {/* User Card */}
        <div className="px-4 py-4 m-4 rounded-3xl bg-white/50 border border-white/70 shadow-sm flex items-center gap-3 relative">
          <div className="relative">
            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10 border border-pink-100 shadow-sm' } }} />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-dark-text truncate">
              {user?.firstName || 'You'} <span className="font-normal text-[9px] text-primary-pink font-cursive ml-0.5">online</span>
            </p>
            <p className="text-[8px] text-secondary-text/60 truncate font-mono mt-0.5">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* Mobile top romantic header */}
        <header className="md:hidden flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-md border-b border-pink-100/30">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌸</span>
            <span className="font-playfair text-base font-black text-dark-text tracking-tight">SatikSoul</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-primary-pink bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100/40 shadow-sm">
              {relationship?.relationshipStatus === 'active' ? `${daysCount}d 💗` : 'Setup 🌸'}
            </span>
            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 border border-pink-50' } }} />
          </div>
        </header>

        {/* Page Content viewport */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-6 relative bg-transparent">
          {children}
        </main>

        {/* Mobile floating bottom nav with premium rounded iOS style */}
        <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white/85 backdrop-blur-lg border border-white/70 rounded-3xl py-2 px-2 flex justify-around shadow-luxury z-40">
          {nav.map(({ href, Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`flex-1 flex flex-col items-center py-1 gap-1 text-[9px] font-bold tracking-wide transition-all ${
                  active ? 'text-primary-pink' : 'text-secondary-text/70'
                }`}
              >
                <span className={`p-1.5 rounded-xl transition-all ${active ? 'bg-pink-100/40 text-primary-pink scale-110 shadow-sm' : ''}`}>
                  <Icon />
                </span>
                <span className="text-[8px] font-extrabold tracking-wide font-playfair">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
