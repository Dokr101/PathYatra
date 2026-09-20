import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const firstLinkRef = useRef(null);

  // Focus trapping and ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (firstLinkRef.current) firstLinkRef.current.focus();

    // Prevent body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    onClose();
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Destinations', href: '/destinations', isInternal: true },
    { label: 'How It Works', href: '/#how-it-works', isInternal: false },
    { label: 'Trending Itineraries', href: '/#itineraries', isInternal: false },
    { label: 'Traveler Reviews', href: '/#reviews', isInternal: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 8000,
            background: 'var(--ink, #0F1A22)',
            color: 'var(--snow, #F4EFE6)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 6%',
            overflowY: 'auto',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.svg" alt="YatraPath" style={{ width: '38px', height: 'auto' }} />
              <span
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                YatraPath
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--snow, #F4EFE6)',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <X size={26} />
            </button>
          </div>

          {/* Links Stagger */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              marginBottom: 'auto',
            }}
          >
            {navLinks.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.4 }}
              >
                {item.isInternal ? (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    ref={index === 0 ? firstLinkRef : null}
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.85rem',
                      fontWeight: 600,
                      color: 'var(--snow, #F4EFE6)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={onClose}
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.85rem',
                      fontWeight: 600,
                      color: 'var(--snow, #F4EFE6)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Auth & Footer Controls */}
          <div
            style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--marigold, #D3A045)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                    }}
                  >
                    <Shield size={18} /> Admin Portal
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/generator"
                      onClick={onClose}
                      style={{
                        color: 'var(--marigold, #D3A045)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                      }}
                    >
                      Plan Itinerary
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={onClose}
                      style={{
                        color: 'var(--snow, #F4EFE6)',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-itineraries"
                      onClick={onClose}
                      style={{
                        color: 'var(--snow, #F4EFE6)',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                      }}
                    >
                      My Saved Trips
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#B4533A',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    marginTop: '0.5rem',
                  }}
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <Link
                  to="/login"
                  onClick={onClose}
                  style={{
                    textAlign: 'center',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'var(--snow, #F4EFE6)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  style={{
                    textAlign: 'center',
                    padding: '0.85rem',
                    borderRadius: '9999px',
                    background: 'var(--marigold, #D3A045)',
                    color: '#0F1A22',
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}

            <div
              style={{
                marginTop: '1.5rem',
                fontSize: '0.78rem',
                color: 'var(--stone, #A39B8D)',
                textAlign: 'center',
                fontFamily: 'var(--font-accent, serif)',
              }}
            >
              "यात्रा पथ — Let the path find you"
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
