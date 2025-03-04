
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import AppearanceModal from "./AppearanceModal";
import CategoriesModal from "./CategoriesModal";
import CurrencyModal from "./CurrencyModal";
import ForumModal from "./ForumModal";
import TutorialsModal from "./TutorialsModal";
import HelpSupportModal from "./HelpSupportModal";
import AboutModal from "./AboutModal";
import GuideModal from "./GuideModal";
import FAQModal from "./FAQModal";
import ExportedFilesModal from "./ExportedFilesModal";
import { TransactionCategory } from "@/types/transaction";

export type ModalType = 
  | "appearance" 
  | "currency" 
  | "categories" 
  | "help" 
  | "about" 
  | "docs" 
  | "guide" 
  | "faq" 
  | "forum" 
  | "tutorials" 
  | "exportedFiles"
  | null;

interface ModalContainerProps {
  activeModal: ModalType;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
  theme?: string;
  handleThemeChange?: (theme: "light" | "dark" | "system") => void;
  currency?: string;
  handleCurrencyChange?: (currency: string) => void;
  categories?: TransactionCategory[];
  setCategories?: React.Dispatch<React.SetStateAction<TransactionCategory[]>>;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  activeModal,
  setActiveModal,
  theme,
  handleThemeChange,
  currency,
  handleCurrencyChange,
  categories,
  setCategories
}) => {
  if (!activeModal) return null;
  
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside of modal content to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        setActiveModal(null);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setActiveModal]);
  
  const getModalTitle = () => {
    switch (activeModal) {
      case "appearance": return "Appearance";
      case "currency": return "Currency";
      case "categories": return "Categories";
      case "help": return "Help & Support";
      case "about": return "About";
      case "guide": return "User Guide";
      case "faq": return "Frequently Asked Questions";
      case "forum": return "Community Forum";
      case "tutorials": return "Tutorials & Guides";
      case "exportedFiles": return "Exported Files";
      default: return "";
    }
  };
  
  const renderModalContent = () => {
    switch (activeModal) {
      case "appearance":
        return theme && handleThemeChange ? (
          <AppearanceModal theme={theme} handleThemeChange={handleThemeChange} />
        ) : null;
      case "currency":
        return currency && handleCurrencyChange ? (
          <CurrencyModal currency={currency} handleCurrencyChange={handleCurrencyChange} />
        ) : null;
      case "categories":
        return categories && setCategories ? (
          <CategoriesModal categories={categories} setCategories={setCategories} />
        ) : null;
      case "help":
        return <HelpSupportModal />;
      case "about":
        return <AboutModal />;
      case "guide":
        return <GuideModal />;
      case "faq":
        return <FAQModal />;
      case "forum":
        return <ForumModal />;
      case "tutorials":
        return <TutorialsModal />;
      case "exportedFiles":
        return <ExportedFilesModal />;
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div ref={modalContentRef} className="bg-card w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-border">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            {getModalTitle()}
          </h2>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X size={18} className="sm:hidden text-muted-foreground" />
            <X size={20} className="hidden sm:block text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
