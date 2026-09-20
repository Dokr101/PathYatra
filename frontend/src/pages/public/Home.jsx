import React, { Suspense, lazy, useEffect } from 'react';
import IntroOverlay from '../../components/intro/IntroOverlay';
import Hero from '../../components/home/Hero';
import Marquee from '../../components/home/Marquee';
import HowItWorks from '../../components/home/HowItWorks';
import EngineDemo from '../../components/home/EngineDemo';
import FeaturedDestinations from '../../components/home/FeaturedDestinations';
import Skeleton from '../../components/ui/Skeleton';
import { useSectionTheme } from '../../hooks/useSectionTheme';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Code-split below-the-fold heavy sections
const MapTeaser = lazy(() => import('../../components/home/MapTeaser'));
const InterestCarousel = lazy(() => import('../../components/home/InterestCarousel'));
const TrendingItineraries = lazy(() => import('../../components/home/TrendingItineraries'));
const Stats = lazy(() => import('../../components/home/Stats'));
const Stories = lazy(() => import('../../components/home/Stories'));
const FinalCTA = lazy(() => import('../../components/home/FinalCTA'));

export default function Home() {
  useSectionTheme();
  const prefersReduced = useReducedMotion();

  // Optional smooth scroll via Lenis (disabled for reduced motion or touch devices)
  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [prefersReduced]);

  return (
    <div id="home-page" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Cinematic Intro Overlay: first-session only, FLIP animation to navbar */}
      <IntroOverlay />

      <main id="main-content">
        <Hero />
        <Marquee />
        <HowItWorks />
        <EngineDemo />
        <FeaturedDestinations />

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="400px" borderRadius="16px" /></div>}>
          <MapTeaser />
        </Suspense>

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="320px" borderRadius="16px" /></div>}>
          <InterestCarousel />
        </Suspense>

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="300px" borderRadius="16px" /></div>}>
          <TrendingItineraries />
        </Suspense>

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="150px" borderRadius="16px" /></div>}>
          <Stats />
        </Suspense>

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="350px" borderRadius="16px" /></div>}>
          <Stories />
        </Suspense>

        <Suspense fallback={<div style={{ padding: '4rem 5%' }}><Skeleton height="300px" borderRadius="16px" /></div>}>
          <FinalCTA />
        </Suspense>
      </main>
    </div>
  );
}
