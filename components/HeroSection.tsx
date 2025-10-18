"use client";

import { Sparkles, Zap, Bot, ArrowDown } from "lucide-react";
import ChatInterface, { AuthButtons } from "./ChatInterface";

export default function HeroSection() {
  const scrollToCapabilities = () => {
    const capabilitiesSection = document.getElementById("capabilities-section");
    if (capabilitiesSection) {
      capabilitiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col px-6 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Auth Buttons - Top Right */}
      <div className="relative z-20 flex justify-end mb-4 animate-fade-in">
        <AuthButtons />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">
            Powered by Gemini 2.5 Flash
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
            Teremaailm AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto font-medium animate-fade-in animation-delay-200">
          AI Assistant with Real-Time Web Search, GitHub Access, and Advanced
          Web Scraping
        </p>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-400">
          Get accurate, up-to-date answers powered by MCP technology
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">
              Real-Time Data
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              GitHub Integration
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <Zap className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-semibold text-gray-700">
              Advanced Scraping
            </span>
          </div>
        </div>

        {/* Chat Input */}
        <div className="mt-12 max-w-3xl mx-auto w-full animate-fade-in animation-delay-800">
          <ChatInterface />
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <button
            onClick={scrollToCapabilities}
            className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <span className="text-sm font-medium">Explore capabilities</span>
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Extra bottom spacing */}
      <div className="h-16"></div>

      {/* Floating icons animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-purple-400 animate-pulse" />
        <Bot className="absolute top-1/3 right-1/4 w-8 h-8 text-blue-400 animate-bounce animation-delay-2000" />
        <Zap className="absolute bottom-1/3 left-1/3 w-6 h-6 text-pink-400 animate-pulse animation-delay-4000" />
      </div>
    </section>
  );
}

