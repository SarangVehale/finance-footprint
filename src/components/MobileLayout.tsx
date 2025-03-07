
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, PieChart, Clock, Settings, FileText, ArrowLeft } from "lucide-react";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  leftIcon?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  title, 
  leftIcon, 
  showBackButton, 
  onBackClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  
  // Handle hardware back button for Android
  useEffect(() => {
    let backButtonPressCount = 0;
    let backButtonTimer: NodeJS.Timeout;
    
    const handleBackButton = (event: PopStateEvent) => {
      // Prevent default back navigation
      event.preventDefault();
      
      if (onBackClick) {
        onBackClick();
        return;
      }
      
      if (isHomePage) {
        backButtonPressCount++;
        
        if (backButtonPressCount === 1) {
          console.log("Press back again to exit the application");
          
          backButtonTimer = setTimeout(() => {
            backButtonPressCount = 0;
          }, 2000);
        } else if (backButtonPressCount >= 2) {
          console.log("Exiting application");
          backButtonPressCount = 0;
          clearTimeout(backButtonTimer);
        }
      } else {
        navigate(-1);
      }
    };
    
    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
      if (backButtonTimer) clearTimeout(backButtonTimer);
    };
  }, [navigate, isHomePage, onBackClick]);

  // Handle keyboard visibility and navigation bar height
  useEffect(() => {
    const handleVisualViewportResize = () => {
      if (!window.visualViewport) return;
      
      // Calculate if keyboard is likely visible based on visual viewport height vs window inner height
      const keyboardHeight = window.innerHeight - window.visualViewport.height;
      const keyboardThreshold = 150; // Minimum height difference to consider keyboard as visible
      
      if (keyboardHeight > keyboardThreshold) {
        setIsKeyboardVisible(true);
        document.body.classList.add('keyboard-open');
        
        // Scroll active element into view
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          setTimeout(() => {
            activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      } else {
        setIsKeyboardVisible(false);
        document.body.classList.remove('keyboard-open');
      }
    };

    // Handle Android navigation gesture area
    const setNavigationBarPadding = () => {
      // Detect if device has navigation gesture area at bottom (common in Android 10+)
      const hasGestureBar = window.innerHeight < window.outerHeight || 
                            (window.visualViewport && window.visualViewport.height < window.innerHeight);
      
      if (hasGestureBar) {
        document.body.classList.add('has-gesture-bar');
      } else {
        document.body.classList.remove('has-gesture-bar');
      }
    };

    window.visualViewport?.addEventListener('resize', handleVisualViewportResize);
    window.addEventListener('resize', setNavigationBarPadding);
    
    // Initial setup
    setNavigationBarPadding();
    handleVisualViewportResize();
    
    return () => {
      window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);
      window.removeEventListener('resize', setNavigationBarPadding);
    };
  }, []);

  const handleBackButtonClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const defaultLeftIcon = showBackButton ? (
    <button 
      onClick={handleBackButtonClick}
      className="p-2 rounded-full hover:bg-accent/50 active:scale-95 transition-all"
      aria-label="Go back"
    >
      <ArrowLeft size={20} className="text-foreground" />
    </button>
  ) : null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <div className="h-safe-top bg-background" />
      {(title || leftIcon || showBackButton) && (
        <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center h-14 px-4">
            {leftIcon || defaultLeftIcon}
            {title && (
              <h1 className="text-lg font-medium ml-2">{title}</h1>
            )}
          </div>
        </header>
      )}
      <main className={`flex-1 overflow-y-auto custom-scrollbar ${isKeyboardVisible ? "pb-0" : "pb-[calc(4rem+env(safe-area-inset-bottom))]"}`}>
        <div className="animate-fade-in">{children}</div>
      </main>
      {!isKeyboardVisible && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-2 sm:px-6 pb-safe z-40 rounded-t-2xl shadow-sm">
          <NavLink to="/home" icon={<Home className="w-5 h-5 sm:w-6 sm:h-6" />} label="Home" />
          <NavLink to="/analytics" icon={<PieChart className="w-5 h-5 sm:w-6 sm:h-6" />} label="Analytics" />
          <NavLink to="/history" icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />} label="History" />
          <NavLink to="/notes" icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />} label="Notes" />
          <NavLink to="/settings" icon={<Settings className="w-5 h-5 sm:w-6 sm:h-6" />} label="Settings" />
        </nav>
      )}
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
      className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 rounded-lg p-2 hover:bg-accent/50 active:scale-95 ${
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
