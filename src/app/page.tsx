"use client";

import { useState, useRef, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FloatingCTA from "./components/FloatingCTA";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import GreekGodIcon from "./components/GreekGodIcons";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import HalftoneWave from "./components/HalftoneWave";

// Componentes


// ✅ Definição dos projetos e depoimentos
const projects = [
  {
    title: "Loja Unitv",
    description: "Loja Unitv completa, com plugin e chatbot.",
    category: "Web",
    tech: ["WooCommerce", "WordPress", "Chatbot"],
    examples: [
      {
        title: "Loja Unitv",
        description: "E-commerce completo com integração de plugin e chatbot.",
        imageUrl: "/images/portfolio/loja-unitv.png",
      },
    ],
  },
  {
    title: "Chatbot The Last Night",
    description: "Chatbot com captura de dados.",
    category: "AI",
    tech: ["Dialogflow", "Node.js"],
    examples: [
      {
        title: "Chatbot The Last Night",
        description: "Assistente virtual capaz de coletar dados de usuários.",
        imageUrl: "/images/portfolio/chatbot-lastnight.png",
      },
    ],
  },
  {
    title: "Recuperação de Site Hackeado",
    description: "Serviço completo de restauração de site após invasão.",
    category: "Web",
    tech: ["Security", "Backup", "WordPress"],
    examples: [
      {
        title: "Recuperação de Site",
        description: "Site restaurado e protegido contra futuras ameaças.",
        imageUrl: "/images/portfolio/site-recovery.png",
      },
    ],
  },
  {
    title: "Landing Page Redde AI",
    description: "Landing page para apresentação da plataforma Redde AI.",
    category: "Web",
    tech: ["Next.js", "TailwindCSS"],
    examples: [
      {
        title: "Landing Redde AI",
        description: "Página de captura otimizada para conversão.",
        imageUrl: "/images/portfolio/redde-ai.png",
      },
    ],
  },
  {
    title: "Landing Page Loro GPT",
    description: "Landing page apresentando o produto Loro GPT.",
    category: "Web",
    tech: ["React", "Styled Components"],
    examples: [
      {
        title: "Landing Loro GPT",
        description: "Página responsiva destacando recursos do Loro GPT.",
        imageUrl: "/images/portfolio/loro-gpt.png",
      },
    ],
  },
  {
    title: "Landing Page NutriKids",
    description: "Landing page focada em nutrição infantil.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    examples: [
      {
        title: "Landing NutriKids",
        description: "Layout colorido e interativo para pais e crianças.",
        imageUrl: "/images/portfolio/nutrikids.png",
      },
    ],
  },
  {
    title: "ChatIdeal Landing Page",
    description: "Landing page promocional do aplicativo ChatIdeal.",
    category: "Web",
    tech: ["Vue.js", "TailwindCSS"],
    examples: [
      {
        title: "Landing ChatIdeal",
        description: "Página de conversão com integração de formulário.",
        imageUrl: "/images/portfolio/chatideal.png",
      },
    ],
  },
  {
    title: "Home AprovaCar",
    description: "Página inicial do portal AprovaCar.",
    category: "Web",
    tech: ["React", "Next.js"],
    examples: [
      {
        title: "Home AprovaCar",
        description: "Interface intuitiva para consultas de financiamento.",
        imageUrl: "/images/portfolio/home-aprovacar.png",
      },
    ],
  },
  {
    title: "Blog AprovaCar",
    description: "Blog corporativo com dicas de financiamento automotivo.",
    category: "Web",
    tech: ["WordPress", "Elementor"],
    examples: [
      {
        title: "Blog AprovaCar",
        description: "Conteúdo otimizado para SEO e desempenho.",
        imageUrl: "/images/portfolio/blog-aprovacar.png",
      },
    ],
  },
  {
    title: "Blog Católico - Paróquia Nossa Senhora Aparecida",
    description: "Blog católico da Paróquia Nossa Senhora Aparecida.",
    category: "Web",
    tech: ["WordPress", "Divi"],
    examples: [
      {
        title: "Blog Paróquia N. Sra. Aparecida",
        description: "Espaço de evangelização e notícias paroquiais.",
        imageUrl: "/images/portfolio/blog-paroquia.png",
      },
    ],
  },
];

