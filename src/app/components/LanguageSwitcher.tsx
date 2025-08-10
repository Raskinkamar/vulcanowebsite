'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { locale, changeLocale, availableLocales } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const localeNames = {
    'pt-BR': 'Português',
    'en-US': 'English',
    'es-ES': 'Español'
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-black/50 backdrop-blur-md py-2 px-3 rounded-full border border-gray-800 hover:border-red-500/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} className="text-red-400" />
        <span className="text-xs text-white font-medium">
          {localeNames[locale as keyof typeof localeNames]}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden z-50"
          >
            <div className="py-1">
              {availableLocales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    changeLocale(loc);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    locale === loc ? 'text-red-400 bg-white/5' : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  {localeNames[loc as keyof typeof localeNames]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;