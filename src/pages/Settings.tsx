
import React from "react";
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
  Info
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Transaction, TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";

type ModalType = "appearance" | "currency" | "categories" | "help" | "about" | null;

const Settings = () => {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(
    storageService.getTheme()
  );
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
  const [currency, setCurrency] = React.useState("USD");

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    storageService.setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
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
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Settings Menu */}
        <div className="bg-white rounded-xl shadow-sm divide-y">
          <button
            onClick={() => setActiveModal("appearance")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Palette className="text-gray-500" size={20} />
              <span>Appearance</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            onClick={() => setActiveModal("currency")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <DollarSign className="text-gray-500" size={20} />
              <span>Currency</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            onClick={() => setActiveModal("categories")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Tags className="text-gray-500" size={20} />
              <span>Categories</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            onClick={() => setActiveModal("help")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <HelpCircle className="text-gray-500" size={20} />
              <span>Help & Support</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button
            onClick={() => setActiveModal("about")}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Info className="text-gray-500" size={20} />
              <span>About</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Modals */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {activeModal === "appearance" && "Appearance"}
                  {activeModal === "currency" && "Currency"}
                  {activeModal === "categories" && "Categories"}
                  {activeModal === "help" && "Help & Support"}
                  {activeModal === "about" && "About"}
                </h2>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {activeModal === "appearance" && (
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 ${
                        theme === "light"
                          ? "border-mint-500 bg-mint-50 text-mint-500"
                          : "border-gray-200 hover:bg-gray-50"
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
                          : "border-gray-200 hover:bg-gray-50"
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
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <Monitor size={24} />
                      <span className="mt-2 text-sm">System</span>
                    </button>
                  </div>
                )}

                {activeModal === "currency" && (
                  <div className="space-y-4">
                    {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          currency === curr
                            ? "bg-mint-50 text-mint-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span>{curr}</span>
                        <span className="text-gray-500">
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

                {activeModal === "categories" && (
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                        placeholder="New category name"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="p-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group"
                        >
                          <span>{category}</span>
                          {category !== "Other" && (
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModal === "help" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Getting Started</h3>
                      <p className="text-gray-600">
                        Track your expenses and income easily with our intuitive interface.
                        Add transactions from the home screen, analyze your spending patterns,
                        and manage your finances effectively.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Documentation</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <FileText size={20} className="mr-3 text-gray-500" />
                          <span>User Guide</span>
                        </button>
                        <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <FileText size={20} className="mr-3 text-gray-500" />
                          <span>FAQs</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Community</h3>
                      <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <Users size={20} className="mr-3 text-gray-500" />
                        <span>Join Our Community</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Support</h3>
                      <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <HelpCircle size={20} className="mr-3 text-gray-500" />
                        <span>Contact Support</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeModal === "about" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-mint-500">Finance Footprint</h3>
                      <p className="text-gray-500">Version 1.0.0</p>
                    </div>
                    <p className="text-gray-600 text-center">
                      A simple, effective way to track your finances and manage your budget.
                      Built with ❤️ for a better financial future.
                    </p>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-gray-500">© 2024 Finance Footprint</p>
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
