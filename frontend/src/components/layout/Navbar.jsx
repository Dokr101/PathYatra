import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useIntro } from '../../context/IntroContext';
import { Shield, LogOut, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showIntro, navLogoRef } = useIntro();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/' || location.pathname === '';
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // Hide on scroll down, show on scroll up
      if (isHome) {
        if (currentScrollY > lastScrollY && currentScrollY > 120) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHome]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login');
    }
  };

  // On non-home routes, always use solid light background with dark text
  const isTransparent = isHome && !scrolled;
  const textColor = isTransparent ? 'var(--snow, #F4EFE6)' : 'var(--ink, #0F1A22)';
  const navBg = isTransparent
    ? 'transparent'
    : 'rgba(244, 239, 230, 0.92)';
  const borderBottom = isTransparent
    ? '1px solid transparent'
    : '1px solid rgba(163, 155, 141, 0.25)';

  const navLinks = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'How It Works', href: isHome ? '#how-it-works' : '/#how-it-works' },
    { label: 'Itineraries', href: isHome ? '#itineraries' : '/#itineraries' },
    { label: 'Reviews', href: isHome ? '#reviews' : '/#reviews' },
  ];

  return (
    <>
      <header
        data-navbar
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          background: navBg,
          backdropFilter: isTransparent ? 'none' : 'blur(8px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(8px)',
          borderBottom,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease, border-color 300ms ease',
          padding: '0.85rem 5%',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo container receiving intro handoff */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: textColor,
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                ref={navLogoRef}
                data-nav-logo
                src="/logo.svg"
                alt="YatraPath Logo"
                style={{
                  width: '42px',
                  height: 'auto',
                  visibility: isHome && showIntro ? 'hidden' : 'visible',
                  transition: 'visibility 0.1s ease',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontWeight: 700,
                fontSize: '1.35rem',
                letterSpacing: '-0.02em',
                color: textColor,
              }}
            >
              YatraPath
            </span>
          </Link>

          {/* Desktop Center Links with Animated Underline */}
          <nav
            style={{
              display: 'none',
              gap: '2rem',
              alignItems: 'center',
            }}
            className="yp-desktop-nav"
          >
            {navLinks.map((item) => (
              <NavLinkItem key={item.label} to={item.href} color={textColor}>
                {item.label}
              </NavLinkItem>
            ))}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1rem',
            }}
            className="yp-desktop-actions"
          >
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'var(--marigold, #D3A045)',
                      textDecoration: 'none',
                    }}
                  >
                    <Shield size={16} /> Admin Portal
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/generator"
                      style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: textColor,
                        textDecoration: 'none',
                      }}
                    >
                      Plan Itinerary
                    </Link>
                    <Link
                      to="/dashboard"
                      style={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: textColor,
                        textDecoration: 'none',
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-itineraries"
                      style={{
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: textColor,
                        textDecoration: 'none',
                      }}
                    >
                      My Trips
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    border: 'none',
                    background: 'transparent',
                    color: '#B4533A',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: '0.4rem 0.6rem',
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: textColor,
                    textDecoration: 'none',
                    padding: '0.5rem 0.8rem',
                  }}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: 'var(--marigold, #D3A045)',
                    color: '#0F1A22',
                    padding: '0.55rem 1.35rem',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(211, 160, 69, 0.25)',
                    transition: 'transform 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            className="yp-mobile-toggle"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Responsive media query styles */}
      <style>{`
        @media (min-width: 1024px) {
          .yp-desktop-nav { display: flex !important; }
          .yp-desktop-actions { display: flex !important; }
          .yp-mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* Full-screen Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

function NavLinkItem({ to, color, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        color,
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: 500,
        padding: '0.4rem 0',
      }}
    >
      {children}
      <motion.span
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--marigold, #D3A045)',
          transformOrigin: 'left',
        }}
      />
    </a>
  );
}
