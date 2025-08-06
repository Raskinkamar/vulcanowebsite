import type { ReactNode } from "react"

export interface SliderItem {
  id: string | number
  imageUrl: string
  title: string
  description: string
  extraInfo?: ReactNode
}

export interface Project {
  title: string
  description: string
  category: string
  tech: string[]
  examples: ProjectExample[]
  metrics?: {
    performance: number
    satisfaction: number
    completion: number
    users?: string
  }
  featured?: boolean
}

export interface ProjectExample {
  title: string
  description: string
  imageUrl: string
  liveUrl?: string
}