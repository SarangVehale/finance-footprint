
import React from "react";

const GuideModal: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <section className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Getting Started</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
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
        <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          <p>To manage your transactions effectively:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use categories to organize your transactions</li>
            <li>Add descriptions for better tracking</li>
            <li>Edit or delete transactions as needed</li>
            <li>View your history for a complete overview</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default GuideModal;
