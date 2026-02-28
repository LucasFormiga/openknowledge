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
  initialFiles?: Record<string, string>
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

    // If initial files are provided, use them to initialize router
    if (options.config && options.initialFiles) {
      routerRef.current = KnowledgeRouter.fromStatic(options.config, options.initialFiles)
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
  }, [options.config, options.configDir, options.initialData, options.initialFiles, isDev])

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
        const assistantMessage: Message = {
          role: 'assistant',
          content: 'Default Value',
          timestamp: new Date()
        }

        if (isDev || !routerRef.current) {
          console.log('Mocking response in development mode')
          await new Promise((resolve) => setTimeout(resolve, 1000))

          return setMessages((prev) => [
            ...prev,
            {
              ...assistantMessage,
              content: `This is a mocked response in development mode for your question: "${question}". Configure your API keys to see real AI responses.`
            }
          ])
        }

        const response = await routerRef?.current?.ask(question)

        console.log('Resposta', response)

        setMessages((prev) => [
          ...prev,
          {
            ...assistantMessage,
            content: response || 'No response received'
          }
        ])
      } catch (error) {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your request.',
          timestamp: new Date()
        }

        console.error('Error in knowledge router:', error)
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
