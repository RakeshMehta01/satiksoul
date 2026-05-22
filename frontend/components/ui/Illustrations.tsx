import React from 'react';

// Common styling for drawings to create a grain/pencil texture
const drawingFilter = (
  <defs>
    <filter id="pencil-texture">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

export const BoyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none drop-shadow-[0_15px_30px_rgba(255,61,141,0.06)] ${className}`}
    >
      {drawingFilter}
      <g filter="url(#pencil-texture)">
        {/* Soft Background Circular Blur Layer */}
        <circle cx="200" cy="220" r="140" fill="url(#bg-grad-boy)" opacity="0.35" />
        <defs>
          <radialGradient id="bg-grad-boy" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 220) rotate(90) scale(140)">
            <stop stopColor="#ffd9e8" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Head Outline & Hair (Pencil Style) */}
        <path
          d="M 120,240 C 130,220 135,160 170,140 C 190,130 215,130 235,145 C 255,160 260,190 265,220 C 270,250 265,280 250,295 C 230,315 190,320 170,305 C 150,290 145,260 145,250"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Anime Hair Strands */}
        <path
          d="M 140,165 C 135,140 160,110 180,95 C 195,85 200,90 205,100 C 215,85 235,80 250,90 C 265,100 270,120 272,140 C 275,160 265,180 260,190 C 255,200 262,205 264,215 M 165,140 C 155,120 175,105 190,115 M 215,110 C 225,95 240,100 245,115"
          stroke="#333333"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        
        {/* Soft hair shade */}
        <path
          d="M 180,95 Q 230,120 250,90 Q 265,140 260,190"
          stroke="#ff3d8d"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
        />

        {/* Closed Eyes / Reflective expression */}
        <path d="M 160,210 Q 175,215 185,210" stroke="#151515" strokeWidth="3" strokeLinecap="round" />
        <path d="M 215,212 Q 225,216 235,212" stroke="#151515" strokeWidth="3" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M 155,198 Q 170,195 180,202" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 218,200 Q 228,196 238,203" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />

        {/* Nose & Gentle Smile */}
        <path d="M 198,225 L 196,235" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
        <path d="M 188,255 Q 198,262 208,255" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />

        {/* Neck & Collar */}
        <path d="M 175,298 C 175,320 178,340 170,350" stroke="#4a4a4a" strokeWidth="2" />
        <path d="M 225,295 C 225,320 220,340 228,350" stroke="#4a4a4a" strokeWidth="2" />
        <path d="M 130,360 Q 200,390 270,360 M 150,365 L 165,395 M 248,363 L 235,395" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />

        {/* Headphones (listening to memories theme) */}
        <ellipse cx="120" cy="240" rx="14" ry="25" fill="#ffd9e8" stroke="#ff3d8d" strokeWidth="2.5" />
        <ellipse cx="270" cy="242" rx="14" ry="25" fill="#ffd9e8" stroke="#ff3d8d" strokeWidth="2.5" />
        <path d="M 120,215 C 120,150 270,150 270,217" stroke="#ff3d8d" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Floating Sparks */}
        <circle cx="90" cy="150" r="4" fill="#ff3d8d" opacity="0.5" />
        <circle cx="310" cy="180" r="3" fill="#ff3d8d" opacity="0.4" />
        <circle cx="280" cy="310" r="5" fill="#ff3d8d" opacity="0.3" />
      </g>
    </svg>
  );
};

export const GirlIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none drop-shadow-[0_15px_30px_rgba(255,61,141,0.06)] ${className}`}
    >
      {drawingFilter}
      <g filter="url(#pencil-texture)">
        {/* Soft Background Circle Blur */}
        <circle cx="200" cy="220" r="140" fill="url(#bg-grad-girl)" opacity="0.35" />
        <defs>
          <radialGradient id="bg-grad-girl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 220) rotate(90) scale(140)">
            <stop stopColor="#ffd9e8" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Head Outline (Reflective looking slightly sideways) */}
        <path
          d="M 280,240 C 270,220 265,160 230,140 C 210,130 185,130 165,145 C 145,160 140,190 135,220 C 130,250 135,280 150,295 C 170,315 210,320 230,305 C 250,290 255,260 255,250"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Anime Hair (Longer flowy strands) */}
        <path
          d="M 260,165 C 265,140 240,110 220,95 C 205,85 200,90 195,100 C 185,85 165,80 150,90 C 135,100 130,120 128,140 C 125,160 135,180 140,190 C 145,200 138,205 136,215 C 132,240 122,290 130,320 M 235,140 C 245,120 225,105 210,115 M 185,110 C 175,95 160,100 155,115"
          stroke="#333333"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M 220,95 Q 170,120 150,90 Q 135,140 140,190"
          stroke="#ff3d8d"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
        />

        {/* Closed Eyes / Peaceful dreaming expression */}
        <path d="M 240,210 Q 225,215 215,210" stroke="#151515" strokeWidth="3" strokeLinecap="round" />
        <path d="M 185,212 Q 175,216 165,212" stroke="#151515" strokeWidth="3" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M 245,198 Q 230,195 220,202" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 182,200 Q 172,196 162,203" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />

        {/* Smile & Blush Lines */}
        <path d="M 202,225 L 204,235" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
        <path d="M 212,255 Q 202,262 192,255" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Sketch blush hatchings */}
        <path d="M 222,223 L 228,218 M 226,225 L 232,220 M 172,225 L 178,220 M 176,227 L 182,222" stroke="#ff3d8d" strokeWidth="1" opacity="0.6" />

        {/* Neck & Shoulders */}
        <path d="M 225,298 C 225,320 222,340 230,350" stroke="#4a4a4a" strokeWidth="2" />
        <path d="M 175,295 C 175,320 180,340 172,350" stroke="#4a4a4a" strokeWidth="2" />
        <path d="M 270,360 Q 200,390 130,360 M 250,365 L 235,395 M 152,363 L 165,395" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />

        {/* Floating Letters out of hands */}
        <path d="M 230,330 Q 270,320 300,340" stroke="#ff3d8d" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
        <path d="M 290,325 L 315,325 L 315,345 L 290,345 Z M 290,325 L 302,335 L 315,325" stroke="#ff3d8d" strokeWidth="1.5" fill="#ffffff" />

        {/* Floating Sparks */}
        <circle cx="310" cy="150" r="4" fill="#ff3d8d" opacity="0.5" />
        <circle cx="90" cy="180" r="3" fill="#ff3d8d" opacity="0.4" />
        <circle cx="120" cy="310" r="5" fill="#ff3d8d" opacity="0.3" />
      </g>
    </svg>
  );
};

