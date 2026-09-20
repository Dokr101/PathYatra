import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function SeasonWidget({ style = {} }) {
  const [kathmanduTime, setKathmanduTime] = useState('');
  const [seasonData, setSeasonData] = useState({ name: 'Autumn', advisory: 'Best visibility, peak trekking' });

  useEffect(() => {
    const updateWidget = () => {
      // Kathmandu is UTC + 5:45
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ktmDate = new Date(utc + 3600000 * 5.75);

      const hours = ktmDate.getHours().toString().padStart(2, '0');
      const minutes = ktmDate.getMinutes().toString().padStart(2, '0');
      setKathmanduTime(`${hours}:${minutes} NPT`);

      // Month calculation (0-indexed: 0=Jan, 1=Feb, 2=Mar, etc.)
      const month = ktmDate.getMonth() + 1; // 1-12
      if (month >= 3 && month <= 5) {
        setSeasonData({ name: 'Spring', advisory: 'Wild rhododendrons & alpine blooms' });
      } else if (month >= 6 && month <= 9) {
        setSeasonData({ name: 'Monsoon', advisory: 'Lush terraced valleys & quiet trails' });
      } else if (month >= 10 && month <= 11) {
        setSeasonData({ name: 'Autumn', advisory: 'Crystal Himalayan views & peak trekking' });
      } else {
        setSeasonData({ name: 'Winter', advisory: 'Crisp azure skies & serene quiet valleys' });
      }
    };

    updateWidget();
    const interval = setInterval(updateWidget, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.45rem 0.95rem',
        borderRadius: '9999px',
        background: 'rgba(15, 26, 34, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(244, 239, 230, 0.15)',
        color: 'var(--snow, #F4EFE6)',
        fontSize: 'var(--text-xs, 0.75rem)',
        fontFamily: 'var(--font-body, sans-serif)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        userSelect: 'none',
        ...style,
      }}
    >
      <Compass size={14} color="var(--marigold, #D3A045)" />
      <span style={{ fontWeight: 700, color: 'var(--marigold, #D3A045)', letterSpacing: '0.04em' }}>
        {seasonData.name}
      </span>
      <span style={{ opacity: 0.35 }}>·</span>
      <span style={{ color: 'rgba(244, 239, 230, 0.85)' }}>{seasonData.advisory}</span>
      <span style={{ opacity: 0.35 }}>·</span>
      <span style={{ fontFamily: 'monospace', opacity: 0.8 }}>{kathmanduTime}</span>
    </div>
  );
}
