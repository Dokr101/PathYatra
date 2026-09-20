import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink, #0F1A22)',
        color: 'var(--snow, #F4EFE6)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(163, 155, 141, 0.2)',
        padding: '5rem 5% 3rem',
      }}
    >
      {/* Giant Faded Devanagari Background Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-3vw',
          right: '-2vw',
          fontSize: '18vw',
          fontFamily: 'var(--font-accent, serif)',
          color: 'rgba(244, 239, 230, 0.028)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        यात्रा
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top Branding & Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/logo.svg" alt="YatraPath Logo" style={{ width: '42px', height: 'auto' }} />
              <span
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: 'var(--snow, #F4EFE6)',
                }}
              >
                YatraPath
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                color: 'var(--marigold, #D3A045)',
                marginBottom: '1rem',
              }}
            >
              "Let the path find you."
            </p>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--stone, #A39B8D)',
                lineHeight: 1.6,
              }}
            >
              Intelligent travel itinerary engine built specifically for Nepal. Season-aware, budget-constrained, and mathematically route-optimized.
            </p>
          </div>

          {/* Col 1: Explore */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '1.25rem',
              }}
            >
              Explore Nepal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/destinations" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  All Destinations
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  How the Algorithm Works
                </a>
              </li>
              <li>
                <a href="/#itineraries" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Trending Route Templates
                </a>
              </li>
              <li>
                <a href="/#reviews" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Traveler Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Traveler Account */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '1.25rem',
              }}
            >
              Traveler Account
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/generator" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Plan New Trip
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" style={{ color: 'var(--snow, #F4EFE6)', textDecoration: 'none' }}>
                  Traveler Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Project */}
          <div>
            <h4
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '1.25rem',
              }}
            >
              Project Details
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--stone, #A39B8D)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Developed as a 6th Semester BCA Capstone Project.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--snow, #F4EFE6)', fontWeight: 600 }}>
              Tribhuvan University, Nepal
            </p>
            <div style={{ marginTop: '1.25rem', display: 'inline-block' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(211, 160, 69, 0.15)',
                  color: 'var(--marigold, #D3A045)',
                  border: '1px solid rgba(211, 160, 69, 0.3)',
                  fontFamily: 'var(--font-accent, serif)',
                }}
              >
                नेपाल पर्यटन · २०२६
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with thin 1px rule */}
        <div
          style={{
            borderTop: '1px solid rgba(163, 155, 141, 0.18)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--stone, #A39B8D)',
          }}
        >
          <div>
            © {new Date().getFullYear()} YatraPath. All rights reserved. Nepal Tourism Itinerary System.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Built with React, Leaflet & PHP</span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
