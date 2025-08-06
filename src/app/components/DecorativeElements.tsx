"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function DecorativeElements() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transforma o scroll em movimento para elementos parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -900])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Elemento de círculo gradiente grande */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-gradient-to-tr from-red-500/10 to-purple-500/5 blur-3xl"
      />
      
      {/* Elemento de círculo menor */}
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute right-1/4 top-1/3 w-64 h-64 rounded-full bg-gradient-to-bl from-red-600/10 to-red-300/5 blur-2xl"
      />
      
      {/* Grade decorativa em alguns lugares */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/3 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#ff3d3d15_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      {/* Elemento 3D wireframe */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute -left-20 top-1/2 w-64 h-64 border border-red-500/20 rounded-full opacity-20"
      >
        <div className="absolute inset-0 border border-red-500/10 rounded-full transform rotate-45" />
        <div className="absolute inset-4 border border-red-500/15 rounded-full" />
        <div className="absolute inset-8 border border-red-500/10 rounded-full transform rotate-12" />
      </motion.div>
      
      {/* Linhas horizontais */}
      <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute inset-x-0 top-3/4 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />
    </div>
  )
}