# ⚛️ OpenKnowledge - React Package (`@openknowledge/react`)

The `react` package is a **UI-only** library that provides a high-quality, **controlled** chat widget.

## 📁 Key API: `useWidgetMessages`
To manage state easily, the package provides a simple hook:

```tsx
import { Widget, useWidgetMessages } from '@openknowledge/react';

export function Chat() {
  const { messages, isProcessing, appendMessage, setIsProcessing } = useWidgetMessages();

  const handleSendMessage = async (text: string) => {
    appendMessage({ role: 'user', content: text });
    setIsProcessing(true);

    // Call your own backend API here
    const response = await fetch('/api/chat', { ... });
    
    appendMessage({ role: 'assistant', content: response.text });
    setIsProcessing(false);
  };

  return (
    <Widget.Root
      messages={messages}
      isProcessing={isProcessing}
      onSendMessage={handleSendMessage}
    >
      <Widget.Trigger />
      <Widget.Content />
    </Widget.Root>
  );
}
```

## 🧩 Architectural Nuances
- **No AI Logic in UI**: The widget does NOT know about API keys or LLM providers. It only receives `messages` and delegates the actual communication to the host app.
- **Secure by Default**: This pattern strictly prevents exposing sensitive system prompts or provider keys to the user's browser.
- **Test-Driven UI**: The components and hooks are thoroughly tested using Vitest and React Testing Library.

## 📐 Implementation Guidelines
- **Avoid Barrel Files**: Import components directly (e.g., `import { Button } from './atoms/Button'`) to ensure optimal bundle performance and avoid circular imports.
- **Atomic Design**: Structure components into `atoms`, `molecules`, and `organisms`.
- **Vercel React Best Practices**: 
  - Minimize waterfalls by parallelizing logic. 
  - Ensure re-render optimization using `useMemo` and `useCallback` where appropriate.
  - Avoid heavy dependencies in effects.
- **Vercel Composition Patterns**:
  - Use **Compound Components** (like `Widget.Root`, `Widget.Trigger`) to allow flexible layout assembly.
  - **Avoid Boolean Props** for behavioral toggles; use child composition or explicit variant components instead.

## 🎨 Styling & Customization
- Uses a **Compound Component** pattern (`Root`, `Trigger`, `Content`).
- Theme presets: `'default' | 'rose' | 'emerald' | 'violet'` with built-in Light and Dark modes.
- Fully customizable via injected CSS variables.
- The UI gracefully prevents closing when the user clicks outside if configured, and elegantly auto-scrolls when messages arrive.

---
*When updating the UI, maintain the controlled component pattern to ensure security and run UI tests to verify regressions.*