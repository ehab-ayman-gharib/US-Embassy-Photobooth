import React from 'react';
import { Fireworks3D } from './Fireworks3D';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-transparent overflow-hidden cursor-none">
      {/* 3D WebGL Fireworks Celebration Background */}
      <Fireworks3D intensity="medium" />

      {/* Atmospheric vignette overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-tr from-[#050E1A]/40 via-transparent to-[#08162B]/30 pointer-events-none" />

      {/* Reusing the elegant 3D Hanging Frame Design from EraSelectionScreen */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        <div className="relative w-full md:w-[420px] flex flex-col items-center animate-sway-loading">
          
          {/* Pendulum Swaying Wrapper */}
          <div className="w-full flex flex-col items-center origin-[50%_-90px] relative">
            
            {/* Single Ceiling Rope */}
            <svg className="absolute left-1/2 -translate-x-1/2 bottom-[100%] w-2 h-[1000px] pointer-events-none z-10" overflow="visible">
              <defs>
                <pattern id="braid-loading" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="4" height="12" fill="#B22234" />
                  <rect x="4" width="4" height="12" fill="#FAF6EE" />
                  <rect x="8" width="4" height="12" fill="#3C3B6E" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#braid-loading)" filter="drop-shadow(2px 4px 4px rgba(0,0,0,0.6))" />
            </svg>

            {/* Gold Sphere Knot */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-[100px] z-30 pointer-events-none">
              <svg width="40" height="40" viewBox="0 0 40 40" overflow="visible">
                <defs>
                  <radialGradient id="gold-sphere-loading" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFF2D4" />
                    <stop offset="30%" stopColor="#D4A359" />
                    <stop offset="70%" stopColor="#8C5C1B" />
                    <stop offset="100%" stopColor="#3E2503" />
                  </radialGradient>
                </defs>
                <circle cx="20" cy="20" r="14" fill="url(#gold-sphere-loading)" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.8))" />
              </svg>
            </div>

            {/* Y-Ropes branching to frame corners */}
            <svg className="w-[75%] h-[90px] pointer-events-none z-10 absolute -top-[90px]" overflow="visible">
              <line x1="50%" y1="20" x2="5%" y2="90" stroke="url(#braid-loading)" strokeWidth="8" strokeLinecap="round" filter="drop-shadow(2px 6px 4px rgba(0,0,0,0.5))" />
              <line x1="50%" y1="20" x2="95%" y2="90" stroke="url(#braid-loading)" strokeWidth="8" strokeLinecap="round" filter="drop-shadow(2px 6px 4px rgba(0,0,0,0.5))" />
            </svg>

            {/* Dynamic 3D Heavy Wooden Picture Frame */}
            <div className="group relative w-full aspect-square max-w-[380px] overflow-hidden rounded-[26px] p-2.5 bg-gradient-to-br from-[#5E3F27] via-[#352113] to-[#150A04] border border-[#0A0502] shadow-[0_45px_90px_-15px_rgba(0,0,0,0.95)] flex flex-col justify-between">
              {/* Inner Gold Rim */}
              <div className="absolute inset-2.5 rounded-[18px] border-[2px] border-[#D4A359] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
              
              {/* Recessed Antique Canvas */}
              <div className="relative w-full h-full rounded-[16px] bg-[#F4EBD8] flex flex-col items-center justify-center p-8 z-10 overflow-hidden shadow-[inset_0_0_50px_rgba(120,95,70,0.3),inset_0_10px_20px_rgba(0,0,0,0.15)]">
                {/* Distressed vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(60,40,20,0.12)_100%)] pointer-events-none" />

                {/* Floating Content */}
                <div className="relative z-10 flex flex-col items-center text-center justify-center h-full">
                  <div className="w-16 h-1.5 bg-gradient-to-r from-transparent via-[#A89379] to-transparent mb-5 opacity-60 rounded-[100%]" />
                  <h3
                    className="text-[34px] md:text-[40px] leading-[1.1] font-black tracking-wider text-[#191C4A] animate-pulse-slow"
                    style={{ fontFamily: '"IM Fell English", serif', fontStyle: 'italic', textShadow: '0 2px 2px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.7)' }}
                  >
                    Recreating<br />History
                  </h3>
                  <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="text-[#4A423C] text-[13px] font-bold opacity-85 uppercase tracking-[0.25em] animate-pulse">
                      Please Wait
                    </p>
                    {/* Animated loading dots */}
                    <div className="flex gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 bg-[#8C2333] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-[#3C3B6E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-[#D4A359] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security message */}
        <p
          className="mt-12 text-[33px] text-[#FAF6EE] tracking-wider animate-pulse relative z-10 text-center max-w-3xl w-full px-6 brand-font"
          style={{ 
            fontFamily: '"IM Fell English", serif',
            fontStyle: 'italic',
            textShadow: '0 4px 15px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,1)'
          }}
        >
          Your celebration portraits are securely<br />removed at the end of your session.
        </p>
      </div>

      <style>{`
        @keyframes sway-loading {
          0% { transform: rotate(-1.5deg); }
          50% { transform: rotate(1.5deg); }
          100% { transform: rotate(-1.5deg); }
        }
        .animate-sway-loading {
          animation: sway-loading 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.02); opacity: 0.75; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
