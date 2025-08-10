"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Sou a IA da Vulcano. Pergunte sobre tecnologias, projetos e orçamentos." },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_MODEL_NAME || "llama3.2:3b-instruct",
          messages: [
            { role: "system", content: "Você é um assistente da agência Vulcano. Responda de forma objetiva e amigável." },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            userMsg,
          ],
        }),
      });
      const data = await res.json();
      const content: string = data?.message?.content || data?.response || "(sem resposta)";
      setMessages((m) => [...m, { role: "assistant", content }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: "Erro ao consultar a IA." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-red-600 hover:bg-red-700 text-white p-4 shadow-lg"
          aria-label="Abrir chat IA"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-sm h-[70vh] bg-black/90 border border-white/10 rounded-xl backdrop-blur p-3 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-white">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Vulcano • IA</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`mt-0.5 rounded-full p-1 ${m.role === "user" ? "bg-red-600" : "bg-white/10"}`}>
                    {m.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`rounded-lg p-3 text-sm ${m.role === "user" ? "bg-red-600 text-white" : "bg-white/5 text-white"}`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-white/60 text-sm">Gerando resposta...</div>
            )}
          </div>

          {/* Input */}
          <div className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Pergunte sobre projetos, tecnologias e orçamentos..."
            />
            <button onClick={send} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
