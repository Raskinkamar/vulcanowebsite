import { NextRequest } from "next/server";
import { buildSystemPrompt, formatContext, retrieve } from "@/src/lib/rag";

export const runtime = "nodejs";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body?.messages || [];
    const model: string = body?.model || process.env.MODEL_NAME || "llama3.2:3b-instruct";

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Missing messages array" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

    // RAG: recuperar contexto da base de conhecimento com base na última pergunta do usuário
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const contextChunks = lastUser ? await retrieve(lastUser.content, 4) : [];
    const contextText = contextChunks.length ? formatContext(contextChunks) : "";
    const system = buildSystemPrompt();

    const augmentedMessages = [
      { role: "system", content: system + (contextText ? `\n\nContexto:\n${contextText}` : "") },
      ...messages,
    ];

    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: augmentedMessages, stream: false }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return new Response(JSON.stringify({ error: "Upstream error", upstream: txt }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
