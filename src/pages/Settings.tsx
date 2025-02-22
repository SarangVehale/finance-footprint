
import React from "react";
import { Moon, Sun, Monitor, Plus, X, HelpCircle, FileText, Users, Trash2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Transaction, TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";

const Settings = () => {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(
    storageService.getTheme()
  );
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
  const [showAddCategory, setShowAddCategory] = React.useState(false);

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
      setShowAddCategory(false);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: TransactionCategory) => {
    if (category !== "Other") {
      setCategories(categories.filter(c => c !== category));
    }
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Appearance */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
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
        </div>

        {/* Currency */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Currency</h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="CHF">CHF (Fr)</option>
            <option value="CNY">CNY (¥)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            <button
              onClick={() => setShowAddCategory(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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

        {/* Help & Support */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <HelpCircle size={20} className="mr-3 text-gray-500" />
              <span>Help Center</span>
            </button>
            <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <FileText size={20} className="mr-3 text-gray-500" />
              <span>Documentation</span>
            </button>
            <button className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Users size={20} className="mr-3 text-gray-500" />
              <span>Contribute</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-600">
            Finance Footprint v1.0.0
            <br />
            A simple, effective way to track your finances.
          </p>
        </div>

        {/* Add Category Modal */}
        {showAddCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Category</h2>
                <button
                  onClick={() => setShowAddCategory(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                  placeholder="Enter category name"
                />
                <button
                  onClick={handleAddCategory}
                  className="w-full bg-mint-500 text-white py-2 rounded-lg hover:bg-mint-600 transition-colors"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Settings;
