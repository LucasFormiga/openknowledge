import { type Config, KnowledgeRouter, type LoaderResult } from '@openknowledge/core'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface UseKnowledgeOptions {
  config?: Config
  configDir?: string
  initialData?: LoaderResult
  isDev?: boolean
}

export function useKnowledge(options: UseKnowledgeOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const routerRef = useRef<KnowledgeRouter | null>(null)

  const isDev = options?.isDev || false

  useEffect(() => {
    if (isDev) return

    // If initial data is provided, use it directly
    if (options.config && options.initialData) {
      routerRef.current = new KnowledgeRouter({
        config: options.config,
        ...options.initialData
      })
      return
    }

    // Try to load from directory if in Node environment
    if (options.config && options.configDir) {
      const isNode = typeof process !== 'undefined' && (process.versions as any)?.node

      if (!isNode) {
        console.warn(
          'KnowledgeRouter.fromDir() is only supported in Node.js environments. Please provide initialData for browser use.'
        )
        return
      }

      KnowledgeRouter.fromDir(options.config, options.configDir)
        .then((router: KnowledgeRouter) => {
          routerRef.current = router
        })
        .catch((err) => {
          console.error('Failed to initialize KnowledgeRouter from directory:', err)
        })
    } else if (!options.config && !isDev) {
      console.error('No configuration provided for KnowledgeRouter in non-dev mode.')
    }
  }, [options.config, options.configDir, options.initialData, isDev])

  const ask = useCallback(
    async (question: string) => {
      if (!question.trim()) return

      const userMessage: Message = {
        role: 'user',
        content: question,
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        let response: string

        if (isDev) {
          // Mock response for development
          await new Promise((resolve) => setTimeout(resolve, 1000))
          response = `This is a mocked response in development mode for your question: "${question}". Configure your API keys to see real AI responses.`
        } else if (routerRef.current) {
          response = await routerRef.current.ask(question)
        } else {
          response = 'Router not initialized. Please provide a valid configuration.'
        }

        const assistantMessage: Message = {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error('Error in knowledge router:', error)
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request.',
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [isDev]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isLoading,
    ask,
    clearMessages
  }
}
