'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Layers, Grid, MessageSquare, ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import GreekGodIcon from './GreekGodIcons';

interface MobileNavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function MobileNavigation({ onNavigate }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { t } = useTranslation();

  // Bloquear scroll no body quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // Fechar menu ao navegar
  const handleNavigate = (sectionId: string) => {
    setIsOpen(false);
    onNavigate(sectionId);
    setActiveSection(sectionId);
  };

  // Detectar seção ativa durante rolagem
  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll as any);
  }, []);

  return (
    <>
      {/* Botão de menu flutuante */}
      <motion.button
        className="fixed z-50 left-4 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg sm:hidden"
        style={{ bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-sheet"
      >
        <Menu className="w-6 h-6 text-white" />
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu panel */}
            <motion.div
              id="mobile-nav-sheet"
              role="dialog"
              aria-modal="true"
              className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 rounded-t-3xl sm:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="py-6 px-4" style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}>
                {/* Indicador de arraste */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 px-2">
                  <div className="flex items-center gap-3">
                    <GreekGodIcon god="vulcano" size={28} color="#ff3d3d" />
                    <span className="text-white font-bold text-lg">Vulcano</span>
                  </div>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar menu"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>
                </div>
                
                {/* Menu items */}
                <nav className="space-y-2" role="navigation" aria-label="Navegação principal">
                  {[
                    { id: 'hero', label: t('nav.home'), icon: <Home className="w-5 h-5" /> },
                    { id: 'services', label: t('nav.services'), icon: <Layers className="w-5 h-5" /> },
                    { id: 'portfolio', label: t('nav.portfolio'), icon: <Grid className="w-5 h-5" /> },
                    { id: 'contact', label: t('nav.contact'), icon: <MessageSquare className="w-5 h-5" /> }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      className={`flex items-center justify-between w-full px-4 py-4 rounded-2xl ${
                        activeSection === item.id 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white/5 text-white/80 hover:bg-white/10'
                      }`}
                      onClick={() => handleNavigate(item.id)}
                      whileTap={{ scale: 0.98 }}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid place-items-center w-9 h-9 rounded-xl bg-white/5">
                          {item.icon}
                        </span>
                        <span className="font-medium text-base">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </motion.button>
                  ))}
                </nav>
                
                {/* CTA Button */}
                <motion.button
                  className="w-full mt-6 px-4 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-white font-semibold text-center"
                  onClick={() => handleNavigate('contact')}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('nav.requestQuote')}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Bottom navigation bar (fixed to bottom) */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 sm:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        role="navigation"
        aria-label="Barra de navegação inferior"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
      >
        <div className="flex justify-around items-end h-[64px] px-2">
          {[
            { id: 'hero', label: t('nav.home'), icon: <Home className="w-6 h-6" /> },
            { id: 'services', label: t('nav.services'), icon: <Layers className="w-6 h-6" /> },
            { id: 'portfolio', label: t('nav.portfolio'), icon: <Grid className="w-6 h-6" /> },
            { id: 'contact', label: t('nav.contact'), icon: <MessageSquare className="w-6 h-6" /> }
          ].map((item) => (
            <button
              key={item.id}
              className={`relative flex flex-col items-center justify-center h-full w-full ${
                activeSection === item.id ? 'text-red-500' : 'text-white/70'
              }`}
              onClick={() => handleNavigate(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.icon}
              <span className="text-[11px] mt-1">{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute top-0 h-0.5 w-12 bg-red-500"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
