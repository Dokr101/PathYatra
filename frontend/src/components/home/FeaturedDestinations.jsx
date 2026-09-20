import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Compass, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import fallbackDestinations from '../../data/fallbackDestinations';
import TiltCard from '../ui/TiltCard';
import Chip from '../ui/Chip';
import Skeleton from '../ui/Skeleton';

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get('/destinations/list.php?limit=6&sort=rating')
      .then((res) => {
        if (!mounted) return;
        if (res && res.success && Array.isArray(res.data)) {
          setDestinations(res.data.slice(0, 6));
        } else if (Array.isArray(res)) {
          setDestinations(res.slice(0, 6));
        } else {
          setDestinations(fallbackDestinations);
        }
      })
      .catch(() => {
        if (mounted) setDestinations(fallbackDestinations);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const items = destinations.length > 0 ? destinations : fallbackDestinations;

  return (
    <section
      id="destinations"
      data-section-theme="snow"
      style={{
        background: 'var(--snow, #F4EFE6)',
        color: 'var(--ink, #0F1A22)',
        padding: '7rem 5%',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '0.65rem',
              }}
            >
              04 / FEATURED DESTINATIONS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'var(--text-3xl, 2.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              Where paths <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>converge</em>.
            </h2>
          </div>

          <Link
            to="/destinations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--ink, #0F1A22)',
              textDecoration: 'none',
              borderBottom: '2px solid var(--marigold, #D3A045)',
              paddingBottom: '2px',
            }}
          >
            Explore all 48 destinations <ArrowRight size={16} />
          </Link>
        </div>

        {/* Editorial Asymmetric Grid: 1 Tall Card, 2 Wide Cards, 3 Standard Cards */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Skeleton key={n} height="320px" borderRadius="16px" />
            ))}
          </div>
        ) : (
          <div className="yp-destinations-grid">
            {/* 1. Tall Feature Card (Index 0) */}
            <div className="yp-card-tall">
              <DestinationCard destination={items[0]} isTall />
            </div>

            {/* 2 & 3. Two Wide Cards */}
            <div className="yp-card-wide">
              <DestinationCard destination={items[1]} isWide />
            </div>
            <div className="yp-card-wide">
              <DestinationCard destination={items[2]} isWide />
            </div>

            {/* 4, 5, 6. Three Standard Cards */}
            <div className="yp-card-std">
              <DestinationCard destination={items[3]} />
            </div>
            <div className="yp-card-std">
              <DestinationCard destination={items[4]} />
            </div>
            <div className="yp-card-std">
              <DestinationCard destination={items[5]} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .yp-destinations-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
        }
        .yp-card-tall {
          grid-column: span 5;
          grid-row: span 2;
        }
        .yp-card-wide {
          grid-column: span 7;
        }
        .yp-card-std {
          grid-column: span 4;
        }
        @media (max-width: 1024px) {
          .yp-card-tall, .yp-card-wide, .yp-card-std {
            grid-column: span 12;
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  );
}

function DestinationCard({ destination, isTall = false, isWide = false }) {
  const [hovered, setHovered] = useState(false);
  const seasons = destination.suitable_seasons ? destination.suitable_seasons.split(',') : ['Autumn', 'Spring'];
  const placeholderTone = destination.placeholderColor || '#2B3A45';

  return (
    <TiltCard style={{ height: '100%' }}>
      <Link
        to="/destinations"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          height: isTall ? '580px' : isWide ? '270px' : '340px',
          borderRadius: '20px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: '#FFFFFF',
          background: placeholderTone,
          boxShadow: hovered ? '0 20px 40px rgba(15, 26, 34, 0.22)' : '0 4px 16px rgba(15, 26, 34, 0.08)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Photo with subtle scale zoom on hover */}
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.15), transparent 70%), ${placeholderTone}`,
            zIndex: 0,
          }}
        />

        {/* Ink Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,26,34,0.1) 0%, rgba(15,26,34,0.4) 45%, rgba(15,26,34,0.92) 100%)',
            zIndex: 1,
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            right: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(15, 26, 34, 0.65)',
              backdropFilter: 'blur(6px)',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {destination.region}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'rgba(15, 26, 34, 0.65)',
              backdropFilter: 'blur(6px)',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Star size={13} fill="var(--marigold, #D3A045)" color="var(--marigold, #D3A045)" />
            <span>{destination.avg_rating || '4.8'}</span>
          </div>
        </div>

        {/* Bottom Details Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '1.75rem',
            width: '100%',
          }}
        >
          {/* Destination Name with drawing underline */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: isTall ? '2.2rem' : '1.65rem',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              {destination.name}
            </h3>
            <motion.div
              initial={false}
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--marigold, #D3A045)',
                transformOrigin: 'left',
              }}
            />
          </div>

          {isTall && (
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(244, 239, 230, 0.85)',
                lineHeight: 1.55,
                marginBottom: '1.25rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {destination.description}
            </p>
          )}

          {/* Pricing & Season Tag row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(244, 239, 230, 0.2)',
              fontSize: '0.85rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: 'rgba(244, 239, 230, 0.65)', display: 'block' }}>
                Est. Daily Spend
              </span>
              <span style={{ fontWeight: 700, color: 'var(--marigold, #D3A045)' }}>
                ~ NPR {Number(destination.avg_cost_per_day || 3500).toLocaleString()}/day
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {seasons.slice(0, 2).map((s) => (
                <Chip key={s} label={s.trim()} variant="season" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
