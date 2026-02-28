# Getting Started with OpenKnowledge
<!-- 
  HOW TO CREATE A LOCAL KNOWLEDGE BASE:
  1. Create a 'knowledge/' directory in your config root.
  2. Add any number of '.md' files inside it.
  3. Use '# ' for the title, and the rest as content.
  4. File names (e.g., 'getting-started.md') are used as IDs.
-->

Welcome to @openknowledge/core! This framework is designed to build type-safe, provider-agnostic AI agents.

## Core Features
- Markdown-driven configuration for Behavior, Security, and Knowledge.
- Support for OpenAI, Anthropic, and Google Gemini via TanStack AI.
- Strict security guardrails to prevent context leakage.
- Clean Architecture and SOLID design patterns for developer experience.

## Usage
To load this knowledge, use:
`const router = await KnowledgeRouter.fromDir(config, './path/to/config');`
