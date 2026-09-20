import { useEffect, useRef } from 'react';

/**
 * Watches all elements with [data-theme] attribute via IntersectionObserver.
 * Updates a CSS custom property --current-section-theme on :root as the user scrolls.
 * Also posts a CustomEvent 'sectionthemechange' for JavaScript consumers.
 */
export function useSectionTheme() {
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-section-theme]'));
    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.dataset.sectionTheme;
            document.documentElement.style.setProperty('--current-section-theme', theme);
            document.dispatchEvent(
              new CustomEvent('sectionthemechange', { detail: { theme } })
            );
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);
}
