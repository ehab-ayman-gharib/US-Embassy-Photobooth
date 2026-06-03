import React from 'react';
import { EraData } from '../types';
import { ERAS } from '../constants';
import { Fireworks3D } from './Fireworks3D';

export const EraSelectionScreen: React.FC<{ onSelectEra: (era: EraData) => void }> = ({ onSelectEra }) => {
  // Smooth 3D Card Hover Tilt Mathematics
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // X inside card bounds
    const y = e.clientY - rect.top;  // Y inside card bounds
    
    // Deeper 3D tilt angles for heavy dimensional physical look
    const rotateX = ((y / rect.height) - 0.5) * -16;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    
    // Dynamic candlelight gloss reflection following the cursor, creating a varnished lacquer sheen
    const gloss = card.querySelector('.card-gloss') as HTMLDivElement;
    if (gloss) {
      gloss.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 235, 184, 0.18) 0%, transparent 55%)`;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.08s ease-out, shadow 0.15s ease-out';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    // Rubber-band return to center
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), shadow 0.6s ease-out';
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const gloss = card.querySelector('.card-gloss') as HTMLDivElement;
    if (gloss) {
      gloss.style.background = 'transparent';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-transparent overflow-hidden flex flex-col items-center justify-center cursor-none">
      {/* Subtle Background Video Layer */}
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.06]"
        src="./Videos/US_01.mp4"
      />

      {/* Vintage soft gradient overlay to tie video with shifting sky */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-[#050E1A]/40 via-transparent to-[#08162B]/50 pointer-events-none" />

      {/* Subtle 3D Fireworks Background (layered behind the cards) */}
      <Fireworks3D intensity="subtle" />

      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center gap-4">
        {/* Hanging Physical 3D Picture Frames Gallery */}
        <div className="w-full flex flex-col md:flex-row gap-14 justify-center items-stretch pt-16 pb-8">
          {ERAS.map((era, index) => {
            const swayClass = index === 0 ? 'animate-sway-1' : 'animate-sway-2';
            
            // Reference Color alignments
            const isRedCard = index === 0;
            const btnBg = isRedCard ? 'bg-gradient-to-b from-[#C42835] to-[#7A111B]' : 'bg-gradient-to-b from-[#2E3166] to-[#141533]';
            const textAccent = isRedCard ? 'text-[#A81724]' : 'text-[#191C4A]';

            return (
              <div 
                key={era.id} 
                className="relative w-full md:w-[420px] flex flex-col items-center"
              >
                {/* Pendulum Swaying Wrapper */}
                <div className={`${swayClass} w-full flex flex-col items-center origin-[50%_-90px] relative`}>
                  
                  {/* Single Ceiling Rope */}
                  <svg className="absolute left-1/2 -translate-x-1/2 bottom-[100%] w-2 h-[1000px] pointer-events-none z-10" overflow="visible">
                    <defs>
                      <pattern id={`braid-${era.id}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="4" height="12" fill="#B22234" />
                        <rect x="4" width="4" height="12" fill="#FAF6EE" />
                        <rect x="8" width="4" height="12" fill="#3C3B6E" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#braid-${era.id})`} filter="drop-shadow(2px 4px 4px rgba(0,0,0,0.6))" />
                  </svg>

                  {/* Gold Sphere Knot */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-[100px] z-30 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" overflow="visible">
                      <defs>
                        <radialGradient id={`gold-sphere-${era.id}`} cx="30%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#FFF2D4" />
                          <stop offset="30%" stopColor="#D4A359" />
                          <stop offset="70%" stopColor="#8C5C1B" />
                          <stop offset="100%" stopColor="#3E2503" />
                        </radialGradient>
                      </defs>
                      <circle cx="20" cy="20" r="14" fill={`url(#gold-sphere-${era.id})`} filter="drop-shadow(0 6px 8px rgba(0,0,0,0.8))" />
                    </svg>
                  </div>

                  {/* Y-Ropes branching to frame corners */}
                  <svg className="w-[75%] h-[90px] pointer-events-none z-10 absolute -top-[90px]" overflow="visible">
                    <line x1="50%" y1="20" x2="5%" y2="90" stroke={`url(#braid-${era.id})`} strokeWidth="8" strokeLinecap="round" filter="drop-shadow(2px 6px 4px rgba(0,0,0,0.5))" />
                    <line x1="50%" y1="20" x2="95%" y2="90" stroke={`url(#braid-${era.id})`} strokeWidth="8" strokeLinecap="round" filter="drop-shadow(2px 6px 4px rgba(0,0,0,0.5))" />
                  </svg>

                  {/* Dynamic 3D Heavy Wooden Picture Frame */}
                  <button
                    onClick={() => onSelectEra(era)}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="group relative w-full aspect-square max-w-[380px] overflow-hidden rounded-[26px] p-2.5 bg-gradient-to-br from-[#5E3F27] via-[#352113] to-[#150A04] border border-[#0A0502] shadow-[0_45px_90px_-15px_rgba(0,0,0,0.95)] flex flex-col justify-between transition-shadow duration-300"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                      willChange: 'transform',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Inner Gold Rim */}
                    <div className="absolute inset-2.5 rounded-[18px] border-[2px] border-[#D4A359] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
                    
                    {/* Recessed Antique Canvas */}
                    <div 
                      className="relative w-full h-full rounded-[16px] bg-[#F4EBD8] flex flex-col items-center justify-between p-8 z-10 overflow-hidden"
                      style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d', boxShadow: 'inset 0 0 50px rgba(120,95,70,0.3), inset 0 10px 20px rgba(0,0,0,0.15)' }}
                    >
                      {/* Distressed vignette */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(60,40,20,0.12)_100%)] pointer-events-none" />

                      {/* Gloss Shellac Varnish reflection */}
                      <div className="card-gloss absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20" />

                      {/* Floating Content */}
                      <div 
                        className="relative z-10 flex flex-col items-center text-center h-full justify-between py-6"
                        style={{ transform: 'translateZ(25px)' }}
                      >
                        <div className="flex flex-col items-center">
                          {/* Top Ornate Divider / Decoration */}
                          <div className="w-16 h-1.5 bg-gradient-to-r from-transparent via-[#A89379] to-transparent mb-5 opacity-60 rounded-[100%]" />

                          {/* Era Title */}
                          <h2 
                            className={`text-[28px] leading-[1.1] font-black tracking-wider ${textAccent}`}
                            style={{ fontFamily: '"IM Fell English", serif', fontStyle: 'italic', textShadow: '0 2px 2px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.7)' }}
                          >
                            {era.name}
                          </h2>
                          
                          {/* Era Description */}
                          <p 
                            className="text-[#4A423C] text-[13px] leading-relaxed font-medium px-2 mt-4 opacity-85"
                            style={{ fontFamily: '"IM Fell English", serif' }}
                          >
                            {era.description}
                          </p>
                        </div>

                        {/* Highly detailed physical 3D Capsule Button */}
                        <div className="mt-auto group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-300">
                          {/* Outer Metal Rim Base */}
                          <div className="p-[4px] rounded-full bg-gradient-to-b from-[#F2D7A2] via-[#C49A50] to-[#503512] shadow-[0_12px_20px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.6)]">
                            {/* Inner Glossy Gel Button */}
                            <div className={`px-12 py-2.5 rounded-full ${btnBg} shadow-[inset_0_-6px_12px_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(255,255,255,0.25)] flex items-center justify-center border-t border-[#FFFFFF]/30`}>
                              <span className="text-[#F8F9FA] uppercase tracking-[0.25em] text-[10px] font-black drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                                Enter
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Title positioned elegantly at the bottom of the screen */}
        <h1 
          className="relative mt-12 mb-8 z-50 text-5xl md:text-6xl text-center text-[#E8D5B5] select-none pointer-events-none animate-pulse-slow w-full"
          style={{ 
            fontFamily: '"IM Fell English", serif',
            letterSpacing: '0.05em',
            textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.8)'
          }}
        >
          Select Your Experience
        </h1>
      </div>

      {/* Sway Pendulum Keyframe Animations */}
      <style>{`
        @keyframes sway-card-1 {
          0% { transform: rotate(-2deg); }
          50% { transform: rotate(1.8deg); }
          100% { transform: rotate(-2deg); }
        }
        @keyframes sway-card-2 {
          0% { transform: rotate(1.5deg); }
          50% { transform: rotate(-2.2deg); }
          100% { transform: rotate(1.5deg); }
        }
        .animate-sway-1 {
          animation: sway-card-1 7.6s ease-in-out infinite;
        }
        .animate-sway-2 {
          animation: sway-card-2 9.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
