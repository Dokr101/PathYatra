import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function PrayerFlags({ style = {} }) {
  const prefersReduced = useReducedMotion();

  // Muted Himalayan prayer flag palette (Blue, White, Red, Green, Yellow)
  const flagColors = [
    '#2B4C6F', // Muted Sky Blue
    '#E5DFD5', // Muted White / Ivory
    '#9E3D34', // Muted Red
    '#4E6B50', // Muted Sage Green
    '#C49339', // Muted Saffron Yellow
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '320px',
        height: '80px',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 10,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 320 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          animation: prefersReduced ? 'none' : 'yp-flag-sway 7s ease-in-out infinite alternate',
          transformOrigin: 'top right',
        }}
      >
        {/* Supporting Cord */}
        <path
          d="M0,15 Q160,45 320,5"
          stroke="rgba(163, 155, 141, 0.4)"
          strokeWidth="1.2"
        />

        {/* 5 Hanging Triangular Flags */}
        <path d="M25,18 L70,25 L45,62 Z" fill={flagColors[0]} opacity="0.85" />
        <path d="M85,27 L130,32 L105,68 Z" fill={flagColors[1]} opacity="0.85" />
        <path d="M145,33 L190,32 L165,66 Z" fill={flagColors[2]} opacity="0.85" />
        <path d="M205,30 L250,23 L225,58 Z" fill={flagColors[3]} opacity="0.85" />
        <path d="M265,20 L305,8 L285,45 Z" fill={flagColors[4]} opacity="0.85" />
      </svg>

      <style>{`
        @keyframes yp-flag-sway {
          0% { transform: rotate(0deg) skewX(0deg); }
          50% { transform: rotate(-1.5deg) skewX(-1.5deg) translateY(2px); }
          100% { transform: rotate(1.2deg) skewX(1deg) translateY(-1px); }
        }
      `}</style>
    </div>
  );
}
