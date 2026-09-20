import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import fallbackItineraries from '../../data/fallbackItineraries';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../ui/Skeleton';

export default function TrendingItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get('/itinerary/fetch.php?public=1&sort=saves&limit=6')
      .then((res) => {
        if (!mounted) return;
        if (res && res.success && Array.isArray(res.data)) {
          setItineraries(res.data.slice(0, 6));
        } else if (Array.isArray(res)) {
          setItineraries(res.slice(0, 6));
        } else {
          setItineraries(fallbackItineraries);
        }
      })
      .catch(() => {
        if (mounted) setItineraries(fallbackItineraries);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleUseTemplate = (itinerary) => {
    const prefill = {
      destination: itinerary.destinations?.[0] || 'Kathmandu',
      days: itinerary.duration || 5,
      budget: itinerary.estimated_cost || 30000,
    };
    try {
      sessionStorage.setItem('yp_prefill', JSON.stringify(prefill));
    } catch (_) {}

    if (!user) {
      navigate('/login');
    } else {
      navigate('/generator', { state: prefill });
    }
  };

  const list = itineraries.length > 0 ? itineraries : fallbackItineraries;

  return (
    <section
      id="itineraries"
      data-section-theme="paper"
      style={{
        background: 'var(--paper, #EAE3D6)',
        color: 'var(--ink, #0F1A22)',
        padding: '7rem 5%',
        borderTop: '1px solid rgba(163, 155, 141, 0.25)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
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
            07 / COMMUNITY BLUEPRINTS
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'var(--text-3xl, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            Trending <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>itineraries</em>.
          </h2>
          <p style={{ fontSize: 'var(--text-md, 1.125rem)', color: 'rgba(15, 26, 34, 0.78)', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Proven itineraries saved and traveled by fellow explorers. Use any plan as an editable baseline.
          </p>
        </div>

        {/* Boarding-Pass Cards Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} height="200px" borderRadius="16px" />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
            }}
          >
            {list.map((itinerary) => (
              <BoardingPassCard
                key={itinerary.id}
                itinerary={itinerary}
                onUseTemplate={() => handleUseTemplate(itinerary)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BoardingPassCard({ itinerary, onUseTemplate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        background: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 16px 36px rgba(15, 26, 34, 0.12)' : '0 4px 14px rgba(15, 26, 34, 0.05)',
        border: '1px solid rgba(163, 155, 141, 0.28)',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Left Main Ticket Body (68%) */}
      <div style={{ flex: 1, padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)' }}>
            {itinerary.season || 'All Season'} ROUTE
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--stone)' }}>
            <Bookmark size={13} fill="var(--marigold, #D3A045)" color="var(--marigold, #D3A045)" />
            <span>{itinerary.saves || 240} saves</span>
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          {itinerary.title}
        </h3>

        {/* Mini route sequence with connecting line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {itinerary.destinations?.map((d, i) => (
            <React.Fragment key={i}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)' }}>{d}</span>
              {i < itinerary.destinations.length - 1 && (
                <span style={{ color: 'var(--marigold, #D3A045)', fontSize: '0.8rem' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Button to clone / prefill template */}
        <button
          onClick={onUseTemplate}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--marigold-deep, #B8842E)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>Use as template</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Perforated Vertical Tear Line with Notch Cutouts */}
      <div
        style={{
          width: '1px',
          borderLeft: '2px dashed rgba(163, 155, 141, 0.35)',
          position: 'relative',
        }}
      >
        {/* Top Notch */}
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: -9,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--paper, #EAE3D6)',
          }}
        />
        {/* Bottom Notch */}
        <div
          style={{
            position: 'absolute',
            bottom: -10,
            left: -9,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--paper, #EAE3D6)',
          }}
        />
      </div>

      {/* Right Stub Section (32%) */}
      <div
        style={{
          width: '120px',
          background: 'var(--snow, #F4EFE6)',
          padding: '1.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--stone)', marginBottom: '0.25rem' }}>
            <Clock size={12} />
            <span>DAYS</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700 }}>
            {itinerary.duration}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--stone)', display: 'block' }}>EST. NPR</span>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>
            {(itinerary.estimated_cost || 25000) / 1000}k
          </span>
        </div>
      </div>
    </motion.div>
  );
}
