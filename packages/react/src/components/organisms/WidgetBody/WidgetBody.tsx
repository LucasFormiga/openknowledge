import { Bot, User } from 'lucide-react'
import type React from 'react'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn.js'
import { useWidget } from '../../organisms/Widget/context.js'

const MarkdownRenderer = lazy(() => import('../../atoms/MarkdownRenderer/MarkdownRenderer.js'))

export interface WidgetBodyProps {
  children?: React.ReactNode
  className?: string
}

export function WidgetBody({ children, className }: WidgetBodyProps) {
  const { messages, isProcessing, texts } = useWidget()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isProcessing])

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-gradient-to-b from-background to-muted/20',
        className
      )}
    >
      {children ?? (
        <div className="flex flex-col gap-6">
          {messages.length === 0 ? (
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-sm leading-relaxed text-foreground">{texts.greeting}</p>
                </div>
              </div>
            </div>
          ) : null}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-3 max-w-[85%]',
                msg.role === 'user' ? 'flex-row-reverse self-end ml-auto' : ''
              )}
            >
              <div
                className={cn(
                  'flex-shrink-0 h-8 w-8 mt-1 rounded-full flex items-center justify-center',
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                )}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={cn('flex flex-col gap-1', msg.role === 'user' ? 'items-end' : '')}>
                <div
                  className={cn(
                    'border border-border/50 px-4 py-3 rounded-2xl shadow-sm overflow-hidden',
                    msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'
                  )}
                >
                  <Suspense fallback={<p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>}>
                    <MarkdownRenderer content={msg.content} role={msg.role} />
                  </Suspense>
                </div>
                <span className="text-[10px] text-muted-foreground ml-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isProcessing ? (
            <div className="flex items-start gap-3 max-w-[85%] animate-pulse">
              <div className="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
