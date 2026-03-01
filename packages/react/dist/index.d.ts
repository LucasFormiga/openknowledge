import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode } from 'react';

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

declare const Widget: {
    Root: typeof Root;
    Trigger: typeof Trigger;
    Content: typeof Content;
};

export { type Message, Widget, useWidgetMessages };
