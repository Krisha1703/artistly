import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

// ==========================
// 🧠 GET / CREATE MEMORY
// ==========================

export default function getSessionHistory(sessionId, sessions) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, new InMemoryChatMessageHistory());
  }
  return sessions.get(sessionId);
}