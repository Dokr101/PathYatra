import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Compass, Calendar, DollarSign, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { formatNPR } from '../../utils/formatters';

export default function LandingPage() {
  const [destinations, setDestinations] = useState([]);
  const [searchParams, setSearchParams] = useState({ destination: '', days: 5, budget: 25000 });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/destinations/index.php')
      .then(res => {
        if (res.success) setDestinations(res.data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/generator', { state: searchParams });
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '4.5rem 5% 3.5rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#dbeafe',
          color: '#2563eb',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          fontWeight: 600,
          fontSize: '0.85rem',
          marginBottom: '1rem'
        }}>
          <Sparkles size={14} /> Smart Tourism Platform for Nepal
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.25rem', color: '#0f172a' }}>
          Personalized Nepal Travel Plans with <span style={{ color: '#2563eb' }}>Intelligent Optimization</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          <em>"Let the path find you"</em> — Custom day-by-day itineraries tailored to your dates, NPR budget, seasonal conditions, and unique interests.
        </p>

        {/* Quick Search */}
        <form onSubmit={handleSearch} style={{
          background: '#ffffff',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) auto',
          gap: '1rem',
          alignItems: 'end',
          textAlign: 'left'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Destination
            </label>
            <select
              value={searchParams.destination}
              onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="">Any Destination</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={searchParams.days}
              onChange={(e) => setSearchParams({ ...searchParams, days: parseInt(e.target.value) || 1 })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Budget (NPR)
            </label>
            <input
              type="number"
              step="1000"
              value={searchParams.budget}
              onChange={(e) => setSearchParams({ ...searchParams, budget: parseFloat(e.target.value) || 0 })}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <button type="submit" style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontWeight: 700,
            cursor: 'pointer',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            Plan Trip <ArrowRight size={16} />
          </button>
        </form>
      </section>

      {/* Featured Destinations */}
      <section style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Featured Destinations</h2>
          <p style={{ color: '#64748b' }}>Curated destinations across Himalayan, Hilly, and Terai terrains</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {destinations.map(d => (
            <div key={d.id} style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.25rem',
                position: 'relative'
              }}>
                {d.name}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem'
                }}>
                  {d.region}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{d.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', height: '2.8rem', overflow: 'hidden' }}>
                  {d.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Best: {d.suitable_seasons}</span>
                  <span style={{ fontWeight: 700 }}>~ {formatNPR(d.avg_cost_per_day)}/day</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
