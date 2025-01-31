import { useState, useCallback } from "react"

export function useSidebars() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [sidebarWidths, setSidebarWidths] = useState(() => ({
    left: Number.parseInt(localStorage.getItem("leftSidebarWidth") || "400", 10),
    right: Number.parseInt(localStorage.getItem("rightSidebarWidth") || "400", 10),
  }))

  const toggleLeftSidebar = useCallback(() => {
    setLeftSidebarOpen((prev) => !prev)
    setRightSidebarOpen(false) // Close right sidebar when opening left
  }, [])

  const toggleRightSidebar = useCallback(() => {
    setRightSidebarOpen((prev) => !prev)
    setLeftSidebarOpen(false) // Close left sidebar when opening right
  }, [])

  const handleLeftSidebarResize = useCallback((newWidth: number) => {
    const maxWidth = window.innerWidth / 2
    const clampedWidth = Math.min(newWidth, maxWidth)
    setSidebarWidths((prev) => ({ ...prev, left: clampedWidth }))
    localStorage.setItem("leftSidebarWidth", clampedWidth.toString())
  }, [])

  const handleRightSidebarResize = useCallback((newWidth: number) => {
    const maxWidth = window.innerWidth / 2
    const clampedWidth = Math.min(newWidth, maxWidth)
    setSidebarWidths((prev) => ({ ...prev, right: clampedWidth }))
    localStorage.setItem("rightSidebarWidth", clampedWidth.toString())
  }, [])

  return {
    leftSidebarOpen,
    rightSidebarOpen,
    sidebarWidths,
    toggleLeftSidebar,
    toggleRightSidebar,
    handleLeftSidebarResize,
    handleRightSidebarResize,
  }
}

