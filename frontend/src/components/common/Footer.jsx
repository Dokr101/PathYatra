import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#94a3b8',
      padding: '3rem 5% 2rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: '#cbd5e1' }}>Home</Link>
        <Link to="/destinations" style={{ color: '#cbd5e1' }}>Destinations</Link>
        <Link to="/generator" style={{ color: '#cbd5e1' }}>Itinerary Generator</Link>
        <a href="/Yatra/admin/index.php" style={{ color: '#cbd5e1' }}>Admin</a>
      </div>
      <p>YatraPath &copy; {new Date().getFullYear()} — <em>Let the path find you</em></p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#64748b' }}>
        Developed as a 6th Semester BCA Capstone Project · Tribhuvan University
      </p>
    </footer>
  );
}
