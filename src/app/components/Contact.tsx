"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Phone,
  Instagram,
  Linkedin,
  Facebook,
  Shield,
  Clock,
  Award,
} from "lucide-react"
import { useTranslation } from "../hooks/useTranslation"

// Componentes de fundo e transição
import UnifiedBackground from './UnifiedBackground';
import SectionDivider from './SectionDivider';

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message })
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center w-full text-white overflow-hidden bg-black py-20"
    >
      {/* Divisor de seção para transição suave */}
      <SectionDivider direction="top" color="#000000" height={80} />
      
      {/* Background unificado para melhor consistência */}
      <UnifiedBackground type="contact" intensity="medium" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 font-medium text-sm">{t('contactSection.badge')}</span>
          </motion.div>

          {/* Título */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">{t('contactSection.title').split(' ')[0]}</span>
            <br />
            <span className="text-white">{t('contactSection.title').split(' ')[1]}</span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('contactSection.subtitle')}
          </p>

          {/* Métricas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-12 mb-8"
          >
            {[
              { value: "24/7", label: "Suporte", icon: Clock },
              { value: "100%", label: "Segurança", icon: Shield },
              { value: "150+", label: "Projetos", icon: Award },
            ].map((metric, idx) => (
              <div key={metric.label} className="text-center">
                <metric.icon className="w-5 h-5 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400">{metric.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Vantagens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {["Resposta rápida", "Orçamento detalhado", "Consultoria gratuita"].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
              >
                <div className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Formulário */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-1 space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header do formulário */}
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 bg-red-500 rounded-r mr-3" />
              <h3 className="font-bold text-white text-xl">Envie sua mensagem</h3>
            </div>

            {/* Campos */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute top-0 left-0 h-full w-12 bg-white/5 rounded-l-lg flex items-center justify-center border-r border-white/10">
                  <User className="text-red-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder={t('contactSection.form.name')}
                  className="w-full p-4 pl-16 rounded-lg bg-white/5 backdrop-blur-sm placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute top-0 left-0 h-full w-12 bg-white/5 rounded-l-lg flex items-center justify-center border-r border-white/10">
                  <Mail className="text-red-400" size={18} />
                </div>
                <input
                  type="email"
                  placeholder={t('contactSection.form.email')}
                  className="w-full p-4 pl-16 rounded-lg bg-white/5 backdrop-blur-sm placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute top-0 left-0 h-12 w-12 bg-white/5 rounded-tl-lg flex items-center justify-center border-r border-b border-white/10">
                  <MessageSquare className="text-red-400" size={18} />
                </div>
                <textarea
                  placeholder={t('contactSection.form.message')}
                  rows={5}
                  className="w-full p-4 pt-4 pl-16 rounded-lg bg-white/5 backdrop-blur-sm placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-white resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botão */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <span>{t('contactSection.form.send')}</span>
              <Send className="w-5 h-5" />
            </motion.button>

            {/* Nota de privacidade */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4 border-t border-white/10">
              <Shield className="w-4 h-4 text-red-400" />
              <span>{t('contactSection.form.privacy')}</span>
            </div>
          </motion.form>

          {/* Informações de contato */}
          <motion.div
            className="lg:w-80 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              {/* Header */}
              <div className="flex items-center mb-8">
                <div className="w-1 h-6 bg-red-500 rounded-r mr-3" />
                <h3 className="font-bold text-white text-xl">{t('contactSection.info.title')}</h3>
              </div>

              {/* Contatos */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('contactSection.info.email')}</h4>
                    <p className="text-gray-400 text-sm">contato@vulcano.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{t('contactSection.info.phone')}</h4>
                    <p className="text-gray-400 text-sm">+55 (11) 9999-8888</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-1 h-6 bg-red-500 rounded-r mr-3" />
                <h3 className="font-bold text-white text-lg">{t('contactSection.social')}</h3>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Facebook, href: "#" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} className="text-red-400" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
