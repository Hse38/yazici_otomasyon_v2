"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "../contexts/ChatbotContext";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

const uiCopy = {
  tr: {
    fabAria: "Yazıcı Otomasyon asistanını aç",
    panelAria: "Yazıcı Otomasyon asistanı",
    title: "Yazıcı Otomasyon Asistanı",
    subtitle: "Ürün ve teknik yönlendirme",
    placeholder: "Ürün, teklif veya teknik konuda yazın…",
    close: "Sohbeti kapat",
  },
  en: {
    fabAria: "Open Yazıcı Otomasyon assistant",
    panelAria: "Yazıcı Otomasyon assistant",
    title: "Yazıcı Otomasyon Assistant",
    subtitle: "Products & technical guidance",
    placeholder: "Ask about products, quotes, or technical fit…",
    close: "Close chat",
  },
} as const;

export function Chatbot() {
  const {
    messages,
    isOpen,
    isLoading,
    openChat,
    closeChat,
    sendMessage,
    language,
  } = useChatbot();

  const labels = uiCopy[language];

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  // Keyboard navigation and focus trap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent<Document>) => {
      if (e.key === "Escape" && isOpen) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape as any);
      
      // Focus trap: keep focus within panel
      const panel = panelRef.current;
      if (panel) {
        const focusableElements = panel.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== "Tab") return;
          
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        };

        panel.addEventListener("keydown", handleTab as any);
        
        return () => {
          document.removeEventListener("keydown", handleEscape as any);
          panel.removeEventListener("keydown", handleTab as any);
        };
      }
      
      return () => {
        document.removeEventListener("keydown", handleEscape as any);
      };
    }
  }, [isOpen, closeChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  const handleSuggestion = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={openChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lilac text-white shadow-lg shadow-lilac/25 transition hover:bg-lilac/90 focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2 md:bottom-6 md:right-6"
        aria-label={labels.fabAria}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="fixed bottom-24 right-6 z-50 flex h-[calc(100vh-7rem)] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-lilac/15 bg-white shadow-2xl shadow-lilac/10 md:bottom-6 md:h-[520px] md:w-[380px]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label={labels.panelAria}
            aria-modal="true"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-lilac/15 bg-gradient-to-b from-soft-lavender/12 to-white px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-dark">{labels.title}</h3>
                  <p className="mt-0.5 text-xs text-dark-purple/80">{labels.subtitle}</p>
                </div>
                <button
                  onClick={closeChat}
                  className="ml-4 -mr-2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-lilac/50"
                  aria-label={labels.close}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "border border-gray-200 bg-white text-dark"
                          : "border-l-2 border-lilac/35 bg-slate-50 text-dark"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestion(suggestion)}
                              className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs text-dark transition hover:border-lilac/40 hover:bg-soft-lavender/15 focus:outline-none focus:ring-2 focus:ring-lilac/40"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl border-l-2 border-lilac/25 bg-slate-50 px-4 py-3">
                      <div className="flex space-x-1.5">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }} />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "150ms" }} />
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-lilac/10 bg-white p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={labels.placeholder}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-dark placeholder:text-gray-400 focus:border-lilac focus:outline-none focus:ring-2 focus:ring-lilac/35"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="rounded-lg bg-lilac px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-lilac/20 transition hover:bg-lilac/90 focus:outline-none focus:ring-2 focus:ring-lilac/45 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
