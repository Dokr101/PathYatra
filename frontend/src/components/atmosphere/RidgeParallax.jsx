import React from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function RidgeParallax({ style = {} }) {
  const prefersReduced = useReducedMotion();
  const yBack = useParallax(0.2);
  const yMid = useParallax(0.4);
  const yFront = useParallax(0.6);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '240px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    >
      {/* Back Ridge Layer */}
      <motion.svg
        viewBox="0 0 1440 240"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.22,
          y: prefersReduced ? 0 : yBack,
        }}
      >
        <path
          d="M0,240 L0,120 Q180,60 360,110 T720,80 T1080,120 T1440,70 L1440,240 Z"
          fill="var(--ink, #0F1A22)"
        />
      </motion.svg>

      {/* Mid Ridge Layer */}
      <motion.svg
        viewBox="0 0 1440 240"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.38,
          y: prefersReduced ? 0 : yMid,
        }}
      >
        <path
          d="M0,240 L0,150 Q220,100 440,140 T880,110 T1320,150 T1440,120 L1440,240 Z"
          fill="var(--slate, #2B3A45)"
        />
      </motion.svg>

      {/* Front Ridge Layer */}
      <motion.svg
        viewBox="0 0 1440 240"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.58,
          y: prefersReduced ? 0 : yFront,
        }}
      >
        <path
          d="M0,240 L0,180 Q260,140 520,170 T1040,150 T1440,180 L1440,240 Z"
          fill="var(--pine, #1B3B4B)"
        />
      </motion.svg>
    </div>
  );
}
