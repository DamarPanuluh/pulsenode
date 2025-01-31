import type React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { ResizableSidebar } from "./ResizableSidebar"
import ChatInterface from "./ChatInterface"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import { useSidebars } from "../hooks/useSidebars"
import { useChat } from "../hooks/useChat"
import type { CapabilityCardProps, Widget } from "../types"

interface LayoutProps {
  capabilities: CapabilityCardProps[]
  widgets: Widget[]
  onCapabilityToggle: (index: number) => void
}

const Layout: React.FC<LayoutProps> = ({ capabilities, widgets, onCapabilityToggle }) => {
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    sidebarWidths,
    toggleLeftSidebar,
    toggleRightSidebar,
    handleLeftSidebarResize,
    handleRightSidebarResize,
  } = useSidebars()

  const {
    messages,
    chatSessions,
    handleSubmit,
    handleNewChat,
    handleClearChat,
    handleDeleteSession,
    handleSelectSession,
  } = useChat()

  const chatInterfaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateChatPosition = () => {
      if (chatInterfaceRef.current) {
        const containerWidth = window.innerWidth
        const leftWidth = leftSidebarOpen ? sidebarWidths.left : 0
        const rightWidth = rightSidebarOpen ? sidebarWidths.right : 0
        const availableWidth = containerWidth - leftWidth - rightWidth

        let newLeft, newRight, newWidth

        if (leftSidebarOpen) {
          newLeft = leftWidth
          newRight = 0
          newWidth = availableWidth
        } else if (rightSidebarOpen) {
          newLeft = 0
          newRight = rightWidth
          newWidth = availableWidth
        } else {
          // Centered at 1/3 viewport width
          newLeft = containerWidth / 3
          newRight = containerWidth / 3
          newWidth = containerWidth / 3
        }

        chatInterfaceRef.current.style.transition =
          "left 0.3s ease-in-out, right 0.3s ease-in-out, width 0.3s ease-in-out"
        chatInterfaceRef.current.style.left = `${newLeft}px`
        chatInterfaceRef.current.style.right = `${newRight}px`
        chatInterfaceRef.current.style.width = `${newWidth}px`
      }
    }

    updateChatPosition()
    window.addEventListener("resize", updateChatPosition)
    return () => window.removeEventListener("resize", updateChatPosition)
  }, [leftSidebarOpen, rightSidebarOpen, sidebarWidths])

  return (
    <main className="min-h-screen relative overflow-hidden flex justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2064&ixlib=rb-4.0.3"
          alt="Subtle background texture"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
          priority
        />
      </div>

      <div className="layout-container relative" style={{ height: "calc(100vh - 80px)", width: "100%" }}>
        <ResizableSidebar
          side="left"
          isOpen={leftSidebarOpen}
          onResize={handleLeftSidebarResize}
          initialWidth={sidebarWidths.left}
        >
          <LeftSidebar capabilities={capabilities} widgets={widgets} onCapabilityToggle={onCapabilityToggle} />
        </ResizableSidebar>

        <div ref={chatInterfaceRef} className="chat-interface-wrapper absolute top-0 bottom-0">
          <ChatInterface
            messages={messages}
            onSubmit={handleSubmit}
            leftSidebarOpen={leftSidebarOpen}
            rightSidebarOpen={rightSidebarOpen}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            onNewChat={handleNewChat}
            onClearCurrentChat={handleClearChat}
            chatSessions={chatSessions || []}
            onDeleteSession={handleDeleteSession}
            onSelectSession={handleSelectSession}
          />
        </div>

        <ResizableSidebar
          side="right"
          isOpen={rightSidebarOpen}
          onResize={handleRightSidebarResize}
          initialWidth={sidebarWidths.right}
        >
          <RightSidebar />
        </ResizableSidebar>
      </div>
    </main>
  )
}

export default Layout

