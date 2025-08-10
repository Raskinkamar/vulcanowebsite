"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X, ArrowUpRight, Globe, Smartphone, Code2, Database, Cpu, Users, Star } from "lucide-react"
import { useInView } from "react-intersection-observer"
import type { Project } from "@/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "../hooks/useTranslation"

// Card de projeto limpo
const CleanProjectCard: React.FC<{
  project: Project
  index: number
  onSelect: (project: Project) => void
}> = ({ project, index, onSelect }) => {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const getCategoryIcon = () => {
    switch (project.category) {
      case "Web":
        return <Globe className="w-5 h-5" />
      case "Mobile":
        return <Smartphone className="w-5 h-5" />
      case "AI":
        return <Cpu className="w-5 h-5" />
      case "Blockchain":
        return <Database className="w-5 h-5" />
      default:
        return <Code2 className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative flex-shrink-0 w-full sm:w-[420px] snap-center cursor-pointer group"
      onClick={() => onSelect(project)}
      initial={{ opacity: 0, y: 60 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 60,
      }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Main card */}
      <div
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-900/20"
        style={{
          // Halftone effect: very subtle white dots
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      >
        {/* Featured badge */}
        {project.featured && (
          <Badge className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" />
            {t('portfolioSection.featured')}
          </Badge>
        )}
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-red-900/30 to-zinc-900/40 flex items-center justify-center">
          {/* Category badge */}
          <Badge className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-full text-white text-sm font-medium backdrop-blur-sm">
            {getCategoryIcon()}
            {project.category}
          </Badge>
          {/* Main icon - moved to content area for better flow */}
        </div>
        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <ArrowUpRight className="w-6 h-6 text-white/60 group-hover:text-red-500 transition-colors" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-zinc-800">
                              <div className="text-center">
                  <div className="text-xl font-bold text-red-500">{project.metrics.performance}%</div>
                  <div className="text-xs text-gray-500">{t('portfolioSection.metrics.performance')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-500">{project.metrics.satisfaction}%</div>
                  <div className="text-xs text-gray-500">{t('portfolioSection.metrics.satisfaction')}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-500">
                    {project.metrics.users || `${project.examples.length}k`}
                  </div>
                  <div className="text-xs text-gray-500">{t('portfolioSection.metrics.users')}</div>
              </div>
            </div>
          )}
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge
                key={tech} 
                variant="secondary"
                className="px-3 py-1 text-xs bg-zinc-800 text-white/80 border border-zinc-700"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="secondary" className="px-3 py-1 text-xs bg-zinc-900 text-white/60 border border-zinc-800">
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>
          {/* Bottom section */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Users className="w-4 h-4" />
              <span>{project.examples.length} {t('portfolioSection.cta.examples') as string}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm font-medium group-hover:text-red-400 transition-colors">
              <span>{t('portfolioSection.cta.explore') as string}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        </div>
    </motion.div>
  )
}

// Modal limpo
const CleanProjectModal: React.FC<{
  project: Project
  onClose: () => void
}> = ({ project, onClose }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"overview" | "examples" | "tech">("overview")

  const getCategoryIcon = () => {
    switch (project.category) {
      case "Web":
        return <Globe className="w-6 h-6 text-white" />
      case "Mobile":
        return <Smartphone className="w-6 h-6 text-white" />
      case "AI":
        return <Cpu className="w-6 h-6 text-white" />
      case "Blockchain":
        return <Database className="w-6 h-6 text-white" />
      default:
        return <Code2 className="w-6 h-6 text-white" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full bg-zinc-950 border border-zinc-800 text-white p-0 overflow-hidden">
        <Tabs
          defaultValue="overview"
          onValueChange={(value) => setActiveTab(value as "overview" | "examples" | "tech")}
          className="mt-0"
        >
        <DialogHeader className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                {getCategoryIcon()}
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold text-white">{project.title}</DialogTitle>
                <p className="text-white/60">{project.category}</p>
              </div>
      </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-zinc-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {/* Tabs */}
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800 p-1 rounded-lg">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 hover:text-white"
              >
                {t('portfolioSection.modal.overview') as string}
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 hover:text-white"
              >
                {t('portfolioSection.modal.examples') as string}
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 hover:text-white"
              >
                {t('portfolioSection.modal.tech') as string}
              </TabsTrigger>
            </TabsList>
          </DialogHeader>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <TabsContent value="overview" className="mt-0">
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <p className="text-white/80 text-lg leading-relaxed">{project.description}</p>
              {project.metrics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                      <div className="text-2xl font-bold text-red-500 mb-1">
                        {typeof value === "number" ? `${value}%` : value}
                      </div>
                      <div className="text-white/60 capitalize">{key}</div>
                    </div>
                  ))}
            </div>
          )}
            </motion.div>
          </TabsContent>
          <TabsContent value="examples" className="mt-0">
            <motion.div
              key="examples"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {project.examples.map((example) => (
                <div key={example.title} className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                  <div className="h-48 bg-zinc-800 relative">
                    <Image
                      src={example.imageUrl || "/placeholder.svg"}
                      alt={example.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">{example.title}</h3>
                    <p className="text-white/70 text-sm">{example.description}</p>
                    {example.liveUrl && (
                      <Button variant="link" className="mt-2 p-0 h-auto text-red-500 hover:text-red-400" asChild>
                        <a href={example.liveUrl} target="_blank" rel="noopener noreferrer">
                          {t('portfolioSection.cta.explore') as string} <ArrowUpRight className="ml-1 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
        </div>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="tech" className="mt-0">
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {project.tech.map((tech) => (
                <div key={tech} className="p-4 bg-zinc-900 rounded-lg text-center border border-zinc-800">
                  <div className="text-white font-medium">{tech}</div>
                </div>
              ))}
            </motion.div>
          </TabsContent>
      </div>
      </Tabs>

        <DialogFooter className="p-6 border-t border-zinc-800">
          <Button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition-colors">
            {t('portfolioSection.modal.requestSimilar') as string}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Portfolio component
const Portfolio: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section className="relative py-20 px-4 lg:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-white">{t('portfolioSection.title').split(' ')[0]}</span>{" "}
            <span className="text-red-500">{t('portfolioSection.title').split(' ')[1]}</span>
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto">
            {t('portfolioSection.subtitle')}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <CleanProjectCard
              key={project.title}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project modal */}
      {selectedProject && (
        <CleanProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export { CleanProjectCard, CleanProjectModal }
export default Portfolio
