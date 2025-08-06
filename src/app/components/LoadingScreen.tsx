"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  React.useEffect(() => {
    // Definir um tempo mínimo para o loading ser mostrado
    const timeout = setTimeout(() => {
      finishLoading();
    }, 3000); // 3 segundos de loading

    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center">
        {/* GIF de carregamento centralizado */}
        <div className="relative w-48 h-48 mb-6">
          <Image
            src="/images/greek/loading.gif"
            alt="Carregando"
            fill
            style={{ objectFit: "contain" }}
            unoptimized
            priority
          />
        </div>

        {/* Texto de carregamento com animação */}
        <motion.div 
          className="text-white text-xl font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          Carregando...
        </motion.div>
        
        {/* Barra de progresso */}
        <motion.div 
          className="w-64 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden relative"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-700 absolute left-0 top-0"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Vulcano logo */}
        <motion.div
          className="mt-8 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-2xl font-bold text-red-500">Vulcano</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;