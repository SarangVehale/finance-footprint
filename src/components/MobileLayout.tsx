
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PieChart, Clock, Settings, FileText } from "lucide-react";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  leftIcon?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, title, leftIcon }) => {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <div className="h-safe-top bg-background" />
      {(title || leftIcon) && (
        <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center h-14 px-4">
            {leftIcon && (
              <div className="mr-2">
                {leftIcon}
              </div>
            )}
            {title && (
              <h1 className="text-lg font-medium">{title}</h1>
            )}
          </div>
        </header>
      )}
      <main className="flex-1 overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <div className="animate-fade-in">{children}</div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-2 sm:px-6 pb-safe z-40 rounded-t-2xl shadow-sm">
        <NavLink to="/home" icon={<Home className="w-5 h-5 sm:w-6 sm:h-6" />} label="Home" />
        <NavLink to="/analytics" icon={<PieChart className="w-5 h-5 sm:w-6 sm:h-6" />} label="Analytics" />
        <NavLink to="/history" icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />} label="History" />
        <NavLink to="/notes" icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />} label="Notes" />
        <NavLink to="/settings" icon={<Settings className="w-5 h-5 sm:w-6 sm:h-6" />} label="Settings" />
      </nav>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 rounded-lg p-2 hover:bg-accent/50 ${
        isActive 
          ? "text-mint-500 scale-105" 
          : "text-muted-foreground hover:text-mint-400"
      }`}
    >
      <div className={`transition-transform duration-300 ${isActive ? "animate-bounce-gentle" : ""}`}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default MobileLayout;
