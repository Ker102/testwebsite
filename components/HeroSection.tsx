"use client";

import { Sparkles, Zap, Bot, ArrowDown } from "lucide-react";
import ChatInterface, { AuthButtons } from "./ChatInterface";
import FloatingShapes from "./FloatingShapes";

export default function HeroSection() {
  const scrollToCapabilities = () => {
    const capabilitiesSection = document.getElementById("capabilities-section");
    if (capabilitiesSection) {
      capabilitiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col px-6 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden hero-font">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Floating 3D Shapes */}
      <FloatingShapes />

      {/* Auth Buttons - Top Right */}
      <div className="relative z-20 flex justify-end mb-4 animate-fade-in">
        <AuthButtons />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
        {/* Badge */}
        <div className="mx-auto inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 animate-fade-in">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm font-semibold text-gray-700">
            A Kaelux Project
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 animate-fade-in">
          <span className="gradient-text-primary drop-shadow-2xl block md:inline">
            Live research intelligence
          </span>{" "}
          <span className="text-gray-900">for fast, verifiable answers</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium animate-fade-in animation-delay-200">
          Kaelocs keeps every brief grounded in fresh web intel, GitHub context, and structured scrapes without leaving the conversation—ask, validate, and export findings inside one streamlined workspace powered by MCP automations.
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-sm">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">
              Real-Time Data
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-sm">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              GitHub Integration
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-sm">
            <Zap className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-semibold text-gray-700">
              Advanced Scraping
            </span>
          </div>
        </div>

        {/* Chat Input */}
        <div className="mt-10 max-w-3xl mx-auto w-full animate-fade-in animation-delay-800">
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
