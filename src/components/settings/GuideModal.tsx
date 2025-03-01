
import React from "react";
import { Book, Bookmark, ChevronRight } from "lucide-react";

const GuideModal: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <div className="bg-primary/5 rounded-xl p-4 mb-2 text-center">
        <Book className="w-12 h-12 mx-auto text-primary mb-3" />
        <h2 className="text-xl font-bold mb-2">User Guide</h2>
        <p className="text-muted-foreground text-sm">
          Learn how to use Finance Footprint efficiently with our comprehensive user guide
        </p>
      </div>
      
      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Getting Started</h3>
        <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
          <p>Welcome to Finance Footprint! Here's how to get started:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Add your first transaction from the home screen</li>
            <li>Set up your preferred currency in settings</li>
            <li>Track your expenses and income</li>
            <li>View analytics to understand your spending patterns</li>
          </ol>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Managing Transactions</h3>
        <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
          <p>To manage your transactions effectively:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use categories to organize your transactions</li>
            <li>Add descriptions for better tracking</li>
            <li>Edit or delete transactions as needed</li>
            <li>View your history for a complete overview</li>
          </ul>
        </div>
      </section>
      
      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Using Analytics</h3>
        <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
          <p>Get insights from your financial data:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>View spending by category in the pie chart</li>
            <li>Track income vs. expenses in the bar chart</li>
            <li>Analyze trends over time with the line graph</li>
            <li>Use filters to focus on specific date ranges or categories</li>
          </ul>
        </div>
      </section>
      
      <div className="flex justify-end mt-4">
        <div className="flex items-center space-x-2 text-sm text-primary cursor-pointer">
          <Bookmark size={16} />
          <span>Save for offline reading</span>
        </div>
      </div>
      
      <div className="border-t border-border pt-4 mt-6">
        <h3 className="text-base font-medium mb-2">Related resources</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md transition-colors">
            <span className="text-sm">Tutorials & Guides</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-md transition-colors">
            <span className="text-sm">FAQs</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
