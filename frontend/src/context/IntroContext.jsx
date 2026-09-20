import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const IntroContext = createContext({
  showIntro: false,
  skipIntro: () => {},
  markIntroDone: () => {},
  navLogoRef: { current: null },
});

export function IntroProvider({ children }) {
  const navLogoRef = useRef(null);
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isHome = window.location.pathname === '/' || window.location.pathname === '';
    const seen = sessionStorage.getItem('yp_intro_seen');
    return isHome && !seen;
  });

  const markIntroDone = () => {
    try {
      sessionStorage.setItem('yp_intro_seen', '1');
    } catch (_) {}
    setShowIntro(false);
    // Unhide navbar logo immediately upon completion
    if (navLogoRef.current) {
      navLogoRef.current.style.visibility = 'visible';
    }
    // Remove critical pre-hydration overlay if present
    const preOverlay = document.getElementById('yp-intro-overlay');
    if (preOverlay) preOverlay.remove();
  };

  const skipIntro = () => {
    markIntroDone();
  };

  useEffect(() => {
    // If not showing intro, ensure navbar logo is visible and preOverlay removed
    if (!showIntro) {
      if (navLogoRef.current) {
        navLogoRef.current.style.visibility = 'visible';
      }
      const preOverlay = document.getElementById('yp-intro-overlay');
      if (preOverlay) preOverlay.remove();
    }
  }, [showIntro]);

  return (
    <IntroContext.Provider value={{ showIntro, skipIntro, markIntroDone, navLogoRef }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
