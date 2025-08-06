"use client"

import React, { useEffect, useRef } from 'react'
import { useScroll } from 'framer-motion'

interface VideoBackgroundProps {
  videoSrc: string
  className?: string
}

export default function VideoBackground({ videoSrc, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Use o progresso do scroll para controlar a reprodução do vídeo com velocidade aumentada
  useEffect(() => {
    const updateVideoProgress = () => {
      if (!videoRef.current) return
      
      const videoElement = videoRef.current
      const progress = scrollYProgress.get()
      
      // Calcular o tempo de vídeo com base no progresso do scroll
      // Multiplicamos por 2.5 para aumentar a velocidade da animação
      if (videoElement.duration) {
        const targetTime = (progress * videoElement.duration * 2.5) % videoElement.duration
        videoElement.currentTime = targetTime
      }
    }

    // Registre um listener para o progresso de scroll
    const unsubscribe = scrollYProgress.onChange(updateVideoProgress)
    
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          preload="metadata"
          muted
          playsInline
          className="max-w-full max-h-full object-contain"
          style={{
            width: '60%', 
            height: 'auto',
            maxHeight: '70vh',
            filter: 'brightness(1.5) contrast(1.2)'
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"></div>
    </div>
  )
}