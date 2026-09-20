import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Animates a number from 0 to `target` when `isInView` is true.
 * Respects prefers-reduced-motion (shows final value immediately).
 * @param {number} target - The final value to count to.
 * @param {boolean} isInView - Whether the element is visible.
 * @param {number} duration - Animation duration in ms (default 2000).
 */
export function useCountUp(target, isInView, duration = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReduced) {
      setCount(target);
      return;
    }

    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target, duration, prefersReduced]);

  return count;
}
