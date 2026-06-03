import React from 'react';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { EraData } from '../types';

interface CapturePreviewProps {
  imageSrc: string;
  onRetake: () => void;
  onProceed: () => void;
  era: EraData | null;
}

export const CapturePreview: React.FC<CapturePreviewProps> = ({ 
  imageSrc, 
  onRetake, 
  onProceed, 
  era 
}) => {

  return (
    <div className="h-full w-full relative overflow-hidden bg-transparent flex flex-col items-center justify-center p-6">
      {/* Background - Vintage overlays over shifting gradient */}
      <div className="absolute inset-0 z-0 bg-transparent flex items-center justify-center pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-tr from-[#050E1A]/40 via-transparent to-[#08162B]/35 z-5" />
         <div className="absolute inset-0 bg-black/15 backdrop-blur-sm z-10" />
      </div>

      {/* Main Preview Container - Antique double frame border */}
      <div className="w-full max-h-[72vh] flex items-center justify-center animate-scale-in relative z-10">
        <div className="h-full aspect-[2/3] max-w-full relative bg-[#FAF7F2] p-3 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-2 border-[#D2C5AD]">
          <div className="w-full h-full rounded-[38px] overflow-hidden border border-[#D2C5AD]/60">
            <img 
              src={imageSrc} 
              alt="Captured Preview" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Actions Container - Bottom Center */}
      <div className="relative z-20 flex flex-col items-center gap-6 mt-12 w-full animate-slide-in-bottom">
        
        {/* Action Buttons */}
        <div className="flex gap-6">
          {/* Retake Button - Patriot Blue Line Style */}
          <button
            onClick={onRetake}
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-[#FAF7F2] hover:bg-[#3C3B6E] text-[#3C3B6E] hover:text-[#FAF6EE] font-bold rounded-[24px] shadow-lg border-2 border-[#3C3B6E] active:scale-95 transition-all duration-300 min-w-[200px]"
          >
            <RotateCcw className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
            <span className="text-lg uppercase tracking-widest brand-font">Retake</span>
          </button>
          
          {/* Proceed Button - Patriot Red Style */}
          <button
            onClick={onProceed}
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-[#B22234] hover:bg-[#D32F2F] text-[#FAF6EE] font-bold rounded-[24px] shadow-[0_12px_30px_rgba(178,34,52,0.25)] border-b-4 border-[#7F171F] active:border-b-0 active:translate-y-1 transition-all duration-300 min-w-[200px]"
          >
            <span className="text-lg uppercase tracking-widest brand-font">Proceed</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .brand-font {
          font-family: 'IM Fell English', serif;
        }

        @keyframes scale-in {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-in-bottom {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards opacity(0);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
