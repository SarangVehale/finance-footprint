
import React from "react";
import { Link } from "react-router-dom";
import { Home, PieChart, Clock, Settings, FileText } from "lucide-react";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="animate-fade-in">{children}</div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-6">
        <NavLink to="/" icon={<Home size={24} />} label="Home" />
        <NavLink to="/analytics" icon={<PieChart size={24} />} label="Analytics" />
        <NavLink to="/history" icon={<Clock size={24} />} label="History" />
        <NavLink to="/notes" icon={<FileText size={24} />} label="Notes" />
        <NavLink to="/settings" icon={<Settings size={24} />} label="Settings" />
      </nav>
      <div className="h-safe-bottom bg-background" />
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
        isActive 
          ? "text-mint-500" 
          : "text-muted-foreground hover:text-mint-400"
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default MobileLayout;
