'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface SlideItem {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
  extraInfo?: React.ReactNode;
}

interface ElegantSliderProps {
  items: SlideItem[];
  autoplaySpeed?: number;
  showDots?: boolean;
  dotColor?: string;
  height?: string;
  onSlideClick?: (item: SlideItem) => void;
}

const ElegantSlider: React.FC<ElegantSliderProps> = ({
  items,
  autoplaySpeed = 5000,
  showDots = true,
  dotColor = "rgba(255, 61, 61, 0.7)",
  height = "500px",
  onSlideClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle autoplay
  useEffect(() => {
    if (autoplaySpeed > 0 && !isHovering) {
      autoplayRef.current = setTimeout(() => {
        if (!isAnimating) {
          goToNext();
        }
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentIndex, isHovering, autoplaySpeed, isAnimating]);

  // Functions to control the slider
  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // Reset animation flag after animation duration
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // Reset animation flag after animation duration
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation flag after animation duration
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ height }}
      ref={sliderRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full">
            {/* Image with overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <Image 
              src={items[currentIndex].imageUrl}
              alt={items[currentIndex].title}
              fill
              className="object-cover object-center"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex items-center">
              <motion.div 
                className="px-8 md:px-16 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                  {items[currentIndex].title}
                </h3>
                <p className="text-white/80 text-base md:text-lg mb-6 max-w-lg">
                  {items[currentIndex].description}
                </p>
                {items[currentIndex].extraInfo && (
                  <div className="mt-6">
                    {items[currentIndex].extraInfo}
                  </div>
                )}
                <motion.button
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSlideClick && onSlideClick(items[currentIndex])}
                >
                  Explorar Projeto
                </motion.button>
              </motion.div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 right-20 md:right-40 transform -translate-y-1/2 z-10 opacity-20">
              <motion.div 
                className="w-80 h-80 md:w-[500px] md:h-[500px] border border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="absolute top-1/2 right-0 md:right-20 transform -translate-y-1/2 z-10 opacity-20">
              <motion.div 
                className="w-40 h-40 md:w-80 md:h-80 border border-white/10 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center">
        <motion.button
          className="ml-4 p-2 md:p-3 rounded-full bg-black/40 hover:bg-red-600/50 backdrop-blur-sm border border-white/10 text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center">
        <motion.button
          className="mr-4 p-2 md:p-3 rounded-full bg-black/40 hover:bg-red-600/50 backdrop-blur-sm border border-white/10 text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNext}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      {/* Navigation dots */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={`dot-${index}`}
              className="group"
              onClick={() => goToSlide(index)}
            >
              <motion.div 
                className="w-3 h-3 rounded-full transition-all"
                initial={{ backgroundColor: index === currentIndex ? dotColor : 'rgba(255,255,255,0.3)' }}
                animate={{
                  backgroundColor: index === currentIndex ? dotColor : 'rgba(255,255,255,0.3)',
                  scale: index === currentIndex ? 1 : 0.8
                }}
                whileHover={{ scale: 1.2 }}
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 px-8 py-3">
        <div className="flex justify-between items-center mb-1.5">
          <div className="text-white/70 text-xs font-medium">{`${currentIndex + 1}/${items.length}`}</div>
          <div className="text-white/70 text-xs font-medium">{items[currentIndex].title}</div>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: '100%',
              transition: { duration: autoplaySpeed / 1000, ease: 'linear', repeat: isHovering ? 0 : Infinity }
            }}
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ElegantSlider;