import {
  cn
} from "./chunk-ADIDI7AJ.js";

// src/components/atoms/StatusIndicator/StatusIndicator.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function StatusIndicator({ className, label = "Online" }) {
  return /* @__PURE__ */ jsxs("span", { className: cn("text-[11px] text-muted-foreground mt-1 flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
      /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
      /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
    ] }),
    label
  ] });
}

// src/components/molecules/WidgetFooter/WidgetFooter.tsx
import { useState } from "react";

// src/components/organisms/Widget/context.tsx
import { Maximize2, MessageSquare, Minimize2, Send, X } from "lucide-react";
import { createContext, useContext } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var defaultTexts = {
  "pt-BR": {
    title: "OpenKnowledge",
    placeholder: "Fa\xE7a uma pergunta...",
    greeting: "Ol\xE1! Como posso ajudar voc\xEA hoje?",
    minimize: "Minimizar",
    maximize: "Maximizar",
    close: "Fechar",
    supportText: "Powered by OpenKnowledge"
  },
  en: {
    title: "OpenKnowledge",
    placeholder: "Ask a question...",
    greeting: "Hi! How can I help you today?",
    minimize: "Minimize",
    maximize: "Maximize",
    close: "Close",
    supportText: "Powered by OpenKnowledge"
  },
  es: {
    title: "OpenKnowledge",
    placeholder: "Haz una pregunta...",
    greeting: "\xA1Hola! \xBFC\xF3mo puedo ayudarte hoy?",
    minimize: "Minimizar",
    maximize: "Maximizar",
    close: "Cerrar",
    supportText: "Powered by OpenKnowledge"
  }
};
var defaultIcons = {
  trigger: /* @__PURE__ */ jsx2(MessageSquare, { className: "w-6 h-6" }),
  minimize: /* @__PURE__ */ jsx2(Minimize2, { className: "h-4 w-4" }),
  maximize: /* @__PURE__ */ jsx2(Maximize2, { className: "h-4 w-4" }),
  close: /* @__PURE__ */ jsx2(X, { className: "h-4 w-4" }),
  submit: /* @__PURE__ */ jsx2(Send, { className: "w-4 h-4" })
};
var WidgetContext = createContext(void 0);
function useWidget() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a Widget.Root");
  }
  return context;
}
var DEFAULT_TEXTS_PROP = {};
var DEFAULT_ICONS_PROP = {};

// src/components/molecules/WidgetFooter/WidgetFooter.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function WidgetFooter({ children, className }) {
  const { texts, icons, isProcessing, onSendMessage } = useWidget();
  const [inputValue, setInputValue] = useState("");
  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;
    const text = inputValue;
    setInputValue("");
    onSendMessage(text);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return /* @__PURE__ */ jsx3("div", { className: cn("p-4 bg-background border-t border-border/50", className), children: children ?? /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("div", { className: "relative group flex items-center", children: [
      /* @__PURE__ */ jsx3(
        "input",
        {
          type: "text",
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: texts.placeholder,
          disabled: isProcessing,
          className: "w-full bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-primary rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 shadow-sm placeholder:text-muted-foreground disabled:opacity-50"
        }
      ),
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: handleSend,
          disabled: !inputValue.trim() || isProcessing,
          className: "absolute right-2 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:scale-100",
          children: icons.submit
        }
      )
    ] }),
    texts.supportText ? /* @__PURE__ */ jsx3("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx3("p", { className: "text-[10px] text-muted-foreground font-medium flex justify-center items-center gap-1 opacity-70 hover:opacity-100 transition-opacity", children: texts.supportText }) }) : null
  ] }) });
}

