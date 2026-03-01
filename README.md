# 🤖 OpenKnowledge

OpenKnowledge is an open-source toolkit designed to drastically simplify the process of creating, configuring, and deploying an AI chatbot linked to a specialized knowledge base. 

By leveraging a **Markdown-Driven Configuration** approach, developers can define an agent's identity, behavior, security guardrails, and knowledge strictly through readable `.md` files—requiring zero code changes to iterate on AI behavior.

## 📦 Project Structure

We use a Turbo-powered monorepo consisting of:

- **`packages/core`**: The headless Node.js engine. It reads local Markdown files and routes prompt generations via `@tanstack/ai` to providers like OpenAI, Anthropic, and Gemini. 
- **`packages/react`**: A purely UI-focused, controlled chat widget built with React, Tailwind CSS, and Radix UI. It maintains zero knowledge of your API keys.
- **`apps/playground`**: A Vite-based SSR playground for testing the widget UI and simulating the backend Server-to-Client communication flow.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/openknowledge.git
   cd openknowledge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Navigate to `apps/playground` and create a `.env` file (you can copy from `.env.example` if it exists) with your AI provider keys:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start the Turbo pipeline, building the packages in watch mode and spinning up the Vite SSR playground.

## 💡 Implementation Example

The OpenKnowledge architecture strictly enforces a **Server-to-Client bridge** to protect API keys.

### 1. Server-Side (e.g. Next.js Route Handler, Express, etc.)
Create your agent using `@openknowledge/core` and expose an endpoint:

```typescript
import { createAgent, parseEnv } from '@openknowledge/core';

// Automatically loads behavior.md, security.md, and knowledge/*.md from the directory
const agent = await createAgent(parseEnv(process.env), './agent-config');

export async function POST(req, res) {
  const { message } = req.body;
  const response = await agent.ask(message);
  res.json({ text: response });
}
```

### 2. Client-Side (React)
Use the `@openknowledge/react` UI widget to interact with your secure endpoint:

```tsx
import { Widget, useWidgetMessages } from '@openknowledge/react';

export default function ChatWidget() {
  const { messages, isProcessing, appendMessage, setIsProcessing } = useWidgetMessages();

  const handleSendMessage = async (text: string) => {
    appendMessage({ role: 'user', content: text });
    setIsProcessing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      appendMessage({ role: 'assistant', content: data.text });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Widget.Root messages={messages} isProcessing={isProcessing} onSendMessage={handleSendMessage}>
      <Widget.Trigger />
      <Widget.Content />
    </Widget.Root>
  );
}
```

## 🤝 Contributing & Good First Issues

We welcome contributions from the community! If you're looking to make your first PR, here are a few **Good First Issues** derived from our current roadmap:

1. **Refactor `Widget.tsx` into Atomic Components**
   - **Context:** Currently, `packages/react/src/components/organisms/Widget/Widget.tsx` is a large file containing the Root, Trigger, and Content implementations.
   - **Task:** Refactor this using Atomic Design principles (extracting UI bits into `atoms` and `molecules`) while adhering to Vercel Composition Patterns (avoiding barrel files).

2. **Expand AI Provider Support in `@openknowledge/core`**
   - **Context:** The core package currently supports `openai`, `anthropic`, and `gemini` via `@tanstack/ai`. 
   - **Task:** Add support for a new provider (e.g., Groq, DeepSeek, or Mistral). You will need to update `config.ts`, `router.ts`, and write covering Vitest tests.

3. **Enhance Widget Theming Options**
   - **Context:** The widget supports 4 preset themes and a custom primary color override.
   - **Task:** Expose more CSS variables (like border radiuses, font families, or secondary colors) via the `themeVariables` prop to allow deeper developer customization.

Before contributing, please read our [Agent / Developer Guide](./AGENTS.md) for strict engineering, architecture, and testing guidelines.

## 📄 License

This project is licensed under the MIT License.
