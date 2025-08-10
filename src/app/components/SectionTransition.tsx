'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionTransitionProps {
  active: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
  duration?: number;
  onComplete?: () => void;
}

export default function SectionTransition({ 
  active, 
  direction = 'up',
  color = '#ff3d3d', // vermelho padrão
  duration = 0.6,
  onComplete
}: SectionTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  
  // Definir variantes de animação com base na direção
  const getAnimationVariants = () => {
    switch(direction) {
      case 'up':
        return {
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '-100%' }
        };
      case 'down':
        return {
          initial: { y: '-100%' },
          animate: { y: '0%' },
          exit: { y: '100%' }
        };
      case 'left':
        return {
          initial: { x: '100%' },
          animate: { x: '0%' },
          exit: { x: '-100%' }
        };
      case 'right':
        return {
          initial: { x: '-100%' },
          animate: { x: '0%' },
          exit: { x: '100%' }
        };
      default:
        return {
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '-100%' }
        };
    }
  };

  const variants = getAnimationVariants();
  
  // Detectar mudança no estado 'active' para iniciar a animação
  useEffect(() => {
    if (active) {
      // Iniciar a animação
      setIsAnimating(true);
      setShouldRender(true);
      
      // Finalizar a animação após a duração
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }, duration * 1000 + 100); // Duração da animação + buffer
      
      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);
  
  // Parar de renderizar quando a animação terminar
  useEffect(() => {
    if (!isAnimating && !active) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating, active]);
  
  // Não renderizar se não estiver ativo ou animando
  if (!shouldRender) return null;
  
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ 
            duration: duration, 
            ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smooth transition
          }}
        >
          <div 
            className="w-full h-full" 
            style={{ backgroundColor: color }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
