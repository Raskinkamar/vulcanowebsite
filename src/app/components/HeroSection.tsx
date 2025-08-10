"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../hooks/useTranslation"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiWordpress,
  SiFlutter,
  SiVuedotjs,
  SiLaravel,
} from "react-icons/si"
// Mobile-specific planet layout (different from desktop)

interface HeroSectionProps {
  onViewPortfolio: () => void
}

const TECHNOLOGIES = [
  {
    name: "React",
    icon: <SiReact />,
    description:
      "Biblioteca JavaScript para construção de interfaces interativas com componentes reutilizáveis e renderização eficiente.",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    description:
      "Framework React com renderização híbrida, otimização automática e roteamento simplificado para aplicações de alto desempenho.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    description:
      "Superset JavaScript que adiciona tipagem estática, aumentando a robustez do código e melhorando a experiência de desenvolvimento.",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss />,
    description:
      "Framework CSS utilitário que permite design rápido e consistente diretamente no HTML, acelerando o desenvolvimento visual.",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs />,
    description:
      "Ambiente de execução JavaScript server-side que permite construir aplicações escaláveis e de alta performance.",
  },
  {
    name: "WordPress",
    icon: <SiWordpress />,
    description:
      "Sistema de gerenciamento de conteúdo que facilita a criação de sites personalizáveis com ampla variedade de plugins e temas.",
  },
  {
    name: "Flutter",
    icon: <SiFlutter />,
    description:
      "Framework UI da Google para criação de aplicativos nativos para mobile, web e desktop a partir de uma única base de código.",
  },
  {
    name: "Vue.js",
    icon: <SiVuedotjs />,
    description:
      "Framework JavaScript progressivo para construção de interfaces com abordagem incremental e alta flexibilidade.",
  },
  {
    name: "Laravel",
    icon: <SiLaravel />,
    description:
      "Framework PHP elegante e robusto para desenvolvimento web com sintaxe expressiva e recursos poderosos para aplicações corporativas.",
  },
]

// Background minimalista
const MinimalBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid sutil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Gradiente sutil */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-950/10 to-transparent" />

      {/* Partículas minimalistas */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/30 rounded-full"
          style={{
            top: `${20 + i * 30}%`,
            right: `${10 + i * 20}%`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Componente de tecnologia limpo
const CleanTechBadge: React.FC<{
  tech: (typeof TECHNOLOGIES)[0]
  index: number
}> = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/10 rounded-lg cursor-pointer transition-all duration-300 hover:border-red-500/50 hover:bg-black/60"
        whileHover={{ y: -2 }}
      >
        <div className="w-5 h-5 flex-shrink-0 text-white/80">{tech.icon}</div>
        <span className="text-sm font-medium text-white/90">{tech.name}</span>
      </motion.div>

      {/* Tooltip limpo */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 z-50"
        >
          <div className="bg-black/95 border border-white/20 rounded-lg p-3">
            <div className="text-xs text-gray-300 leading-relaxed">{tech.description}</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Carrossel inclinado de tecnologias com movimento contínuo
const TechCarousel: React.FC = () => {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  // Detecta prefers-reduced-motion
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(!!m.matches)
    handler()
    m.addEventListener?.('change', handler)
    return () => m.removeEventListener?.('change', handler)
  }, [])

  // Duplicar itens para loop infinito
  const items = React.useMemo(() => [...TECHNOLOGIES, ...TECHNOLOGIES], [])

  return (
    <div className="relative">
      {/* Fades laterais */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent z-10" />

      <div
        className="overflow-hidden px-4 sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          className="flex gap-4 will-change-transform"
          style={{ rotate: '-6deg' }}
          animate={reduced || paused ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={reduced || paused ? { duration: 0 } : { duration: 18, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
        >
          {items.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className="flex-shrink-0">
              <div className="relative w-44 h-16 rounded-xl border border-white/10 bg-black/40">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative h-full w-full flex items-center gap-3 px-4" style={{ rotate: '6deg' }}>
                  <div className="w-5 h-5 text-white/80 flex items-center justify-center">{tech.icon}</div>
                  <div className="text-white/90 font-medium text-sm">{tech.name}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const AdvancedHeroSection: React.FC<HeroSectionProps> = ({ onViewPortfolio }) => {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full text-white overflow-hidden bg-black">
      <MinimalBackground />

      {/* Planet GIF - mantido mas com opacidade reduzida */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "0",
          top: "10%",
          transform: "translateY(-65%)",
          width: "45%",
          height: "90%",
          zIndex: 1,
          opacity: 0.6,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-full h-full hidden sm:block" style={{ transform: "scaleX(-1)" }}>
          <Image
            src="/images/greek/planet2.gif"
            alt="Planeta girando"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            quality={100}
          />
        </div>
      </motion.div>



      {/* Mobile planet (app-like layout): docked bottom-right behind content */}
      <motion.div
        className="absolute block sm:hidden pointer-events-none"
        style={{
          right: 0,
          bottom: 0,
          transform: "translate(10%, 10%)",
          width: "78vw",
          height: "38vh",
          zIndex: 0,
          opacity: 0.8,
        }}
        animate={{ x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/greek/planet2.gif"
            alt="Planeta girando"
            fill
            unoptimized
            priority
            sizes="78vw"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
          {/* vignette for legibility */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Badge simples */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 mb-6 sm:mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white/80 font-medium text-sm">{t('heroSection.availability') as string}</span>
        </motion.div>

        {/* Título principal limpo */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 leading-tight px-4 sm:px-0"
        >
          <span className="block text-white mb-2">{t('heroSection.mainTitle.first') as string}</span>
          <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t('heroSection.mainTitle.second') as string}</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
        >
          {t('heroSection.subtitle') as string}
        </motion.p>

        {/* Métricas limpas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center gap-8 sm:gap-12 mb-8 sm:mb-12"
        >
          {[
            { value: "100%", label: t('heroSection.metrics.satisfaction') as string },
            { value: "150+", label: t('heroSection.metrics.projects') as string },
            { value: "24h", label: t('heroSection.metrics.support') as string },
          ].map((metric, idx) => (
            <motion.div key={metric.label} className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="text-3xl font-bold text-red-500 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs limpos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          <motion.button
            onClick={onViewPortfolio}
              className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold text-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              {t('heroSection.cta.primary') as string}
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>

          <a
            href="#portfolio"
            className="text-white/80 font-medium border-b border-red-500/50 hover:border-red-500 hover:text-white transition-colors pb-1"
            aria-label="Ir para o portfólio"
          >
            {t('heroSection.cta.secondary') as string}
          </a>
        </motion.div>

        {/* Technologies - carrossel inclinado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-4"
        >
          <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{t('heroSection.techTitle') as string}</div>
          <TechCarousel />
        </motion.div>

        {/* Scroll indicator limpo */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        >
          <span className="text-xs mb-2">{t('heroSection.scrollHint') as string}</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  )
}

export default AdvancedHeroSection
