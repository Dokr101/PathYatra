import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';
import fallbackStats from '../../data/fallbackStats';

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.25, once: true });

  const destCount = useCountUp(fallbackStats.destinations, inView, 1800);
  const actCount = useCountUp(fallbackStats.activities, inView, 2000);
  const itinCount = useCountUp(fallbackStats.itineraries_generated, inView, 2200);
  const reviewCount = useCountUp(fallbackStats.reviews, inView, 1900);

  const stats = [
    { label: 'Destinations Mapped', value: destCount, suffix: '+' },
    { label: 'Curated Activities', value: actCount, suffix: '+' },
    { label: 'Itineraries Generated', value: itinCount.toLocaleString(), suffix: '' },
    { label: 'Verified Reviews', value: reviewCount, suffix: '+' },
  ];

  return (
    <section
      ref={ref}
      id="stats"
      data-section-theme="snow"
      style={{
        background: 'var(--snow, #F4EFE6)',
        color: 'var(--ink, #0F1A22)',
        padding: '6rem 5%',
        borderTop: '1px solid rgba(163, 155, 141, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                borderTop: '1px solid rgba(163, 155, 141, 0.4)',
                paddingTop: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: 'var(--ink, #0F1A22)',
                  marginBottom: '0.65rem',
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
                <span style={{ color: 'var(--marigold, #D3A045)', fontSize: '0.7em', marginLeft: '2px' }}>
                  {stat.suffix}
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--stone, #A39B8D)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
