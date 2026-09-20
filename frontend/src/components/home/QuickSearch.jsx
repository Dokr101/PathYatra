import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, DollarSign, ArrowRight, Minus, Plus } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import fallbackDestinations from '../../data/fallbackDestinations';

export default function QuickSearch() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [destinationQuery, setDestinationQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationsList, setDestinationsList] = useState([]);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(30000);
  const autocompleteRef = useRef(null);

  // Fetch destinations list with safe Array.isArray fallback
  useEffect(() => {
    let mounted = true;
    api.get('/destinations/list.php')
      .then((res) => {
        if (!mounted) return;
        if (res && res.success && Array.isArray(res.data)) {
          setDestinationsList(res.data);
        } else if (Array.isArray(res)) {
          setDestinationsList(res);
        } else {
          setDestinationsList(fallbackDestinations);
        }
      })
      .catch(() => {
        if (mounted) setDestinationsList(fallbackDestinations);
      });

    return () => { mounted = false; };
  }, []);

  // Close autocomplete on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setIsAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculations for tier & per day
  const perDay = days > 0 ? Math.round(budget / days) : budget;
  let tierLabel = 'Mid-range';
  let tierColor = '#8FA58A';
  if (perDay < 2500) {
    tierLabel = 'Budget';
    tierColor = '#A39B8D';
  } else if (perDay > 7000) {
    tierLabel = 'Luxury';
    tierColor = '#D3A045';
  }

  const filteredDestinations = destinationsList.filter((d) =>
    d.name.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = {
      destination: selectedDestination?.name || destinationQuery || 'Kathmandu',
      destinationId: selectedDestination?.id || 1,
      days,
      budget,
    };

    try {
      sessionStorage.setItem('yp_prefill', JSON.stringify(searchData));
    } catch (_) {}

    if (!user) {
      navigate('/login');
    } else {
      navigate('/generator', { state: searchData });
    }
  };

  return (
    <div
      style={{
        background: 'var(--snow, #F4EFE6)',
        color: 'var(--ink, #0F1A22)',
        borderRadius: '20px',
        padding: '1.75rem',
        boxShadow: '0 20px 50px rgba(15, 26, 34, 0.25)',
        border: '1px solid rgba(163, 155, 141, 0.3)',
        width: '100%',
        maxWidth: '840px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem',
            alignItems: 'end',
          }}
        >
          {/* Destination Autocomplete */}
          <div style={{ position: 'relative' }} ref={autocompleteRef}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '0.45rem',
              }}
            >
              Where in Nepal?
            </label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid rgba(163, 155, 141, 0.35)',
                padding: '0.65rem 0.85rem',
              }}
            >
              <MapPin size={18} color="var(--marigold, #D3A045)" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Pokhara, Annapurna..."
                value={destinationQuery}
                onFocus={() => setIsAutocompleteOpen(true)}
                onChange={(e) => {
                  setDestinationQuery(e.target.value);
                  setSelectedDestination(null);
                  setIsAutocompleteOpen(true);
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  background: 'transparent',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                }}
              />
            </div>

            {/* Dropdown suggestions */}
            <AnimatePresence>
              {isAutocompleteOpen && filteredDestinations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid rgba(163, 155, 141, 0.3)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    padding: '0.35rem',
                  }}
                >
                  {filteredDestinations.slice(0, 6).map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => {
                        setSelectedDestination(dest);
                        setDestinationQuery(dest.name);
                        setIsAutocompleteOpen(false);
                      }}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--paper, #EAE3D6)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontWeight: 600 }}>{dest.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone, #A39B8D)' }}>{dest.region}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Days Stepper */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '0.45rem',
              }}
            >
              Duration (Days)
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid rgba(163, 155, 141, 0.35)',
                padding: '0.4rem 0.6rem',
                minHeight: '44px',
              }}
            >
              <button
                type="button"
                onClick={() => setDays(Math.max(1, days - 1))}
                aria-label="Decrease days"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'var(--paper, #EAE3D6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink, #0F1A22)',
                }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: '40px', textAlign: 'center' }}>
                {days} {days === 1 ? 'day' : 'days'}
              </span>
              <button
                type="button"
                onClick={() => setDays(Math.min(30, days + 1))}
                aria-label="Increase days"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: 'none',
                  background: 'var(--paper, #EAE3D6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ink, #0F1A22)',
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Budget NPR */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--stone, #A39B8D)',
                marginBottom: '0.45rem',
              }}
            >
              Total Budget (NPR)
            </label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid rgba(163, 155, 141, 0.35)',
                padding: '0.65rem 0.85rem',
                minHeight: '44px',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--stone, #A39B8D)', marginRight: '0.4rem', fontSize: '0.85rem' }}>
                Rs.
              </span>
              <input
                type="number"
                step="1000"
                min="5000"
                max="500000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || 0)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  background: 'transparent',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                minHeight: '46px',
                background: 'var(--marigold, #D3A045)',
                color: '#0F1A22',
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem 1.25rem',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(211, 160, 69, 0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--marigold-deep, #B8842E)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--marigold, #D3A045)')}
            >
              <span>Generate Itinerary</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Live micro-feedback row */}
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(163, 155, 141, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.82rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ color: 'var(--stone, #A39B8D)' }}>Calculated rate:</span>
            <span style={{ fontWeight: 700, color: 'var(--ink, #0F1A22)' }}>
              NPR {perDay.toLocaleString()}/day
            </span>
            <span
              style={{
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                background: `color-mix(in srgb, ${tierColor} 18%, transparent)`,
                color: tierColor,
                border: `1px solid ${tierColor}`,
              }}
            >
              {tierLabel}
            </span>
          </div>

          <div style={{ color: 'var(--stone, #A39B8D)', fontSize: '0.75rem' }}>
            ⚡ Complete day-by-day plan in &lt; 3 seconds
          </div>
        </div>
      </form>
    </div>
  );
}
