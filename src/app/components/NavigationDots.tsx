"use client";

import { motion } from "framer-motion";

interface NavigationDotsProps {
  sections: string[];
  currentSection: number;
  onDotClick: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ sections, currentSection, onDotClick }) => {
  return (
    <div className="fixed bottom-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 sm:space-x-4 md:space-x-6 bg-black/50 backdrop-blur-sm py-2 px-3 rounded-full border border-gray-800">
      {sections.map((section, index) => (
        <motion.button
          key={index}
          onClick={() => onDotClick(index)}
          className={`relative flex flex-col items-center transition-all duration-300 ${
            currentSection === index ? "text-red-500" : "text-gray-500 hover:text-gray-300"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? "bg-red-500 shadow-[0_0_8px_2px_rgba(255,0,0,0.6)]" : "bg-gray-500"
            }`}
            animate={{ scale: currentSection === index ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[8px] sm:text-xs mt-1 uppercase tracking-wider hidden sm:block">{section}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationDots;
