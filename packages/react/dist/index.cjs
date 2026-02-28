"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Widget: () => Widget
});
module.exports = __toCommonJS(index_exports);

// src/components/organisms/Widget/Widget.tsx
var Popover = __toESM(require("@radix-ui/react-popover"), 1);
var import_clsx = require("clsx");
var import_lucide_react = require("lucide-react");
var import_react = require("react");
var import_tailwind_merge = require("tailwind-merge");
var import_jsx_runtime = require("react/jsx-runtime");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
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
  trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MessageSquare, { className: "w-6 h-6" }),
  minimize: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Minimize2, { className: "h-4 w-4" }),
  maximize: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Maximize2, { className: "h-4 w-4" }),
  close: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-4 w-4" }),
  submit: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Send, { className: "w-4 h-4" })
};
var WidgetContext = (0, import_react.createContext)(void 0);
function useWidget() {
  const context = (0, import_react.useContext)(WidgetContext);
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
  const [isOpen, setIsOpen] = (0, import_react.useState)(defaultOpen);
  const [isMaximized, setIsMaximized] = (0, import_react.useState)(false);
  const mergedTexts = (0, import_react.useMemo)(
    () => ({ ...defaultTexts[uiLanguage], ...texts }),
    [uiLanguage, texts]
  );
  const mergedIcons = (0, import_react.useMemo)(() => ({ ...defaultIcons, ...icons }), [icons]);
  const themeClass = colorTheme === "default" ? "" : `theme-${colorTheme}`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: cn(
            "openknowledge-widget",
            themeClass,
            theme === "dark" ? "dark" : "",
            className
          ),
          style: themeVariables,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Root, { open: isOpen, onOpenChange: setIsOpen, children })
        }
      )
    }
  );
}
function Trigger2({ children, className }) {
  const { icons, isOpen } = useWidget();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed bottom-6 right-6 z-[9999]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: cn(
        "group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30",
        isOpen && "rotate-12 scale-95 shadow-md",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 rounded-full bg-primary opacity-20 blur-md transition-opacity group-hover:opacity-40" }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between border-b border-border/50 px-5 py-4 bg-muted/30 backdrop-blur-md z-10", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bot, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "text-sm font-semibold tracking-tight leading-none text-foreground", children: texts.title }),
              showOnlineStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-[11px] text-muted-foreground mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
                ] }),
                "Online"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-gradient-to-b from-background to-muted/20", children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start gap-3 max-w-[85%]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-shrink-0 h-8 w-8 mt-1 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Bot, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm leading-relaxed text-foreground", children: texts.greeting }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] text-muted-foreground ml-1", children: "Just now" })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-4 bg-background border-t border-border/50", children: [
          !children && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative group flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                type: "text",
                placeholder: texts.placeholder,
                className: "w-full bg-muted/50 hover:bg-muted border border-transparent focus:bg-background focus:border-primary rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 shadow-sm placeholder:text-muted-foreground"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "absolute right-2 flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring",
                children: icons.submit
              }
            )
          ] }),
          texts.supportText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[10px] text-muted-foreground font-medium flex justify-center items-center gap-1 opacity-70 hover:opacity-100 transition-opacity", children: texts.supportText }) })
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Widget
});
