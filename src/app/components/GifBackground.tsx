"use client"

import React from 'react'
import Image from 'next/image'

interface GifBackgroundProps {
  gifSrc: string
  className?: string
}

export default function GifBackground({ gifSrc, className = '' }: GifBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animação de pontos em movimento simulando estrelas/partículas cósmicas */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            }}
          />
        ))}
        
        {/* Círculos de luz */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full bg-blue-500/20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute inset-8 rounded-full bg-indigo-500/30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"></div>
    </div>
  )
}