export const HandsIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[480px] h-auto select-none opacity-85 ${className}`}
    >
      {drawingFilter}
      <g filter="url(#pencil-texture)">
        {/* Center glowing memory pulse */}
        <circle cx="300" cy="150" r="60" fill="url(#hands-glow)" opacity="0.4" />
        <defs>
          <radialGradient id="hands-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 150) rotate(90) scale(60)">
            <stop stopColor="#ff3d8d" stopOpacity="0.4" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left Hand reaching out (boy) */}
        <path
          d="M 50,220 C 100,210 140,190 190,175 C 205,170 230,175 240,165 C 248,157 245,145 235,142 C 220,138 200,145 200,145 M 240,165 C 255,160 275,162 282,150 C 285,143 275,135 265,135 C 250,135 230,140 230,140 M 242,175 C 258,172 278,175 285,163 C 288,156 278,148 268,148 M 235,185 C 250,185 268,190 274,178 C 278,171 268,165 258,165"
          stroke="#4a4a4a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Hand reaching out (girl) */}
        <path
          d="M 550,220 C 500,210 460,190 410,175 C 395,170 370,175 360,165 C 352,157 355,145 365,142 C 380,138 400,145 400,145 M 360,165 C 345,160 325,162 318,150 C 315,143 325,135 335,135 C 350,135 370,140 370,140 M 358,175 C 342,172 322,175 315,163 C 312,156 322,148 332,148 M 365,185 C 350,185 332,190 326,178 C 322,171 332,165 342,165"
          stroke="#4a4a4a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Heart shaped sparkles linking the hands */}
        <path
          d="M 288,150 Q 300,138 312,150"
          stroke="#ff3d8d"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 300,135 L 302,140 M 297,143 L 303,143"
          stroke="#ff3d8d"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export const EnvelopeIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[180px] h-auto select-none ${className}`}
    >
      {/* Glow Backing */}
      <circle cx="100" cy="100" r="50" fill="#ffd9e8" opacity="0.5" filter="blur(20px)" />
      
      {/* 3D Glassmorphism styled envelope */}
      <rect x="30" y="60" width="140" height="90" rx="16" fill="rgba(255, 255, 255, 0.72)" stroke="rgba(255,61,141,0.2)" strokeWidth="1.5" />
      
      {/* Envelope Flaps */}
      <path d="M 30,60 L 100,110 L 170,60" stroke="#ff3d8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 61, 141, 0.03)" />
      <path d="M 30,150 L 85,100" stroke="rgba(255,61,141,0.2)" strokeWidth="1.5" />
      <path d="M 170,150 L 115,100" stroke="rgba(255,61,141,0.2)" strokeWidth="1.5" />

      {/* Floating hearts escaping */}
      <path d="M 90,40 Q 100,20 110,40 Q 120,20 130,40 T 110,70 Z" fill="#ff3d8d" opacity="0.8" transform="scale(0.5) translate(100, -10)" />
      <path d="M 90,40 Q 100,20 110,40 Q 120,20 130,40 T 110,70 Z" fill="#ffd9e8" opacity="0.6" transform="scale(0.3) translate(180, 50)" />
    </svg>
  );
};

