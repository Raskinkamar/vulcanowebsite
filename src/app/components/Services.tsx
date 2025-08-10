"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Globe, Code, Smartphone, Database, ArrowUpRight, CheckCircle } from "lucide-react"
import { useTranslation } from "../hooks/useTranslation"

interface ServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  stats: {
    primary: string
    secondary: string
    label: string
  }
}

const services: ServiceItem[] = [
  {
    id: "chatbots",
    icon: <MessageSquare size={32} />,
    title: "Chatbots Inteligentes",
    description:
      "Aumente vendas e reduza custos de suporte em até 70% com chatbots personalizados que atendem clientes 24/7, nunca perdem uma oportunidade e elevam a satisfação.",
    features: [
      "Aumento médio de 35% nas taxas de conversão",
      "Redução de até 70% nos custos de atendimento",
      "Integração com WhatsApp, Telegram e website",
      "IA avançada com personalidade da sua marca",
      "Implementação em apenas 14 dias úteis",
    ],
    stats: {
      primary: "+35%",
      secondary: "70%",
      label: "Conversão",
    },
  },
  {
    id: "websites",
    icon: <Globe size={32} />,
    title: "Sites de Alta Conversão",
    description:
      "Multiplique seu faturamento com websites estratégicos que transformam visitantes em clientes fiéis. Combinamos design premium com táticas avançadas de persuasão.",
    features: [
      "Aumento médio de 220% no tempo de permanência",
      "Taxa de conversão 3x maior que a média do mercado",
      "SEO avançado com garantia de primeiras posições",
      "Carregamento ultra-rápido (< 2 segundos)",
      "Design exclusivo com otimização para conversão",
    ],
    stats: {
      primary: "220%",
      secondary: "3x",
      label: "Performance",
    },
  },
  {
    id: "webapps",
    icon: <Code size={32} />,
    title: "Sistemas Web",
    description:
      "Elimine ineficiências operacionais com sistemas personalizados que automatizam processos, reduzem erros e aumentam sua margem de lucro em até 40%.",
    features: [
      "Redução média de 65% no tempo de operações",
      "Economia comprovada de 40% em custos operacionais",
      "Automação de processos repetitivos e burocráticos",
      "Dashboards com KPIs em tempo real para decisões",
      "Escalabilidade garantida para crescimento futuro",
    ],
    stats: {
      primary: "65%",
      secondary: "40%",
      label: "Eficiência",
    },
  },
  {
    id: "apps",
    icon: <Smartphone size={32} />,
    title: "Apps Mobile Premium",
    description:
      "Conquiste presença permanente no bolso dos seus clientes com apps nativos de alto desempenho que criam experiências memoráveis e geram receita recorrente.",
    features: [
      "Aumento médio de 300% no engajamento de clientes",
      "Desenvolvidos com as tecnologias mais modernas",
      "Performance otimizada mesmo em dispositivos básicos",
      "Estratégias de monetização e retenção comprovadas",
      "Suporte contínuo e atualizações estratégicas",
    ],
    stats: {
      primary: "300%",
      secondary: "24/7",
      label: "Engajamento",
    },
  },
  {
    id: "apis",
    icon: <Database size={32} />,
    title: "Integrações e APIs",
    description:
      "Elimine ilhas de informação e multiplique a eficiência com integrações que sincronizam seus sistemas e liberam seu potencial de crescimento e inovação.",
    features: [
      "Redução de até 90% em tarefas manuais de dados",
      "Eliminação de erros de inserção e duplicidades",
      "Sincronização em tempo real entre plataformas",
      "Segurança de dados em conformidade com LGPD",
      "Escalabilidade para milhões de requisições diárias",
    ],
    stats: {
      primary: "90%",
      secondary: "100%",
      label: "Automação",
    },
  },
]

const ServiceCard: React.FC<{
  service: ServiceItem
  index: number
  isActive: boolean
  onToggle: () => void
  requestQuoteLabel: string
}> = ({ service, index, isActive, onToggle, requestQuoteLabel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <motion.div
        className="relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-red-500/30 hover:bg-black/60"
        onClick={onToggle}
        whileHover={{ y: -4 }}
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-br from-red-900/20 to-black/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            <motion.div
              className="text-white/60 group-hover:text-white transition-colors"
              animate={{ rotate: isActive ? 180 : 0 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3" aria-label="Métricas do serviço">
            <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-red-500">{service.stats.primary}</div>
              <div className="text-xs text-gray-500">{service.stats.label}</div>
            </div>
            <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-red-500">{service.stats.secondary}</div>
              <div className="text-xs text-gray-500">Suporte</div>
            </div>
          </div>

          {/* Features expandíveis */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h4 className="text-sm font-bold text-red-400 uppercase">Recursos inclusos</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium text-sm transition-colors" aria-label="Solicitar orçamento deste serviço">
                    {requestQuoteLabel}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

const AdvancedServices: React.FC = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<string | null>(null)

  const handleServiceToggle = (id: string) => {
    setActiveService(activeService === id ? null : id)
  }

  return (
    <section className="relative w-full min-h-screen bg-black text-white py-20">
      {/* Background do ser luminoso */}
      <div
        className="absolute opacity-80 pointer-events-none"
        style={{
          backgroundImage: "url('/images/greek/blaco2.gif')",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          right: "0",
          top: "60%",
          transform: "translateY(-50%)",
          width: "45%",
          height: "80%",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white/80 font-medium text-sm">{t('servicesSection.title')}</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">{t('servicesSection.title').split(' ')[0]}</span>{' '}
            <span className="text-red-500">{t('servicesSection.title').split(' ').slice(1).join(' ')}</span>
          </h2>

          <p className="text-xl text-white/70 max-w-4xl mx-auto">
            {t('servicesSection.subtitle')}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === service.id}
              onToggle={() => handleServiceToggle(service.id)}
              requestQuoteLabel={t('nav.requestQuote')}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-12 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            {t('servicesSection.cta.title')}
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {t('servicesSection.cta.subtitle')}
          </p>
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors">
            {t('nav.requestQuote')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default AdvancedServices
