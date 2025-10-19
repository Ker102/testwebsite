"use client";

import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const contactMethods = [
  {
    name: "Gmail",
    handle: "your.email@gmail.com",
    url: "mailto:your.email@gmail.com",
    icon: Mail,
    color: "text-red-500",
    hoverColor: "hover:text-red-600",
    bgColor: "bg-red-500",
  },
  {
    name: "LinkedIn",
    handle: "yourprofile",
    url: "https://www.linkedin.com/in/yourprofile",
    icon: Linkedin,
    color: "text-blue-600",
    hoverColor: "hover:text-blue-700",
    bgColor: "bg-blue-600",
  },
  {
    name: "GitHub",
    handle: "yourusername",
    url: "https://github.com/yourusername",
    icon: Github,
    color: "text-gray-800",
    hoverColor: "hover:text-gray-900",
    bgColor: "bg-gray-800",
  },
  {
    name: "Instagram",
    handle: "@yourhandle",
    url: "https://www.instagram.com/yourhandle",
    icon: Instagram,
    color: "text-pink-600",
    hoverColor: "hover:text-pink-700",
    bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500",
  },
];

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    const section = document.getElementById("contact-section");
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
      id="contact-section"
      className="py-20 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Original gradient: from-gray-800 to-gray-600 */}
          <h2 
            className="text-5xl font-black mb-4"
            style={{
              background: "linear-gradient(90deg, rgba(0, 242, 255, 1) 0%, rgba(41, 41, 179, 1) 35%, rgba(27, 28, 33, 1) 65%, rgba(0, 212, 255, 1) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Feel free to reach out through any of these channels
          </p>
        </div>

        {/* Social Icons */}
        <div
          className={`flex justify-center items-center gap-6 mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div key={method.name} className="relative group">
                <a
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-gray-200 shadow-sm transition-all duration-300 ${method.hoverColor} hover:border-transparent hover:shadow-lg hover:scale-110 hover:-translate-y-1`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Animated background glow */}
                  <div
                    className={`absolute inset-0 rounded-full ${method.bgColor} opacity-0 group-hover:opacity-20 transition-all duration-300 blur-sm`}
                  />
                  
                  {/* Pulse ring on hover */}
                  <div
                    className={`absolute inset-0 rounded-full ${method.bgColor} transition-all duration-500 ${
                      isHovered ? "animate-ping opacity-20" : "opacity-0"
                    }`}
                  />
                  
                  {/* Icon */}
                  <IconComponent 
                    className={`w-6 h-6 relative z-10 ${method.color} transition-all duration-300 ${
                      isHovered ? "rotate-12 scale-110" : ""
                    }`}
                  />
                </a>

                {/* Tooltip */}
                <div
                  className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isHovered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                >
                  {method.name}
                  {/* Tooltip arrow */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated divider */}
        <div
          className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-300" />
        </div>

        {/* Footer text */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700 font-medium text-sm">
              Usually responds within 24 hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

