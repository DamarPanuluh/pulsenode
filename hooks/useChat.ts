import { useState, useCallback, useEffect } from "react"
import type { Message, ChatSession } from "../types"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Chat ${chatSessions.length + 1}`,
      date: new Date(),
      preview: "",
      messages: [],
    }
    setChatSessions((prev) => [...prev, newSession])
    setCurrentSessionId(newSession.id)
    setMessages([])
  }, [chatSessions.length])

  // Initialize first session if none exists
  useEffect(() => {
    if (chatSessions.length === 0) {
      createNewSession()
    }
  }, [chatSessions.length, createNewSession])

  const handleSubmit = useCallback(
    (text: string) => {
      const newMessage = { text, isUser: true, timestamp: new Date() }
      setMessages((prevMessages) => [...prevMessages, newMessage])

      // Update current session
      if (currentSessionId) {
        setChatSessions((prev) =>
          prev.map((session) => {
            if (session.id === currentSessionId) {
              return {
                ...session,
                preview: text,
                messages: [...session.messages, newMessage],
              }
            }
            return session
          }),
        )
      }

      setTimeout(() => {
        const aiResponse = { text: "I'm an AI response.", isUser: false, timestamp: new Date() }
        setMessages((prevMessages) => [...prevMessages, aiResponse])

        // Update current session with AI response
        if (currentSessionId) {
          setChatSessions((prev) =>
            prev.map((session) => {
              if (session.id === currentSessionId) {
                return {
                  ...session,
                  messages: [...session.messages, aiResponse],
                }
              }
              return session
            }),
          )
        }
      }, 1000)
    },
    [currentSessionId],
  )

  const handleNewChat = useCallback(() => {
    createNewSession()
  }, [createNewSession])

  const handleClearChat = useCallback(() => {
    setMessages([])
    if (currentSessionId) {
      setChatSessions((prev) =>
        prev.map((session) => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [],
              preview: "",
            }
          }
          return session
        }),
      )
    }
  }, [currentSessionId])

  const handleDeleteSession = useCallback(
    (id: string) => {
      setChatSessions((prev) => prev.filter((session) => session.id !== id))
      if (id === currentSessionId) {
        const remainingSessions = chatSessions.filter((session) => session.id !== id)
        if (remainingSessions.length > 0) {
          setCurrentSessionId(remainingSessions[0].id)
          setMessages(remainingSessions[0].messages)
        } else {
          createNewSession()
        }
      }
    },
    [chatSessions, currentSessionId, createNewSession],
  )

  const handleSelectSession = useCallback(
    (id: string) => {
      setCurrentSessionId(id)
      const session = chatSessions.find((s) => s.id === id)
      if (session) {
        setMessages(session.messages)
      }
    },
    [chatSessions],
  )

  return {
    messages,
    chatSessions,
    handleSubmit,
    handleNewChat,
    handleClearChat,
    handleDeleteSession,
    handleSelectSession,
  }
}

