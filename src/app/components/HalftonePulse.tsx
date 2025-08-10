'use client';

import React, { useEffect, useRef } from 'react';

interface HalftonePulseProps {
  className?: string;
  color?: string;
  dotSize?: number;
  dotGap?: number;
  amplitude?: number; // 0..1 multiplier for pulse strength
  frequency?: number; // spatial frequency
  speed?: number; // base animation speed
  pulseSpeed?: number; // radial pulse speed
  opacity?: number; // global alpha 0..1
  blendMode?: CanvasRenderingContext2D['globalCompositeOperation'];
}

// Full-viewport halftone background with a subtle pulsing wave
const HalftonePulse: React.FC<HalftonePulseProps> = ({
  className = '',
  color = '255, 61, 61', // RGB only; opacity handled separately
  dotSize = 2,
  dotGap = 22,
  amplitude = 0.7,
  frequency = 0.015,
  speed = 0.02,
  pulseSpeed = 0.6,
  opacity = 0.25,
  blendMode = 'screen',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const reducedMotionRef = useRef<boolean>(false);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
    // Media queries for mobile and reduced motion
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqlMobile = window.matchMedia('(max-width: 640px)');
    reducedMotionRef.current = !!mqlReduced.matches;
    isMobileRef.current = !!mqlMobile.matches;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      canvas.width = Math.floor(innerWidth * devicePixelRatio);
      canvas.height = Math.floor(innerHeight * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const handleDprChange = () => {
      devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
      resize();
    };

    window.addEventListener('resize', resize);
    window.matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener?.('change', handleDprChange);
    mqlReduced.addEventListener?.('change', () => { reducedMotionRef.current = !!mqlReduced.matches; });
    mqlMobile.addEventListener?.('change', () => { isMobileRef.current = !!mqlMobile.matches; });
    resize();

    startTimeRef.current = performance.now();

    const animate = () => {
      const now = performance.now();
      const t = (now - startTimeRef.current) / 1000; // seconds

      const width = canvas.width / devicePixelRatio;
      const height = canvas.height / devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = blendMode;

      // Smooth global pulsing amplitude 0..1
      const pulse = reducedMotionRef.current ? 0.75 : 0.5 + 0.5 * Math.sin(t * 0.5);
      const cx = width / 2;
      const cy = height / 2;

      // Mobile tuning: bigger gaps, lower opacity
      const localGap = isMobileRef.current ? Math.max(dotGap, 28) : dotGap;
      const localOpacity = isMobileRef.current ? Math.min(opacity, 0.18) : opacity;

      for (let x = 0; x <= width; x += localGap) {
        for (let y = 0; y <= height; y += localGap) {
          // Directional traveling wave
          const wave = Math.sin(x * frequency + (reducedMotionRef.current ? 0 : t * (speed * 60))) *
                       Math.cos(y * frequency * 0.8 + (reducedMotionRef.current ? 0 : t * (speed * 42)));
          // Radial pulse propagating from center
          const dist = Math.hypot(x - cx, y - cy);
          const radial = Math.sin(dist * frequency * 0.7 - (reducedMotionRef.current ? 0 : t * pulseSpeed));

          // Combine influences and normalize to 0..1
          const influence = 0.6 * wave + 0.4 * radial; // -1..1
          const normalized = (influence + 1) * 0.5; // 0..1

          // Dynamic radius with global pulsing amplitude
          const dyn = (0.3 + 0.7 * normalized) * (0.6 + 0.4 * pulse) * amplitude; // 0..~1
          const radius = Math.max(0, dotSize * dyn);
          if (radius <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${localOpacity})`;
          ctx.fill();
        }
      }

      if (!reducedMotionRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [amplitude, blendMode, color, dotGap, dotSize, frequency, opacity, pulseSpeed, speed]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default HalftonePulse;


