import { cn } from '../../../utils/cn.js'

export interface StatusIndicatorProps {
  className?: string
  label?: string
}

export function StatusIndicator({ className, label = 'Online' }: StatusIndicatorProps) {
  return (
    <span className={cn('text-[11px] text-muted-foreground mt-1 flex items-center gap-1', className)}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      {label}
    </span>
  )
}
