"use client"

import React from "react"
import { motion } from "framer-motion"
import { SiReact, SiWordpress, SiLaravel } from "react-icons/si"

const featuresData = [
  {
    title: "Web3 Game-Changers",
    description: "Gas-free gameplay, Evolutionary NFTs, On-Chain Logic com tecnologias de ponta para transformar a experiência do usuário.",
    icon: <SiReact />,
    color: "#61DAFB"
  },
  {
    title: "Structured Data",
    description: "File storage, Descentralized relational databases, On-Chain AI data layers para empresas que buscam soluções completas.",
    icon: <SiWordpress />,
    color: "#21759B"
  },
  {
    title: "Performance Otimizada",
    description: "Customizable fees, Code 10x faster with Rell, Dedicated dApp chains para resultados excepcionais e escaláveis.",
    icon: <SiLaravel />,
    color: "#FF2D20"
  },
]

export default function Features() {
  return (
    <section id="features" className="relative w-full text-white py-20 bg-black overflow-visible">
      {/* Fundo padronizado como nas outras seções */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ff3d3d10_1px,transparent_1px)] [background-size:40px_40px]" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(255, 0, 0, 0.3)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Imagem de fundo decorativa */}
      <div
        className="absolute opacity-80 pointer-events-none"
        style={{
          backgroundImage: "url('/images/greek/galaxy.jpg')",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          width: "30%",
          height: "70%",
          zIndex: 1,
          filter: "brightness(0.7) hue-rotate(340deg)"
        }}
      />

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge de destaque */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/20 border border-red-500/30 text-xs sm:text-sm text-red-400 backdrop-blur-sm">
              <span className="font-semibold">Tecnologia Avançada</span> • Soluções inovadoras
            </div>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Recursos</span>{" "}
            <span className="text-white">exclusivos</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-6">
            Tecnologias <span className="text-white font-medium">avançadas</span> que impulsionam
            seu negócio com <span className="text-red-400">soluções inovadoras</span>.
          </p>
          
          {/* Vantagens competitivas */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">✓</div>
              <span className="text-sm text-gray-300">Tecnologia de ponta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">✓</div>
              <span className="text-sm text-gray-300">Escalabilidade garantida</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">✓</div>
              <span className="text-sm text-gray-300">Alta performance</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feat, index) => (
            <motion.div
              key={index}
              className="relative bg-black border border-gray-800 hover:border-red-500 rounded-xl p-8 group transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Gradiente na borda superior */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
              
              <div 
                className="w-12 h-12 flex items-center justify-center mb-4 rounded-md relative"
                style={{
                  background: `linear-gradient(135deg, ${feat.color}15 0%, transparent 100%)`
                }}
              >
                <motion.div
                  className="text-red-500 text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feat.icon}
                </motion.div>
                
                {/* Elemento decorativo */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white">{feat.title}</h3>
              <div className="h-1 w-10 bg-red-500/30 rounded-full mb-4"></div>
              
              <p className="text-gray-400">{feat.description}</p>
              
              {/* Estatísticas destacadas como em sites de cripto */}
              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="bg-black/40 border border-gray-800 rounded p-2">
                  <div className="text-red-500 text-xl font-bold">+40%</div>
                  <div className="text-gray-500 text-xs">Performance</div>
                </div>
                <div className="bg-black/40 border border-gray-800 rounded p-2">
                  <div className="text-red-500 text-xl font-bold">100%</div>
                  <div className="text-gray-500 text-xs">Escalável</div>
                </div>
              </div>
              
              {/* Glowing effect on hover - Como no HeroSection */}
              <div className="absolute inset-0 rounded-xl -z-10 bg-gradient-to-r from-red-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
              
              {/* Partícula de destaque no canto */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full opacity-60"></div>
              
              {/* Decoração geométrica */}
              <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden opacity-10">
                <div className="absolute top-1/2 left-1/2 w-full h-full border-2 border-red-500 rounded-full" 
                  style={{transform: "translate(-50%, -50%) scale(0.5)"}}></div>
                <div className="absolute top-1/2 left-1/2 w-full h-full border border-red-500 rounded-full"
                  style={{transform: "translate(-50%, -50%) scale(0.8)"}}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-black to-gray-900 border border-red-500/20 rounded-xl p-6 sm:p-10 mt-12 sm:mt-16"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="text-left flex-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                Descubra o poder da <span className="text-red-500">tecnologia avançada</span> para seu negócio
              </h3>
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/20 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">Análise técnica <span className="text-white font-medium">gratuita</span></p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-500/20 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">Implementação em até <span className="text-white font-medium">7 dias</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm">Suporte técnico <span className="text-white font-medium">24/7</span></p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full px-8 sm:px-10 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Solicitar demonstração</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <p className="text-gray-400 text-xs mt-3 text-center">
                Sem compromisso • Demonstração personalizada
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