// src/components/molecules/WidgetHeader/WidgetHeader.tsx
import { Bot } from "lucide-react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function WidgetHeader({ className }) {
  const { isMaximized, setIsMaximized, setIsOpen, texts, icons, showOnlineStatus } = useWidget();
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: cn(
        "flex items-center justify-between border-b border-border/50 px-5 py-4 bg-muted/30 backdrop-blur-md z-10",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx4("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx4(Bot, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs3("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx4("strong", { className: "text-sm font-semibold tracking-tight leading-none text-foreground", children: texts.title }),
            showOnlineStatus ? /* @__PURE__ */ jsx4(StatusIndicator, {}) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              onClick: () => setIsMaximized((m) => !m),
              className: "rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
              "aria-label": isMaximized ? texts.minimize : texts.maximize,
              title: isMaximized ? texts.minimize : texts.maximize,
              children: isMaximized ? icons.minimize : icons.maximize
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              onClick: () => setIsOpen(false),
              className: "rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
              "aria-label": texts.close,
              title: texts.close,
              children: icons.close
            }
          )
        ] })
      ]
    }
  );
}

// src/components/organisms/Widget/Widget.tsx
import * as Popover from "@radix-ui/react-popover";
import { useMemo, useState as useState2 } from "react";

// src/components/organisms/WidgetBody/WidgetBody.tsx
import { Bot as Bot2, User } from "lucide-react";
import { lazy, Suspense, useEffect, useRef } from "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var MarkdownRenderer = lazy(() => import("./MarkdownRenderer-DC2CCUOL.js"));
function WidgetBody({ children, className }) {
  const { messages, isProcessing, texts } = useWidget();
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ref: scrollRef,
      className: cn(
        "flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-gradient-to-b from-background to-muted/20",
        className
      ),
      children: children ?? /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-6", children: [
        messages.length === 0 ? /* @__PURE__ */ jsxs4("div", { className: "flex items-start gap-3 max-w-[85%]", children: [
          /* @__PURE__ */ jsx5("div", { className: "flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx5(Bot2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx5("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsx5("div", { className: "bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm", children: /* @__PURE__ */ jsx5("p", { className: "text-sm leading-relaxed text-foreground", children: texts.greeting }) }) })
        ] }) : null,
        messages.map((msg, i) => /* @__PURE__ */ jsxs4(
          "div",
          {
            className: cn(
              "flex items-start gap-3 max-w-[85%]",
              msg.role === "user" ? "flex-row-reverse self-end ml-auto" : ""
            ),
            children: [
              /* @__PURE__ */ jsx5(
                "div",
                {
                  className: cn(
                    "flex-shrink-0 h-8 w-8 mt-1 rounded-full flex items-center justify-center",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  ),
                  children: msg.role === "user" ? /* @__PURE__ */ jsx5(User, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx5(Bot2, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxs4("div", { className: cn("flex flex-col gap-1", msg.role === "user" ? "items-end" : ""), children: [
                /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: cn(
                      "border border-border/50 px-4 py-3 rounded-2xl shadow-sm overflow-hidden",
                      msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                    ),
                    children: /* @__PURE__ */ jsx5(Suspense, { fallback: /* @__PURE__ */ jsx5("p", { className: "text-sm leading-relaxed whitespace-pre-wrap", children: msg.content }), children: /* @__PURE__ */ jsx5(MarkdownRenderer, { content: msg.content, role: msg.role }) })
                  }
                ),
                /* @__PURE__ */ jsx5("span", { className: "text-[10px] text-muted-foreground ml-1", children: msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ] })
            ]
          },
          i
        )),
        isProcessing ? /* @__PURE__ */ jsxs4("div", { className: "flex items-start gap-3 max-w-[85%] animate-pulse", children: [
          /* @__PURE__ */ jsx5("div", { className: "flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx5(Bot2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx5("div", { className: "bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm", children: /* @__PURE__ */ jsxs4("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx5("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" }),
            /* @__PURE__ */ jsx5("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" }),
            /* @__PURE__ */ jsx5("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" })
          ] }) })
        ] }) : null
      ] })
    }
  );
}

