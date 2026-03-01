# 🤖 OpenKnowledge - Agent Guide

Welcome to the **OpenKnowledge** project. This documentation is specifically designed to provide AI Agents (and human developers) with a deep understanding of the project's architecture, patterns, and nuances.

## 📌 Project Overview
**OpenKnowledge** is a monorepo toolkit for building AI-powered knowledge widgets. The core philosophy is **Markdown-Driven Configuration**: an agent's identity, behavior, security rules, and knowledge are all defined using standard Markdown files.

### 🏗 Monorepo Structure
We use a Turbo-powered monorepo with the following components:

- **`packages/core`**: The headless logic. It handles Markdown parsing and AI provider routing. **Note: This package is strictly for Node.js environments.** It features 100% test coverage to ensure robust configuration parsing.
- **`packages/react`**: The UI layer. Provides a highly customizable, **controlled** chat widget. Fully tested with React Testing Library.
- **`apps/playground`**: A Vite-based SSR React application for real-time design and testing of the widget's UI, along with an Express server simulating the backend flow.

## 🛡️ Security First Architecture
To prevent API key exposure and prompt manipulation, **OpenKnowledge** uses a Server-to-Client bridge:
1.  **Server-Side**: The backend (e.g., Express) uses `@lucasformiga/openknowledge-core` to load configs and talk to LLMs securely.
2.  **Client-Side**: The frontend uses `@lucasformiga/openknowledge-react` to display the widget, but does NOT contain API keys or sensitive logic.

## 🛠 Shared Guidelines & Standards
- **Runtime**: Node.js (Core & Playground Server) / Browser (React & Playground Client).
- **Linting & Formatting**: [Biome](https://biomejs.dev/) is used.
- **Language**: TypeScript with ESM defaults.
- **Styling**: Tailwind CSS + Radix UI + Lucide React.
- **Testing**: Vitest with coverage. All core functionality and UI components require extensive, meaningful automated tests ensuring regressions are caught.

## 📐 Engineering Guidelines
To maintain a high-quality codebase, all developers and agents must adhere to these rules:

- **Avoid Barrel Files**: Import directly from the source files. Barrel files (index.ts files that only re-export) can lead to circular dependencies and negatively impact tree-shaking/bundle sizes.
- **Self-Documenting Code**: Avoid unnecessary code comments. The code should speak for itself. If it doesn't, refactor using **Clean Code**, **Clean Architecture**, and **SOLID** principles. Comments should only be used to explain "why" (complex business logic or constraints), never "what" the code is doing.
- **React Architecture**: 
  - Always follow the **Atomic Design** approach for component organization (Atoms, Molecules, Organisms).
  - Prioritize **reusable components** and maintain a strict separation of concerns.
  - Adhere to **Vercel React Best Practices** (performance, waterfalls, bundle size) and **Vercel Composition Patterns** (compound components over boolean props).

## 🧭 Project Router
- **[Playground App](./docs/projects/apps/playground.md)**: Testing design and the "simulated backend" flow.
- **[Core Package](./docs/projects/packages/core.md)**: The server-side engine, `createAgent` factory, and Markdown parser.
- **[React Package](./docs/projects/packages/react.md)**: The controlled UI components and `useWidgetMessages` hook.

---
*This file serves as the main entry point for any AI Agent working on this codebase. Always start here to understand the context before making changes.*
