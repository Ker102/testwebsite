"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import MarkdownRenderer from "./MarkdownRenderer";
import { Sparkles, Send, Bot, User, Zap, Globe, Shield, LogOut, Chrome } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  onInputFocus?: () => void;
}

export default function ChatInterface({ onInputFocus }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { data: session } = useSession();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    logout();
    setMessages([]);
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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
    <div className="w-full">
      {/* Auth Buttons - Rendered separately in HeroSection */}
      <div className="hidden" id="auth-buttons">
        <div className="flex flex-col gap-3">
          {session ? (
            <div className="flex items-center gap-3 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-full px-5 py-2.5 shadow-lg">
              <Chrome className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-semibold text-sm">{session.user?.email}</span>
              <button onClick={() => signOut()} className="ml-2 p-1.5 rounded-full hover:bg-red-100">
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className="flex items-center gap-2 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-full px-5 py-2.5 shadow-lg">
              <Chrome className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-semibold text-sm">Sign in with Google</span>
            </button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 backdrop-blur-xl bg-green-50 border border-green-400 rounded-full px-5 py-2.5 shadow-lg">
              <Shield className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="text-green-700 font-semibold text-sm">Admin Access</span>
              <button onClick={handleLogout} className="ml-2 p-1.5 rounded-full hover:bg-red-100">
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ) : (
            <button onClick={() => router.push("/admin/login")} className="flex items-center gap-2 backdrop-blur-xl bg-amber-50 border border-amber-400 rounded-full px-5 py-2.5 shadow-lg">
              <Shield className="w-5 h-5 text-amber-600" />
              <span className="text-amber-700 font-semibold text-sm">Admin Login for AI</span>
            </button>
          )}
        </div>
      </div>

      {/* Chat Input - Rendered separately in HeroSection */}
      <form onSubmit={handleSubmit} className="relative group" id="chat-input-form">
        <div className="flex gap-3 items-end backdrop-blur-2xl bg-white/95 rounded-3xl p-4 border-2 border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500">
          
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-300 group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-blue-600 group-hover:animate-spin" />
          </div>

          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={onInputFocus}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask me anything... (Admin login required)"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-400/30 hover:bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 resize-none transition-all duration-300 min-h-[56px] max-h-[200px] font-medium"
              rows={1}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="group/btn relative flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 min-h-[56px] min-w-[56px]"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline text-sm">Sending</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                <span className="hidden sm:inline text-sm">Send</span>
              </>
            )}
          </button>
        </div>
        
        <div className="absolute -top-8 left-4 text-gray-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </form>

      {/* Messages Container */}
      {messages.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bot className="w-6 h-6 text-purple-600" />
              Conversation
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "justify-end flex-row-reverse" : "justify-start"
                  } animate-slide-up group`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-gradient-to-br from-purple-500 to-pink-600 text-white"
                    }`}
                  >
                    {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>

                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px] font-medium">
                        {message.content}
                      </p>
                    ) : (
                      <div className="text-[15px]">
                        <MarkdownRenderer content={message.content} isAuthenticated={true} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 animate-slide-up">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg animate-pulse">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">AI is thinking</span>
                      <Globe className="w-4 h-4 text-blue-400 animate-pulse ml-2" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export auth buttons and input as separate components for use in HeroSection
export function AuthButtons() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {session ? (
        <div className="flex items-center gap-3 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
          <Chrome className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700 font-semibold text-sm">{session.user?.email}</span>
          <button onClick={() => signOut()} className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200">
            <LogOut className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")} className="flex items-center gap-2 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
          <Chrome className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700 font-semibold text-sm">Sign in with Google</span>
        </button>
      )}

      {isAuthenticated ? (
        <div className="flex items-center gap-3 backdrop-blur-xl bg-green-50/90 border border-green-400 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
          <Shield className="w-5 h-5 text-green-600 animate-pulse" />
          <span className="text-green-700 font-semibold text-sm">Admin Access</span>
          <button onClick={handleLogout} className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200">
            <LogOut className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button onClick={() => router.push("/admin/login")} className="flex items-center gap-2 backdrop-blur-xl bg-amber-50/90 border border-amber-400 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300">
          <Shield className="w-5 h-5 text-amber-600" />
          <span className="text-amber-700 font-semibold text-sm">Admin Login for AI</span>
        </button>
      )}
    </div>
  );
}

