"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useResizableSidebar } from "../hooks/useResizableSidebar"
import { ResizableHandle } from "./ResizableHandle"

interface ResizableSidebarProps {
  side: "left" | "right"
  children: React.ReactNode
  isOpen: boolean
  onResize: (newWidth: number) => void
  initialWidth: number
}

export function ResizableSidebar({ side, children, isOpen, onResize, initialWidth }: ResizableSidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const { width, isResizing, startResizing } = useResizableSidebar({
    side,
    minWidth: 280,
    maxWidth: window.innerWidth * 0.5,
    defaultWidth: initialWidth,
    isOpen,
    onResize,
  })
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen && !isMobile) {
      const newWidth = Math.max(initialWidth, window.innerWidth * 0.5)
      onResize(newWidth)
    }
  }, [isOpen, isMobile, initialWidth, onResize])

  return (
    <div
      ref={sidebarRef}
      className={`sidebar sidebar-${side}`}
      style={{
        width: isOpen ? `${Math.min(width, window.innerWidth / 2)}px` : "0",
        transition: isResizing ? "none" : "width 0.3s ease-in-out",
        position: "absolute",
        top: 0,
        bottom: 0,
        [side]: 0,
        maxWidth: isMobile ? "100%" : "50%",
        overflow: "hidden",
        borderRight: side === "left" ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
        borderLeft: side === "right" ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <div className="sidebar-inner" style={{ width: "100%", height: "100%", overflow: "auto" }}>
        {children}
      </div>
      {!isMobile && isOpen && width > 0 && <ResizableHandle onMouseDown={startResizing} side={side} />}
    </div>
  )
}

