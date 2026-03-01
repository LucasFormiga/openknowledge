# 🤖 OpenKnowledge - Agent Guide

Welcome to the **OpenKnowledge** project. This documentation is specifically designed to provide AI Agents (and human developers) with a deep understanding of the project's architecture, patterns, and nuances.

## 📌 Project Overview
**OpenKnowledge** is a monorepo toolkit for building AI-powered knowledge widgets. The core philosophy is **Markdown-Driven Configuration**: an agent's identity, behavior, security rules, and knowledge are all defined using standard Markdown files.

### 🏗 Monorepo Structure
We use a Turbo-powered monorepo with the following components:

- **`packages/core`**: The headless logic. It handles Markdown parsing and AI provider routing. **Note: This package is strictly for Node.js environments.**
- **`packages/react`**: The UI layer. Provides a highly customizable, **controlled** chat widget.
- **`apps/playground`**: A Vite-based React application for real-time design and testing of the widget's UI and interaction flow.

## 🛡️ Security First Architecture
To prevent API key exposure and prompt manipulation, **OpenKnowledge** uses a Server-to-Client bridge:
1.  **Server-Side**: The backend uses `@openknowledge/core` to load configs and talk to LLMs securely.
2.  **Client-Side**: The frontend uses `@openknowledge/react` to display the widget, but does NOT contain API keys or sensitive logic.

## 🛠 Shared Guidelines & Standards
- **Runtime**: Node.js (Core) / Browser (React & Playground).
- **Linting & Formatting**: [Biome](https://biomejs.dev/) is used.
- **Language**: TypeScript with ESM defaults.
- **Styling**: Tailwind CSS + Radix UI + Lucide React.

## 🧭 Project Router
- **[Playground App](./docs/projects/apps/playground.md)**: Testing design and the "simulated backend" flow.
- **[Core Package](./docs/projects/packages/core.md)**: The server-side engine and `createAgent` factory.
- **[React Package](./docs/projects/packages/react.md)**: The controlled UI components and `useWidgetMessages` hook.

---
*This file serves as the main entry point for any AI Agent working on this codebase. Always start here to understand the context before making changes.*
