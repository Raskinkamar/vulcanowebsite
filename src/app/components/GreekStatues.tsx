"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface GreekStatuesProps {
  opacity?: number
}

export default function GreekStatues({ opacity = 1.0 }: GreekStatuesProps) {
  // Estatuas gregas
  const statues = [
    { 
      src: "/images/greek/statue1.jpg", 
      position: { top: '45%', left: '10%' },
      size: { width: 380, height: 550 },
      animation: { 
        y: [0, -10, 0], 
        opacity: [opacity, opacity, opacity] 
      }
    },
    { 
      src: "/images/greek/statue2.jpg", 
      position: { bottom: '5%', right: '5%' },
      size: { width: 350, height: 520 },
      animation: { 
        y: [0, -8, 0], 
        opacity: [opacity, opacity, opacity] 
      }
    }
  ]

  return (
    <div className="fixed inset-0 w-full h-full overflow-visible pointer-events-none z-20">
      {statues.map((statue, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            ...statue.position,
            width: statue.size.width,
            height: statue.size.height,
          }}
          animate={statue.animation}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={statue.src}
              alt={`Greek statue ${index + 1}`}
              fill
              style={{
                objectFit: 'contain'
              }}
              priority={index < 2}
            />
          </div>
        </motion.div>
      ))}

    </div>
  )
}