// src/components/organisms/Widget/Widget.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function Root2({
  children,
  messages,
  isProcessing,
  onSendMessage,
  defaultOpen = false,
  theme = "light",
  colorTheme = "default",
  uiLanguage = "pt-BR",
  texts = DEFAULT_TEXTS_PROP,
  icons = DEFAULT_ICONS_PROP,
  themeVariables,
  preventCloseOnOutsideClick,
  showOnlineStatus = true,
  className
}) {
  const [isOpen, setIsOpen] = useState2(defaultOpen);
  const [isMaximized, setIsMaximized] = useState2(false);
  const mergedTexts = useMemo(() => ({ ...defaultTexts[uiLanguage], ...texts }), [uiLanguage, texts]);
  const mergedIcons = useMemo(() => ({ ...defaultIcons, ...icons }), [icons]);
  const themeClass = colorTheme === "default" ? "" : `theme-${colorTheme}`;
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
  );
  return /* @__PURE__ */ jsx6(WidgetContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx6(
    "div",
    {
      className: cn("openknowledge-widget", themeClass, theme === "dark" ? "dark" : "", className),
      style: themeVariables,
      children: /* @__PURE__ */ jsx6(Popover.Root, { open: isOpen, onOpenChange: setIsOpen, children })
    }
  ) });
}
function Trigger2({ children, className }) {
  const { icons, isOpen } = useWidget();
  return /* @__PURE__ */ jsx6("div", { className: "fixed bottom-6 right-6 z-[9999]", children: /* @__PURE__ */ jsx6(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs5(
    "button",
    {
      type: "button",
      className: cn(
        "group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30",
        isOpen && "rotate-12 scale-95 shadow-md",
        className
      ),
      children: [
        /* @__PURE__ */ jsx6("div", { className: "absolute inset-0 -z-10 rounded-full bg-primary opacity-20 blur-md transition-opacity group-hover:opacity-40" }),
        children ?? icons.trigger
      ]
    }
  ) }) });
}
function Content2({ children, className }) {
  const { colorTheme, theme, themeVariables, preventCloseOnOutsideClick, isMaximized } = useWidget();
  const themeClass = colorTheme === "default" ? "" : `theme-${colorTheme}`;
  return /* @__PURE__ */ jsx6(Popover.Portal, { children: /* @__PURE__ */ jsx6(
    Popover.Content,
    {
      align: "end",
      sideOffset: 20,
      onInteractOutside: (e) => {
        if (preventCloseOnOutsideClick) {
          e.preventDefault();
        }
      },
      style: themeVariables,
      className: cn(
        "openknowledge-widget",
        themeClass,
        theme === "dark" ? "dark" : "",
        "z-[9999] flex flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-2xl border border-border/50 outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-4 data-[side=left]:slide-in-from-right-4 data-[side=right]:slide-in-from-left-4 data-[side=top]:slide-in-from-bottom-4",
        isMaximized ? "w-[400px] h-[650px] sm:w-[500px] sm:h-[750px]" : "w-[340px] h-[520px] sm:w-[380px] sm:h-[600px]",
        "transition-[width,height] duration-300 ease-in-out",
        className
      ),
      children: children ?? /* @__PURE__ */ jsxs5(Fragment2, { children: [
        /* @__PURE__ */ jsx6(WidgetHeader, {}),
        /* @__PURE__ */ jsx6(WidgetBody, {}),
        /* @__PURE__ */ jsx6(WidgetFooter, {})
      ] })
    }
  ) });
}

// src/hooks/use-widget-messages.ts
import { useCallback, useState as useState3 } from "react";
function useWidgetMessages() {
  const [messages, setMessages] = useState3([]);
  const [isProcessing, setIsProcessing] = useState3(false);
  const appendMessage = useCallback((message) => {
    setMessages((prev) => [...prev, { ...message, timestamp: /* @__PURE__ */ new Date() }]);
  }, []);
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  return {
    messages,
    isProcessing,
    setIsProcessing,
    appendMessage,
    clearMessages
  };
}

// src/index.ts
var Widget = {
  Root: Root2,
  Trigger: Trigger2,
  Content: Content2,
  Header: WidgetHeader,
  Body: WidgetBody,
  Footer: WidgetFooter,
  Status: StatusIndicator
};
export {
  Widget,
  useWidget,
  useWidgetMessages
};
