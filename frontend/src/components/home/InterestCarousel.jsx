import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mountain, Landmark, Trees, UtensilsCrossed, Sparkles, Camera, Check, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const INTEREST_TILES = [
  {
    id: 'adventure',
    title: 'Adventure & Trekking',
    nepali: 'पदयात्रा र साहसिक',
    desc: 'High-altitude ridges, circuit passes, paragliding, and glacial valleys.',
    icon: <Mountain size={28} strokeWidth={1.5} />,
    tone: '#2B3A45',
  },
  {
    id: 'cultural',
    title: 'Cultural & Heritage',
    nepali: 'सम्पदा र संस्कृति',
    desc: 'Centuries-old Durbar Squares, Newari woodwork, and living Kumari traditions.',
    icon: <Landmark size={28} strokeWidth={1.5} />,
    tone: '#B4533A',
  },
  {
    id: 'nature',
    title: 'Nature & Wildlife',
    nepali: 'वन्यजन्तु र प्रकृति',
    desc: 'Sal jungles, one-horned rhino safaris, and tranquil bird wetlands.',
    icon: <Trees size={28} strokeWidth={1.5} />,
    tone: '#1E3A34',
  },
  {
    id: 'food',
    title: 'Food & Local Cuisine',
    nepali: 'नेपाली खानपान',
    desc: 'Thakali thalis, steamed momos, Newari samay baji, and organic mountain tea.',
    icon: <UtensilsCrossed size={28} strokeWidth={1.5} />,
    tone: '#7A4D1A',
  },
  {
    id: 'wellness',
    title: 'Wellness & Spiritual',
    nepali: 'ध्यान र शान्ति',
    desc: 'Lumbini monasteries, Tibetan meditation retreats, and singing bowl sound healing.',
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    tone: '#4A5D48',
  },
  {
    id: 'photography',
    title: 'Photography Spots',
    nepali: 'छायांकन स्थल',
    desc: 'Golden hour summits, prayer flag ridges, misty lake reflections, and ancient streets.',
    icon: <Camera size={28} strokeWidth={1.5} />,
    tone: '#094C86',
  },
];

export default function InterestCarousel() {
  const [selected, setSelected] = useState(['adventure', 'photography']);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleTile = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartWithInterests = () => {
    const prefill = {
      interests: selected,
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

  return (
    <section
      id="interests"
      data-section-theme="snow"
      style={{
        background: 'var(--snow, #F4EFE6)',
        color: 'var(--ink, #0F1A22)',
        padding: '7rem 5%',
        overflow: 'hidden',
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
            marginBottom: '3rem',
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
              06 / CHOOSE YOUR VIBE
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'var(--text-3xl, 2.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              What calls you to <em style={{ fontStyle: 'italic', color: 'var(--marigold, #D3A045)' }}>Nepal</em>?
            </h2>
          </div>

          <div style={{ fontSize: '0.92rem', color: 'var(--stone, #A39B8D)' }}>
            Select one or more to personalize activity weights
          </div>
        </div>

        {/* Carousel / Scroll-Snap Grid of 6 Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {INTEREST_TILES.map((tile) => {
            const isSelected = selected.includes(tile.id);

            return (
              <motion.div
                key={tile.id}
                whileHover={{ y: -4 }}
                onClick={() => toggleTile(tile.id)}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: tile.tone,
                  color: '#FFFFFF',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isSelected
                    ? '0 12px 30px rgba(15, 26, 34, 0.25)'
                    : '0 4px 16px rgba(15, 26, 34, 0.08)',
                  border: isSelected
                    ? '2px solid var(--marigold, #D3A045)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Subtle Radial Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Top Row: Icon + Checkbox */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'rgba(255,255,255,0.12)' }}>
                    {tile.icon}
                  </div>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isSelected ? 'var(--marigold, #D3A045)' : 'rgba(255,255,255,0.15)',
                      border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSelected && <Check size={16} color="#0F1A22" strokeWidth={3} />}
                  </div>
                </div>

                {/* Bottom Details */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-accent, serif)',
                      fontSize: '0.8rem',
                      color: 'var(--marigold, #D3A045)',
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {tile.nepali}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.45rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {tile.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'rgba(244, 239, 230, 0.8)',
                      lineHeight: 1.5,
                    }}
                  >
                    {tile.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(163, 155, 141, 0.25)',
          }}
        >
          <div style={{ fontSize: '0.95rem' }}>
            <span style={{ fontWeight: 700 }}>{selected.length}</span> categories selected for your itinerary profile
          </div>

          <Button onClick={handleStartWithInterests} variant="primary" icon={<ArrowRight size={16} />}>
            Start with these interests
          </Button>
        </div>
      </div>
    </section>
  );
}
