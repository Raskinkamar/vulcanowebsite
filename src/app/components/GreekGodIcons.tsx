"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface GreekGodIconProps {
  god: 'vulcano' | 'zeus' | 'poseidon' | 'athena' | 'apollo' | 'hermes'
  size?: number
  color?: string
  className?: string
  animated?: boolean
}

export default function GreekGodIcon({
  god,
  size = 64,
  color = "#ff3d3d",
  className = "",
  animated = true
}: GreekGodIconProps) {
  // SVG paths para cada deus
  const godPaths: Record<string, {viewBox: string, path: string, motionProps?: any}> = {
    vulcano: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C28,4 24,8 24,14 C24,18 26,22 30,24 L30,26 L28,26 C24,26 20,30 20,34 C20,36 21,38 23,40 
        L19,48 C18,50 20,52 22,51 L24,50 L24,60 L40,60 L40,50 L42,51 C44,52 46,50 45,48 L41,40 
        C43,38 44,36 44,34 C44,30 40,26 36,26 L34,26 L34,24 C38,22 40,18 40,14 C40,8 36,4 32,4 Z
        M30,28 L34,28 C38,28 40,32 36,36 L32,32 L28,36 C24,32 26,28 30,28 Z
        M22,42 L26,38 L30,42 L34,38 L38,42 L42,38 L42,40 L38,48 L26,48 L22,40 Z
        M26,50 L38,50 L38,58 L26,58 Z
      `,
      motionProps: {
        variants: {
          animate: {
            y: [0, -5, 0],
            rotate: [0, 5, 0],
            transition: { 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1] 
            }
          }
        }
      }
    },
    zeus: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C28,4 24,7 24,10 C24,13 26,16 32,16 C38,16 40,13 40,10 C40,7 36,4 32,4 Z
        M32,17 C24,17 16,20 16,24 L16,28 L24,28 L24,48 L20,52 L20,60 L44,60 L44,52 L40,48 L40,28 L48,28 L48,24 C48,20 40,17 32,17 Z
        M30,20 L34,20 L33,27 L37,27 L32,40 L31,30 L27,30 Z
      `,
      motionProps: {
        variants: {
          animate: {
            filter: ["drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))", "drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))", "drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))"],
            transition: { 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      }
    },
    poseidon: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C28,4 24,7 24,10 C24,13 26,16 32,16 C38,16 40,13 40,10 C40,7 36,4 32,4 Z
        M32,17 C24,17 16,20 16,24 L16,28 L20,28 L20,60 L24,60 L24,30 L28,30 L28,60 L36,60 L36,30 L40,30 L40,60 L44,60 L44,28 L48,28 L48,24 C48,20 40,17 32,17 Z
        M32,20 L32,50 M28,35 C24,40 20,40 20,40 M36,35 C40,40 44,40 44,40
      `,
      motionProps: {
        variants: {
          animate: {
            y: [0, 3, 0],
            transition: { 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      }
    },
    athena: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C26,4 22,8 22,12 C22,16 26,20 32,20 C38,20 42,16 42,12 C42,8 38,4 32,4 Z
        M22,22 L20,40 L26,40 L28,60 L36,60 L38,40 L44,40 L42,22 Z
        M26,22 L38,22 L36,38 L28,38 Z
        M29,24 L29,36 L35,36 L35,24 Z
      `,
      motionProps: {
        variants: {
          animate: {
            y: [0, -3, 0],
            filter: ["drop-shadow(0 0 3px rgba(156, 39, 176, 0.3))", "drop-shadow(0 0 8px rgba(156, 39, 176, 0.6))", "drop-shadow(0 0 3px rgba(156, 39, 176, 0.3))"],
            transition: { 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      }
    },
    apollo: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C38,4 44,10 44,16 C44,22 38,28 32,28 C26,28 20,22 20,16 C20,10 26,4 32,4 Z
        M32,8 L34,14 L40,14 L35,18 L37,24 L32,20 L27,24 L29,18 L24,14 L30,14 Z
        M24,30 L40,30 L38,40 L34,40 L34,60 L30,60 L30,40 L26,40 Z
      `,
      motionProps: {
        variants: {
          animate: {
            rotate: [0, 5, 0, -5, 0],
            filter: ["drop-shadow(0 0 5px rgba(255, 193, 7, 0.2))", "drop-shadow(0 0 15px rgba(255, 193, 7, 0.6))", "drop-shadow(0 0 5px rgba(255, 193, 7, 0.2))"],
            transition: { 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      }
    },
    hermes: {
      viewBox: "0 0 64 64",
      path: `
        M32,4 C28,4 24,7 24,10 C24,13 26,16 32,16 C38,16 40,13 40,10 C40,7 36,4 32,4 Z
        M28,17 L28,30 L22,36 L22,60 L42,60 L42,36 L36,30 L36,17 Z
        M30,17 L34,17 L34,29 L38,33 L38,56 L26,56 L26,33 L30,29 Z
        M32,20 L32,40 M28,36 L36,36
        M20,25 C15,28 15,32 20,35 M44,25 C49,28 49,32 44,35
      `,
      motionProps: {
        variants: {
          animate: {
            x: [0, 10, 0, -10, 0],
            transition: { 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      }
    }
  }

  const godData = godPaths[god]
  
  if (!godData) {
    return null
  }
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={godData.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      {...(godData.motionProps || {})}
    >
      <motion.path
        d={godData.path}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
  )
}