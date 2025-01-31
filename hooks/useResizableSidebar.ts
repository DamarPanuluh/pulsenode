"use client"

import { useState, useCallback, useEffect } from "react"

interface UseResizableSidebarProps {
  side: "left" | "right"
  minWidth: number
  maxWidth: number
  defaultWidth: number
  isOpen: boolean
  onResize: (newWidth: number) => void
}

export function useResizableSidebar({
  side,
  minWidth = 280,
  maxWidth = window.innerWidth * 0.5,
  defaultWidth = window.innerWidth * 0.3,
  isOpen,
  onResize,
}: UseResizableSidebarProps) {
  const [width, setWidth] = useState(defaultWidth)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    const savedWidth = localStorage.getItem(`sidebar-width-${side}`)
    if (savedWidth) {
      setWidth(Number(savedWidth))
    } else {
      setWidth(defaultWidth)
    }
  }, [side, defaultWidth])

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty(`--sidebar-width-${side}`, `${width}px`)
    } else {
      document.documentElement.style.setProperty(`--sidebar-width-${side}`, "0px")
    }
  }, [isOpen, side, width])

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
    localStorage.setItem(`sidebar-width-${side}`, width.toString())
  }, [side, width])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      let newWidth
      if (side === "left") {
        newWidth = e.clientX
      } else {
        newWidth = window.innerWidth - e.clientX
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setWidth(newWidth)
      document.documentElement.style.setProperty(`--sidebar-width-${side}`, `${newWidth}px`)
      onResize(newWidth)
    },
    [isResizing, side, minWidth, maxWidth, onResize],
  )

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize)
      window.addEventListener("mouseup", stopResizing)
    }

    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing, resize, stopResizing])

  return {
    width,
    isResizing,
    startResizing,
  }
}

