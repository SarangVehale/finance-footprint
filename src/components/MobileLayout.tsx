
import React, { useEffect } from "react";
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
          // Show "Press again to exit" toast or notification
          // This would be implemented in a real mobile app
          console.log("Press back again to exit the application");
          
          backButtonTimer = setTimeout(() => {
            backButtonPressCount = 0;
          }, 2000);
        } else if (backButtonPressCount >= 2) {
          // In a real app, this would exit the application
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
    // Track if keyboard is visible
    let keyboardVisible = false;
    
    const handleKeyboardVisibility = () => {
      // Check for visual viewport changes
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        
        // If visual viewport is significantly smaller than window height, keyboard is likely visible
        const newKeyboardVisible = viewportHeight < windowHeight * 0.75;
        
        console.log("Keyboard visibility check", {
          viewportHeight,
          windowHeight,
          newKeyboardVisible,
          currentKeyboardVisible: keyboardVisible
        });
        
        if (newKeyboardVisible !== keyboardVisible) {
          keyboardVisible = newKeyboardVisible;
          
          // Add/remove class to body to adjust layout
          if (keyboardVisible) {
            document.body.classList.add('keyboard-open');
            // Add extra padding to bottom of content to ensure visibility
            document.querySelector('main')?.classList.add('pb-keyboard');
          } else {
            document.body.classList.remove('keyboard-open');
            document.querySelector('main')?.classList.remove('pb-keyboard');
          }
        }
      }
    };
    
    // Detect if device has navigation gesture area at bottom (common in Android 10+)
    const setNavigationBarPadding = () => {
      const hasGestureBar = 
        window.innerHeight < window.outerHeight || 
        (window.visualViewport && window.visualViewport.height < window.innerHeight);
      
      if (hasGestureBar) {
        document.body.classList.add('has-gesture-bar');
      } else {
        document.body.classList.remove('has-gesture-bar');
      }
    };

    window.addEventListener('resize', handleKeyboardVisibility);
    window.addEventListener('resize', setNavigationBarPadding);
    window.visualViewport?.addEventListener('resize', handleKeyboardVisibility);
    
    // Initial setup
    setNavigationBarPadding();
    handleKeyboardVisibility();
    
    // Add global CSS for keyboard handling
    const style = document.createElement('style');
    style.innerHTML = `
      .keyboard-open .modal-content {
        transform: translateY(-30%);
      }
      .pb-keyboard {
        padding-bottom: 50vh !important;
      }
      .has-gesture-bar .bottom-bar {
        padding-bottom: env(safe-area-inset-bottom, 20px);
      }
      .keyboard-open .fixed-bottom, 
      .keyboard-open .fixed.bottom-0 {
        transform: translateY(-100%);
        visibility: hidden;
      }
      .keyboard-open [role="dialog"] {
        max-height: 70vh;
        overflow-y: auto;
      }
      .keyboard-open .fixed.inset-0 {
        height: auto;
        bottom: auto;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      window.removeEventListener('resize', handleKeyboardVisibility);
      window.removeEventListener('resize', setNavigationBarPadding);
      window.visualViewport?.removeEventListener('resize', handleKeyboardVisibility);
      document.head.removeChild(style);
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
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <div className="animate-fade-in">{children}</div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-2 sm:px-6 pb-safe z-40 rounded-t-2xl shadow-sm bottom-bar">
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
