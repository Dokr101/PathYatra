import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const DEFAULT_HERO_SCENES = [
  {
    name: 'Annapurna Range',
    region: 'Gandaki Province',
    coords: '28.5961° N, 83.8203° E',
    tone: '#1B3B4B',
    accent: 'rgba(211, 160, 69, 0.3)',
  },
  {
    name: 'Kathmandu Valley',
    region: 'Bagmati Province',
    coords: '27.7172° N, 85.3240° E',
    tone: '#2B3A45',
    accent: 'rgba(180, 83, 58, 0.25)',
  },
  {
    name: 'Chitwan Forests',
    region: 'Bagmati Province',
    coords: '27.5291° N, 84.3542° E',
    tone: '#1E3A34',
    accent: 'rgba(143, 165, 138, 0.3)',
  },
  {
    name: 'Phewa Lake at Dusk',
    region: 'Pokhara Valley',
    coords: '28.2096° N, 83.9856° E',
    tone: '#0E2838',
    accent: 'rgba(9, 76, 134, 0.35)',
  },
];

export default function HeroSlideshow({
  scenes = DEFAULT_HERO_SCENES,
  activeIndex = 0,
  mouseOffset = { x: 0, y: 0 },
}) {
  const prefersReduced = useReducedMotion();
  const currentScene = scenes[activeIndex] || scenes[0];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '-20px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.0 }}
          animate={{
            opacity: 1,
            scale: prefersReduced ? 1 : 1.06,
            x: mouseOffset.x * 0.5,
            y: mouseOffset.y * 0.5,
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
            scale: { duration: 20, ease: 'linear' },
            x: { duration: 0.3, ease: 'easeOut' },
            y: { duration: 0.3, ease: 'easeOut' },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 30%, ${currentScene.accent} 0%, transparent 70%), ${currentScene.tone}`,
            transition: 'background-color 1.2s ease',
          }}
        />
      </AnimatePresence>

      {/* Soft ink gradient overlay for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(15,26,34,0.3) 0%, rgba(15,26,34,0.55) 50%, rgba(15,26,34,0.92) 100%)',
        }}
      />
    </div>
  );
}
