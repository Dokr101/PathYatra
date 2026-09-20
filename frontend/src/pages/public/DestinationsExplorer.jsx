import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { formatNPR } from '../../utils/formatters';
import { Search, Filter, Star } from 'lucide-react';

export default function DestinationsExplorer() {
  const [destinations, setDestinations] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/destinations/index.php')
      .then(res => {
        if (res.success) setDestinations(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = destinations.filter(d => {
    const matchRegion = !regionFilter || d.region === regionFilter;
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 5%' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>Explore Nepal Destinations</h1>
        <p style={{ color: '#64748b' }}>Discover heritage sites, trekking trails, and wildlife reserves across Nepal</p>
      </header>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search destinations by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' }}
        >
          <option value="">All Regions</option>
          <option value="Himalayan">Himalayan Region</option>
          <option value="Hilly">Hilly Region</option>
          <option value="Terai">Terai Plains</option>
        </select>
      </div>

      {loading ? (
        <p>Loading destinations...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filtered.map(d => (
            <div key={d.id} style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                height: '160px',
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                fontWeight: 700,
                position: 'relative'
              }}>
                {d.name}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem'
                }}>
                  {d.region}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{d.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                    <Star size={14} fill="#f59e0b" /> {Number(d.avg_rating).toFixed(1)}
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', height: '2.8rem', overflow: 'hidden' }}>
                  {d.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>Seasons: {d.suitable_seasons}</span>
                  <span style={{ fontWeight: 700 }}>~ {formatNPR(d.avg_cost_per_day)}/day</span>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Link
                    to="/generator"
                    state={{ destination: d.id }}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: '#eff6ff',
                      color: '#2563eb',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem'
                    }}
                  >
                    Add to Itinerary &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
