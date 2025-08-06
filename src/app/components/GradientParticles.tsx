"use client"

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const GradientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; color: string; speedMod: number }[]>([])
  
  // Gradiente fluido com cores cyberpunk
  const gradientColors = [
    { stop: 0, color: 'rgba(255, 0, 85, 0.5)' },      // Rosa neon
    { stop: 0.3, color: 'rgba(255, 50, 20, 0.4)' },   // Vermelho
    { stop: 0.6, color: 'rgba(25, 0, 90, 0.3)' },     // Roxo escuro
    { stop: 1, color: 'rgba(0, 20, 40, 0.2)' }        // Azul escuro
  ]
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Configuração de tamanho do canvas
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      
      // Inicializa partículas
      initParticles()
    }
    
    // Inicializa partículas
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(window.innerWidth / 10, 100) // Responsivo ao tamanho da tela
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150)}, ${Math.random() * 0.5 + 0.1})`,
          speedMod: Math.random() * 0.5 + 0.5
        })
      }
    }
    
    // Handle de movimento do mouse
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseTargetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
    
    // Função para desenhar o gradiente fluido
    const drawGradient = (time: number) => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2 + Math.sin(time / 1000) * canvas.width / 10, 
        canvas.height / 2 + Math.cos(time / 1000) * canvas.height / 10, 
        canvas.width / 1.5
      )
      
      gradientColors.forEach(stop => {
        gradient.addColorStop(stop.stop, stop.color)
      })
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    
    // Função para desenhar e animar partículas
    const drawParticles = () => {
      // Movimenta as partículas e responde ao mouse
      mousePosRef.current.x += (mouseTargetRef.current.x - mousePosRef.current.x) * 0.1
      mousePosRef.current.y += (mouseTargetRef.current.y - mousePosRef.current.y) * 0.1
      
      particlesRef.current.forEach(p => {
        // Calcular distância ao mouse
        const dx = mousePosRef.current.x - p.x
        const dy = mousePosRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Se próximo ao mouse, afasta-se dele
        if (dist < 100) {
          const force = (100 - dist) / 100
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * force * 0.2 * p.speedMod
          p.vy -= Math.sin(angle) * force * 0.2 * p.speedMod
        }
        
        // Atualiza posição
        p.x += p.vx
        p.y += p.vy
        
        // Adiciona um pouco de aleatoriedade no movimento
        p.vx += (Math.random() - 0.5) * 0.05
        p.vy += (Math.random() - 0.5) * 0.05
        
        // Amortecimento para evitar aceleração infinita
        p.vx *= 0.98
        p.vy *= 0.98
        
        // Mantém dentro dos limites do canvas
        if (p.x < 0 || p.x > canvas.width / window.devicePixelRatio) {
          p.vx = -p.vx
        }
        if (p.y < 0 || p.y > canvas.height / window.devicePixelRatio) {
          p.vy = -p.vy
        }
        
        // Desenha partícula
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
    }
    
    // Função para desenhar conexões entre partículas próximas
    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }
    
    // Loop de animação
    let animationFrame: number
    
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Desenha gradiente
      drawGradient(time)
      
      // Desenha partículas e conexões
      drawParticles()
      drawConnections()
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    // Configuração inicial
    setupCanvas()
    window.addEventListener('resize', setupCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Inicia animação
    animationFrame = requestAnimationFrame(animate)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setupCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default GradientParticles