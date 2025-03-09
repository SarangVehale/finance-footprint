
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { 
  Book, 
  Code, 
  FileText, 
  HelpCircle, 
  Settings, 
  Shield,
  UserCircle,
  Server,
  Cpu,
  FileCode,
  TerminalSquare
} from "lucide-react";

import { NavItem } from "./documentation/components";
import { 
  OverviewContent,
  SystemContent,
  UserGuideContent,
  ApiReferenceContent,
  FileStructureContent,
  TechnicalContent,
  TroubleshootingContent,
  SecurityContent
} from "./documentation/components";

/**
 * SettingsDocumentation component
 * Displays comprehensive documentation with desktop sidebar and mobile tabs
 */
const SettingsDocumentation: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState("overview");
  const isMobile = window.innerWidth < 768;

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewContent />;
      case "system":
        return <SystemContent />;
      case "technical":
        return <TechnicalContent />;
      case "userGuide":
        return <UserGuideContent />;
      case "apiReference":
        return <ApiReferenceContent />;
      case "fileStructure":
        return <FileStructureContent />;
      case "troubleshooting":
        return <TroubleshootingContent />;
      case "security":
        return <SecurityContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <MobileLayout
      title="Documentation"
      showBackButton={true}
      onBackClick={() => window.history.back()}
    >
      <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)]">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 bg-card border-r border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Documentation
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Explore the Finance Footprint system</p>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="py-2">
              <NavItem
                icon={<HelpCircle className="h-5 w-5" />}
                label="Overview"
                isActive={activeSection === "overview"}
                onClick={() => handleNavClick("overview")}
              />
              <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="System Architecture"
                isActive={activeSection === "system"}
                onClick={() => handleNavClick("system")}
              />
              <NavItem
                icon={<UserCircle className="h-5 w-5" />}
                label="User Guide"
                isActive={activeSection === "userGuide"}
                onClick={() => handleNavClick("userGuide")}
              />
              <NavItem
                icon={<Server className="h-5 w-5" />}
                label="API Reference"
                isActive={activeSection === "apiReference"}
                onClick={() => handleNavClick("apiReference")}
              />
              <NavItem
                icon={<FileText className="h-5 w-5" />}
                label="File Structure"
                isActive={activeSection === "fileStructure"}
                onClick={() => handleNavClick("fileStructure")}
              />
              <NavItem
                icon={<FileCode className="h-5 w-5" />}
                label="Technical Details"
                isActive={activeSection === "technical"}
                onClick={() => handleNavClick("technical")}
              />
              <NavItem
                icon={<TerminalSquare className="h-5 w-5" />}
                label="Troubleshooting"
                isActive={activeSection === "troubleshooting"}
                onClick={() => handleNavClick("troubleshooting")}
              />
              <NavItem
                icon={<Shield className="h-5 w-5" />}
                label="Security"
                isActive={activeSection === "security"}
                onClick={() => handleNavClick("security")}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile Tabs */}
        <div className="md:hidden w-full p-2">
          <Tabs defaultValue="overview" value={activeSection} onValueChange={setActiveSection} className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="mb-4 flex w-max">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="userGuide">User Guide</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="apiReference">API</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6">
              {renderContent()}
            </div>
          </ScrollArea>
        </main>
      </div>
    </MobileLayout>
  );
};

export default SettingsDocumentation;
