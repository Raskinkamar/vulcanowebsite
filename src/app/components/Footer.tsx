"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer 
      className="relative w-full py-8 bg-black text-gray-400 overflow-hidden"
    >
      {/* SVG Background Animation - Mais sutil que os outros componentes */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="url(#footerGrid)" />
        <pattern id="footerGrid" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="none" stroke="#ffffff05" strokeWidth="0.5" />
        </pattern>
      </svg>

      <div className="relative z-10 container mx-auto px-6">
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-red-500 mb-4 md:mb-0"
            >
              Vulcano
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400"
            >
              © 2025 vulcano. Todos os direitos reservados.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
