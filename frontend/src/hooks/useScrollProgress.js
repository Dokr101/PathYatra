import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Returns a spring-smoothed scroll progress MotionValue (0 → 1).
 * Used by the marigold progress bar at the top of the viewport.
 */
export function useScrollProgress() {
  const raw = useMotionValue(0);
  const smoothed = useSpring(raw, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      raw.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [raw]);

  return smoothed;
}
