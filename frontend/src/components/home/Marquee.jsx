import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PLACES = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Lumbini',
  'Bhaktapur',
  'Nagarkot',
  'Mustang',
  'Langtang',
  'Ilam',
  'Bandipur',
  'Janakpur',
  'Rara Lake',
];

export default function Marquee() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-label="Popular Nepal Destinations"
      style={{
        background: 'var(--paper, #EAE3D6)',
        color: 'var(--slate, #2B3A45)',
        borderTop: '1px solid rgba(163, 155, 141, 0.25)',
        borderBottom: '1px solid rgba(163, 155, 141, 0.25)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Edge gradient masks */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'linear-gradient(90deg, var(--paper, #EAE3D6) 0%, transparent 8%, transparent 92%, var(--paper, #EAE3D6) 100%)',
        }}
      />

      <div
        className="yp-marquee-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: prefersReduced ? 'none' : 'yp-marquee-slide 45s linear infinite',
        }}
      >
        {/* Render twice for seamless infinite loop */}
        {[...PLACES, ...PLACES].map((place, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'var(--text-lg, 1.25rem)',
              letterSpacing: '0.02em',
              fontWeight: 500,
              padding: '0 1.5rem',
            }}
          >
            <span>{place}</span>
            <span
              style={{
                marginLeft: '1.5rem',
                color: 'var(--marigold, #D3A045)',
                fontSize: '0.75rem',
                opacity: 0.8,
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes yp-marquee-slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .yp-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