const testimonialsData = [
  {
    name: "João Silva",
    role: "CEO",
    message: "Incrível trabalho, revolucionou nossa infraestrutura!",
    avatar: undefined,
  },
  {
    name: "Maria Souza",
    role: "CTO",
    message: "Soluções escaláveis e design impecável.",
    avatar: undefined,
  },
];

export default function Home() {
  // Estado para controlar a tela de loading
  const [loading, setLoading] = useState(true);
  
  // Referências para as seções para usar com a navegação
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Função para navegação suave (apenas para os botões do menu)
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80, // Compensar a altura do header
        behavior: 'smooth'
      });
    }
  };

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  // Função para corrigir o scroll no Safari e outros navegadores
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="relative bg-black text-white overflow-auto">
      {/* Tela de carregamento */}
      <AnimatePresence>
        {loading && <LoadingScreen finishLoading={() => setLoading(false)} />}
      </AnimatePresence>
      {/* Removido o componente GreekStatues fixo na tela */}
      
      {/* Navbar fixo com visual premium e ícone de Vulcano */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <motion.nav 
          className="flex items-center gap-4 sm:gap-6 md:gap-10 bg-black/50 backdrop-blur-md py-2 px-6 mt-4 rounded-full border border-gray-800"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
           {/* Logo Vulcano */}
           <div className="flex items-center mr-1">
            <GreekGodIcon god="vulcano" size={28} color="#ff3d3d" />
            <span className="text-red-500 font-bold ml-2 hidden sm:inline-block">Vulcano</span>
          </div>
          
          {/* Import dinâmico para o Language Switcher */}

          {[
            { label: "Início", ref: heroRef },
            { label: "Serviços", ref: servicesRef },
            { label: "Portfólio", ref: portfolioRef },
            { label: "Contato", ref: contactRef }
          ].map((item, index) => (
            <motion.button 
              key={item.label}
              onClick={() => scrollToSection(item.ref)}
              className="relative text-xs sm:text-sm text-gray-300 hover:text-white transition-colors font-medium px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{item.label}</span>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
          
          {/* Botão de destaque */}
          <motion.button
            className="bg-gradient-to-r from-red-600 to-red-800 text-xs sm:text-sm text-white font-medium px-4 py-1.5 rounded-full flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(contactRef)}
          >
            <span className="hidden sm:inline-block">Solicitar</span> Orçamento
          </motion.button>
        </motion.nav>
      </header>

            {/* Conteúdo principal com rolagem vertical livre */}
      <main>
        {/* Hero Section */}
        <div id="hero" ref={heroRef}>
          <HeroSection onViewPortfolio={() => scrollToSection(servicesRef)} />
        </div>
        
        {/* Halftone Wave effect between Hero and Services */}
        <div className="relative h-20 md:h-32">
          <HalftoneWave 
            color="rgba(255, 61, 61, 0.5)" 
            className="top-0" 
            amplitude={30}
            frequency={0.015}
          />
        </div>
        
        {/* Services Section */}
        <div id="services" ref={servicesRef}>
          <Services />
        </div>
        
        {/* Portfolio Section */}
        <div id="portfolio" ref={portfolioRef}>
          <Portfolio projects={projects} />
        </div>
        
        {/* Halftone Wave effect between Portfolio and Testimonials */}
        <div className="relative h-20 md:h-32">
          <HalftoneWave 
            color="rgba(106, 137, 204, 0.6)" 
            className="top-0" 
            amplitude={25}
            frequency={0.02}
            dotSize={2}
            speed={0.03}
          />
        </div>
        
        {/* Testimonials Section */}
        <div id="testimonials">
          <Testimonials testimonials={testimonialsData} />
        </div>
        
        {/* Contact Section */}
        <div id="contact" ref={contactRef}>
          <Contact />
        </div>
        
        {/* Footer */}
        <Footer />
      </main>

   
      
      {/* CTA Flutuante */}
      <FloatingCTA />
    </div>
  );
}
