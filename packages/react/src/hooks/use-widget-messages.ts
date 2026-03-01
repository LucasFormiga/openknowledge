import { useCallback, useState } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/**
 * A simple hook to manage the chat widget's message state.
 * Use this in your host application to keep track of the conversation
 * and handle interactions with your own backend.
 */
export function useWidgetMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const appendMessage = useCallback((message: Omit<Message, 'timestamp'>) => {
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isProcessing,
    setIsProcessing,
    appendMessage,
    clearMessages
  }
}
