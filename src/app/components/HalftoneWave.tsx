'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HalftoneWaveProps {
  className?: string;
  color?: string;
  dotSize?: number;
  dotGap?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
}

const HalftoneWave: React.FC<HalftoneWaveProps> = ({
  className = '',
  color = 'rgba(255, 61, 61, 0.7)', // Vermelho para combinar com o tema Vulcano
  dotSize = 3,
  dotGap = 20,
  amplitude = 40,
  frequency = 0.02,
  speed = 0.05
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200; // Altura fixa para a onda
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Limpa o canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenha os pontos da onda halftone
      for (let x = 0; x < canvas.width; x += dotGap) {
        for (let y = 0; y < canvas.height; y += dotGap) {
          // Calcula o deslocamento y baseado na função de onda
          const waveY = Math.sin((x * frequency) + offsetRef.current) * amplitude;
          
          // Calcula o tamanho do ponto baseado na distância da onda
          const distanceFromWave = Math.abs(y - (canvas.height / 2 + waveY));
          const dotRadius = Math.max(0, dotSize * (1 - distanceFromWave / (canvas.height / 4)));
          
          if (dotRadius > 0) {
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }
      }
      
      // Atualiza o offset para animação
      offsetRef.current += speed;
      
      // Continua a animação
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [color, dotSize, dotGap, amplitude, frequency, speed]);

  return (
    <motion.div 
      className={`absolute w-full overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} />
    </motion.div>
  );
};

export default HalftoneWave;