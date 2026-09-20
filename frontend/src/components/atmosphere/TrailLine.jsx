import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function TrailLine() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: '24px',
        bottom: 0,
        width: '12px',
        pointerEvents: 'none',
        zIndex: 50,
        display: 'none',
      }}
      className="yp-trail-line"
    >
      {/* Background guide rail */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '5px',
          width: '1px',
          background: 'rgba(163, 155, 141, 0.15)',
        }}
      />

      {/* Animated dotted progress line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '5px',
          width: '2px',
          height: '100%',
          background: 'var(--marigold, #D3A045)',
          transformOrigin: 'top',
          scaleY: progress,
        }}
      />

      <style>{`
        @media (min-width: 1400px) {
          .yp-trail-line { display: block !important; }
        }
      `}</style>
    </div>
  );
}
