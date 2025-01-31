import type { ReactNode } from "react"

export interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

export interface ChatSession {
  id: string
  title: string
  date: Date
  preview: string
  messages: Message[]
}

export interface CapabilityCardProps {
  icon: ReactNode
  title: string
  description: string
  hasSettings: boolean
  settingsOptions: string[]
  enabled: boolean
  onToggle: () => void
}

export interface Widget {
  name: string
  description: string
  icon: ReactNode
  capability: string
}

