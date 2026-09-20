import React, { useEffect, useRef } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useIntro } from '../../context/IntroContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Exposed timeline constants (ms) for effortless fine-tuning
export const INTRO_TIMING = {
  BEAT_HOLD: 150,
  REVEAL_START: 100,
  REVEAL_END: 650,
  HOLD_END: 900,
  TRAVEL_START: 900,
  TRAVEL_END: 1550,
  BACKDROP_START: 950,
  BACKDROP_END: 1500,
  STAGGER_START: 1200,
  TOTAL: 1800,
};

export default function IntroOverlay() {
  const { showIntro, markIntroDone, skipIntro, navLogoRef } = useIntro();
  const prefersReduced = useReducedMotion();
  const [scope, animate] = useAnimate();
  const isFinishedRef = useRef(false);

  // Skip handlers on keydown or click
  useEffect(() => {
    if (!showIntro) return;

    const handleKeyDown = (e) => {
      skipIntro();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, skipIntro]);

  // Lock scroll during intro
  useEffect(() => {
    if (!showIntro) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    // Safety timeout: intro must never stall past 2000ms
    const safetyTimer = setTimeout(() => {
      if (!isFinishedRef.current) {
        isFinishedRef.current = true;
        markIntroDone();
      }
    }, 2000);

    // Reduced motion shortcut: simple 300ms fade out
    if (prefersReduced) {
      const runReduced = async () => {
        try {
          await animate(scope.current, { opacity: 0 }, { duration: 0.3, ease: 'easeOut' });
        } catch (_) {}
        if (!isFinishedRef.current) {
          isFinishedRef.current = true;
          markIntroDone();
        }
      };
      runReduced();
      return () => clearTimeout(safetyTimer);
    }

    // Measure target navbar logo slot
    const runIntro = async () => {
      // Find navbar slot
      let targetRect = null;
      if (navLogoRef.current) {
        targetRect = navLogoRef.current.getBoundingClientRect();
      }
      if (!targetRect || targetRect.width === 0) {
        const queryEl = document.querySelector('[data-nav-logo]');
        if (queryEl) targetRect = queryEl.getBoundingClientRect();
      }

      // Default fallback coordinates if navbar isn't rendered/measured
      const targetLeft = targetRect && targetRect.width > 0 ? targetRect.left : 40;
      const targetTop = targetRect && targetRect.height > 0 ? targetRect.top : 20;
      const targetWidth = targetRect && targetRect.width > 0 ? targetRect.width : 44;
      const targetHeight = targetRect && targetRect.height > 0 ? targetRect.height : 44;

      const introWidth = 160;
      const introHeight = 160;

      // Center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Target center
      const finalCenterX = targetLeft + targetWidth / 2;
      const finalCenterY = targetTop + targetHeight / 2;

      const deltaX = finalCenterX - centerX;
      const deltaY = finalCenterY - centerY;
      const scaleTarget = targetWidth / introWidth;

      try {
        // Timeline execution via useAnimate
        // 0-100ms: Calm ink beat
        await new Promise((r) => setTimeout(r, INTRO_TIMING.REVEAL_START));
        if (isFinishedRef.current) return;

        // 100-650ms: LOGO REVEAL (opacity 0->1, scale 0.92->1, blur 6px->0)
        await animate(
          '#intro-logo-box',
          { opacity: 1, scale: 1, filter: 'blur(0px)' },
          {
            duration: (INTRO_TIMING.REVEAL_END - INTRO_TIMING.REVEAL_START) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }
        );
        if (isFinishedRef.current) return;

        // 650-900ms: HOLD (perfectly still and crisp)
        await new Promise((r) => setTimeout(r, INTRO_TIMING.HOLD_END - INTRO_TIMING.REVEAL_END));
        if (isFinishedRef.current) return;

        // 900-1550ms: TRAVEL to navbar slot
        // Simultaneously start backdrop fade at 950ms
        const travelDuration = (INTRO_TIMING.TRAVEL_END - INTRO_TIMING.TRAVEL_START) / 1000;

        animate(
          scope.current,
          { opacity: 0 },
          {
            duration: (INTRO_TIMING.BACKDROP_END - INTRO_TIMING.BACKDROP_START) / 1000,
            delay: (INTRO_TIMING.BACKDROP_START - INTRO_TIMING.TRAVEL_START) / 1000,
            ease: 'easeOut',
          }
        );

        // Motion blur ramp during travel
        animate(
          '#intro-logo-box',
          { filter: ['blur(0px)', 'blur(2.5px)', 'blur(0px)'] },
          { duration: travelDuration, times: [0, 0.5, 1], ease: 'easeInOut' }
        );

        await animate(
          '#intro-logo-box',
          {
            x: deltaX,
            y: deltaY,
            scale: scaleTarget,
          },
          {
            duration: travelDuration,
            ease: [0.76, 0, 0.24, 1],
          }
        );

        // End of intro handoff
        if (!isFinishedRef.current) {
          isFinishedRef.current = true;
          markIntroDone();
        }
      } catch (err) {
        if (!isFinishedRef.current) {
          isFinishedRef.current = true;
          markIntroDone();
        }
      }
    };

    runIntro();

    return () => clearTimeout(safetyTimer);
  }, [showIntro, prefersReduced]);

  if (!showIntro) return null;

  return (
    <div
      ref={scope}
      id="yp-cinematic-intro"
      aria-hidden="true"
      onClick={skipIntro}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--ink, #0F1A22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        id="intro-logo-box"
        style={{
          width: '160px',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'scale(0.92)',
          filter: 'blur(6px)',
          willChange: 'transform, opacity, filter',
        }}
      >
        <img
          src="/logo.svg"
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          color: 'rgba(244, 239, 230, 0.4)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body, sans-serif)',
        }}
      >
        Click or press any key to skip
      </div>
    </div>
  );
}
