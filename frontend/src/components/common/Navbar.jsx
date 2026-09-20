import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 5%',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
        <img src="/logo.svg" alt="YatraPath Logo" style={{ width: '34px', height: '34px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <span>YatraPath</span>
      </Link>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/destinations" style={{ fontWeight: 500, fontSize: '0.95rem' }}>Destinations</Link>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, color: '#3b82f6' }}>
                <Shield size={16} /> Admin Portal
              </Link>
            ) : (
              <>
                <Link to="/generator" style={{ fontWeight: 600, color: '#2563eb' }}>Plan Itinerary</Link>
                <Link to="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                <Link to="/my-itineraries" style={{ fontWeight: 500 }}>My Trips</Link>
              </>
            )}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                border: 'none',
                background: 'transparent',
                color: '#ef4444',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/generator" style={{ fontWeight: 600, color: '#2563eb' }}>Plan Itinerary</Link>
            <Link to="/login" style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Sign In
            </Link>
            <Link to="/register" style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Get Started
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
