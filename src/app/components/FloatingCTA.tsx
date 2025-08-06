"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, ChevronRight } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  
  // Mostrar CTA após rolagem de 1000px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const steps = [
    {
      emoji: "💡",
      heading: "Transforme sua ideia em realidade",
      text: "Não deixe suas ideias ficarem só no papel. Nossa equipe está pronta para torná-las reais."
    },
    {
      emoji: "🚀",
      heading: "Tecnologias de ponta",
      text: "Utilizamos tecnologias modernas para garantir o melhor desempenho e experiência."
    },
    {
      emoji: "🔥",
      heading: "Exclusividade e prazo",
      text: "Vagas limitadas para novos projetos neste mês. Garanta sua vantagem agora!"
    }
  ]

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      // Último passo, redirecionar para contato
      const contactSection = document.getElementById('contact-section')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        setIsExpanded(false)
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {!isExpanded ? (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white shadow-lg hover:shadow-red-500/20 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Vamos conversar?</span>
            </motion.button>
          ) : (
            <motion.div
              className="bg-black/90 backdrop-blur-md border border-gray-800 rounded-2xl p-5 max-w-sm w-full shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-white">Vamos trabalhar juntos?</h3>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <div className="text-4xl mb-3">{steps[activeStep].emoji}</div>
                  <h4 className="text-white font-semibold text-lg mb-2">{steps[activeStep].heading}</h4>
                  <p className="text-gray-300 text-sm">{steps[activeStep].text}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === activeStep ? 'bg-red-500' : 'bg-gray-600'}`}
                    ></div>
                  ))}
                </div>
                
                <motion.button
                  onClick={nextStep}
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-sm font-medium text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeStep === steps.length - 1 ? 'Falar agora' : 'Continuar'}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}