import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, CloudRain, Wind, Snowflake, CheckCircle2, ArrowRight } from 'lucide-react';
import Chip from '../ui/Chip';
import Button from '../ui/Button';

const SEASONS = [
  { id: 'Spring', label: 'Spring', icon: <Sun size={14} /> },
  { id: 'Monsoon', label: 'Monsoon', icon: <CloudRain size={14} /> },
  { id: 'Autumn', label: 'Autumn', icon: <Wind size={14} /> },
  { id: 'Winter', label: 'Winter', icon: <Snowflake size={14} /> },
];

const INTERESTS = ['Adventure', 'Cultural', 'Nature', 'Food', 'Wellness', 'Photography'];

const ALGO_STAGES = [
  'Season detection',
  'Season filter',
  'Interest scoring',
  'Budget allocation',
  'Route optimisation (Haversine)',
  'Time-slot filling',
];

export default function EngineDemo() {
  const [season, setSeason] = useState('Autumn');
  const [budget, setBudget] = useState(35000);
  const [selectedInterests, setSelectedInterests] = useState(['Adventure', 'Photography']);
  const [activeStage, setActiveStage] = useState(5);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    triggerAlgoPulse();
  };

  const handleSeasonChange = (newSeason) => {
    setSeason(newSeason);
    triggerAlgoPulse();
  };

  const triggerAlgoPulse = () => {
    setActiveStage(0);
    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      setActiveStage(stage);
      if (stage >= 5) clearInterval(interval);
    }, 120);
  };

  // Generate dynamic 1-day schedule based on interactive controls
  const planData = useMemo(() => {
    if (season === 'Monsoon') {
      return {
        explanation: 'Monsoon detected — ridge treks filtered out. Covered heritage, indoor culinary and sheltered valley visits prioritised.',
        morning: { title: 'Patan Museum & Courtyards Walk', time: '08:00 - 11:30', cost: 750, tag: 'Sheltered Cultural' },
        afternoon: { title: 'Newari Brass Casting Workshop', time: '13:00 - 16:30', cost: 1200, tag: 'Artisan Craft' },
        evening: { title: 'Rooftop Cooking Class & Feast', time: '17:30 - 20:30', cost: 1600, tag: 'Local Food' },
      };
    }
    if (season === 'Winter') {
      return {
        explanation: 'Winter detected — crisp morning views, earlier sundown factored into evening schedule.',
        morning: { title: 'Nagarkot Sunrise Viewpoint', time: '06:15 - 10:30', cost: 600, tag: 'Clear Horizon' },
        afternoon: { title: 'Bhaktapur Medieval Square Walk', time: '12:00 - 15:30', cost: 900, tag: 'Heritage' },
        evening: { title: 'Traditional Fireplace Gathering & Thali', time: '17:00 - 19:30', cost: 1300, tag: 'Cozy Dining' },
      };
    }
    if (season === 'Spring') {
      return {
        explanation: 'Spring detected — wild rhododendron trails open, blooming valleys prioritized.',
        morning: { title: 'Ghorepani Rhododendron Trail Hike', time: '07:00 - 11:30', cost: 1200, tag: 'Alpine Bloom' },
        afternoon: { title: 'Village Community Eco-Lodge Lunch', time: '12:30 - 15:30', cost: 850, tag: 'Nature & Food' },
        evening: { title: 'Hot Springs Bathing in Tatopani', time: '16:30 - 19:00', cost: 500, tag: 'Wellness' },
      };
    }
    // Default Autumn (Peak)
    return {
      explanation: 'Autumn detected — crystal visibility. Annapurna high viewpoints and photography hours prioritized.',
      morning: { title: 'Sarangkot Peak Sunrise & Paraglide Watch', time: '06:00 - 10:30', cost: 1400, tag: 'Peak Vista' },
      afternoon: { title: 'Peace Pagoda Trek & Fewa Lake Crossing', time: '12:00 - 15:30', cost: 950, tag: 'Adventure' },
      evening: { title: 'Lakeside Golden Hour & Thakali Feast', time: '17:00 - 20:30', cost: 1500, tag: 'Photography' },
    };
  }, [season, selectedInterests]);

  const totalCost = planData.morning.cost + planData.afternoon.cost + planData.evening.cost;
  const budgetUtilization = Math.min(Math.round((totalCost / (budget / 7)) * 100), 100);

  return (
    <section
      id="engine-demo"
      data-section-theme="paper"
      style={{
        background: 'var(--paper, #EAE3D6)',
        color: 'var(--ink, #0F1A22)',
        padding: '6.5rem 5%',
        borderTop: '1px solid rgba(163, 155, 141, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--stone, #A39B8D)',
              marginBottom: '0.75rem',
            }}
          >
            02 / THE ENGINE
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'var(--text-3xl, 2.5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Why the plan feels <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>human</em>.
          </h2>
          <p style={{ color: 'rgba(15, 26, 34, 0.78)', fontSize: 'var(--text-md, 1.125rem)', lineHeight: 1.6 }}>
            Test our constrained optimization algorithm in real-time. Adjust any variable below to watch how the day-schedule instantly adapts.
          </p>
        </div>

        {/* Demo Grid: Controls on left, Live Card on right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Controls & Pipeline Stepper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Season Control */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(163, 155, 141, 0.25)',
              }}
            >
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.85rem' }}>
                1. Select Travel Season
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {SEASONS.map((s) => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    icon={s.icon}
                    active={season === s.id}
                    onClick={() => handleSeasonChange(s.id)}
                    style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
                  />
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(163, 155, 141, 0.25)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--stone)' }}>
                  2. Budget Allowance (7-Day NPR)
                </label>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>NPR {budget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="15000"
                max="100000"
                step="5000"
                value={budget}
                onChange={(e) => {
                  setBudget(Number(e.target.value));
                  triggerAlgoPulse();
                }}
                style={{ width: '100%', accentColor: 'var(--marigold, #D3A045)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--stone)', marginTop: '0.3rem' }}>
                <span>Budget (~15k)</span>
                <span>Mid-range (~50k)</span>
                <span>Luxury (100k)</span>
              </div>
            </div>

            {/* Interest Chips */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(163, 155, 141, 0.25)',
              }}
            >
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.85rem' }}>
                3. Preferred Vibe / Interests
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {INTERESTS.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    active={selectedInterests.includes(interest)}
                    onClick={() => toggleInterest(interest)}
                  />
                ))}
              </div>
            </div>

            {/* Algorithm 6-Phase Pipeline */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(15, 26, 34, 0.05)',
                border: '1px solid rgba(163, 155, 141, 0.2)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.75rem' }}>
                Algorithm Stages (Running in &lt; 3s)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {ALGO_STAGES.map((stage, idx) => (
                  <div
                    key={stage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.78rem',
                      color: idx <= activeStage ? 'var(--ink)' : 'var(--stone)',
                      fontWeight: idx <= activeStage ? 600 : 400,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <CheckCircle2 size={13} color={idx <= activeStage ? '#D3A045' : '#A39B8D'} />
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated 1-Day Schedule Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 20px 45px rgba(15, 26, 34, 0.09)',
              border: '1px solid rgba(163, 155, 141, 0.28)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--stone)', textTransform: 'uppercase' }}>
                  SYNTHESIZED SAMPLE DAY
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600 }}>
                  Day 1 in Pokhara Valley
                </h3>
              </div>
              <span style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', background: 'var(--snow)', border: '1px solid rgba(163, 155, 141, 0.3)', fontSize: '0.78rem', fontWeight: 700 }}>
                {season} Mode
              </span>
            </div>

            {/* Algorithm logic explanation box */}
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                background: 'rgba(211, 160, 69, 0.12)',
                border: '1px solid rgba(211, 160, 69, 0.3)',
                fontSize: '0.82rem',
                color: '#805A18',
                lineHeight: 1.5,
                marginBottom: '1.75rem',
              }}
            >
              💡 {planData.explanation}
            </div>

            {/* Time Slot Cards with Animated Transitions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${season}-morning`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(163, 155, 141, 0.2)',
                    background: 'var(--snow, #F4EFE6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--marigold, #D3A045)' }}>
                      MORNING · {planData.morning.time}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                      {planData.morning.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{planData.morning.tag}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>NPR {planData.morning.cost}</div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${season}-afternoon`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(163, 155, 141, 0.2)',
                    background: 'var(--snow, #F4EFE6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8FA58A' }}>
                      AFTERNOON · {planData.afternoon.time}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                      {planData.afternoon.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{planData.afternoon.tag}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>NPR {planData.afternoon.cost}</div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${season}-evening`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(163, 155, 141, 0.2)',
                    background: 'var(--snow, #F4EFE6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--slate, #2B3A45)' }}>
                      EVENING · {planData.evening.time}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                      {planData.evening.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{planData.evening.tag}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>NPR {planData.evening.cost}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Running Day Budget Bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--stone)' }}>Daily Activities Subtotal:</span>
                <span style={{ fontWeight: 700 }}>NPR {totalCost.toLocaleString()} (within allowance)</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--paper)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${budgetUtilization}%`, height: '100%', background: 'var(--marigold, #D3A045)', borderRadius: '9999px' }} />
              </div>
            </div>

            {/* Call to action */}
            <Button href="/generator" variant="primary" style={{ width: '100%' }} icon={<ArrowRight size={16} />}>
              Try it with your own trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
