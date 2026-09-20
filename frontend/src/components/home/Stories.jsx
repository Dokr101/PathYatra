import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import api from '../../services/api';
import fallbackReviews from '../../data/fallbackReviews';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Stories() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    api.get('/reviews/fetch.php?limit=8')
      .then((res) => {
        if (!mounted) return;
        if (res && res.success && Array.isArray(res.data)) {
          setReviews(res.data);
        } else if (Array.isArray(res)) {
          setReviews(res);
        } else {
          setReviews(fallbackReviews);
        }
      })
      .catch(() => {
        if (mounted) setReviews(fallbackReviews);
      });

    return () => { mounted = false; };
  }, []);

  const list = reviews.length > 0 ? reviews : fallbackReviews;

  // Auto-advance every 6s
  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % list.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, list.length, prefersReduced]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const currentReview = list[currentIndex] || fallbackReviews[0];

  return (
    <section
      id="reviews"
      data-section-theme="pine"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: 'var(--pine, #1B3B4B)',
        color: 'var(--snow, #F4EFE6)',
        padding: '8rem 5%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Huge low-contrast Devanagari watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '28vw',
          fontFamily: 'var(--font-accent, serif)',
          color: 'rgba(244, 239, 230, 0.03)',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        अनुभव
      </div>

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--marigold, #D3A045)',
            marginBottom: '2rem',
          }}
        >
          08 / TRAVELER STORIES
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '2.5rem' }}>
          {[...Array(currentReview.rating || 5)].map((_, i) => (
            <Star key={i} size={18} fill="var(--marigold, #D3A045)" color="var(--marigold, #D3A045)" />
          ))}
        </div>

        {/* Quote Content with Animated Slide */}
        <div style={{ minHeight: '180px', marginBottom: '2.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.25rem, 3vw, 2.1rem)',
                  lineHeight: 1.45,
                  color: 'var(--snow, #F4EFE6)',
                  maxWidth: '740px',
                  margin: '0 auto',
                }}
              >
                "{currentReview.comment}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Attribution: initials avatar, destination, trip date */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(211, 160, 69, 0.2)',
              border: '1px solid rgba(211, 160, 69, 0.4)',
              color: 'var(--marigold, #D3A045)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {currentReview.initials || 'Y.P.'}
          </div>

          <div style={{ textAlign: 'left', fontSize: '0.88rem' }}>
            <div style={{ fontWeight: 600, color: 'var(--snow, #F4EFE6)' }}>
              Traveler {currentReview.initials}
            </div>
            <div style={{ color: 'var(--stone, #A39B8D)', fontSize: '0.78rem' }}>
              Visited {currentReview.destination} · {currentReview.month} {currentReview.year}
            </div>
          </div>
        </div>

        {/* Navigation Arrows & Dot Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          <button
            onClick={prevSlide}
            aria-label="Previous traveler story"
            style={{
              background: 'transparent',
              border: '1px solid rgba(244, 239, 230, 0.2)',
              color: 'var(--snow, #F4EFE6)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {list.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to story ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: idx === currentIndex ? 'var(--marigold, #D3A045)' : 'rgba(244, 239, 230, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next traveler story"
            style={{
              background: 'transparent',
              border: '1px solid rgba(244, 239, 230, 0.2)',
              color: 'var(--snow, #F4EFE6)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
