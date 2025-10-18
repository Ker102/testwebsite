"use client";

import { Search, Code, Globe, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const capabilities = [
  {
    name: "GitMCP",
    icon: Code,
    description: "Access GitHub repositories, documentation, and code examples from any public repo",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    name: "Brave Search",
    icon: Search,
    description: "Real-time web search for current events, weather, news, and up-to-date information",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    name: "Firecrawl",
    icon: Globe,
    description: "Advanced web scraping for complex sites like Medium, Reddit, and Stack Overflow",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

export default function MCPCapabilities() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="capabilities-section" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <span className="text-purple-600 font-semibold text-sm">
              Powered by MCP Technology
            </span>
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            AI Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI assistant has access to powerful tools that provide real-time,
            accurate information
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.name}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 ${capability.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${capability.iconColor}`} />
                  </div>
                  {/* Animated ring */}
                  <div
                    className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.color} opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
                  {capability.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {capability.description}
                </p>

                {/* Hover indicator */}
                <div
                  className={`mt-6 flex items-center gap-2 text-sm font-semibold text-transparent bg-gradient-to-r ${capability.color} bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

