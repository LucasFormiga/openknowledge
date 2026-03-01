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
- **No AI Logic in UI**: The widget does NOT know about API keys or LLM providers. It only receives `messages` and tells the host app when to send a new one.
- **Secure by Default**: This pattern prevents exposing sensitive system prompts or keys to the user's browser.

## 🎨 Styling & Customization
- The widget uses a **Compound Component** pattern (`Root`, `Trigger`, `Content`).
- Theme presets: `'default' | 'rose' | 'emerald' | 'violet'`.
- Fully customizable via CSS variables (HSL).

---
*When updating the UI, maintain the controlled component pattern to ensure security and flexibility for developers.*
