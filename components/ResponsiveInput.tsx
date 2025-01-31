import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, ChevronLeft, ChevronRight, MessageCircle, Trash2 } from "lucide-react"

interface ResponsiveInputProps {
  onSubmit: (text: string) => void
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  onNewChat: () => void
  onClearChat: () => void
  isHistoryOpen: boolean
  onToggleHistory: () => void
  onWidthToggle: () => void
  isWideMode: boolean
}

const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  onSubmit,
  leftSidebarOpen,
  rightSidebarOpen,
  toggleLeftSidebar,
  toggleRightSidebar,
  onNewChat,
  onClearChat,
  isHistoryOpen,
  onToggleHistory,
  onWidthToggle,
  isWideMode,
}) => {
  const [input, setInput] = useState("")
  const [isScrollable, setIsScrollable] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const scrollPos = window.scrollY
      textarea.style.height = "auto"
      const lineHeight = 24
      const padding = 16
      const maxHeight = lineHeight * 6
      const newHeight = Math.max(lineHeight + padding, Math.min(textarea.scrollHeight, maxHeight))
      textarea.style.height = `${newHeight}px`
      window.scrollTo(0, scrollPos)
      setIsScrollable(textarea.scrollHeight > maxHeight)
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input, textareaRef, isScrollable])

  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = 24
      const padding = 16
      textareaRef.current.style.height = `${lineHeight + padding}px`
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input.trim())
      setInput("")
      if (textareaRef.current) {
        const lineHeight = 24
        const padding = 16
        textareaRef.current.style.height = `${lineHeight + padding}px`
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="responsive-input-container relative">
      <div className="input-wrapper relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className={`w-full px-4 py-2 bg-transparent border-none focus:outline-none resize-none ${
            isScrollable ? "scrollable" : ""
          }`}
          style={{
            minHeight: "40px",
            maxHeight: "144px",
          }}
        />
      </div>
      <div className="toolbar h-11">
        <button
          type="button"
          onClick={toggleLeftSidebar}
          className={`toggle-button left ${leftSidebarOpen ? "active" : ""}`}
          aria-label="Toggle left sidebar"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex flex-1 justify-center items-center">
          <div className="flex items-center justify-between w-40">
            <button
              type="button"
              onClick={onToggleHistory}
              className={`toolbar-button ${isHistoryOpen ? "text-blue-600" : ""}`}
              aria-label="View chat history"
            >
              <MessageCircle size={20} />
            </button>
            <button type="submit" className="toolbar-button send-button" aria-label="Send message">
              <Send size={18} className="text-white" />
            </button>
            <button type="button" onClick={onClearChat} className="toolbar-button" aria-label="Clear chat">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleRightSidebar}
          className={`toggle-button right ${rightSidebarOpen ? "active" : ""}`}
          aria-label="Toggle right sidebar"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <button
        type="button"
        onClick={onWidthToggle}
        className={`width-toggle-bar ${isWideMode ? "active" : ""}`}
        aria-label="Toggle chat width"
      />
    </form>
  )
}

export default ResponsiveInput

