import { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Returns a parallax y MotionValue.
 * @param {number} strength - How many px to shift per scrollY unit (default 0.15).
 */
export function useParallax(strength = 0.15) {
  const scrollY = useMotionValue(0);
  const smoothY = useSpring(scrollY, { damping: 40, stiffness: 150 });
  const y = useTransform(smoothY, (v) => v * strength);

  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scrollY]);

  return y;
}
