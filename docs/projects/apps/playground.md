# 🎡 OpenKnowledge - Playground App (`apps/playground`)

The `playground` app is a developer-facing tool for designing, configuring, and testing the **OpenKnowledge** widget in real-time.

## 📁 Key Features
- **UI & Design Playground**: Real-time control of themes, colors, and languages.
- **Simulated Backend Flow**: Demonstrates the secure **Server-to-Client bridge**.
- **Code Snippet Generation**: Automatically generates the correct React code for your design.

## 🧩 Architectural Nuances
- **No Local Markdown Reading**: To be production-ready, browser-side Markdown reading has been replaced with a simulation. The playground shows how a developer's host app would handle message flows and state.
- **Controlled Interaction**: The playground uses `useWidgetMessages` to manage chat state, just as a developer would in a real application.

## 🛠 Simulated Flow
In `App.tsx`, the `handleSendMessage` function simulates an API call:
1. Adds the user message via `appendMessage`.
2. Sets `setIsProcessing(true)`.
3. Waits for a mock delay (simulating a backend/LLM call).
4. Appends a simulated assistant response.
5. Sets `setIsProcessing(false)`.

---
*The playground's primary goal is to help you design the UI and verify the integration flow without exposing any backend secrets.*
