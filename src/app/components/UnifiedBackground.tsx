'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface UnifiedBackgroundProps {
  className?: string;
  type?: 'hero' | 'services' | 'contact';
  intensity?: 'low' | 'medium' | 'high';
}

const UnifiedBackground: React.FC<UnifiedBackgroundProps> = ({ 
  className = '',
  type = 'hero',
  intensity = 'medium'
}) => {
  // Configurações baseadas no tipo de fundo
  const config = {
    hero: {
      gradient: {
        low: 'from-red-500/5 to-transparent',
        medium: 'from-red-500/10 to-transparent',
        high: 'from-red-500/20 to-transparent',
      },
      particleCount: {
        low: 4,
        medium: 8,
        high: 12
      },
      gradientPosition: 'right-0',
    },
    services: {
      gradient: {
        low: 'from-blue-500/5 to-red-500/5',
        medium: 'from-blue-500/10 to-red-500/10',
        high: 'from-blue-500/20 to-red-500/15',
      },
      particleCount: {
        low: 4,
        medium: 8,
        high: 12
      },
      gradientPosition: 'top-0 left-0',
    },
    contact: {
      gradient: {
        low: 'from-red-500/5 to-transparent',
        medium: 'from-red-500/10 to-transparent',
        high: 'from-red-500/15 to-transparent',
      },
      particleCount: {
        low: 3,
        medium: 6,
        high: 10
      },
      gradientPosition: 'left-0',
    },
  };

  const selectedConfig = config[type];
  const particleCount = selectedConfig.particleCount[intensity];
  const gradientClass = selectedConfig.gradient[intensity];
  const positionClass = selectedConfig.gradientPosition;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradiente sutil */}
      <div 
        className={`absolute ${positionClass} w-[600px] h-[600px] bg-gradient-to-r ${gradientClass} rounded-full blur-3xl`} 
      />

      {/* Partículas sutis com comportamento consistente */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/60 rounded-full"
          style={{
            top: `${10 + (i * 80) % 100}%`,
            left: `${5 + (i * 85) % 90}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default UnifiedBackground;