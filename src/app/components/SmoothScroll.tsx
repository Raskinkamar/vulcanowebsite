"use client"

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface SmoothScrollProps {
  children: ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  // Referências para os elementos
  const scrollRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    // Atualiza a altura total de rolagem
    const updateScrollHeight = () => {
      if (!ghostRef.current) return
      setScrollRange(ghostRef.current.scrollHeight)
      setViewportHeight(window.innerHeight)
    }

    // Atualiza no carregamento e no redimensionamento
    updateScrollHeight()
    window.addEventListener('resize', updateScrollHeight)
    
    const timeout = setTimeout(updateScrollHeight, 500) // Para conteúdo assíncrono
    
    return () => {
      window.removeEventListener('resize', updateScrollHeight)
      clearTimeout(timeout)
    }
  }, [])

  // Obtem o progresso da rolagem
  const { scrollY } = useScroll()
  
  // Cria animação suave com spring physics
  const smoothScrollY = useSpring(scrollY, {
    damping: 60,
    stiffness: 800,
    mass: 0.5
  })
  
  // Transforma a posição de scrollY para valores negativos para transformY
  const transform = useTransform(
    smoothScrollY, 
    [0, scrollRange], 
    [0, -scrollRange]
  )

  return (
    <>
      <div
        ref={ghostRef}
        style={{ height: scrollRange }}
        className="w-full absolute top-0 left-0 pointer-events-none opacity-0"
      >
        {children}
      </div>
      
      <motion.div
        ref={scrollRef}
        style={{ y: transform }}
        className="w-full fixed top-0 left-0"
      >
        {children}
      </motion.div>
    </>
  )
}

export default SmoothScroll