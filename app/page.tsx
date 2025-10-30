import HeroSection from "@/components/HeroSection";
import MCPCapabilities from "@/components/MCPCapabilities";
import TechnologiesSection from "@/components/TechnologiesSection";
import DiscoverKaelux from "@/components/DiscoverKaelux";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with integrated Chat */}
      <HeroSection />
      
      {/* MCP Capabilities Section */}
      <MCPCapabilities />
      
      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Discover Kaelux */}
      <DiscoverKaelux />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
