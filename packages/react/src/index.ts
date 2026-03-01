import './globals.css'

import { StatusIndicator as Status } from './components/atoms/StatusIndicator/StatusIndicator.js'
import { WidgetFooter as Footer } from './components/molecules/WidgetFooter/WidgetFooter.js'
import { WidgetHeader as Header } from './components/molecules/WidgetHeader/WidgetHeader.js'
import { Content, Root, Trigger } from './components/organisms/Widget/Widget.js'
import { WidgetBody as Body } from './components/organisms/WidgetBody/WidgetBody.js'

export const Widget = {
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  Status
}

export type {
  ColorTheme,
  UILanguage,
  WidgetIcons,
  WidgetTexts
} from './components/organisms/Widget/context.js'
export { useWidget } from './components/organisms/Widget/context.js'
export type { Message } from './hooks/use-widget-messages.js'
export * from './hooks/use-widget-messages.js'
