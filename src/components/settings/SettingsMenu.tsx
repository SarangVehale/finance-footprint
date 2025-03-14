
import React from "react";
import { 
  ChevronRight, 
  Palette, 
  Tags, 
  DollarSign, 
  HelpCircle, 
  Info,
  Book,
  MessageCircleQuestion,
  Users,
  GraduationCap,
  Github,
  ExternalLink,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import { ModalType } from "./ModalContainer";
import { Link } from "react-router-dom";

interface SettingsMenuProps {
  setActiveModal: (modal: ModalType) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ setActiveModal }) => {
  return (
    <div className="bg-card rounded-xl shadow-sm divide-y divide-border animate-fade-in">
      <button
        onClick={() => setActiveModal("appearance")}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors rounded-t-xl"
      >
        <div className="flex items-center space-x-3">
          <Palette className="text-muted-foreground" size={18} />
          <span className="text-foreground text-sm sm:text-base">Appearance</span>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>

      <button
        onClick={() => setActiveModal("categories")}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Tags className="text-muted-foreground" size={18} />
          <span className="text-foreground text-sm sm:text-base">Categories</span>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>

      <button
        onClick={() => setActiveModal("currency")}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <DollarSign className="text-muted-foreground" size={18} />
          <span className="text-foreground text-sm sm:text-base">Currency</span>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>

      <button
        onClick={() => setActiveModal("help")}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <HelpCircle className="text-muted-foreground" size={18} />
          <span className="text-foreground text-sm sm:text-base">Help & Support</span>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>

      <button
        onClick={() => setActiveModal("about")}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Info className="text-muted-foreground" size={18} />
          <span className="text-foreground text-sm sm:text-base">About</span>
        </div>
        <ChevronRight size={18} className="text-muted-foreground" />
      </button>

      <div className="py-2">
        <h3 className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
          Documentation
        </h3>
        
        <button
          onClick={() => setActiveModal("guide")}
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Book className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">User Guide</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>

        <button
          onClick={() => setActiveModal("faq")}
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <MessageCircleQuestion className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">FAQs</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        
        <a
          href="https://www.reddit.com/r/financeFootprint/s/znrvd33MHS"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Users className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">Community Forum</span>
          </div>
          <ExternalLink size={16} className="text-muted-foreground" />
        </a>
        
        <button
          onClick={() => setActiveModal("tutorials")}
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <GraduationCap className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">Tutorials & Guides</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>

        <Link
          to="/settings/documentation"
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <FileText className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">Full Documentation</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </Link>

        <a
          href="https://github.com/SarangVehale/finance-footprint"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Github className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">GitHub Repository</span>
          </div>
          <ExternalLink size={16} className="text-muted-foreground" />
        </a>

        <button
          onClick={() => setActiveModal("exportedFiles")}
          className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="text-muted-foreground" size={18} />
            <span className="text-foreground text-sm sm:text-base">Exported Files</span>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;
