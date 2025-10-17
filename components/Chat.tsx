"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import DarkVeil from "./DarkVeil";
import { Sparkles, Send, Bot, User, Zap, Globe, Shield, LogOut, Chrome } from "lucide-react";
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
  
  // User authentication (Google)
  const { data: session, status } = useSession();
  
  // Admin authentication (for LLM access)
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
    <div className={`relative flex flex-col h-screen transition-colors duration-500 ${isAuthenticated ? 'bg-white' : 'bg-transparent'}`}>
      {/* Animated Background - Only show when not authenticated */}
      {!isAuthenticated && <DarkVeil />}
      
      {/* Authentication Status Indicators */}
      <div className="absolute top-4 right-4 z-20 animate-fade-in flex flex-col gap-3">
        {/* User Authentication (Google) */}
        {session ? (
          <div className="flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-400 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <Chrome className="w-5 h-5 text-blue-600" />
              <div className="absolute inset-0 blur-sm bg-blue-500/30"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-700 font-semibold text-xs tracking-wide">
                {session.user?.email}
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200 group-hover:scale-110"
              title="Sign out"
            >
              <LogOut className="w-4 h-4 text-red-500 hover:text-red-600" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-white/80 to-blue-50/80 border border-blue-400/40 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Chrome className="w-5 h-5 text-blue-500" />
            <span className="text-blue-700 font-semibold text-sm tracking-wide">Sign in with Google</span>
          </button>
        )}

        {/* Admin Authentication (for LLM Access) */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-full px-5 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <Shield className="w-5 h-5 text-green-600 animate-pulse" />
              <div className="absolute inset-0 blur-sm bg-green-500/30 animate-pulse"></div>
            </div>
            <span className="text-green-700 font-semibold text-sm tracking-wide">Admin Access</span>
            <button
              onClick={handleLogout}
              className="ml-2 p-1.5 rounded-full hover:bg-red-100 transition-all duration-200 group-hover:scale-110"
              title="Logout admin"
            >
              <LogOut className="w-4 h-4 text-red-500 hover:text-red-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 rounded-full px-5 py-2.5 shadow-lg hover:shadow-amber-500/30 transition-all duration-300 cursor-pointer" onClick={() => router.push("/admin/login")}>
            <div className="relative">
              <Shield className="w-5 h-5 text-amber-300" />
              <div className="absolute inset-0 blur-md bg-amber-400/50"></div>
            </div>
            <span className="text-amber-200 font-semibold text-sm tracking-wide">Admin Login for AI</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-6 relative z-10">
      {/* Header */}
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative animate-pulse">
            <Sparkles className={`w-10 h-10 ${isAuthenticated ? 'text-cyan-500' : 'text-cyan-400'}`} />
            <div className="absolute inset-0 blur-xl bg-cyan-500/50 animate-pulse"></div>
          </div>
          <h1 className={`text-6xl font-black bg-gradient-to-r ${isAuthenticated ? 'from-cyan-600 via-blue-600 to-indigo-600' : 'from-cyan-300 via-blue-300 to-indigo-300'} bg-clip-text text-transparent drop-shadow-2xl tracking-tight hover:scale-105 transition-transform duration-300`}>
            Teremaailm AI
          </h1>
          <div className="relative animate-pulse animation-delay-2000">
            <Zap className={`w-10 h-10 ${isAuthenticated ? 'text-indigo-500' : 'text-indigo-400'}`} />
            <div className="absolute inset-0 blur-xl bg-indigo-500/50 animate-pulse"></div>
          </div>
        </div>
        <p className={`text-base ${isAuthenticated ? 'text-gray-600' : 'text-white/80'} font-semibold tracking-wide flex items-center justify-center gap-2`}>
          <Bot className="w-4 h-4 animate-bounce" />
          Powered by Gemini 2.5 Flash
          <Zap className="w-4 h-4 animate-bounce animation-delay-2000" />
        </p>
      </div>

      {/* Messages Container with Glass Effect */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 scroll-smooth px-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className={`text-center space-y-6 animate-fade-in backdrop-blur-sm ${isAuthenticated ? 'bg-gray-50 border-gray-200 hover:border-gray-300' : 'bg-white/5 border-white/20 hover:border-white/30'} rounded-3xl p-12 border transition-all duration-500 hover:scale-105`}>
              <div className="relative inline-block">
                <Sparkles className={`w-20 h-20 ${isAuthenticated ? 'text-cyan-500' : 'text-purple-300'} animate-pulse`} />
                <div className={`absolute inset-0 blur-2xl ${isAuthenticated ? 'bg-cyan-500/30' : 'bg-purple-500/30'} animate-pulse`}></div>
              </div>
              <h2 className={`text-4xl font-black ${isAuthenticated ? 'text-gray-800' : 'text-white'} drop-shadow-lg`}>
                Start a Conversation
              </h2>
              <p className={`${isAuthenticated ? 'text-gray-600' : 'text-white/70'} text-lg max-w-md mx-auto leading-relaxed`}>
                Ask me anything and I'll help you with the power of AI!
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Bot className={`w-6 h-6 ${isAuthenticated ? 'text-blue-500' : 'text-blue-400'} animate-bounce`} />
                <Zap className={`w-6 h-6 ${isAuthenticated ? 'text-cyan-500' : 'text-purple-400'} animate-bounce animation-delay-2000`} />
                <Sparkles className={`w-6 h-6 ${isAuthenticated ? 'text-indigo-500' : 'text-pink-400'} animate-bounce animation-delay-4000`} />
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
                    : isAuthenticated 
                      ? "bg-gray-100 text-gray-800 border border-gray-200" 
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
            <div className={`backdrop-blur-sm ${isAuthenticated ? 'bg-gray-100 border-gray-200' : 'bg-white/15 border-white/30'} rounded-2xl px-6 py-4 shadow-xl`}>
              <div className="flex items-center space-x-2.5">
                <Sparkles className={`w-4 h-4 ${isAuthenticated ? 'text-cyan-500' : 'text-purple-300'} animate-spin`} />
                <div className="flex space-x-1.5">
                  <div
                    className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce shadow-lg"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className={`w-2.5 h-2.5 ${isAuthenticated ? 'bg-cyan-400' : 'bg-purple-400'} rounded-full animate-bounce shadow-lg`}
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className={`w-2.5 h-2.5 ${isAuthenticated ? 'bg-indigo-400' : 'bg-pink-400'} rounded-full animate-bounce shadow-lg`}
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className={`${isAuthenticated ? 'text-gray-600' : 'text-white/70'} text-sm font-medium`}>AI is thinking</span>
                <Globe className="w-4 h-4 text-blue-400 animate-pulse ml-2" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form with Ultra-Modern Glass Effect */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`flex gap-3 items-end backdrop-blur-2xl ${isAuthenticated ? 'bg-gradient-to-r from-gray-100 via-white to-gray-100 border-gray-300 hover:border-gray-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-white/20 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]'} rounded-3xl p-4 border-2 shadow-2xl transition-all duration-500`}>
          
          {/* Sparkles Icon */}
          <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl ${isAuthenticated ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-gray-300' : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-white/20'} border group-hover:scale-110 transition-transform duration-300`}>
            <Sparkles className={`w-6 h-6 ${isAuthenticated ? 'text-cyan-500' : 'text-purple-300'} group-hover:animate-spin`} />
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
              className={`w-full px-5 py-4 rounded-2xl border-2 ${isAuthenticated ? 'border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-400/30 hover:bg-gray-50 focus:bg-white' : 'border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-purple-400/60 focus:ring-purple-400/30 hover:bg-white/15 focus:bg-white/15'} focus:outline-none focus:ring-2 resize-none transition-all duration-300 backdrop-blur-sm min-h-[56px] max-h-[200px] font-medium`}
              rows={1}
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`group/btn relative flex items-center justify-center gap-2 px-6 py-4 ${isAuthenticated ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400' : 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-white/30'} rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 min-h-[56px] min-w-[56px] border backdrop-blur-sm`}
          >
            {isLoading ? (
              <>
                <Sparkles className={`w-5 h-5 animate-spin ${isAuthenticated ? 'text-cyan-500' : 'text-purple-300'}`} />
                <span className="hidden sm:inline text-sm">Sending</span>
              </>
            ) : (
              <>
                <Send className={`w-5 h-5 ${isAuthenticated ? 'text-blue-500' : 'text-blue-300'} group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300`} />
                <span className="hidden sm:inline text-sm">Send</span>
              </>
            )}
          </button>
        </div>
        
        {/* Floating Hint */}
        <div className={`absolute -top-8 left-4 ${isAuthenticated ? 'text-gray-400' : 'text-white/40'} text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1`}>
          <Zap className="w-3 h-3" />
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </form>
      </div>
    </div>
  );
}

