import React from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Monitor,
  Plus,
  X,
  HelpCircle,
  FileText,
  Users,
  Trash2,
  Palette,
  DollarSign,
  Tags,
  ChevronRight,
  Info,
  Github,
  Book,
  MessageCircleQuestion,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Transaction, TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";

type ModalType = "appearance" | "currency" | "categories" | "help" | "about" | "docs" | "guide" | "faq" | null;

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeModal, setActiveModal] = React.useState<ModalType>(null);
  const [newCategory, setNewCategory] = React.useState("");
  const [categories, setCategories] = React.useState<TransactionCategory[]>([
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Housing",
    "Salary",
    "Investment",
    "Other"
  ]);
  const [currency, setCurrency] = React.useState(storageService.getCurrency());

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory as TransactionCategory)) {
      setCategories([...categories, newCategory as TransactionCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: TransactionCategory) => {
    if (category !== "Other") {
      setCategories(categories.filter(c => c !== category));
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    storageService.setCurrency(newCurrency);
    setActiveModal(null); // Auto-close the modal
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-4 bg-background">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>

        {/* Settings Menu */}
        <div className="bg-card rounded-xl shadow-sm divide-y divide-border">
          <button
            onClick={() => setActiveModal("appearance")}
            className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Palette className="text-muted-foreground" size={20} />
              <span className="text-foreground">Appearance</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveModal("categories")}
            className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Tags className="text-muted-foreground" size={20} />
              <span className="text-foreground">Categories</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveModal("currency")}
            className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
          >
            <div className="flex items-center space-x-3">
              <DollarSign className="text-muted-foreground" size={20} />
              <span className="text-foreground">Currency</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveModal("help")}
            className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="text-muted-foreground" size={20} />
              <span className="text-foreground">Help & Support</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setActiveModal("about")}
            className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Info className="text-muted-foreground" size={20} />
              <span className="text-foreground">About</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <div className="py-2">
            <h3 className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Documentation
            </h3>
            
            <button
              onClick={() => setActiveModal("guide")}
              className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Book className="text-muted-foreground" size={20} />
                <span className="text-foreground">User Guide</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => setActiveModal("faq")}
              className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <MessageCircleQuestion className="text-muted-foreground" size={20} />
                <span className="text-foreground">FAQs</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>

            <a
              href="https://github.com/yourusername/finance-footprint"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Github className="text-muted-foreground" size={20} />
                <span className="text-foreground">GitHub Repository</span>
              </div>
              <ExternalLink size={16} className="text-muted-foreground" />
            </a>
          </div>
        </div>

        {activeModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  {activeModal === "appearance" && "Appearance"}
                  {activeModal === "currency" && "Currency"}
                  {activeModal === "categories" && "Categories"}
                  {activeModal === "help" && "Help & Support"}
                  {activeModal === "about" && "About"}
                  {activeModal === "guide" && "User Guide"}
                  {activeModal === "faq" && "Frequently Asked Questions"}
                </h2>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              <div className="p-4">
                {activeModal === "currency" && (
                  <div className="space-y-4">
                    {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          currency === curr
                            ? "bg-mint-50 text-mint-500"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span>{curr}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {curr === "USD" && "$"}
                          {curr === "EUR" && "€"}
                          {curr === "GBP" && "£"}
                          {curr === "JPY" && "¥"}
                          {curr === "AUD" && "A$"}
                          {curr === "CAD" && "C$"}
                          {curr === "CHF" && "Fr"}
                          {curr === "CNY" && "¥"}
                          {curr === "INR" && "₹"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {activeModal === "appearance" && (
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 ${
                        theme === "light"
                          ? "border-mint-500 bg-mint-50 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun size={24} />
                      <span className="mt-2 text-sm">Light</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 ${
                        theme === "dark"
                          ? "border-mint-500 bg-mint-50 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon size={24} />
                      <span className="mt-2 text-sm">Dark</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 ${
                        theme === "system"
                          ? "border-mint-500 bg-mint-50 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <Monitor size={24} />
                      <span className="mt-2 text-sm">System</span>
                    </button>
                  </div>
                )}

                {activeModal === "categories" && (
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="New category name"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex justify-between items-center p-3 bg-accent rounded-lg group"
                        >
                          <span className="text-foreground">{category}</span>
                          {category !== "Other" && (
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModal === "guide" && (
                  <div className="space-y-6">
                    <section className="space-y-4">
                      <h3 className="text-lg font-medium">Getting Started</h3>
                      <div className="space-y-2 text-gray-600 dark:text-gray-300">
                        <p>Welcome to Finance Footprint! Here's how to get started:</p>
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Add your first transaction from the home screen</li>
                          <li>Set up your preferred currency in settings</li>
                          <li>Track your expenses and income</li>
                          <li>View analytics to understand your spending patterns</li>
                        </ol>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-lg font-medium">Managing Transactions</h3>
                      <div className="space-y-2 text-gray-600 dark:text-gray-300">
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
                )}

                {activeModal === "faq" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">How do I add a transaction?</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Click the "Add Income" or "Add Expense" button on the home screen, fill in the details, and save.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Can I edit or delete transactions?</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Yes, you can edit or delete any transaction by clicking the respective icons next to each transaction.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">How do I change my currency?</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Go to Settings, click on Currency, and select your preferred currency from the list.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">How can I view my spending analytics?</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Navigate to the Analytics page to view detailed charts and insights about your spending patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === "about" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-mint-500">Finance Footprint</h3>
                      <p className="text-gray-500 dark:text-gray-400">Version 1.0.0</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      A simple, effective way to track your finances and manage your budget.
                      Built with ❤️ for a better financial future.
                    </p>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Finance Footprint</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Settings;
