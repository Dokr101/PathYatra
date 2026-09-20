import React from 'react';
import { motion } from 'framer-motion';

export default function Chip({
  label,
  variant = 'default', // 'default' | 'season' | 'interest'
  active = false,
  onClick,
  tooltip,
  icon,
  style = {},
  ...rest
}) {
  // Season-specific accent tints
  const seasonColors = {
    Spring: { bg: 'rgba(143, 165, 138, 0.15)', border: '#8FA58A', text: '#5D7358' },
    Summer: { bg: 'rgba(27, 59, 75, 0.12)', border: '#1B3B4B', text: '#1B3B4B' },
    Monsoon: { bg: 'rgba(27, 59, 75, 0.12)', border: '#1B3B4B', text: '#1B3B4B' },
    Autumn: { bg: 'rgba(211, 160, 69, 0.18)', border: '#D3A045', text: '#9B6F20' },
    Winter: { bg: 'rgba(163, 155, 141, 0.15)', border: '#A39B8D', text: '#5B5448' },
  };

  let customColors = null;
  if (variant === 'season' && seasonColors[label]) {
    customColors = seasonColors[label];
  }

  let chipStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.28rem 0.75rem',
    borderRadius: '9999px',
    fontSize: 'var(--text-xs, 0.75rem)',
    fontWeight: 600,
    fontFamily: 'var(--font-body, sans-serif)',
    letterSpacing: '0.02em',
    cursor: onClick ? 'pointer' : 'default',
    border: '1px solid var(--border-color, rgba(163, 155, 141, 0.4))',
    background: 'transparent',
    color: 'inherit',
    transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
    userSelect: 'none',
    ...style,
  };

  if (active) {
    chipStyle.background = 'var(--marigold, #D3A045)';
    chipStyle.borderColor = 'var(--marigold, #D3A045)';
    chipStyle.color = '#0F1A22';
  } else if (customColors) {
    chipStyle.background = customColors.bg;
    chipStyle.borderColor = customColors.border;
    chipStyle.color = customColors.text;
  }

  return (
    <motion.span
      whileHover={onClick ? { scale: 1.04 } : {}}
      whileTap={onClick ? { scale: 0.96 } : {}}
      onClick={onClick}
      title={tooltip}
      style={chipStyle}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {label}
    </motion.span>
  );
}
