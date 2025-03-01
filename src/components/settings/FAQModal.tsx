
import React from "react";

const FAQModal: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm sm:text-base">How do I add a transaction?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Click the "Add Income" or "Add Expense" button on the home screen, fill in the details, and save.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm sm:text-base">Can I edit or delete transactions?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Yes, you can edit or delete any transaction by clicking the respective icons next to each transaction.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm sm:text-base">How do I change my currency?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Go to Settings, click on Currency, and select your preferred currency from the list.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm sm:text-base">How can I view my spending analytics?</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Navigate to the Analytics page to view detailed charts and insights about your spending patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
