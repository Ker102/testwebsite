"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import MarkdownRenderer from "./MarkdownRenderer";
import { Loader2, Send, Bot, User, Globe, Shield, LogOut, Chrome } from "lucide-react";
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
      <form onSubmit={handleSubmit} className="relative" id="chat-input-form">
        <div className="chat-shell group flex flex-col gap-3 rounded-[18px] border border-white/70 bg-white/95 backdrop-blur-xl p-3 sm:p-4 shadow-[0_16px_36px_-18px_rgba(79,70,229,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-20px_rgba(56,189,248,0.4)] focus-within:border-sky-200 focus-within:bg-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex-1 w-full rounded-xl border border-white/80 bg-white px-3 sm:px-4 py-2 transition-colors duration-300 focus-within:border-sky-200 focus-within:bg-white">
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
                placeholder="What brief can I help you validate?"
                className="w-full bg-transparent px-1 py-1 text-base text-gray-800 placeholder-gray-400 font-medium leading-relaxed focus:outline-none focus:ring-0 resize-none transition-all duration-300 min-h-[42px] max-h-[180px]"
                rows={1}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="group/btn relative flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 min-h-[44px]"
            >
              <span
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Sending</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-2 text-xs text-gray-500/80 sm:flex-row sm:items-center sm:justify-between px-1 pt-1">
            <div className="flex items-center gap-2 transition-all duration-300 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100">
              <span className="gradient-bar inline-flex h-1 w-10 rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400" />
              <span>Press Enter to send · Shift+Enter adds a new line</span>
            </div>
            <span className="hidden sm:inline text-[11px] text-gray-400 transition-colors duration-300 group-focus-within:text-gray-500">
              Conversations stay local to your session.
            </span>
          </div>
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-lg">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-end gap-1.5">
                        <span className="typing-bar" />
                        <span className="typing-bar" />
                        <span className="typing-bar" />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">Composing fresh results…</span>
                      <Globe className="w-4 h-4 text-sky-500/90 animate-pulse" />
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

  const baseButton =
    "flex items-center gap-2 rounded-full px-4 py-2 border text-sm transition-all duration-300 shadow-lg hover:shadow-xl";
  const glassBase =
    "backdrop-blur-2xl bg-white/60 border-white/60 hover:bg-white/70";
  const accentBase =
    "backdrop-blur-2xl border-white/60 bg-white/50 hover:bg-white/70";

  return (
    <div className="flex flex-col md:flex-row gap-3">
      {session ? (
        <div
          className={`${baseButton} ${glassBase}`}
        >
          <Chrome className="w-5 h-5 text-blue-600" />
          <span className="text-gray-800 font-semibold text-sm">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className={`${baseButton} ${glassBase}`}
        >
          <Chrome className="w-5 h-5 text-blue-500" />
          <span className="text-gray-800 font-semibold text-sm">
            Sign in with Google
          </span>
        </button>
      )}

      {isAuthenticated ? (
        <div
          className={`${baseButton} ${accentBase} border-emerald-300/60`}
        >
          <Shield className="w-5 h-5 text-green-600 animate-pulse" />
          <span className="text-emerald-700 font-semibold text-sm">
            Admin Access
          </span>
          <button
            onClick={handleLogout}
            className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push("/admin/login")}
          className={`${baseButton} ${accentBase} border-amber-300/70`}
        >
          <Shield className="w-5 h-5 text-amber-600" />
          <span className="text-amber-700 font-semibold text-sm">
            Admin Login for AI
          </span>
        </button>
      )}
    </div>
  );
}
