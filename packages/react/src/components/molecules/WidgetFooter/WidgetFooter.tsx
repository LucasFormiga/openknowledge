import type React from 'react'
import { useState } from 'react'
import { cn } from '../../../utils/cn.js'
import { useWidget } from '../../organisms/Widget/context.js'

export interface WidgetFooterProps {
  children?: React.ReactNode
  className?: string
}

export function WidgetFooter({ children, className }: WidgetFooterProps) {
  const { texts, icons, isProcessing, onSendMessage } = useWidget()
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return
    const text = inputValue
    setInputValue('')
    onSendMessage(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={cn('p-4 bg-background border-t border-border/50', className)}>
      {children ?? (
        <>
          <div className="relative group flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={texts.placeholder}
              disabled={isProcessing}
              className="w-full bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-primary rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 shadow-sm placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputValue.trim() || isProcessing}
              className="absolute right-2 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:scale-100"
            >
              {icons.submit}
            </button>
          </div>
          {texts.supportText ? (
            <div className="mt-3 text-center">
              <p className="text-[10px] text-muted-foreground font-medium flex justify-center items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                {texts.supportText}
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
