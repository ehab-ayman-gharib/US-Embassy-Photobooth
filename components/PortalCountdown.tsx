import React from 'react';
import { PortalRing } from './PortalRing';

interface PortalCountdownProps {
  count: number;
}

export const PortalCountdown: React.FC<PortalCountdownProps> = ({ count }) => {
  return (
    <div className="relative flex items-center justify-center animate-scale-in" style={{ width: 480, height: 480 }}>
      {/* Reusable Three.js portal ring */}
      <PortalRing size={480} />

      {/* Countdown number overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 900,
          fontSize: '12rem',
          lineHeight: 1,
          color: '#FAF6EE',
          textShadow: '0 4px 15px rgba(0,0,0,0.85), 0 0 35px rgba(178,34,52,0.6)',
          paddingBottom: '1.5rem'
        }}
      >
        <span key={count} className="animate-ping-once">
          {count}
        </span>
      </div>

      <style>{`
        @keyframes ping-once {
          0% { transform: scale(1.35); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.1); opacity: 0; }
        }
        .animate-ping-once {
          animation: ping-once 1s ease-out forwards;
        }
        .animate-scale-in {
            animation: scale-in 0.5s ease-out forwards;
        }
        @keyframes scale-in {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
