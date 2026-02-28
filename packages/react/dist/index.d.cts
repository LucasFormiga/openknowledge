import * as react_jsx_runtime from 'react/jsx-runtime';
import { Config, LoaderResult } from '@openknowledge/core';
import React, { ReactNode } from 'react';

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
    defaultOpen?: boolean;
    theme?: 'light' | 'dark';
    colorTheme?: ColorTheme;
    uiLanguage?: UILanguage;
    texts?: Partial<WidgetTexts>;
    icons?: Partial<WidgetIcons>;
    themeVariables?: React.CSSProperties;
    preventCloseOnOutsideClick?: boolean;
    showOnlineStatus?: boolean;
    className?: string;
    config?: Config;
    configDir?: string;
    initialData?: LoaderResult;
    isDev?: boolean;
}
declare function Root({ children, defaultOpen, theme, colorTheme, uiLanguage, texts, icons, themeVariables, preventCloseOnOutsideClick, showOnlineStatus, className, config, configDir, initialData, isDev }: WidgetRootProps): react_jsx_runtime.JSX.Element;
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

export { Widget };
