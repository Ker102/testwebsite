import Chat from "@/components/Chat";
import HeroSection from "@/components/HeroSection";
import MCPCapabilities from "@/components/MCPCapabilities";
import TechnologiesSection from "@/components/TechnologiesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* MCP Capabilities Section */}
      <MCPCapabilities />
      
      {/* Technologies Section */}
      <TechnologiesSection />
      
      {/* Chat Interface */}
      <div id="chat-section" className="min-h-screen">
        <Chat />
      </div>
    </div>
  );
}
