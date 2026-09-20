import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntro } from '../../context/IntroContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import WordRotator from './WordRotator';
import QuickSearch from './QuickSearch';
import RidgeParallax from '../atmosphere/RidgeParallax';
import MistLayer from '../atmosphere/MistLayer';
import PrayerFlags from '../atmosphere/PrayerFlags';
import SeasonWidget from '../atmosphere/SeasonWidget';

// 4 Himalayan living landscape scenes synced with headline ticker
const HERO_SCENES = [
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

export default function Hero() {
  const { showIntro } = useIntro();
  const prefersReduced = useReducedMotion();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse parallax (desktop only, max 10px shift)
  const handleMouseMove = (e) => {
    if (prefersReduced || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 16;
    const y = (clientY / window.innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const currentScene = HERO_SCENES[activeSceneIndex];

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100dvh',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--ink, #0F1A22)',
        color: 'var(--snow, #F4EFE6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '6rem',
      }}
    >
      {/* ── LIVING LANDSCAPE BACKGROUND SLIDESHOW ── */}
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
            key={activeSceneIndex}
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

        {/* Soft ink gradient overlay for legibility (0% -> 55% -> 80%) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15,26,34,0.3) 0%, rgba(15,26,34,0.55) 50%, rgba(15,26,34,0.92) 100%)',
          }}
        />

        {/* Atmospheric Mist & Parallax Ridges */}
        <MistLayer />
        <RidgeParallax />
      </div>

      {/* ── TOP ACCESSORIES (Prayer flags & Season widget) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 5%',
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <SeasonWidget />
        <PrayerFlags />
      </div>

      {/* ── MAIN HERO CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '2.5rem 5% 4rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <motion.div
          initial={showIntro ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: showIntro ? 1.2 : 0 }}
          style={{ maxWidth: '900px' }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1rem',
              fontSize: 'var(--text-sm, 0.875rem)',
              fontFamily: 'var(--font-accent, serif)',
              color: 'var(--marigold, #D3A045)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>यात्रा पथ</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Intelligent Nepal Tourism Engine</span>
          </div>

          {/* Headline with mask reveal style */}
          <h1
            style={{
              fontSize: 'var(--text-hero, 4.5rem)',
              fontFamily: 'var(--font-display, serif)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--snow, #F4EFE6)',
              marginBottom: '1.25rem',
            }}
          >
            Let the{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: 'var(--marigold, #D3A045)',
                fontWeight: 400,
              }}
            >
              path
            </em>{' '}
            find you.
          </h1>

          {/* Synchronized Word Rotator */}
          <div style={{ marginBottom: '1.75rem', fontSize: 'var(--text-xl, 1.75rem)' }}>
            <span style={{ color: 'rgba(244, 239, 230, 0.75)', marginRight: '0.5rem' }}>
              Tailored for
            </span>
            <WordRotator
              interval={3000}
              onIndexChange={(idx) => setActiveSceneIndex(idx % HERO_SCENES.length)}
            />
          </div>

          {/* Sub-copy */}
          <p
            style={{
              fontSize: 'var(--text-md, 1.125rem)',
              color: 'rgba(244, 239, 230, 0.82)',
              lineHeight: 1.65,
              maxWidth: '54ch',
              marginBottom: '2.5rem',
            }}
          >
            Tell us where, how long and how much. YatraPath generates a personal morning-to-evening plan across Nepal in under three seconds.
          </p>

          {/* Quick Search Bar */}
          <QuickSearch />
        </motion.div>
      </div>

      {/* ── FOOTER ROW: SCENE CAPTION & TRUST STRIP ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(244, 239, 230, 0.08)',
          background: 'rgba(15, 26, 34, 0.5)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          padding: '0.85rem 5%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: 'var(--text-xs, 0.75rem)',
          color: 'rgba(244, 239, 230, 0.65)',
        }}
      >
        {/* Living landscape scene caption with subtle auto-advance progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '28px',
              height: '2px',
              background: 'rgba(244, 239, 230, 0.2)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              key={activeSceneIndex}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: 'linear' }}
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--marigold, #D3A045)',
                transformOrigin: 'left',
              }}
            />
          </div>
          <span>
            {currentScene.name.toUpperCase()} · {currentScene.region.toUpperCase()} · {currentScene.coords}
          </span>
        </div>

        {/* Trust strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(244, 239, 230, 0.8)',
          }}
        >
          <span>Season-aware</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>Budget-smart</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>Route-optimised</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>PDF ready</span>
        </div>
      </div>
    </section>
  );
}
