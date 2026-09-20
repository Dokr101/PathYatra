import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function MistLayer({ style = {} }) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    >
      {/* Mist Band 1 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-50%',
          width: '200%',
          height: '40%',
          opacity: 0.08,
          background: 'radial-gradient(ellipse at center, rgba(244, 239, 230, 0.7) 0%, rgba(244, 239, 230, 0) 70%)',
          animation: prefersReduced ? 'none' : 'yp-mist-drift 75s linear infinite alternate',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Mist Band 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '-30%',
          width: '180%',
          height: '35%',
          opacity: 0.06,
          background: 'radial-gradient(ellipse at center, rgba(244, 239, 230, 0.6) 0%, rgba(244, 239, 230, 0) 65%)',
          animation: prefersReduced ? 'none' : 'yp-mist-drift-rev 90s linear infinite alternate',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <style>{`
        @keyframes yp-mist-drift {
          0% { transform: translateX(-15%); }
          100% { transform: translateX(15%); }
        }
        @keyframes yp-mist-drift-rev {
          0% { transform: translateX(12%); }
          100% { transform: translateX(-12%); }
        }
      `}</style>
    </div>
  );
}
