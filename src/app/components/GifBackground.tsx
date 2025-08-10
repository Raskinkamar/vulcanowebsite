"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface GifBackgroundProps {
  gifSrc: string
  className?: string
  density?: 'low' | 'medium' | 'high'
  disableAnimation?: boolean
}

export default function GifBackground({ 
  gifSrc, 
  className = '', 
  density = 'medium',
  disableAnimation = false
}: GifBackgroundProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Detectar dispositivos móveis para aplicar otimizações
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Ajustar densidade baseado na prop e no dispositivo
  const getParticleCount = () => {
    if (isMobile) {
      return density === 'low' ? 15 : (density === 'medium' ? 25 : 35);
    }
    return density === 'low' ? 30 : (density === 'medium' ? 50 : 70);
  };
  
  // Só renderiza as animações se não estiver desabilitado e o componente estiver montado
  const shouldRenderAnimations = isMounted && !disableAnimation;
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animação de pontos em movimento simulando estrelas/partículas cósmicas */}
      {shouldRenderAnimations && (
        <div className="absolute inset-0">
          {[...Array(getParticleCount())].map((_, i) => {
            // Tamanhos menores para mobile
            const size = isMobile ? 
              Math.random() * 2 + 1 :
              Math.random() * 3 + 1;
              
            // Animações mais leves para mobile
            const animationDuration = isMobile ?
              Math.random() * 15 + 10 :
              Math.random() * 20 + 10;
              
            return (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `float ${animationDuration}s linear infinite`,
                }}
              />
            );
          })}
          
          {/* Círculos de luz (adaptados para mobile) */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-48 h-48' : 'w-64 h-64'}`}>
            <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-blue-500/20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-8 rounded-full bg-indigo-500/30 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"></div>
    </div>
  )
}