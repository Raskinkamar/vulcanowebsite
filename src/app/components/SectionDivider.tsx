'use client';

import React from 'react';

interface SectionDividerProps {
  direction?: 'top' | 'bottom';
  color?: string;
  height?: number;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  direction = 'bottom', 
  color = 'black', 
  height = 50 
}) => {
  // SVG para o divisor com curva suave
  const topDivider = `
    <svg viewBox="0 0 1440 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 ${height}L48 ${height * 0.95}C96 ${height * 0.9} 192 ${height * 0.8} 288 ${height * 0.75}C384 ${height * 0.7} 480 ${height * 0.7} 576 ${height * 0.65}C672 ${height * 0.6} 768 ${height * 0.6} 864 ${height * 0.65}C960 ${height * 0.7} 1056 ${height * 0.8} 1152 ${height * 0.85}C1248 ${height * 0.9} 1344 ${height * 0.95} 1392 ${height * 0.975}L1440 ${height}V0H0V${height}Z" fill="${color}"/>
    </svg>
  `;

  const bottomDivider = `
    <svg viewBox="0 0 1440 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 0L48 ${height * 0.05}C96 ${height * 0.1} 192 ${height * 0.2} 288 ${height * 0.25}C384 ${height * 0.3} 480 ${height * 0.3} 576 ${height * 0.35}C672 ${height * 0.4} 768 ${height * 0.4} 864 ${height * 0.35}C960 ${height * 0.3} 1056 ${height * 0.2} 1152 ${height * 0.15}C1248 ${height * 0.1} 1344 ${height * 0.05} 1392 ${height * 0.025}L1440 0V${height}H0V0Z" fill="${color}"/>
    </svg>
  `;

  const svgContent = direction === 'top' ? topDivider : bottomDivider;

  return (
    <div 
      className="absolute w-full pointer-events-none z-10" 
      style={{ 
        height: `${height}px`, 
        [direction]: `-${height - 1}px` 
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SectionDivider;