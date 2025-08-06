"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SliderItem } from "@/types"

interface ElegantSliderProps {
  items: SliderItem[]
  height?: string
  onSlideClick?: (item: SliderItem) => void
  dotColor?: string
}

const ElegantSlider: React.FC<ElegantSliderProps> = ({
  items,
  height = "500px",
  onSlideClick,
  dotColor = "rgba(255, 255, 255, 0.7)",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false) // New state for pausing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    resetTimeout()
    if (!isPaused) {
      // Only auto-slide if not paused
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1)),
        5000, // Auto-slide every 5 seconds
      )
    }

    return () => {
      resetTimeout()
    }
  }, [currentIndex, items.length, resetTimeout, isPaused]) // Add isPaused to dependencies

  const goToNext = useCallback(() => {
    resetTimeout() // Reset timeout on manual navigation
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }, [items.length, resetTimeout])

  const goToPrevious = useCallback(() => {
    resetTimeout() // Reset timeout on manual navigation
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }, [items.length, resetTimeout])

  const goToSlide = useCallback(
    (index: number) => {
      resetTimeout() // Reset timeout on manual navigation
      setCurrentIndex(index)
    },
    [resetTimeout],
  )

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-900 text-gray-500 rounded-lg" style={{ height }}>
        No items to display in slider.
      </div>
    )
  }

  const currentItem = items[currentIndex]

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-2xl"
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.imageUrl || "/placeholder.svg"}
            alt={currentItem.title}
            fill
            style={{ objectFit: "cover" }}
            className="brightness-[0.4] transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" // Added sizes
            priority={currentIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-extrabold mb-2 drop-shadow-lg"
            >
              {currentItem.title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-white/80 max-w-2xl drop-shadow-lg"
            >
              {currentItem.description}
            </motion.p>
            {currentItem.extraInfo && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4"
              >
                {currentItem.extraInfo}
              </motion.div>
            )}
            {onSlideClick && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={() => onSlideClick(currentItem)}
                className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
              >
                Ver Detalhes
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "w-8 bg-red-600" : "bg-white/40 hover:bg-white/70"
            }`}
            style={{ backgroundColor: currentIndex === index ? dotColor : undefined }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ElegantSlider