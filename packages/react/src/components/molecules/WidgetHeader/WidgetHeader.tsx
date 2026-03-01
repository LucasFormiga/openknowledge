import { Bot } from 'lucide-react'
import { cn } from '../../../utils/cn.js'
import { StatusIndicator } from '../../atoms/StatusIndicator/StatusIndicator.js'
import { useWidget } from '../../organisms/Widget/context.js'

export interface WidgetHeaderProps {
  className?: string
}

export function WidgetHeader({ className }: WidgetHeaderProps) {
  const { isMaximized, setIsMaximized, setIsOpen, texts, icons, showOnlineStatus } = useWidget()
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-border/50 px-5 py-4 bg-muted/30 backdrop-blur-md z-10',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <strong className="text-sm font-semibold tracking-tight leading-none text-foreground">{texts.title}</strong>
          {showOnlineStatus ? <StatusIndicator /> : null}
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
  )
}
