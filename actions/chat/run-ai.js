import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

export async function runAI({ message, context, history, sessionId }) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
  });

  const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an artist booking assistant.

You must follow STRICT OUTPUT RULES:

-------------------------------------

CASE 1: If user wants to FIND / SEARCH / EXPLORE artists
→ RETURN ONLY JSON (NO TEXT):
{{
  "type": "redirect",
  "filters": {{
    "search": "",
    "category": "",
    "location": "",
    "budgetMin": "",
    "budgetMax": "",
    "rating": ""
  }}
}}

-------------------------------------

CASE 2: If user wants RECOMMENDATIONS
→ RETURN ONLY JSON (NO TEXT):
{{
  "type": "recommendation",
  "recommendations": [
    {{
      "name": "",
      "category": "",
      "location": "",
      "feeRange": "",
      "rating": "",
      "why": ""
    }}
  ]
}}

-------------------------------------

CASE 3: If user asks GENERAL QUESTION
→ RETURN ONLY TEXT (NO JSON)

-------------------------------------

STRICT RULES:
- NEVER return TEXT + JSON together
- NEVER explain JSON
- NEVER add sentences before or after JSON
- Output must be EITHER:
  → pure JSON
  → OR pure text

-------------------------------------

Context:
{context}`
      ],
      ["human", "{question}"],
    ]);

  const chain = new RunnableWithMessageHistory({
    runnable: prompt.pipe(model),
    getMessageHistory: async () => history,
    inputMessagesKey: "question",
    historyMessagesKey: "history",
  });

  const response = await chain.invoke(
    {
      question: message,
      context: JSON.stringify(context),
    },
    { configurable: { sessionId } }
  );

  return response.content.trim();
}