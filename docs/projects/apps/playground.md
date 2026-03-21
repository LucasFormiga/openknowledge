# 🎡 OpenKnowledge - Playground App (`apps/playground`)

The `playground` app is a developer-facing tool for designing, configuring, and testing the **OpenKnowledge** widget in real-time.

## 📁 Key Features
- **UI & Design Playground**: Real-time control of themes, colors, and languages.
- **Full SSR Backend Flow**: Demonstrates the secure **Server-to-Client bridge** using Express and Vite SSR. It connects to the actual `@miolab/openknowledge-core` on the backend.
- **Code Snippet Generation**: Automatically generates the correct React code and JSON configs for your design.

## 🧩 Architectural Nuances
- **Server-Side Agent Integration**: The playground runs an Express server (`server.ts`) which instantiates the OpenKnowledge core agent. It provides a `/api/chat` endpoint.
- **Client-Side Widget**: The browser application renders the React Widget and communicates with the backend, accurately mimicking a real-world integration. 
- **Controlled Interaction**: The playground uses `useWidgetMessages` to manage chat state locally before fetching from the backend.

## 🛠 Execution Flow
1. User types in the widget.
2. The client app adds the message to local state and sets `isProcessing(true)`.
3. An actual HTTP POST is made to `/api/chat`.
4. The Express backend uses `@miolab/openknowledge-core` to consult the LLM with the injected Markdown context.
5. The result is returned to the client and appended to the widget.
6. The client app sets `isProcessing(false)`.

---
*The playground's primary goal is to help you design the UI and verify the integration flow accurately with a real node server backend.*
