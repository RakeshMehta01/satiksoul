import React from 'react';

export default function PublicInviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#faf8f5] overflow-x-hidden relative flex items-center justify-center py-10 px-4">
      {/* Cinematic ambient floating glow orbs */}
      <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-radial from-pink-100/50 to-transparent blur-[90px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-radial from-orange-100/40 to-transparent blur-[110px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-[40%] right-[30%] w-[25vw] h-[25vw] rounded-full bg-radial from-pink-50/40 to-transparent blur-[70px] pointer-events-none -z-10 animate-pulse" />

      {/* Subtle realistic paper texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-repeat bg-[size:150px] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <div className="w-full max-w-xl relative z-10">
        {children}
      </div>
    </div>
  );
}
