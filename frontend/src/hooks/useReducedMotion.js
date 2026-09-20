import { useState, useEffect } from 'react';

/**
 * Returns true when the user prefers reduced motion.
 * Listens for changes to the media query at runtime.
 */
export function useReducedMotion() {
  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

  const [prefersReduced, setPrefersReduced] = useState(mq?.matches ?? false);

  useEffect(() => {
    if (!mq) return;
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mq]);

  return prefersReduced;
}