export const TimelineRobot: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[180px] h-auto select-none ${className}`}
    >
      {/* Soft radial glow */}
      <circle cx="100" cy="100" r="60" fill="url(#robot-glow)" opacity="0.4" />
      <defs>
        <radialGradient id="robot-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(60)">
          <stop stopColor="#ff3d8d" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rounded heart robot chassis */}
      <path d="M 100,140 C 90,140 50,110 50,85 C 50,65 65,50 85,50 C 92,50 97,55 100,60 C 103,55 108,50 115,50 C 135,50 150,65 150,85 C 150,110 110,140 100,140 Z" fill="rgba(255, 255, 255, 0.85)" stroke="#ff3d8d" strokeWidth="2.5" />
      
      {/* Floating eyes (LED) */}
      <ellipse cx="85" cy="85" rx="5" ry="7" fill="#ff3d8d" />
      <ellipse cx="115" cy="85" rx="5" ry="7" fill="#ff3d8d" />
      
      {/* Glowing antenna */}
      <path d="M 100,50 L 100,30" stroke="#ff3d8d" strokeWidth="2.5" />
      <circle cx="100" cy="25" r="5" fill="#ff1f7a" />
      
      {/* Cute smiling mouth */}
      <path d="M 94,98 Q 100,102 106,98" stroke="#ff3d8d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export const QRMemoryIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[180px] h-auto select-none ${className}`}
    >
      {/* Soft base glow */}
      <circle cx="100" cy="100" r="55" fill="#ffe4f1" opacity="0.6" filter="blur(15px)" />
      
      {/* QR Code Outer Ring */}
      <rect x="40" y="40" width="120" height="120" rx="24" fill="rgba(255, 255, 255, 0.72)" stroke="rgba(255,61,141,0.2)" strokeWidth="1.5" />
      
      {/* QR Code Anchor Corners (Pill shape) */}
      <rect x="55" y="55" width="25" height="25" rx="6" stroke="#ff3d8d" strokeWidth="2.5" fill="none" />
      <rect x="62" y="62" width="11" height="11" rx="2" fill="#ff3d8d" />
      
      <rect x="120" y="55" width="25" height="25" rx="6" stroke="#ff3d8d" strokeWidth="2.5" fill="none" />
      <rect x="127" y="62" width="11" height="11" rx="2" fill="#ff3d8d" />

      <rect x="55" y="120" width="25" height="25" rx="6" stroke="#ff3d8d" strokeWidth="2.5" fill="none" />
      <rect x="62" y="127" width="11" height="11" rx="2" fill="#ff3d8d" />

      {/* Decorative center heart */}
      <path d="M 100,105 C 98,105 90,98 90,92 C 90,88 93,85 97,85 C 99,85 100,87 100,87 C 100,87 101,87 103,85 C 107,85 110,88 110,92 C 110,98 102,105 100,105 Z" fill="#ff1f7a" />
      
      {/* Abstract QR Grid Dots */}
      <rect x="90" y="55" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.5)" />
      <rect x="100" y="55" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.7)" />
      <rect x="90" y="68" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.8)" />
      
      <rect x="120" y="90" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.5)" />
      <rect x="132" y="90" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.7)" />
      <rect x="126" y="100" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.8)" />

      <rect x="90" y="120" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.7)" />
      <rect x="100" y="132" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.5)" />
      <rect x="95" y="142" width="6" height="6" rx="1.5" fill="rgba(255,61,141,0.8)" />
    </svg>
  );
};

export const VoiceWaves: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[180px] h-auto ${className}`}
    >
      {/* Dynamic pulse wave lines representing voice memories */}
      <rect x="20" y="45" width="6" height="10" rx="3" fill="#ffd9e8" />
      <rect x="35" y="35" width="6" height="30" rx="3" fill="#ffd9e8" />
      <rect x="50" y="20" width="6" height="60" rx="3" fill="#ff7ab6" />
      <rect x="65" y="10" width="6" height="80" rx="3" fill="#ff3d8d" />
      <rect x="80" y="30" width="6" height="40" rx="3" fill="#ff3d8d" />
      <rect x="95" y="5" width="6" height="90" rx="3" fill="#ff1f7a" />
      <rect x="110" y="25" width="6" height="50" rx="3" fill="#ff3d8d" />
      <rect x="125" y="15" width="6" height="70" rx="3" fill="#ff7ab6" />
      <rect x="140" y="35" width="6" height="30" rx="3" fill="#ffd9e8" />
      <rect x="155" y="45" width="6" height="10" rx="3" fill="#ffd9e8" />
    </svg>
  );
};
