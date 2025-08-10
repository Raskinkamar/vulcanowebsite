"use client"

import type React from "react"
import { useState } from "react"

interface TechItem {
  name: string
  icon: React.ReactNode
  color?: string
}

interface TechCarouselProps {
  items: TechItem[]
  rows?: number
  speedSeconds?: number
  tiltDegrees?: number
  pauseOnHover?: boolean
}

function hexToRgba(hex: string, alpha: number): string {
  const sanitized = hex.replace('#', '')
  const bigint = parseInt(sanitized.length === 3 ? sanitized.split('').map(c => c + c).join('') : sanitized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function TechCarousel({ items, rows = 2, speedSeconds = 30, tiltDegrees = 0, pauseOnHover = true }: TechCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  // Quadruplicar itens para loop contínuo mais suave
  const quadrupled = [...items, ...items, ...items, ...items]

  // Gerar linhas alternando direção
  const lines = Array.from({ length: rows }, (_, i) => {
    const reverse = i % 2 === 1
    // Velocidade ligeiramente diferente para cada linha para efeito mais natural
    const lineSpeed = speedSeconds - (i * 2)
    
    return (
      <div key={i} className="relative w-full overflow-x-hidden overflow-y-visible py-3 group" aria-hidden={false}>
        <div
          className="flex gap-3 sm:gap-5 whitespace-nowrap will-change-transform w-[400%] marquee-anim"
          style={{
            animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${lineSpeed}s linear infinite`,
            animationPlayState: isPaused && pauseOnHover ? 'paused' : 'running',
          }}
          role="list"
          aria-label={reverse ? 'Linha de tecnologias invertida' : 'Linha de tecnologias'}
        >
          {quadrupled.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-white/90 hover:scale-110 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
              style={{
                backgroundColor: item.color ? hexToRgba(item.color, 0.15) : 'rgba(255,255,255,0.08)',
                border: `1px solid ${item.color ? hexToRgba(item.color, 0.4) : 'rgba(255,255,255,0.15)'}`,
                boxShadow: `0 4px 20px ${item.color ? hexToRgba(item.color, 0.2) : 'rgba(0,0,0,0.25)'}`,
                backdropFilter: 'blur(8px)',
              }}
              role="listitem"
              tabIndex={0}
              aria-label={`Tecnologia: ${item.name}`}
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center" style={{ color: item.color }}>{item.icon}</span>
              <span className="text-sm sm:text-base font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  })

  return (
    <div
      className="relative w-full max-w-[100vw] overflow-hidden"
      style={{ zIndex: 50 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Carrossel de tecnologias em movimento contínuo"
    >
      {/* Gradientes de fade nas laterais */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      
      <div 
        className="w-full space-y-4 sm:space-y-5" 
        style={{ 
          transform: tiltDegrees ? `rotate(${tiltDegrees}deg)` : undefined,
          // permitir interação para pausar e focar itens
        }}
      >
        {lines}
      </div>
    </div>
  )
}


