"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  depth?: number
  onClick?: () => void
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  glowColor = "rgba(255, 59, 59, 0.4)",
  depth = 10,
  onClick
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    // Calcula a posição relativa do mouse dentro do cartão
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = (e.clientX - rect.left) / rect.width - 0.5
    const centerY = (e.clientY - rect.top) / rect.height - 0.5
    
    // Calcula a rotação baseada na posição do mouse
    const rotX = centerY * -depth
    const rotY = centerX * depth
    
    // Atualiza o estado de rotação
    setRotateX(rotX)
    setRotateY(rotY)
    
    // Atualiza a posição do brilho
    setGlowPosition({
      x: centerX * 100,
      y: centerY * 100
    })
  }
  
  // Reset quando o mouse sai
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
    setGlowPosition({ x: 0, y: 0 })
  }
  
  const handleMouseEnter = () => {
    setScale(1.02)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {/* Cartão principal */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Efeito de brilho dinâmico ao mover o mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at ${50 + glowPosition.x}% ${50 + glowPosition.y}%, ${glowColor} 0%, rgba(0, 0, 0, 0) 70%)`,
          opacity: 0.7,
          zIndex: -1,
          filter: "blur(20px)"
        }}
      />
      
      {/* Reflexo/brilho na borda */}
      <div 
        className="absolute inset-0 rounded-xl opacity-60 pointer-events-none"
        style={{
          background: `linear-gradient(145deg, rgba(255, 255, 255, 0.12) -20%, transparent 80%)`,
          zIndex: 5
        }}
      />
    </motion.div>
  )
}

export default Card3D