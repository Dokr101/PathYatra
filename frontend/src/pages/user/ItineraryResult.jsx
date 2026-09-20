import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { formatNPR } from '../../utils/formatters';
import { generateItineraryPDF } from '../../utils/pdfGenerator';
import { Download, Save, RefreshCw, Check, AlertCircle } from 'lucide-react';

export default function ItineraryResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const plan = location.state?.plan;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  if (!plan) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2>No Itinerary Found</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Please complete the wizard to generate your travel plan.</p>
        <Link to="/generator" style={{ background: '#2563eb', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
          Go to Generator
        </Link>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await api.post('/itinerary/save.php', plan);
      if (res.success) {
        setSaved(true);
      } else {
        setError(res.message || 'Failed to save itinerary.');
      }
    } catch (err) {
      setError(err.message || 'Error saving itinerary.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    generateItineraryPDF(plan, user?.name || 'Traveler');
  };

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Result Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>{plan.title}</h1>
          <p style={{ color: '#64748b' }}>
            {plan.total_days} Days · {plan.season} Season ({plan.start_date} to {plan.end_date})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Download PDF
          </button>

          <button
            onClick={handleSave}
            disabled={saving || saved}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: saved ? '#059669' : '#2563eb',
              color: '#fff',
              fontWeight: 600,
              cursor: saved ? 'default' : 'pointer'
            }}
          >
            {saved ? <><Check size={16} /> Saved to Account</> : (saving ? 'Saving...' : <><Save size={16} /> Save Plan</>)}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* Advisory Banner */}
      {plan.weather_advisory && (
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          color: '#1e40af'
        }}>
          <AlertCircle size={20} />
          <span style={{ fontSize: '0.92rem' }}>{plan.weather_advisory}</span>
        </div>
      )}

      {/* Budget Overview Card */}
      <div style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Total Budget</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{formatNPR(plan.budget_summary.total_budget)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Estimated Cost</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{formatNPR(plan.budget_summary.total_estimated)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Remaining Buffer</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb' }}>{formatNPR(plan.budget_summary.remaining)}</div>
        </div>
      </div>

      {/* Day Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        {plan.days.map(day => (
          <div key={day.day_number} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                Day {day.day_number} — {day.destination}
              </h3>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{day.date}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['morning', 'afternoon', 'evening'].map(slotKey => {
                const slot = day.slots[slotKey];
                return (
                  <div key={slotKey} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px dashed #e2e8f0',
                    fontSize: '0.92rem'
                  }}>
                    <div>
                      <span style={{ fontWeight: 700, textTransform: 'capitalize', display: 'inline-block', width: '100px' }}>
                        {slotKey}:
                      </span>
                      <span>{slot ? slot.activity : 'Free Time'}</span>
                    </div>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>
                      {slot && slot.cost > 0 ? formatNPR(slot.cost) : 'Included / Free'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '0.75rem', fontSize: '0.9rem', color: '#2563eb', fontWeight: 600 }}>
              <span>Stay: {day.accommodation?.name || 'Hotel'} ({formatNPR(day.accommodation?.cost || 0)})</span>
              <span>Day Total: {formatNPR(day.day_total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
