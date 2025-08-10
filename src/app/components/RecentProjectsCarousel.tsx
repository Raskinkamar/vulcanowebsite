"use client"

import type React from "react"
import { useEffect, useMemo, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { Project } from "../src/types"

interface RecentProjectsCarouselProps {
  projects: Project[]
  maxItems?: number
  autoPlayMs?: number
  onSelect?: (project: Project) => void
}

export default function RecentProjectsCarousel({
  projects,
  maxItems = 8,
  autoPlayMs = 3500, // Aumentado para permitir melhor visualização
  onSelect,
}: RecentProjectsCarouselProps) {
  const items = useMemo(() => {
    const list = projects.filter(Boolean)
    // Preferir destacados; se não houver, pegar os mais recentes do array
    const featured = list.filter(p => p.featured)
    const base = featured.length ? featured : list
    return base.slice(0, maxItems)
  }, [projects, maxItems])

  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Navegação por teclado quando o carrossel está focado
  const handleKey = useCallback((e: KeyboardEvent) => {
    const isInside = containerRef.current && document.activeElement && containerRef.current.contains(document.activeElement)
    if (!isInside) return
    if (e.key === 'ArrowRight') setActive(prev => (prev + 1) % items.length)
    if (e.key === 'ArrowLeft') setActive(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Autoplay suave com pausa ao hover
  useEffect(() => {
    if (isPaused) return
    
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % items.length)
    }, Math.max(1500, autoPlayMs))
    
    return () => clearInterval(id)
  }, [items.length, autoPlayMs, isPaused])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!items.length) return null

  return (
    <section 
      className="relative w-full mb-12 sm:mb-16 overflow-x-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projetos recentes"
    >
      <div className="px-2 sm:px-0">
        {/* Desktop: coverflow 3D */}
        <div className="hidden md:block perspective-[1500px]">
          <div className="relative h-[380px] lg:h-[450px] overflow-hidden">
            {/* Side gradient masks (mais dramáticos) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
            
            {/* Efeito de fundo dinâmico */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-blue-900/10 opacity-50" />
            
            {items.map((project, index) => {
              const distance = index - active
              // Ajustar para loop (fim-início)
              const shortest =
                Math.abs(distance) > items.length / 2
                  ? distance - Math.sign(distance) * items.length
                  : distance
              const z = -Math.abs(shortest) * 100 // Aumentado para maior profundidade
              const rotateY = shortest * 12 // Rotação mais acentuada
              const x = shortest * 200 // Maior espaçamento horizontal
              const scale = 1 - Math.min(Math.abs(shortest) * 0.08, 0.3) // Escala mais dramática

              const example = project.examples?.[0]
              const img = example?.imageUrl || "/placeholder.svg"

              return (
                <motion.button
                  key={project.title + index}
                  onClick={() => {
                    if (index === active && onSelect) onSelect(project)
                    setActive(index)
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  initial={false}
                  animate={{
                    x,
                    z,
                    rotateY,
                    scale,
                    zIndex: 1000 - Math.abs(shortest),
                    opacity: Math.abs(shortest) > 2 ? 0 : 1, // Fade mais rápido para evitar sobreposições
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 20,
                    mass: 1.2 // Movimento mais natural
                  }}
                  aria-label={`Ver ${project.title}`}
                  whileHover={{ scale: scale * 1.05 }} // Efeito de hover
                >
                  <div
                    className={
                      "relative w-[320px] h-[200px] lg:w-[400px] lg:h-[250px] rounded-2xl overflow-hidden border bg-zinc-950 transition-all duration-300 " +
                      (index === active 
                        ? "border-red-600/70 ring-2 ring-red-500/30 shadow-lg shadow-red-900/30" 
                        : "border-zinc-800")
                    }
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                      boxShadow: index === active 
                        ? "0 30px 70px -10px rgba(185,28,28,0.3), 0 15px 35px -5px rgba(0,0,0,0.8)" 
                        : "0 30px 60px -15px rgba(0,0,0,0.6)",
                    }}
                  >
                    <Image
                      src={img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className={`object-cover transition-all duration-500 ${index === active ? 'scale-105' : 'scale-100'}`}
                      priority={index === active || Math.abs(shortest) <= 1}
                    />
                    
                    {/* Overlay de brilho sutil */}
                    {index === active && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-70" />
                    )}
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <div className="flex flex-col gap-1">
                        <div className="text-white text-base font-semibold line-clamp-1">{project.title}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-white/70 text-sm">{project.category}</div>
                          {index === active && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-red-400 text-xs font-medium"
                            >
                              Ver detalhes →
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}

            {/* Controls - mais estilizados */}
            <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2 z-20" role="tablist" aria-label="Seleção de slide">
              {items.map((project, i) => {
                const example = project.examples?.[0]
                const img = example?.imageUrl || "/placeholder.svg"
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`group relative h-8 w-8 overflow-hidden rounded-full border border-white/10 transition-all duration-300 ${i === active 
                      ? "ring-2 ring-red-500/50" 
                      : "opacity-70 hover:opacity-100"}`}
                    aria-label={`Ir para slide ${i + 1} - ${project.title}`}
                    role="tab"
                    aria-selected={i === active}
                  >
                    <Image src={img} alt={project.title} fill className="object-cover" />
                  </button>
                )
              })}
            </div>

            {/* Arrow buttons - redesenhados */}
            <div className="absolute inset-y-0 left-6 z-20 flex items-center">
              <button
                onClick={() => setActive((active - 1 + items.length) % items.length)}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white grid place-items-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="absolute inset-y-0 right-6 z-20 flex items-center">
              <button
                onClick={() => setActive((active + 1) % items.length)}
                className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white grid place-items-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Próximo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: snap carousel melhorado */}
        <div className="md:hidden">
          <div className="relative">
            {/* Indicadores com miniaturas */}
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 z-10" role="tablist" aria-label="Seleção de slide">
              {items.map((project, i) => {
                const example = project.examples?.[0]
                const img = example?.imageUrl || "/placeholder.svg"
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative w-10 h-6 rounded-md overflow-hidden border transition-all ${i === active ? 'border-red-500 ring-2 ring-red-500/40' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                    aria-label={`Ir para ${project.title}`}
                    role="tab"
                    aria-selected={i === active}
                  >
                    <Image src={img} alt={project.title} fill className="object-cover" />
                  </button>
                )
              })}
            </div>
            
            <div 
              className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory px-1 pb-4 scrollbar-hide"
              style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch"
              }}
            >
              {items.map((project, index) => {
                const example = project.examples?.[0]
                const img = example?.imageUrl || "/placeholder.svg"
                return (
                  <motion.button
                    key={project.title + index}
                    className="relative flex-shrink-0 w-[85vw] h-56 rounded-2xl overflow-hidden border bg-zinc-950 snap-center"
                    onClick={() => {
                      onSelect?.(project)
                      setActive(index)
                    }}
                    whileTap={{ scale: 0.98 }}
                    onViewportEnter={() => setActive(index)}
                    viewport={{ amount: 0.8, once: false }}
                    aria-label={`Ver ${project.title}`}
                  >
                    <Image 
                      src={img} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-700" 
                      style={{ transform: `scale(${index === active ? 1.05 : 1})` }}
                    />
                    
                    {/* Gradiente de fundo mais dramático */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <div className="text-white text-lg font-bold mb-1">{project.title}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-white/80 text-sm">{project.category}</div>
                        <div className="text-red-400 text-xs font-medium">Ver detalhes →</div>
                      </div>
                    </div>
                    
                    {/* Borda de destaque para o item ativo */}
                    {index === active && (
                      <motion.div 
                        className="absolute inset-0 border-2 border-red-500/50 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}