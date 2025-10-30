"use client";

import { useEffect, useState } from "react";

const technologies = [
  {
    name: "Next.js",
    category: "Framework",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "from-black to-gray-700",
  },
  {
    name: "React",
    category: "Library",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "TypeScript",
    category: "Language",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "from-cyan-400 to-teal-500",
  },
  {
    name: "Google AI",
    category: "LLM",
    logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "Node.js",
    category: "Runtime",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-green-600 to-green-800",
  },
  {
    name: "Docker",
    category: "Container Platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "MongoDB",
    category: "Database",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Redis",
    category: "Cache & Sessions",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "from-red-500 to-red-700",
  },
  {
    name: "Cloudflare",
    category: "CDN & Tunneling",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "n8n",
    category: "Automation",
    logo: "https://n8n.io/favicon.svg",
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Git",
    category: "Version Control",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "from-orange-600 to-red-600",
  },
  {
    name: "GitHub",
    category: "Platform",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "from-gray-700 to-black",
  },
];

export default function TechnologiesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("technologies-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="technologies-section"
      className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 
            className="text-5xl font-black mb-4 gradient-text-primary hero-font"
          >
            Built With Modern Tech
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powered by cutting-edge technologies for the best performance and
            developer experience
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Background glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 blur-xl`}
              />

              {/* Content */}
              <div className="relative flex flex-col items-center">
                {/* Logo container with animation */}
                <div className="w-20 h-20 mb-4 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-12 h-12 object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='12'/%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Animated ring */}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 scale-100 group-hover:scale-110 transition-all duration-500`}
                  />
                </div>

                {/* Tech name */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 transition-all duration-300">
                  <span className="relative inline-block">
                    <span className="transition-opacity duration-300 group-hover:opacity-0">
                      {tech.name}
                    </span>
                    <span className="absolute inset-0 gradient-text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 hero-font">
                      {tech.name}
                    </span>
                  </span>
                </h3>

                {/* Category badge */}
                <span className="text-xs font-medium text-gray-500 px-3 py-1 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                  {tech.category}
                </span>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700 font-medium text-sm">
              All technologies are production-ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
