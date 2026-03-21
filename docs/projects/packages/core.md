# 🧠 OpenKnowledge - Core Package (`@miolab/openknowledge-core`)

The `core` package is a **Node.js-only** engine for loading, parsing, and executing AI-powered interactions.

## 📁 Key API: `createAgent`
The primary interaction point is the `createAgent` factory:

```typescript
import { createAgent, parseEnv } from '@miolab/openknowledge-core';

// 1. Initialize the agent (loads config from directory)
const agent = await createAgent(parseEnv(process.env), './agent-config');

// 2. Use it in your API handler
const response = await agent.ask("How does this work?");
```

## 🧩 Architectural Nuances
- **No Browser Support**: To ensure security, browser-side loading has been deliberately excluded. API keys and configuration must remain on the server.
- **Factory Pattern**: `FileSystemKnowledgeLoader` reads and parses Markdown files (behavior, security, knowledge, skills) into memory only once at initialization, guaranteeing fast subsequent calls.
- **Provider Agnostic**: `AgentInstance` leverages `@tanstack/ai` to dynamically switch between OpenAI, Anthropic, and Gemini models.
- **100% Test Coverage**: The package is heavily tested via Vitest to ensure parsers gracefully handle malformed markdown and routing properly formats system prompts with fallback logic.

## 📐 Implementation Guidelines
- **Clean Architecture & SOLID**: Maintain strict separation between the domain models, parsing infrastructure, and the router. Classes and functions should have a single responsibility.
- **Self-Documenting Code**: Code must be expressive and clear. Refactor instead of adding descriptive comments. Use JSDoc for public API documentation only.
- **Avoid Barrel Files**: Import logic directly from files like `./src/parser.js` rather than relying on re-exports in `index.ts` within internal package modules.

## 🛠 Parsing Logic
The `extractMarkdownSections` logic in `parser.ts` is the heart of the configuration, processing human-readable Markdown to drive complex AI behavior. Sections (`# ` and `## `) map directly to structured objects representing Identity, Security Guardrails, and Knowledge domains.

---
*When modifying this package, ensure that you maintain Node.js compatibility, the efficiency of the `createAgent` factory, and 100% test coverage.*
