import * as Popover from '@radix-ui/react-popover'
import { type ClassValue, clsx } from 'clsx'
import { Bot, Maximize2, MessageSquare, Minimize2, Send, X } from 'lucide-react'
import type React from 'react'
import { createContext, type ReactNode, useContext, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Types ---
export interface WidgetTexts {
  title: string
  placeholder: string
  greeting: string
  minimize: string
  maximize: string
  close: string
  supportText?: string
}

export interface WidgetIcons {
  trigger: ReactNode
  minimize: ReactNode
  maximize: ReactNode
  close: ReactNode
  submit: ReactNode
}

export type UILanguage = 'pt-BR' | 'en' | 'es'
export type ColorTheme = 'default' | 'rose' | 'emerald' | 'violet'

const defaultTexts: Record<UILanguage, WidgetTexts> = {
  'pt-BR': {
    title: 'OpenKnowledge',
    placeholder: 'Faça uma pergunta...',
    greeting: 'Olá! Como posso ajudar você hoje?',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    close: 'Fechar',
    supportText: 'Powered by OpenKnowledge'
  },
  en: {
    title: 'OpenKnowledge',
    placeholder: 'Ask a question...',
    greeting: 'Hi! How can I help you today?',
    minimize: 'Minimize',
    maximize: 'Maximize',
    close: 'Close',
    supportText: 'Powered by OpenKnowledge'
  },
  es: {
    title: 'OpenKnowledge',
    placeholder: 'Haz una pregunta...',
    greeting: '¡Hola! ¿Cómo puedo ayudarte hoy?',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    close: 'Cerrar',
    supportText: 'Powered by OpenKnowledge'
  }
}

const defaultIcons: WidgetIcons = {
  trigger: <MessageSquare className="w-6 h-6" />,
  minimize: <Minimize2 className="h-4 w-4" />,
  maximize: <Maximize2 className="h-4 w-4" />,
  close: <X className="h-4 w-4" />,
  submit: <Send className="w-4 h-4" />
}

// --- Context ---
interface WidgetContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMaximized: boolean
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>
  theme: 'light' | 'dark'
  colorTheme: ColorTheme
  themeVariables?: React.CSSProperties
  uiLanguage: UILanguage
  texts: WidgetTexts
  icons: WidgetIcons
  preventCloseOnOutsideClick?: boolean
  showOnlineStatus?: boolean
}

const WidgetContext = createContext<WidgetContextValue | undefined>(undefined)

export function useWidget() {
  const context = useContext(WidgetContext)
  if (!context) {
    throw new Error('useWidget must be used within a Widget.Root')
  }
  return context
}

// --- Root ---
export interface WidgetRootProps {
  children: ReactNode
  defaultOpen?: boolean
  theme?: 'light' | 'dark'
  colorTheme?: ColorTheme
  uiLanguage?: UILanguage
  texts?: Partial<WidgetTexts>
  icons?: Partial<WidgetIcons>
  themeVariables?: React.CSSProperties
  preventCloseOnOutsideClick?: boolean
  showOnlineStatus?: boolean
  className?: string
}

export function Root({
  children,
  defaultOpen = false,
  theme = 'light',
  colorTheme = 'default',
  uiLanguage = 'pt-BR',
  texts = {},
  icons = {},
  themeVariables,
  preventCloseOnOutsideClick,
  showOnlineStatus = true,
  className
}: WidgetRootProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isMaximized, setIsMaximized] = useState(false)

  const mergedTexts = useMemo(() => ({ ...defaultTexts[uiLanguage], ...texts }), [uiLanguage, texts])
  const mergedIcons = useMemo(() => ({ ...defaultIcons, ...icons }), [icons])

  const themeClass = colorTheme === 'default' ? '' : `theme-${colorTheme}`

  return (
    <WidgetContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isMaximized,
        setIsMaximized,
        theme,
        colorTheme,
        themeVariables,
        uiLanguage,
        texts: mergedTexts,
        icons: mergedIcons,
        preventCloseOnOutsideClick,
        showOnlineStatus
      }}
    >
      <div
        className={cn('openknowledge-widget', themeClass, theme === 'dark' ? 'dark' : '', className)}
        style={themeVariables}
      >
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          {children}
        </Popover.Root>
      </div>
    </WidgetContext.Provider>
  )
}

// --- Trigger ---
export interface WidgetTriggerProps {
  children?: ReactNode
  className?: string
}

export function Trigger({ children, className }: WidgetTriggerProps) {
  const { icons, isOpen } = useWidget()
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            'group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30',
            isOpen && 'rotate-12 scale-95 shadow-md',
            className
          )}
        >
          {/* Subtle glow effect behind trigger */}
          <div className="absolute inset-0 -z-10 rounded-full bg-primary opacity-20 blur-md transition-opacity group-hover:opacity-40" />
          {children ?? icons.trigger}
        </button>
      </Popover.Trigger>
    </div>
  )
}

// --- Content ---
export interface WidgetContentProps {
  children?: ReactNode
  className?: string
}

export function Content({ children, className }: WidgetContentProps) {
  const {
    isMaximized,
    setIsMaximized,
    setIsOpen,
    texts,
    icons,
    colorTheme,
    theme,
    themeVariables,
    preventCloseOnOutsideClick,
    showOnlineStatus
  } = useWidget()
  const themeClass = colorTheme === 'default' ? '' : `theme-${colorTheme}`

  return (
    <Popover.Portal>
      <Popover.Content
        align="end"
        sideOffset={20}
        onInteractOutside={(e: any) => {
          if (preventCloseOnOutsideClick) {
            e.preventDefault()
          }
        }}
        style={themeVariables}
        className={cn(
          'openknowledge-widget',
          themeClass,
          theme === 'dark' ? 'dark' : '',
          'z-[9999] flex flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-2xl border border-border/50 outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-4 data-[side=left]:slide-in-from-right-4 data-[side=right]:slide-in-from-left-4 data-[side=top]:slide-in-from-bottom-4',
          isMaximized
            ? 'w-[400px] h-[650px] sm:w-[500px] sm:h-[750px]'
            : 'w-[340px] h-[520px] sm:w-[380px] sm:h-[600px]',
          'transition-[width,height] duration-300 ease-in-out',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4 bg-muted/30 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <strong className="text-sm font-semibold tracking-tight leading-none text-foreground">
                {texts.title}
              </strong>
              {showOnlineStatus && (
                <span className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Online
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMaximized((m) => !m)}
              className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={isMaximized ? texts.minimize : texts.maximize}
              title={isMaximized ? texts.minimize : texts.maximize}
            >
              {isMaximized ? icons.minimize : icons.maximize}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={texts.close}
              title={texts.close}
            >
              {icons.close}
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-gradient-to-b from-background to-muted/20">
          {children ?? (
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-6">
                {/* Bot Greeting Bubble */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                      <p className="text-sm leading-relaxed text-foreground">{texts.greeting}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground ml-1">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Input Area */}
        <div className="p-4 bg-background border-t border-border/50">
          {!children && (
            <div className="relative group flex items-center">
              <input
                type="text"
                placeholder={texts.placeholder}
                className="w-full bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-primary rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 shadow-sm placeholder:text-muted-foreground"
              />
              <button
                type="button"
                className="absolute right-2 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {icons.submit}
              </button>
            </div>
          )}
          {texts.supportText && (
            <div className="mt-3 text-center">
              <p className="text-[10px] text-muted-foreground font-medium flex justify-center items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                {texts.supportText}
              </p>
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Portal>
  )
}
