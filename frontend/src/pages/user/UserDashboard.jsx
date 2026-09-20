import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { formatNPR } from '../../utils/formatters';
import { Calendar, Compass, CheckCircle, Plus } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/itinerary/fetch.php')
      .then(res => {
        if (res.success) setItineraries(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const completedCount = itineraries.filter(i => i.status === 'completed').length;

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 5%' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
        color: '#fff',
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Welcome back, {user?.name || 'Traveler'}!
          </h1>
          <p style={{ opacity: 0.9 }}>Plan your next trek or cultural retreat across Nepal</p>
        </div>
        <Link
          to="/generator"
          style={{
            background: '#fff',
            color: '#2563eb',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Plus size={18} /> Plan New Itinerary
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb' }}>{itineraries.length}</div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Itineraries</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669' }}>{completedCount}</div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Trips Completed</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>{itineraries.length - completedCount}</div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Planned Journeys</div>
        </div>
      </div>

      {/* Recent Itineraries */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Recent Itineraries</h2>
          <Link to="/my-itineraries" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem' }}>
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <p>Loading itineraries...</p>
        ) : itineraries.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', marginBottom: '1rem' }}>You haven't generated any itineraries yet.</p>
            <Link to="/generator" style={{ background: '#2563eb', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600 }}>
              Generate Your First Plan
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {itineraries.slice(0, 3).map(it => (
              <div key={it.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{it.title}</h3>
                <div style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                  {it.start_date} to {it.end_date} · {it.total_days} Days ({it.season})
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <strong>Budget:</strong> {formatNPR(it.total_budget)} · <strong>Est:</strong> {formatNPR(it.estimated_cost)}
                </div>
                <Link
                  to={`/itinerary/${it.id}`}
                  style={{
                    display: 'inline-block',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  View Itinerary
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
