
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
 */
const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center space-x-3 w-full px-4 py-3 text-left",
      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default NavItem;
