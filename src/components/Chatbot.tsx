"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "../contexts/ChatbotContext";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

const uiCopy = {
  tr: {
    whatsappAria: "WhatsApp ile yazın",
    fabAria: "Yazıcı Otomasyon asistanını aç",
    panelAria: "Yazıcı Otomasyon asistanı",
    title: "Yazıcı Otomasyon Asistanı",
    subtitle: "Ürün ve teknik yönlendirme",
    placeholder: "Ürün, teklif veya teknik konuda yazın…",
    close: "Sohbeti kapat",
  },
  en: {
    whatsappAria: "Message us on WhatsApp",
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
      {/* WhatsApp (üst) + sohbet FAB — dikey, bitişik */}
      <motion.div
        className={`fixed bottom-[5.75rem] right-4 z-50 flex flex-col items-center gap-2.5 md:bottom-6 md:right-6 ${isOpen ? "pointer-events-none" : ""}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 12 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <a
          href="https://wa.me/905530568939"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={labels.whatsappAria}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
        <motion.button
          type="button"
          onClick={openChat}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lilac text-white shadow-lg shadow-lilac/25 transition hover:bg-lilac/90 focus:outline-none focus:ring-2 focus:ring-lilac/50 focus:ring-offset-2"
          aria-label={labels.fabAria}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="fixed bottom-[15rem] right-4 z-50 flex h-[calc(100vh-8.5rem)] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-lilac/15 bg-white shadow-2xl shadow-lilac/10 md:bottom-40 md:right-6 md:h-[520px] md:w-[380px]"
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
