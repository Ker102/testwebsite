"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DarkVeil from "./DarkVeil";
import { Sparkles, Send, Bot, User, Zap, Globe } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check authentication before sending message
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Log if web search was used
        if (data.usedWebSearch) {
          console.log("🌐 Response includes web search results");
        }
      } else {
        const errorMessage: Message = {
          role: "assistant",
          content: `Error: ${data.error || "Failed to get response"}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Failed to connect to the server. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Animated Background */}
      <DarkVeil />
      
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-6 relative z-10">
      {/* Header */}
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative animate-pulse">
            <Sparkles className="w-10 h-10 text-purple-400" />
            <div className="absolute inset-0 blur-xl bg-purple-500/50 animate-pulse"></div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl tracking-tight hover:scale-105 transition-transform duration-300">
            Gemini AI
          </h1>
          <div className="relative animate-pulse animation-delay-2000">
            <Zap className="w-10 h-10 text-pink-400" />
            <div className="absolute inset-0 blur-xl bg-pink-500/50 animate-pulse"></div>
          </div>
        </div>
        <p className="text-base text-white/80 font-semibold tracking-wide flex items-center justify-center gap-2">
          <Bot className="w-4 h-4 animate-bounce" />
          Powered by Gemini 2.5 Flash
          <Zap className="w-4 h-4 animate-bounce animation-delay-2000" />
        </p>
      </div>

      {/* Messages Container with Glass Effect */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 scroll-smooth px-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6 animate-fade-in backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/20 hover:border-white/30 transition-all duration-500 hover:scale-105">
              <div className="relative inline-block">
                <Sparkles className="w-20 h-20 text-purple-300 animate-pulse" />
                <div className="absolute inset-0 blur-2xl bg-purple-500/30 animate-pulse"></div>
              </div>
              <h2 className="text-4xl font-black text-white drop-shadow-lg">
                Start a Conversation
              </h2>
              <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
                Ask me anything and I'll help you with the power of AI!
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Bot className="w-6 h-6 text-blue-400 animate-bounce" />
                <Zap className="w-6 h-6 text-purple-400 animate-bounce animation-delay-2000" />
                <Sparkles className="w-6 h-6 text-pink-400 animate-bounce animation-delay-4000" />
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end flex-row-reverse" : "justify-start"
              } animate-slide-up group`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Avatar Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    : "bg-gradient-to-br from-purple-500 to-pink-600 text-white animate-pulse"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] backdrop-blur-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-blue-400/30"
                    : "bg-white/15 text-white border border-white/30"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px] font-medium">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start gap-3 animate-slide-up">
            {/* AI Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg animate-pulse">
              <Bot className="w-5 h-5 text-white" />
            </div>
            
            {/* Loading Bubble */}
            <div className="backdrop-blur-sm bg-white/15 border border-white/30 rounded-2xl px-6 py-4 shadow-xl">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
                <div className="flex space-x-1.5">
                  <div
                    className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-white/70 text-sm font-medium">AI is thinking</span>
                <Globe className="w-4 h-4 text-blue-400 animate-pulse ml-2" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Ultra-Modern Glass Effect */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="flex gap-3 items-end backdrop-blur-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl p-4 border-2 border-white/20 shadow-2xl hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          
          {/* Sparkles Icon */}
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-purple-300 group-hover:animate-spin" />
          </div>

          {/* Input Field */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask me anything..."
              className="w-full px-5 py-4 rounded-2xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/30 resize-none transition-all duration-300 backdrop-blur-sm min-h-[56px] max-h-[200px] font-medium hover:bg-white/15 focus:bg-white/15"
              rows={1}
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="group/btn relative px-7 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95 min-h-[56px] border-2 border-white/30 overflow-hidden"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 -top-full group-hover/btn:top-0 bg-gradient-to-b from-white/30 to-transparent transition-all duration-500"></div>
            
            <span className="relative flex items-center gap-2">
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Sending</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </span>
          </button>
        </div>
        
        {/* Floating Hint */}
        <div className="absolute -top-8 left-4 text-white/40 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </form>
      </div>
    </div>
  );
}

