import { Maximize2, MessageSquare, Minimize2, Send, X } from 'lucide-react'
import type React from 'react'
import { createContext, type ReactNode, useContext } from 'react'
import type { Message } from '../../../hooks/use-widget-messages.js'

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

export const defaultTexts: Record<UILanguage, WidgetTexts> = {
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

export const defaultIcons: WidgetIcons = {
  trigger: <MessageSquare className="w-6 h-6" />,
  minimize: <Minimize2 className="h-4 w-4" />,
  maximize: <Maximize2 className="h-4 w-4" />,
  close: <X className="h-4 w-4" />,
  submit: <Send className="w-4 h-4" />
}

export interface WidgetContextValue {
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
  messages: Message[]
  isProcessing: boolean
  onSendMessage: (text: string) => void
}

export const WidgetContext = createContext<WidgetContextValue | undefined>(undefined)

export function useWidget() {
  const context = useContext(WidgetContext)
  if (!context) {
    throw new Error('useWidget must be used within a Widget.Root')
  }
  return context
}

export const DEFAULT_TEXTS_PROP = {}
export const DEFAULT_ICONS_PROP = {}
