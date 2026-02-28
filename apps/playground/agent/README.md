# OpenKnowledge Example Configuration

This directory contains example Markdown files to configure your AI agent using `@openknowledge/core`.

## Directory Structure
```
agent-config/
├── behavior.md        # Agent identity, tone, and personality
├── security.md        # Strict rules and jailbreak prevention
├── knowledge/         # Local knowledge base (any number of .md files)
│   └── docs.md        # Individual documentation/data entries
└── skills/            # Specific skills and instructions (optional)
```

## How to use this in your project

1. **Setup your config directory**: 
   Copy this `agent-config` folder to your project's root or a dedicated `config/` directory.

2. **Initialize the router**:
   Use the `KnowledgeRouter.fromDir()` static method to automatically load all configurations.

```typescript
import { parseEnv, KnowledgeRouter } from '@openknowledge/core';

// 1. Parse your environment variables
const config = parseEnv(process.env);

// 2. Initialize the router from the directory
const router = await KnowledgeRouter.fromDir(config, './path/to/agent-config');

// 3. Ask a question
const response = await router.ask("How do I build a scalable app?");
console.log(response);
```

## Customizing your configuration

### Creating a Local Knowledge Base
- Simply add new `.md` files to the `knowledge/` directory. 
- Each file's content will be included in the agent's system prompt during initialization.
- **Tip**: Keep files focused and use clear headings (`# ` for titles) for better AI comprehension.

### Connecting to External Knowledge Bases
For external data (e.g., from Pinecone, Supabase, or a custom API), you can fetch the data manually and pass it to the `KnowledgeRouter` constructor:

```typescript
import { KnowledgeRouter } from '@openknowledge/core';

// 1. Fetch from your external source (Vector DB, CMS, etc.)
const externalSources = await myDatabase.getKnowledge("my-query");

// 2. Initialize manually
const router = new KnowledgeRouter({
  config,
  knowledge: { sources: externalSources },
  // Optional: load behavior/security manually if needed
});
```

## Developer Experience (DevEx)
This system is designed to let you adjust agent behavior without touching the code. Modify a Markdown file, restart your application, and the agent will immediately reflect the changes.
