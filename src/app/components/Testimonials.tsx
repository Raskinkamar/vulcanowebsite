"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Quote, Star, Shield, Award, CheckCircle, Users, TrendingUp } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  message: string
  avatar?: string
  rating: number
  company?: string
  project?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

// Background minimalista
const MinimalBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid sutil */}
      <div className="absolute inset-0 opacity-[0.3]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Gradiente sutil */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-red-950/10 to-transparent" />

      {/* Partículas minimalistas */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/30 rounded-full"
          style={{
            top: `${15 + i * 25}%`,
            left: `${5 + i * 20}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
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

// Card de depoimento limpo
const TestimonialCard: React.FC<{
  testimonial: Testimonial
  index: number
}> = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/30 hover:bg-black/60 h-full"
        whileHover={{ y: -4 }}
      >
        {/* Header simples */}
        <div className="relative h-16 bg-gradient-to-r from-red-900/20 to-black/40 flex items-center justify-between px-6">
          {/* Rating stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.rating ? "text-red-500 fill-red-500" : "text-gray-600"}`}
              />
            ))}
          </div>

          {/* Quote icon */}
          <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center">
            <Quote className="w-4 h-4 text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Message */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed text-sm italic">"{testimonial.message}"</p>
          </div>

          {/* Project info */}
          {testimonial.project && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs">
              <Award className="w-3 h-3 text-red-400" />
              <span className="text-red-400 font-medium">Projeto: {testimonial.project}</span>
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center gap-4 pt-2">
            {/* Avatar */}
            <div className="relative">
              {testimonial.avatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-lg font-bold text-white border-2 border-white/20">
                  {testimonial.name[0]}
                </div>
              )}

              {/* Verified badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-base">{testimonial.name}</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{testimonial.role}</span>
                {testimonial.company && (
                  <>
                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                    <span className="text-red-400 font-medium">{testimonial.company}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Verificado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>
    </motion.div>
  )
}

const AdvancedTestimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white py-20">
      <MinimalBackground />

      {/* Background galaxy GIF com opacidade reduzida */}
      <div
        className="absolute opacity-70 pointer-events-none"
        style={{
          backgroundImage: "url('/images/greek/galaxy.gif')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          right: "0",
          top: "0",
          width: "40%",
          height: "100%",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {/* Badge simples */}
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/5 border border-white/10 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 font-medium text-sm">Clientes Satisfeitos</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-white/80">
              <Star className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-sm">4.9/5.0</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">DEPOIMENTOS</span>
            <br />
            <span className="text-red-500">DE CLIENTES</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8">
            O que nossos clientes dizem sobre nossas{" "}
            <span className="text-white font-semibold">soluções inovadoras</span> e{" "}
            <span className="text-red-500 font-semibold">resultados entregues</span>.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Shield, text: "100% Verificados" },
              { icon: Users, text: "Clientes Reais" },
              { icon: TrendingUp, text: "Resultados Comprovados" },
              { icon: Award, text: "Projetos Premiados" },
            ].map((item, idx) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center p-12 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Resultados que <span className="text-red-500">falam por si</span>
          </h3>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Satisfação", icon: Star },
              { value: "150+", label: "Projetos", icon: Award },
              { value: "24h", label: "Suporte", icon: Shield },
              { value: "5★", label: "Avaliação", icon: TrendingUp },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-500 mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AdvancedTestimonials
