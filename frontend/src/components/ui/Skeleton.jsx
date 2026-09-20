import React from 'react';

export default function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '8px',
  className = '',
  style = {},
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(163, 155, 141, 0.12) 25%, rgba(163, 155, 141, 0.24) 50%, rgba(163, 155, 141, 0.12) 75%)',
        backgroundSize: '200% 100%',
        animation: 'yp-shimmer 2s ease-in-out infinite',
        ...style,
      }}
    >
      <style>{`
        @keyframes yp-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
