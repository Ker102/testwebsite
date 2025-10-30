"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Home, Code, Briefcase, Mail, Menu, X } from "lucide-react";
import { AuthButtons } from "./ChatInterface";

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
          isScrolled ? "py-3 bg-transparent" : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-[1100px] lg:max-w-6xl xl:max-w-7xl mx-auto px-3 md:px-6">
          <div className="glass-surface">
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-3 rounded-full px-2 py-1 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                onClick={() => scrollToSection("#hero")}
                aria-label="Back to top"
              >
                <div className="relative w-12 h-12 rounded-3xl overflow-hidden bg-white/65 border border-white/80 shadow-lg shadow-indigo-500/30">
                  <Image
                    src="/logo.png"
                    alt="Kaelocs logo"
                    fill
                    sizes="48px"
                    priority
                    className="object-contain"
                  />
                </div>
                <span className="font-black gradient-text-neutral hero-font text-lg md:text-2xl tracking-tight">
                  Kaelocs
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="glass-nav-links">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`glass-nav-link ${isActive ? "is-active" : ""}`}
                      style={{ transitionDelay: `${index * 60}ms` }}
                    >
                      <Icon className="nav-icon" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="hidden md:flex items-center gap-3">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden glass-icon-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
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
          <div className="px-4 pt-4 pb-6 space-y-3">
            <div className="glass-mobile-panel">
              <AuthButtons />
            </div>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.label;

              return (
                <div key={item.label} className="glass-mobile-panel">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`glass-nav-link w-full justify-between ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="nav-icon" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70">
                      Go
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
