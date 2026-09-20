import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, FileText, CheckCircle, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STEPS = [
  {
    num: '01',
    devanagari: '०१',
    title: 'Set preferences',
    subtitle: 'Pick destinations, dates, budget and what you love.',
    detail: 'Four simple inputs define your journey. Select your favorite regions, dates, spending limit in NPR, and specific interests from trekking to spiritual heritage.',
  },
  {
    num: '02',
    devanagari: '०२',
    title: 'Generate the plan',
    subtitle: 'Our engine filters by season, scores interests, respects budget, and orders the route.',
    detail: 'An 8-phase optimization pipeline runs in under 3 seconds: prunes monsoon-incompatible passes, calculates Haversine nearest-neighbors, and schedules morning, afternoon, and evening slots.',
  },
  {
    num: '03',
    devanagari: '०३',
    title: 'Travel with clarity',
    subtitle: 'Save it, share it, or download a high-res PDF and go.',
    detail: 'Review your interactive route map, day-wise breakdown, lodging tier recommendations, and travel advisories. One-click PDF generation ready for offline exploration.',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);

      if (progress < 0.35) {
        setActiveStep(0);
      } else if (progress < 0.7) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '220vh',
        background: 'var(--snow, #F4EFE6)',
        color: 'var(--ink, #0F1A22)',
      }}
    >
      {/* Faint topographic contour-line SVG pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 25 5, 50 20 T 100 20 M0 40 Q 25 25, 50 40 T 100 40 M0 60 Q 25 45, 50 60 T 100 60 M0 80 Q 25 65, 50 80 T 100 80' fill='none' stroke='%230F1A22' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Sticky Content Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '2rem 5%',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Left Column: Steps with Animated SVG Path */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '1rem',
              }}
            >
              01 / HOW IT WORKS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'var(--text-3xl, 2.5rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '2.5rem',
              }}
            >
              Three steps, <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>one path</em>.
            </h2>

            {/* Stepper list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      cursor: 'pointer',
                      paddingLeft: '2.5rem',
                      position: 'relative',
                      opacity: isActive ? 1 : 0.45,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {/* Active dot indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.35rem',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: isActive ? 'var(--marigold, #D3A045)' : 'var(--stone, #A39B8D)',
                        boxShadow: isActive ? '0 0 0 4px rgba(211, 160, 69, 0.2)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <div
                      style={{
                        fontFamily: 'var(--font-accent, serif)',
                        fontSize: '0.85rem',
                        color: 'var(--marigold, #D3A045)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {step.num} · {step.devanagari}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(15, 26, 34, 0.75)', lineHeight: 1.55 }}>
                      {step.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Mock Panels */}
          <div style={{ position: 'relative', minHeight: '440px' }}>
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="panel-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '2.25rem',
                    boxShadow: '0 20px 40px rgba(15, 26, 34, 0.08)',
                    border: '1px solid rgba(163, 155, 141, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem' }}>
                    <Compass size={22} color="var(--marigold, #D3A045)" />
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Traveler Preferences Wizard</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--paper, #EAE3D6)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stone, #A39B8D)' }}>DESTINATIONS</div>
                      <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>Pokhara, Annapurna Sanctuary</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--paper, #EAE3D6)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stone, #A39B8D)' }}>DURATION</div>
                        <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>7 Days</div>
                      </div>
                      <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--paper, #EAE3D6)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stone, #A39B8D)' }}>BUDGET</div>
                        <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>NPR 45,000</div>
                      </div>
                    </div>
                    <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'var(--paper, #EAE3D6)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stone, #A39B8D)' }}>INTERESTS</div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--snow)', fontSize: '0.8rem', fontWeight: 600 }}>Trekking</span>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--snow)', fontSize: '0.8rem', fontWeight: 600 }}>Photography</span>
                        <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--snow)', fontSize: '0.8rem', fontWeight: 600 }}>Cuisine</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="panel-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '2.25rem',
                    boxShadow: '0 20px 40px rgba(15, 26, 34, 0.08)',
                    border: '1px solid rgba(163, 155, 141, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    <Sparkles size={22} color="var(--marigold, #D3A045)" />
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Algorithmic Pipeline Running</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[
                      '1. Season Detection (Autumn verified · Clear skies)',
                      '2. Monsoon Trail Pruning (High passes preserved)',
                      '3. Haversine Matrix Optimization (Distance reduced 24%)',
                      '4. Interest Scoring Matrix (Trek + Photo prioritized)',
                      '5. Proportional Day Partitioning (3 Pokhara, 4 Ridge)',
                      '6. Morning / Afternoon / Evening Greedy Slot Filling',
                    ].map((stepText, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          background: idx < 4 ? 'rgba(143, 165, 138, 0.15)' : 'var(--paper, #EAE3D6)',
                          fontSize: '0.84rem',
                          fontWeight: 500,
                        }}
                      >
                        <CheckCircle size={15} color={idx < 4 ? '#5D7358' : 'var(--stone, #A39B8D)'} />
                        <span>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="panel-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '2.25rem',
                    boxShadow: '0 20px 40px rgba(15, 26, 34, 0.08)',
                    border: '1px solid rgba(163, 155, 141, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={22} color="var(--marigold, #D3A045)" />
                      <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Itinerary Preview · Day 1</span>
                    </div>
                    <span style={{ padding: '0.25rem 0.65rem', borderRadius: '6px', background: 'var(--marigold)', color: '#0F1A22', fontSize: '0.75rem', fontWeight: 700 }}>
                      PDF READY
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid var(--marigold)', background: 'var(--paper, #EAE3D6)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--stone)' }}>MORNING (06:30 - 11:30)</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sarangkot Dawn Vista & Breakfast</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>Est. NPR 800 · Scenic viewpoint</div>
                    </div>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #8FA58A', background: 'var(--paper, #EAE3D6)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--stone)' }}>AFTERNOON (12:30 - 16:30)</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>World Peace Pagoda Trail & Boat Return</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>Est. NPR 1,200 · Gentle hike</div>
                    </div>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid var(--slate)', background: 'var(--paper, #EAE3D6)' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--stone)' }}>EVENING (17:30 - 20:30)</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Lakeside Stroll & Thakali Kitchen Feast</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>Est. NPR 1,400 · Cultural dining</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
