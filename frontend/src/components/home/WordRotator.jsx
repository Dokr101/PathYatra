import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const DEFAULT_PHRASES = [
  'Annapurna dawns',
  'Kathmandu alleys',
  'Chitwan mornings',
  'Phewa Lake evenings',
];

export default function WordRotator({
  phrases = DEFAULT_PHRASES,
  interval = 2400,
  onIndexChange,
  style = {},
}) {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % phrases.length;
        if (onIndexChange) onIndexChange(next);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phrases.length, interval, onIndexChange, prefersReduced]);

  if (prefersReduced) {
    return (
      <span
        style={{
          fontFamily: 'var(--font-display, serif)',
          fontStyle: 'italic',
          color: 'var(--marigold, #D3A045)',
          ...style,
        }}
      >
        {phrases[0]}
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        height: '1.25em',
        minWidth: '220px',
        ...style,
      }}
    >
      {/* Screen reader static fallback */}
      <span className="visually-hidden">
        Highlights including Annapurna dawns, Kathmandu alleys, Chitwan mornings, and Phewa Lake evenings.
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-display, serif)',
            fontStyle: 'italic',
            color: 'var(--marigold, #D3A045)',
            whiteSpace: 'nowrap',
          }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
