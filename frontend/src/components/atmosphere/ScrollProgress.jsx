import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const scaleX = useScrollProgress();

  return (
    <motion.div
      id="scroll-progress"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--marigold, #D3A045)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 250,
        pointerEvents: 'none',
      }}
    />
  );
}
