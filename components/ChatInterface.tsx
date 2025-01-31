import type React from "react"
import { useRef, useCallback, useState } from "react"
import ResponsiveInput from "./ResponsiveInput"
import { ChatHistoryPanel } from "./ChatHistoryPanel"
import type { Message, ChatSession } from "../types"

interface ChatInterfaceProps {
  messages: Message[]
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  onNewChat: () => void
  onClearCurrentChat: () => void
  chatSessions: ChatSession[]
  onDeleteSession: (id: string) => void
  onSelectSession: (id: string) => void
  onSubmit: (text: string) => void
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  leftSidebarOpen,
  rightSidebarOpen,
  toggleLeftSidebar,
  toggleRightSidebar,
  onNewChat,
  onClearCurrentChat,
  chatSessions = [],
  onDeleteSession,
  onSelectSession,
  onSubmit,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isWideMode, setIsWideMode] = useState(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const shouldShowTimestamp = (index: number) => {
    if (index === messages.length - 1) return true
    const currentTimestamp = messages[index].timestamp
    const nextTimestamp = messages[index + 1].timestamp
    return formatTimestamp(currentTimestamp) !== formatTimestamp(nextTimestamp)
  }

  const renderMessagePairs = () => {
    const pairs = []
    for (let i = 0; i < messages.length; i += 2) {
      const userMessage = messages[i]
      const aiMessage = messages[i + 1]
      pairs.push(
        <div key={i} className="message-pair">
          <div className="message-container user-message">
            <div className="message whitespace-pre-wrap leading-relaxed">{userMessage.text}</div>
            {shouldShowTimestamp(i) && <div className="timestamp">{formatTimestamp(userMessage.timestamp)}</div>}
          </div>
          {aiMessage && (
            <div className="message-container ai-message">
              <div className="message message-ai whitespace-pre-wrap leading-relaxed font-semibold">
                💬 {aiMessage.text}
              </div>
              {shouldShowTimestamp(i + 1) && <div className="timestamp">{formatTimestamp(aiMessage.timestamp)}</div>}
            </div>
          )}
        </div>,
      )
    }
    return pairs.reverse()
  }

  return (
    <div
      className={`chat-interface h-full flex flex-col ${isWideMode ? "wide-mode" : ""} ${leftSidebarOpen ? "left-sidebar-open" : ""} ${rightSidebarOpen ? "right-sidebar-open" : ""}`}
    >
      <div className="messages-container flex-grow overflow-y-auto relative">
        {renderMessagePairs()}
        <div ref={messagesEndRef} />
        <ChatHistoryPanel
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onNewChat={() => {
            onNewChat()
            setIsHistoryOpen(false)
          }}
          onClearCurrentChat={() => {
            onClearCurrentChat()
            setIsHistoryOpen(false)
          }}
          sessions={chatSessions}
          onDeleteSession={onDeleteSession}
          onSelectSession={(id) => {
            onSelectSession(id)
            setIsHistoryOpen(false)
          }}
        />
      </div>
      <ResponsiveInput
        onSubmit={(text) => {
          onSubmit(text)
          setIsHistoryOpen(false)
        }}
        leftSidebarOpen={leftSidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
        toggleLeftSidebar={toggleLeftSidebar}
        toggleRightSidebar={toggleRightSidebar}
        onNewChat={onNewChat}
        onClearChat={onClearCurrentChat}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        isHistoryOpen={isHistoryOpen}
        onWidthToggle={() => setIsWideMode(!isWideMode)}
        isWideMode={isWideMode}
      />
    </div>
  )
}

export default ChatInterface

