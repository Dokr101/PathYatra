import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { formatNPR } from '../../utils/formatters';
import { ACTIVITY_CATEGORIES } from '../../utils/constants';
import { MapPin, Calendar, DollarSign, Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GeneratorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [startDate, setStartDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(30000);
  const [interests, setInterests] = useState(['cultural', 'adventure']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/destinations/index.php').then(res => {
      if (res.success) {
        setDestinations(res.data);
        if (location.state?.destination) {
          setSelectedDestinations([parseInt(location.state.destination)]);
        }
      }
    });

    if (location.state?.days) setDays(location.state.days);
    if (location.state?.budget) setBudget(location.state.budget);
  }, [location.state]);

  const toggleDestination = (id) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(selectedDestinations.filter(item => item !== id));
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length > 1) {
        setInterests(interests.filter(item => item !== id));
      }
    } else {
      setInterests([...interests, id]);
    }
  };

  const perDay = Math.round(budget / (days || 1));
  const getTier = () => {
    if (perDay < 3000) return { name: 'Budget Traveler', color: '#15803d', bg: '#dcfce7' };
    if (perDay <= 10000) return { name: 'Mid-Range Traveler', color: '#1d4ed8', bg: '#dbeafe' };
    return { name: 'Luxury Traveler', color: '#b45309', bg: '#fef3c7' };
  };
  const tier = getTier();

  const handleGenerate = async () => {
    if (selectedDestinations.length === 0) {
      setError('Please select at least one destination.');
      setStep(1);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        destinations: selectedDestinations,
        start_date: startDate,
        days: parseInt(days),
        budget: parseFloat(budget),
        interests
      };

      const res = await api.post('/itinerary/generate.php', payload);
      if (res.success) {
        navigate('/itinerary-result', { state: { plan: res.data } });
      } else {
        setError(res.message || 'Itinerary generation failed.');
      }
    } catch (err) {
      setError(err.message || 'Error generating plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      {/* Step Indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
        {[
          { num: 1, label: 'Where' },
          { num: 2, label: 'When' },
          { num: 3, label: 'Budget' },
          { num: 4, label: 'Interests' }
        ].map(s => (
          <div key={s.num} style={{ textAlign: 'center', zIndex: 2, background: '#f8fafc', padding: '0 0.5rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: step === s.num ? '#2563eb' : (step > s.num ? '#059669' : '#e2e8f0'),
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              margin: '0 auto 0.35rem'
            }}>
              {s.num}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: step === s.num ? '#2563eb' : '#64748b' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Select Destinations</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Choose the places in Nepal you want to explore. Our route optimizer will arrange them efficiently.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {destinations.map(d => {
                const isSelected = selectedDestinations.includes(d.id);
                return (
                  <div
                    key={d.id}
                    onClick={() => toggleDestination(d.id)}
                    style={{
                      border: isSelected ? '2px solid #2563eb' : '2px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#fff',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', background: '#e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {d.region}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.4rem' }}>{d.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
                      ~ {formatNPR(d.avg_cost_per_day)}/day
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dates & Duration</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Select your travel start date and total length of the trip.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Duration: {days} Days</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Trip Budget</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Enter your total budget in Nepali Rupees (NPR).
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Total Budget (NPR)</label>
              <input
                type="number"
                step="1000"
                min="5000"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1.1rem' }}
              />
            </div>
            <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>Per-Day Allocation: <strong>{formatNPR(perDay)}</strong>/day</div>
              <div style={{ marginTop: '0.5rem' }}>
                Assigned Category: <span style={{ background: tier.bg, color: tier.color, padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem' }}>{tier.name}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Travel Interests</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Select the vibes that matter most so we can tailor activities to your style.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {ACTIVITY_CATEGORIES.map(cat => {
                const isSelected = interests.includes(cat.id);
                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleInterest(cat.id)}
                    style={{
                      border: isSelected ? '2px solid #2563eb' : '2px solid #e2e8f0',
                      background: isSelected ? '#eff6ff' : '#fff',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{cat.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              visibility: step === 1 ? 'hidden' : 'visible',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                background: '#059669',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {loading ? 'Optimizing Itinerary...' : 'Generate My Itinerary \u2192'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
