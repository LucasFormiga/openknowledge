import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode } from 'react';

interface StatusIndicatorProps {
    className?: string;
    label?: string;
}
declare function StatusIndicator({ className, label }: StatusIndicatorProps): react_jsx_runtime.JSX.Element;

interface WidgetFooterProps {
    children?: React__default.ReactNode;
    className?: string;
}
declare function WidgetFooter({ children, className }: WidgetFooterProps): react_jsx_runtime.JSX.Element;

interface WidgetHeaderProps {
    className?: string;
}
declare function WidgetHeader({ className }: WidgetHeaderProps): react_jsx_runtime.JSX.Element;

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
/**
 * A simple hook to manage the chat widget's message state.
 * Use this in your host application to keep track of the conversation
 * and handle interactions with your own backend.
 */
declare function useWidgetMessages(): {
    messages: Message[];
    isProcessing: boolean;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    appendMessage: (message: Omit<Message, "timestamp">) => void;
    clearMessages: () => void;
};

interface WidgetTexts {
    title: string;
    placeholder: string;
    greeting: string;
    minimize: string;
    maximize: string;
    close: string;
    supportText?: string;
}
interface WidgetIcons {
    trigger: ReactNode;
    minimize: ReactNode;
    maximize: ReactNode;
    close: ReactNode;
    submit: ReactNode;
}
type UILanguage = 'pt-BR' | 'en' | 'es';
type ColorTheme = 'default' | 'rose' | 'emerald' | 'violet';
interface WidgetContextValue {
    isOpen: boolean;
    setIsOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    isMaximized: boolean;
    setIsMaximized: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    theme: 'light' | 'dark';
    colorTheme: ColorTheme;
    themeVariables?: React__default.CSSProperties;
    uiLanguage: UILanguage;
    texts: WidgetTexts;
    icons: WidgetIcons;
    preventCloseOnOutsideClick?: boolean;
    showOnlineStatus?: boolean;
    messages: Message[];
    isProcessing: boolean;
    onSendMessage: (text: string) => void;
}
declare function useWidget(): WidgetContextValue;

interface WidgetRootProps {
    children: ReactNode;
    messages: Message[];
    isProcessing: boolean;
    onSendMessage: (text: string) => void;
    defaultOpen?: boolean;
    theme?: 'light' | 'dark';
    colorTheme?: ColorTheme;
    uiLanguage?: UILanguage;
    texts?: Partial<WidgetTexts>;
    icons?: Partial<WidgetIcons>;
    themeVariables?: React__default.CSSProperties;
    preventCloseOnOutsideClick?: boolean;
    showOnlineStatus?: boolean;
    className?: string;
}
declare function Root({ children, messages, isProcessing, onSendMessage, defaultOpen, theme, colorTheme, uiLanguage, texts, icons, themeVariables, preventCloseOnOutsideClick, showOnlineStatus, className }: WidgetRootProps): react_jsx_runtime.JSX.Element;
interface WidgetTriggerProps {
    children?: ReactNode;
    className?: string;
}
declare function Trigger({ children, className }: WidgetTriggerProps): react_jsx_runtime.JSX.Element;
interface WidgetContentProps {
    children?: ReactNode;
    className?: string;
}
declare function Content({ children, className }: WidgetContentProps): react_jsx_runtime.JSX.Element;

interface WidgetBodyProps {
    children?: React__default.ReactNode;
    className?: string;
}
declare function WidgetBody({ children, className }: WidgetBodyProps): react_jsx_runtime.JSX.Element;

declare const Widget: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Content: typeof Content;
    Header: typeof WidgetHeader;
    Body: typeof WidgetBody;
    Footer: typeof WidgetFooter;
    Status: typeof StatusIndicator;
};

export { type ColorTheme, type Message, type UILanguage, Widget, type WidgetIcons, type WidgetTexts, useWidget, useWidgetMessages };
