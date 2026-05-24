import React, { useEffect, useRef } from 'react';
import { EraData } from '../types';
import { ERAS } from '../constants';

export const Splash: React.FC<{ onDismiss: (era: EraData) => void }> = ({ onDismiss }) => {
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      // Select random era and dismiss
      const eraIndex = Math.floor(Math.random() * ERAS.length);
      onDismiss(ERAS[eraIndex]);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 overflow-hidden cursor-none">
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="./Intro.mp4"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 pointer-events-none">
        <div
          className="text-5xl tracking-[0.5em] uppercase font-bold animate-pulse"
          style={{
            fontFamily: '"Cinzel", serif',
            color: 'rgba(0, 255, 255, 0.8)',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 80px rgba(0, 255, 255, 0.15)'
          }}
        >
          Tap to Start
        </div>
      </div>
    </div>
  );
};
