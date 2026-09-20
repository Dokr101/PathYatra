import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'outline' | 'ghost' | 'secondary'
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style = {},
  icon = null,
  ...rest
}) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (prefersReduced || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull of max 6px
    const pullX = (clientX - centerX) * 0.15;
    const pullY = (clientY - centerY) * 0.15;
    setPos({
      x: Math.max(-6, Math.min(6, pullX)),
      y: Math.max(-6, Math.min(6, pullY)),
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  // Base styling depending on variant
  let baseStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '9999px',
    fontFamily: 'var(--font-body, sans-serif)',
    fontWeight: 600,
    fontSize: 'var(--text-sm, 0.875rem)',
    letterSpacing: '0.02em',
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    overflow: 'hidden',
    padding: '0.75rem 1.75rem',
    border: 'none',
    transition: 'color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
    ...style,
  };

  let variantStyle = {};
  if (variant === 'primary') {
    variantStyle = {
      background: 'var(--marigold, #D3A045)',
      color: '#0F1A22',
      boxShadow: '0 4px 14px rgba(211, 160, 69, 0.25)',
    };
  } else if (variant === 'outline') {
    variantStyle = {
      background: 'transparent',
      color: 'inherit',
      border: '1px solid currentColor',
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      background: 'transparent',
      color: 'inherit',
      padding: '0.5rem 1rem',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      background: 'var(--snow, #F4EFE6)',
      color: 'var(--ink, #0F1A22)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    };
  }

  const content = (
    <>
      {/* Subtle fill sweep on hover for primary */}
      {variant === 'primary' && !prefersReduced && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: hovered ? '0%' : '-100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--marigold-deep, #B8842E)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {children}
        {icon && (
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'inline-flex' }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={btnRef}
        href={href}
        className={className}
        style={{ ...baseStyle, ...variantStyle }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={prefersReduced ? {} : { x: pos.x, y: pos.y }}
        whileTap={{ scale: 0.98 }}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      className={className}
      style={{ ...baseStyle, ...variantStyle }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={prefersReduced ? {} : { x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
