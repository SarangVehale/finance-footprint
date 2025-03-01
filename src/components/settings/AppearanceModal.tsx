
import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";

interface AppearanceModalProps {
  theme: string | undefined;
  handleThemeChange: (theme: "light" | "dark" | "system") => void;
}

const AppearanceModal: React.FC<AppearanceModalProps> = ({ 
  theme, 
  handleThemeChange 
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <button
        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
          theme === "light"
            ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
        onClick={() => handleThemeChange("light")}
      >
        <Sun size={20} className="sm:hidden animate-spin-slow" />
        <Sun size={24} className="hidden sm:block animate-spin-slow" />
        <span className="mt-2 text-xs sm:text-sm">Light</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
          theme === "dark"
            ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
        onClick={() => handleThemeChange("dark")}
      >
        <Moon size={20} className="sm:hidden animate-float-slow" />
        <Moon size={24} className="hidden sm:block animate-float-slow" />
        <span className="mt-2 text-xs sm:text-sm">Dark</span>
      </button>
      <button
        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
          theme === "system"
            ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
        onClick={() => handleThemeChange("system")}
      >
        <Monitor size={20} className="sm:hidden animate-pulse-soft" />
        <Monitor size={24} className="hidden sm:block animate-pulse-soft" />
        <span className="mt-2 text-xs sm:text-sm">System</span>
      </button>
    </div>
  );
};

export default AppearanceModal;
