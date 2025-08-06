"use client";

import React, { useEffect, useRef, useState } from "react";

const MouselightEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Efeito de luz suave ao redor do cursor
      const lightGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      lightGradient.addColorStop(0, "rgba(255, 50, 50, 0.15)");
      lightGradient.addColorStop(0.5, "rgba(255, 50, 50, 0.05)");
      lightGradient.addColorStop(1, "rgba(255, 50, 50, 0)");

      ctx.fillStyle = lightGradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 190, 0, Math.PI * 2);
      ctx.fill();

      // Sutil linha futurista conectando o mouse ao centro da tela
      ctx.strokeStyle = "rgba(255, 50, 50, 0.1)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default MouselightEffect;
