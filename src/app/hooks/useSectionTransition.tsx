'use client';

import { useState, useCallback } from 'react';

interface TransitionOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
  duration?: number;
}

/**
 * Hook para gerenciar transições animadas entre seções
 * @returns {Object} Funções e estados para controlar transições
 */
export default function useSectionTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');
  const [transitionColor, setTransitionColor] = useState('#ff3d3d');
  const [transitionDuration, setTransitionDuration] = useState(0.6);
  
  /**
   * Inicia uma transição de seção
   * @param {Function} callback Função a ser executada após a transição
   * @param {TransitionOptions} options Opções de personalização da transição
   */
  const transitionTo = useCallback((
    callback?: () => void,
    options?: TransitionOptions
  ) => {
    // Configurar a direção e cor da transição
    if (options?.direction) setTransitionDirection(options.direction);
    if (options?.color) setTransitionColor(options.color);
    if (options?.duration) setTransitionDuration(options.duration);
    
    // Iniciar a transição
    setIsTransitioning(true);
    
    // Executar a função de callback após um pequeno delay para permitir que a animação comece
    setTimeout(() => {
      if (callback) callback();
      
      // Finalizar a transição após a duração definida
      setTimeout(() => {
        setIsTransitioning(false);
      }, (options?.duration || transitionDuration) * 1000);
    }, 200);
  }, [transitionDuration]);
  
  return {
    isTransitioning,
    transitionDirection,
    transitionColor,
    transitionDuration,
    transitionTo,
    completeTransition: () => setIsTransitioning(false),
  };
}
