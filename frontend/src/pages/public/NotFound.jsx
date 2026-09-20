import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import RidgeParallax from '../../components/atmosphere/RidgeParallax';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        background: 'var(--ink, #0F1A22)',
        color: 'var(--snow, #F4EFE6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 5%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <RidgeParallax />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '540px' }}>
        <div
          style={{
            fontFamily: 'var(--font-accent, serif)',
            fontSize: '5rem',
            color: 'var(--marigold, #D3A045)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          ४०४
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            marginBottom: '1rem',
          }}
        >
          The trail went quiet.
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(244, 239, 230, 0.75)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          The ridge you are looking for has shifted into the mist or does not exist. Let us guide you back to marked paths.
        </p>

        <Button href="/" variant="primary" icon={<ArrowLeft size={16} />}>
          Back to the trailhead
        </Button>
      </div>
    </div>
  );
}
