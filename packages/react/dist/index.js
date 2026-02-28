// src/components/organisms/Widget/Widget.tsx
import * as Popover from "@radix-ui/react-popover";
import { clsx } from "clsx";
import { Bot, Maximize2, MessageSquare, Minimize2, Send, X } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { jsx, jsxs } from "react/jsx-runtime";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
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
  trigger: /* @__PURE__ */ jsx(MessageSquare, { className: "w-6 h-6" }),
  minimize: /* @__PURE__ */ jsx(Minimize2, { className: "h-4 w-4" }),
  maximize: /* @__PURE__ */ jsx(Maximize2, { className: "h-4 w-4" }),
  close: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
  submit: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
};
var WidgetContext = createContext(void 0);
function useWidget() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a Widget.Root");
  }
  return context;
}
function Root2({
  children,
  defaultOpen = false,
  theme = "light",
  colorTheme = "default",
  uiLanguage = "pt-BR",
  texts = {},
  icons = {},
  themeVariables,
  preventCloseOnOutsideClick,
  showOnlineStatus = true,
  className
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMaximized, setIsMaximized] = useState(false);
  const mergedTexts = useMemo(
    () => ({ ...defaultTexts[uiLanguage], ...texts }),
    [uiLanguage, texts]
  );
  const mergedIcons = useMemo(() => ({ ...defaultIcons, ...icons }), [icons]);
  const themeClass = colorTheme === "default" ? "" : `theme-${colorTheme}`;
  return /* @__PURE__ */ jsx(
    WidgetContext.Provider,
    {
      value: {
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
        showOnlineStatus
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "openknowledge-widget",
            themeClass,
            theme === "dark" ? "dark" : "",
            className
          ),
          style: themeVariables,
          children: /* @__PURE__ */ jsx(Popover.Root, { open: isOpen, onOpenChange: setIsOpen, children })
        }
      )
    }
  );
}
function Trigger2({ children, className }) {
  const { icons, isOpen } = useWidget();
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 right-6 z-[9999]", children: /* @__PURE__ */ jsx(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30",
        isOpen && "rotate-12 scale-95 shadow-md",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 rounded-full bg-primary opacity-20 blur-md transition-opacity group-hover:opacity-40" }),
        children ?? icons.trigger
      ]
    }
  ) }) });
}
function Content2({ children, className }) {
  const {
    isMaximized,
    setIsMaximized,
    setIsOpen,
    texts,
    icons,
    colorTheme,
    theme,
    themeVariables,
    preventCloseOnOutsideClick,
    showOnlineStatus
  } = useWidget();
  const themeClass = colorTheme === "default" ? "" : `theme-${colorTheme}`;
  return /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsxs(
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
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border/50 px-5 py-4 bg-muted/30 backdrop-blur-md z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Bot, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("strong", { className: "text-sm font-semibold tracking-tight leading-none text-foreground", children: texts.title }),
              showOnlineStatus && /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-muted-foreground mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
                  /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
                ] }),
                "Online"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
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
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-gradient-to-b from-background to-muted/20", children: children ?? /* @__PURE__ */ jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 max-w-[85%]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm", children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-foreground", children: texts.greeting }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground ml-1", children: "Just now" })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-background border-t border-border/50", children: [
          !children && /* @__PURE__ */ jsxs("div", { className: "relative group flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: texts.placeholder,
                className: "w-full bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-primary rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 shadow-sm placeholder:text-muted-foreground"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute right-2 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring",
                children: icons.submit
              }
            )
          ] }),
          texts.supportText && /* @__PURE__ */ jsx("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground font-medium flex justify-center items-center gap-1 opacity-70 hover:opacity-100 transition-opacity", children: texts.supportText }) })
        ] })
      ]
    }
  ) });
}

// src/components/organisms/Widget/index.ts
var Widget = {
  Root: Root2,
  Trigger: Trigger2,
  Content: Content2
};
export {
  Widget
};
