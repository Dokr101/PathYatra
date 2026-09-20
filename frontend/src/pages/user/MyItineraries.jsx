import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { formatNPR } from '../../utils/formatters';
import { generateItineraryPDF } from '../../utils/pdfGenerator';
import { useAuth } from '../../context/AuthContext';
import { Trash2, CheckCircle, Download, Calendar, Eye } from 'lucide-react';

export default function MyItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const loadItineraries = () => {
    api.get('/itinerary/fetch.php')
      .then(res => {
        if (res.success) setItineraries(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItineraries();
  }, []);

  const handleMarkComplete = async (id) => {
    try {
      const res = await api.post('/itinerary/complete.php', { id });
      if (res.success) {
        setMessage('Trip marked as completed! You can now leave reviews for destinations.');
        loadItineraries();
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      const res = await api.delete(`/itinerary/delete.php?id=${id}`);
      if (res.success) {
        setMessage('Itinerary deleted.');
        loadItineraries();
      }
    } catch (err) {
      alert('Error deleting itinerary: ' + err.message);
    }
  };

  const handleDownloadPDF = async (itineraryId) => {
    try {
      const res = await api.get(`/itinerary/fetch.php?id=${itineraryId}`);
      if (res.success) {
        generateItineraryPDF(res.data, user?.name || 'Traveler');
      }
    } catch (e) {
      alert('Failed to generate PDF: ' + e.message);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Saved Itineraries</h1>
          <p style={{ color: '#64748b' }}>Manage your planned journeys and completed Nepal travels</p>
        </div>
        <Link
          to="/generator"
          style={{
            background: '#2563eb',
            color: '#fff',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          + Plan New Trip
        </Link>
      </div>

      {message && (
        <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading your trips...</p>
      ) : itineraries.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '3.5rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>You don't have any saved itineraries yet.</p>
          <Link to="/generator" style={{ background: '#2563eb', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 600 }}>
            Generate an Itinerary
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {itineraries.map(it => (
            <div key={it.id} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{it.title}</h3>
                  <span style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: it.status === 'completed' ? '#dcfce7' : '#dbeafe',
                    color: it.status === 'completed' ? '#15803d' : '#1d4ed8'
                  }}>
                    {it.status}
                  </span>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  {it.start_date} to {it.end_date} · {it.total_days} Days ({it.season})
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  <strong>Budget:</strong> {formatNPR(it.total_budget)} · <strong>Est Cost:</strong> {formatNPR(it.estimated_cost)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => handleDownloadPDF(it.id)}
                  title="Download PDF"
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <Download size={15} /> PDF
                </button>

                {it.status === 'planned' && (
                  <button
                    onClick={() => handleMarkComplete(it.id)}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#059669',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle size={15} /> Mark Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(it.id)}
                  title="Delete Itinerary"
                  style={{
                    padding: '0.5rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid #fee2e2',
                    background: '#fff',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
