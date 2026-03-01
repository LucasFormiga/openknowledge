# 🧠 OpenKnowledge - Core Package (`@openknowledge/core`)

The `core` package is a **Node.js-only** engine for loading, parsing, and executing AI-powered interactions.

## 📁 Key API: `createAgent`
The primary interaction point is the `createAgent` factory:

```typescript
import { createAgent, parseEnv } from '@openknowledge/core';

// 1. Initialize the agent (loads config from directory)
const agent = await createAgent(parseEnv(process.env), './agent-config');

// 2. Use it in your API handler
const response = await agent.ask("How does this work?");
```

## 🧩 Architectural Nuances
- **No Browser Support**: To ensure security, browser-side loading has been removed. API keys must remain on the server.
- **Factory Pattern**: `createAgent` reads and parses Markdown files (behavior, security, knowledge) only once at initialization, ensuring fast subsequent calls.
- **`ask(question, apiKey?)`**: The agent provides a simple, provider-agnostic method to get AI responses.

## 🛠 Parsing Logic
The `extractMarkdownSections` logic in `parser.ts` remains the heart of the configuration, allowing human-readable Markdown to drive complex AI behavior.

---
*When modifying this package, ensure that you maintain Node.js compatibility and the efficiency of the `createAgent` factory.*
