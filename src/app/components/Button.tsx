"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "ghost"
}

const AdvancedButton: React.FC<ButtonProps> = ({ children, onClick, className = "", variant = "primary" }) => {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    primary: {
      background: "linear-gradient(45deg, #ff1744, #ff6b35, #ff1744)",
      border: "1px solid transparent",
      color: "#ffffff",
    },
    secondary: {
      background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)",
      border: "1px solid #ff1744",
      color: "#ffffff",
    },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.2)",
      color: "#ffffff",
    },
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-8 py-4 rounded-xl font-bold text-lg overflow-hidden group transition-all ${className}`}
      style={variants[variant]}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0 10px 40px rgba(255, 23, 68, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Efeito holográfico de fundo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20"
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-60"
        style={{
          background:
            variant === "primary"
              ? "linear-gradient(45deg, #ff1744, #ff6b35)"
              : "linear-gradient(45deg, #ff1744, #00ffff)",
        }}
        animate={{
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
        }}
      />

      {/* Partículas de energia */}
      {isHovered && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      {/* Conteúdo do botão */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Borda holográfica */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(45deg, transparent, #ff1744, transparent, #00ffff, transparent)",
          padding: "1px",
        }}
        animate={{
          rotate: isHovered ? [0, 360] : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-xl" style={variants[variant]} />
      </motion.div>
    </motion.button>
  )
}

export default AdvancedButton
