
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the NavItem component
 */
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

/**
 * Navigation item component for the documentation sidebar
 * Responsive design for both desktop and mobile viewing
 */
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center space-x-3 w-full px-3 py-2.5 text-left rounded-md transition-colors",
      isActive 
        ? "bg-accent text-accent-foreground font-medium" 
        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
    )}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="font-medium truncate">{label}</span>
  </button>
);

export default NavItem;
