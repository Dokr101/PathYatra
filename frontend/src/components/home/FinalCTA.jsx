import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import Button from '../ui/Button';
import RidgeParallax from '../atmosphere/RidgeParallax';
import PrayerFlags from '../atmosphere/PrayerFlags';

export default function FinalCTA() {
  return (
    <section
      id="cta"
      data-section-theme="pine"
      style={{
        position: 'relative',
        background: 'var(--pine, #1B3B4B)',
        color: 'var(--snow, #F4EFE6)',
        padding: '10rem 5% 9rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Mountain Ridges & Prayer Flags decoration */}
      <RidgeParallax />
      <PrayerFlags style={{ top: '1.5rem', right: '1.5rem' }} />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '820px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--marigold, #D3A045)',
            marginBottom: '1.25rem',
          }}
        >
          <Compass size={16} />
          <span>START YOUR EXPEDITION</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
          }}
        >
          Your Nepal is{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>one plan</em> away.
        </h2>

        <p
          style={{
            fontSize: 'var(--text-lg, 1.25rem)',
            color: 'rgba(244, 239, 230, 0.82)',
            maxWidth: '52ch',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Free to start. No spreadsheets. No guesswork. Instant morning-to-evening schedules tailored to your real dates and budget.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <Button
            href="/register"
            variant="primary"
            icon={<ArrowRight size={16} />}
            style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
          >
            Get Started
          </Button>

          <Button
            href="/destinations"
            variant="outline"
            style={{
              padding: '0.9rem 2.2rem',
              fontSize: '1rem',
              borderColor: 'rgba(244, 239, 230, 0.35)',
              color: 'var(--snow, #F4EFE6)',
            }}
          >
            Browse destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
