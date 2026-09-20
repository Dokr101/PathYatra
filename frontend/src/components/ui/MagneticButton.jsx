import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function MagneticButton({
  children,
  pullLimit = 6,
  className = '',
  style = {},
  onClick,
  ...rest
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const pullX = (clientX - centerX) * 0.2;
    const pullY = (clientY - centerY) * 0.2;

    setPos({
      x: Math.max(-pullLimit, Math.min(pullLimit, pullX)),
      y: Math.max(-pullLimit, Math.min(pullLimit, pullY)),
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={prefersReduced ? {} : { x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={className}
      style={{
        display: 'inline-block',
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
