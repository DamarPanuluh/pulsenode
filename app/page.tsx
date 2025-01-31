"use client"

import { useState, useCallback } from "react"
import Layout from "../components/Layout"
import type { CapabilityCardProps } from "../types"
import { initialCapabilities, widgets } from "../data/appData"

export default function Home() {
  const [capabilities, setCapabilities] = useState<CapabilityCardProps[]>(initialCapabilities)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const sidebarWidths = { left: 250, right: 250 }

  const handleCapabilityToggle = useCallback((index: number) => {
    setCapabilities((prev) => {
      const newCapabilities = [...prev]
      newCapabilities[index].enabled = !newCapabilities[index].enabled
      return newCapabilities
    })
  }, [])

  const updateChatPosition = useCallback(() => {
    const chatInterface = document.querySelector(".chat-interface") as HTMLElement
    if (chatInterface) {
      const containerWidth = window.innerWidth
      const leftSidebarWidth = leftSidebarOpen ? Math.min(sidebarWidths.left, containerWidth / 2) : 0
      const rightSidebarWidth = rightSidebarOpen ? Math.min(sidebarWidths.right, containerWidth / 2) : 0

      chatInterface.style.transition = "left 0.3s ease-in-out, right 0.3s ease-in-out, width 0.3s ease-in-out"

      if (leftSidebarOpen && rightSidebarOpen) {
        chatInterface.style.left = `${leftSidebarWidth}px`
        chatInterface.style.right = `${rightSidebarWidth}px`
        chatInterface.style.width = `${containerWidth - leftSidebarWidth - rightSidebarWidth}px`
      } else if (leftSidebarOpen) {
        chatInterface.style.left = `${leftSidebarWidth}px`
        chatInterface.style.right = "0"
        chatInterface.style.width = `${containerWidth - leftSidebarWidth}px`
      } else if (rightSidebarOpen) {
        chatInterface.style.left = "0"
        chatInterface.style.right = `${rightSidebarWidth}px`
        chatInterface.style.width = `${containerWidth - rightSidebarWidth}px`
      } else {
        chatInterface.style.left = "33.33%"
        chatInterface.style.right = "33.33%"
        chatInterface.style.width = "33.33%"
      }

      // Remove transition after animation is complete
      setTimeout(() => {
        chatInterface.style.transition = ""
      }, 300)
    }
  }, [leftSidebarOpen, rightSidebarOpen, sidebarWidths])

  return (
    <Layout
      capabilities={capabilities}
      widgets={widgets}
      onCapabilityToggle={handleCapabilityToggle}
      leftSidebarOpen={leftSidebarOpen}
      setLeftSidebarOpen={setLeftSidebarOpen}
      rightSidebarOpen={rightSidebarOpen}
      setRightSidebarOpen={setRightSidebarOpen}
      updateChatPosition={updateChatPosition}
    />
  )
}

