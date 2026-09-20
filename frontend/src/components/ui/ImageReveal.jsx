import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ImageReveal({
  src,
  alt = '',
  placeholderColor = 'var(--slate, #2B3A45)',
  aspectRatio = '16/9',
  className = '',
  style = {},
  imgStyle = {},
  children,
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio,
        backgroundColor: placeholderColor,
        borderRadius: 'inherit',
        ...style,
      }}
    >
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0 0 100% 0)', scale: 1.15 }}
        whileInView={prefersReduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)', scale: 1.0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              ...imgStyle,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: placeholderColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...imgStyle,
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
