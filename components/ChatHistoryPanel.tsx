"use client"

import { MessageCircle, Trash2, MessageSquare, X, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

interface ChatSession {
  id: string
  title: string
  date: Date
  preview: string
}

interface ChatHistoryPanelProps {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  onClearCurrentChat: () => void
  sessions: ChatSession[]
  onDeleteSession: (id: string) => void
  onSelectSession: (id: string) => void
}

export function ChatHistoryPanel({
  isOpen,
  onClose,
  onNewChat,
  onClearCurrentChat,
  sessions = [],
  onDeleteSession,
  onSelectSession,
}: ChatHistoryPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col"
          style={{ borderRadius: "inherit" }}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Chat Management</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 cursor-pointer transition-colors"
                  onClick={() => onSelectSession(session.id)}
                >
                  <MessageSquare className="w-5 h-5 mt-1 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium truncate">{session.title}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {session.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{session.preview}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteSession(session.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t space-y-2">
            <Button onClick={onNewChat} className="w-full bg-black hover:bg-gray-800 text-white">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <Button
              onClick={onClearCurrentChat}
              variant="outline"
              className="w-full bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Current Chat
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

