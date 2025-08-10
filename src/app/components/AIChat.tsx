"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, X } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // primeira mensagem de boas-vindas conforme idioma
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: `${t('chatbot.greeting')} ${t('chatbot.help')}` }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    if (open) {
      // foco no input ao abrir
      inputRef.current?.focus();
    }
  }, [messages, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
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
      const content: string = data?.message?.content || data?.response || t('chatbot.fallback');
      setMessages((m) => [...m, { role: "assistant", content }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: t('chatbot.error') as string }]);
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
          className="fixed bottom-5 right-5 z-50 rounded-full bg-red-600 hover:bg-red-700 text-white p-4 shadow-lg sm:bottom-6 sm:right-6"
          aria-label="Abrir chat IA"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full sm:bottom-5 sm:right-5 sm:left-auto sm:w-[92vw] sm:max-w-sm h-[75vh] sm:h-[70vh] bg-black/95 sm:bg-black/90 border-t sm:border border-white/10 rounded-t-2xl sm:rounded-xl backdrop-blur p-3 flex flex-col">
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
          <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 pr-1" aria-live="polite">
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
              <div className="flex gap-2 justify-start">
                <div className="mt-0.5 rounded-full p-1 bg-white/10">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="rounded-lg p-3 text-sm bg-white/5 text-white flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0ms]"></span>
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Sugestões rápidas */}
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { k: 'services', v: t('chatbot.options.services') },
              { k: 'info', v: t('chatbot.options.info') },
              { k: 'contact', v: t('chatbot.options.contact') },
            ].map((opt) => (
              <button
                key={opt.k}
                onClick={() => send(t(`chatbot.optionMessages.${opt.k}`) as string)}
                className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
              >
                {opt.v as string}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="mt-2 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:ring-2 focus:ring-red-600"
              placeholder={t('chatbot.help') as string}
              aria-label={t('chatbot.title') as string}
            />
            <button onClick={() => send()} disabled={loading} className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-3 rounded-lg" aria-label="Enviar mensagem">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
