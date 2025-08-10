'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionLoaderProps {
  height?: string;
  message?: string;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ 
  height = "h-96",
  message = "Carregando..."
}) => {
  return (
    <div className={`${height} w-full flex flex-col items-center justify-center`}>
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-full"
              style={{ borderTopColor: 'transparent', scale: 1 - i * 0.2 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        <motion.p
          className="text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
};

export default SectionLoader;