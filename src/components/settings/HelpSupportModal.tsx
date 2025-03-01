
import React from "react";
import { 
  Github, 
  MessageCircleQuestion,
  Users, 
  GraduationCap,
  ExternalLink 
} from "lucide-react";

const HelpSupportModal: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium text-foreground">GitHub Resources</h3>
        <div className="space-y-3">
          <a
            href="https://github.com/SarangVehale/finance-footprint"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Github size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">GitHub Repository</h4>
              <p className="text-sm text-muted-foreground">Browse the source code</p>
            </div>
          </a>

          <a
            href="https://github.com/SarangVehale/finance-footprint/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircleQuestion size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">GitHub Issues</h4>
              <p className="text-sm text-muted-foreground">Report bugs or request features</p>
            </div>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium text-foreground">Additional Resources</h3>
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = "#/settings?modal=forum"}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-foreground">Community Forum</h4>
              <p className="text-sm text-muted-foreground">Join our supportive community</p>
            </div>
          </button>

          <button
            onClick={() => window.location.href = "#/settings?modal=tutorials"}
            className="w-full flex items-center space-x-3 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-foreground">Tutorials & Guides</h4>
              <p className="text-sm text-muted-foreground">Step-by-step instructions</p>
            </div>
          </button>
        </div>
      </section>
      
      <section className="space-y-4 mt-6">
        <h3 className="text-base sm:text-lg font-medium text-foreground">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <button className="w-full p-3 text-left font-medium bg-accent/30 border-b border-border flex justify-between items-center">
              <span>How do I add a transaction?</span>
              <span className="text-primary">+</span>
            </button>
            <div className="p-3 text-sm text-muted-foreground">
              Click the "Add Income" or "Add Expense" button on the home screen, fill in the details, and save.
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <button className="w-full p-3 text-left font-medium bg-accent/30 border-b border-border flex justify-between items-center">
              <span>Can I edit or delete transactions?</span>
              <span className="text-primary">+</span>
            </button>
            <div className="p-3 text-sm text-muted-foreground">
              Yes, you can edit or delete any transaction by clicking the respective icons next to each transaction.
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <button className="w-full p-3 text-left font-medium bg-accent/30 border-b border-border flex justify-between items-center">
              <span>How do I change my currency?</span>
              <span className="text-primary">+</span>
            </button>
            <div className="p-3 text-sm text-muted-foreground">
              Go to Settings, click on Currency, and select your preferred currency from the list.
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <button className="w-full p-3 text-left font-medium bg-accent/30 border-b border-border flex justify-between items-center">
              <span>How can I view my spending analytics?</span>
              <span className="text-primary">+</span>
            </button>
            <div className="p-3 text-sm text-muted-foreground">
              Navigate to the Analytics page to view detailed charts and insights about your spending patterns.
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <button className="text-primary hover:underline text-sm">
            View All FAQs
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpSupportModal;
