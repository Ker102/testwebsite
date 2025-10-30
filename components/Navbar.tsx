"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Home, Code, Briefcase, Mail, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "Capabilities", href: "#capabilities", icon: Code },
  { label: "Technologies", href: "#technologies", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navItems.map((item) => {
        const id = item.href.replace("#", "");
        const element = document.getElementById(
          id === "hero" ? "hero-section" :
          id === "capabilities" ? "capabilities-section" :
          id === "technologies" ? "technologies-section" :
          id === "contact" ? "contact-section" : id
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.label,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find(
        (section) => section && section.top <= 100 && section.bottom > 100
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const elementId = 
      id === "hero" ? "hero-section" :
      id === "capabilities" ? "capabilities-section" :
      id === "technologies" ? "technologies-section" :
      id === "contact" ? "contact-section" : id;
    
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 backdrop-blur-xl bg-white/70 shadow-lg shadow-gray-200/50"
            : "py-5 backdrop-blur-md bg-white/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => scrollToSection("#hero")}
            >
              <Image
                src="/logo.svg"
                alt="Kaelocs logo"
                width={40}
                height={40}
                priority
                className="w-10 h-10 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className={`font-black gradient-text-neutral transition-all duration-300 hero-font ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                Kaelocs
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group ${
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900 font-medium"
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full shadow-inner" />
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <Icon
                      className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-900"
                      } ${isActive ? "rotate-0" : "group-hover:rotate-12"}`}
                    />
                    <span className="relative z-10">{item.label}</span>

                    {/* Animated underline */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900 font-semibold shadow-inner"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
