import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../../../utils/cn.js'

interface MarkdownRendererProps {
  content: string
  role: 'user' | 'assistant'
}

export default function MarkdownRenderer({ content, role }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        'prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:p-0',
        role === 'user'
          ? 'text-primary-foreground prose-p:text-primary-foreground prose-a:text-primary-foreground prose-strong:text-primary-foreground prose-headings:text-primary-foreground'
          : 'text-foreground dark:prose-invert prose-pre:bg-primary/5 prose-pre:text-primary prose-a:text-primary'
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
