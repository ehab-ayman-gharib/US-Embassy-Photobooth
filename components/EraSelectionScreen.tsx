import React from 'react';
import { EraData } from '../types';
import { ERAS } from '../constants';

export const EraSelectionScreen: React.FC<{ onSelectEra: (era: EraData) => void }> = ({ onSelectEra }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 overflow-hidden flex flex-col items-center justify-center cursor-none">
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="./Intro.mp4"
      />

      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center gap-12">
        <h1 
          className="text-4xl md:text-6xl text-center uppercase font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Select Your Experience
        </h1>

        <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => onSelectEra(era)}
              className="group relative w-full md:w-1/2 overflow-hidden rounded-3xl border-2 border-white/20 bg-black/40 backdrop-blur-sm p-12 transition-all hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center text-center gap-6 h-full justify-center">
                <h2 
                  className="text-3xl font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {era.name}
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {era.description}
                </p>
                <div className="mt-4 px-8 py-3 rounded-full border border-cyan-500/50 text-cyan-400 uppercase tracking-widest text-sm group-hover:bg-cyan-500 group-hover:text-black transition-colors font-bold">
                  Select
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
