import * as Popover from '@radix-ui/react-popover'
import type React from 'react'
import { type ReactNode, useMemo, useState } from 'react'
import type { Message } from '../../../hooks/use-widget-messages.js'
import { cn } from '../../../utils/cn.js'
import { WidgetFooter } from '../../molecules/WidgetFooter/WidgetFooter.js'
import { WidgetHeader } from '../../molecules/WidgetHeader/WidgetHeader.js'
import { WidgetBody } from '../../organisms/WidgetBody/WidgetBody.js'
import {
  type ColorTheme,
  DEFAULT_ICONS_PROP,
  DEFAULT_TEXTS_PROP,
  defaultIcons,
  defaultTexts,
  type UILanguage,
  useWidget,
  WidgetContext,
  type WidgetIcons,
  type WidgetTexts
} from './context.js'

export interface WidgetRootProps {
  children: ReactNode
  messages: Message[]
  isProcessing: boolean
  onSendMessage: (text: string) => void
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
  messages,
  isProcessing,
  onSendMessage,
  defaultOpen = false,
  theme = 'light',
  colorTheme = 'default',
  uiLanguage = 'pt-BR',
  texts = DEFAULT_TEXTS_PROP,
  icons = DEFAULT_ICONS_PROP,
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

  const contextValue = useMemo(
    () => ({
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
      showOnlineStatus,
      messages,
      isProcessing,
      onSendMessage
    }),
    [
      isOpen,
      isMaximized,
      theme,
      colorTheme,
      themeVariables,
      uiLanguage,
      mergedTexts,
      mergedIcons,
      preventCloseOnOutsideClick,
      showOnlineStatus,
      messages,
      isProcessing,
      onSendMessage
    ]
  )

  return (
    <WidgetContext.Provider value={contextValue}>
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
          <div className="absolute inset-0 -z-10 rounded-full bg-primary opacity-20 blur-md transition-opacity group-hover:opacity-40" />
          {children ?? icons.trigger}
        </button>
      </Popover.Trigger>
    </div>
  )
}

export interface WidgetContentProps {
  children?: ReactNode
  className?: string
}

export function Content({ children, className }: WidgetContentProps) {
  const { colorTheme, theme, themeVariables, preventCloseOnOutsideClick, isMaximized } = useWidget()
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
        {children ?? (
          <>
            <WidgetHeader />
            <WidgetBody />
            <WidgetFooter />
          </>
        )}
      </Popover.Content>
    </Popover.Portal>
  )
}
