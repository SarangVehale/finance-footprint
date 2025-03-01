
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
  ExternalLink,
  Lightbulb,
  GraduationCap,
  PieChart,
  TrendingDown,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Transaction, TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";

type ModalType = "appearance" | "currency" | "categories" | "help" | "about" | "docs" | "guide" | "faq" | "forum" | "tutorials" | null;

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
      <div className="p-4 sm:p-6 space-y-4 bg-background pt-safe-top">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground animate-fade-in">Settings</h1>

        {/* Settings Menu */}
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
            className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors rounded-b-xl"
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
            
            <button
              onClick={() => setActiveModal("forum")}
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Users className="text-muted-foreground" size={18} />
                <span className="text-foreground text-sm sm:text-base">Community Forum</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
            
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
          </div>
        </div>

        {activeModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-card w-full max-w-md sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up">
              <div className="flex justify-between items-center p-3 sm:p-4 border-b border-border">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  {activeModal === "appearance" && "Appearance"}
                  {activeModal === "currency" && "Currency"}
                  {activeModal === "categories" && "Categories"}
                  {activeModal === "help" && "Help & Support"}
                  {activeModal === "about" && "About"}
                  {activeModal === "guide" && "User Guide"}
                  {activeModal === "faq" && "Frequently Asked Questions"}
                  {activeModal === "forum" && "Community Forum"}
                  {activeModal === "tutorials" && "Tutorials & Guides"}
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
                {activeModal === "currency" && (
                  <div className="space-y-3 sm:space-y-4">
                    {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
                          currency === curr
                            ? "bg-mint-50 dark:bg-mint-900/20 text-mint-500"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="text-sm sm:text-base">{curr}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
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
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <button
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
                        theme === "light"
                          ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <Sun size={20} className="sm:hidden animate-spin-slow" />
                      <Sun size={24} className="hidden sm:block animate-spin-slow" />
                      <span className="mt-2 text-xs sm:text-sm">Light</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
                        theme === "dark"
                          ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <Moon size={20} className="sm:hidden animate-float-slow" />
                      <Moon size={24} className="hidden sm:block animate-float-slow" />
                      <span className="mt-2 text-xs sm:text-sm">Dark</span>
                    </button>
                    <button
                      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] ${
                        theme === "system"
                          ? "border-mint-500 bg-mint-50 dark:bg-mint-900/20 text-mint-500"
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <Monitor size={20} className="sm:hidden animate-pulse-soft" />
                      <Monitor size={24} className="hidden sm:block animate-pulse-soft" />
                      <span className="mt-2 text-xs sm:text-sm">System</span>
                    </button>
                  </div>
                )}

                {activeModal === "categories" && (
                  <div className="space-y-4 max-h-[60vh]">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                        placeholder="New category name"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
                      {categories.map((category, index) => (
                        <div
                          key={category}
                          className="flex justify-between items-center p-2.5 sm:p-3 bg-accent rounded-lg group hover:bg-accent/80 transition-all animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-foreground text-sm sm:text-base">{category}</span>
                          {category !== "Other" && (
                            <button
                              onClick={() => handleDeleteCategory(category)}
                              className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90"
                            >
                              <Trash2 size={16} className="sm:hidden" />
                              <Trash2 size={18} className="hidden sm:block" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModal === "help" && (
                  <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2">
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
                          onClick={() => setActiveModal("forum")}
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
                          onClick={() => setActiveModal("tutorials")}
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
                  </div>
                )}

                {activeModal === "forum" && (
                  <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2">
                    <section>
                      <div className="rounded-xl bg-primary/5 p-5 mb-6 text-center">
                        <Users className="w-12 h-12 mx-auto text-primary mb-3 animate-float-slow" />
                        <h3 className="text-lg font-medium mb-2">Finance Footprint Community</h3>
                        <p className="text-muted-foreground text-sm mb-4">Join our growing community of users to share tips, ask questions, and get help</p>
                        <a 
                          href="https://community.financefootprint.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Join Community
                          <ExternalLink size={14} className="ml-2" />
                        </a>
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Popular Discussion Categories</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { title: "Budgeting Tips", count: 124, icon: <DollarSign size={16} /> },
                          { title: "App Features", count: 89, icon: <Lightbulb size={16} /> },
                          { title: "Investing", count: 76, icon: <PieChart size={16} /> },
                          { title: "Debt Reduction", count: 52, icon: <TrendingDown size={16} /> }
                        ].map((category, index) => (
                          <div 
                            key={index}
                            className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-primary">{category.icon}</span>
                              <span className="font-medium">{category.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{category.count} discussions</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Recent Discussions</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "How to categorize subscriptions?",
                            author: "JaneDoe",
                            replies: 8,
                            time: "2 hours ago"
                          },
                          {
                            title: "Best way to track shared expenses",
                            author: "FinanceGuru",
                            replies: 12,
                            time: "Yesterday"
                          },
                          {
                            title: "Feature request: multiple currencies",
                            author: "Traveler22",
                            replies: 5,
                            time: "3 days ago"
                          }
                        ].map((discussion, index) => (
                          <div 
                            key={index} 
                            className="p-3 border-b border-border last:border-0 hover:bg-accent/30 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100 + 300}ms` }}
                          >
                            <h4 className="font-medium mb-1">{discussion.title}</h4>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>by {discussion.author}</span>
                              <div className="flex items-center space-x-3">
                                <span>{discussion.replies} replies</span>
                                <span>{discussion.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* New forum features */}
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Featured Discussions</h3>
                      <div className="space-y-3">
                        <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-primary">Monthly Budget Challenge</h4>
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Featured</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Join our monthly challenge to reduce spending and increase savings!</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="text-primary font-medium">42 participants</span>
                            </div>
                            <span className="text-muted-foreground">Ends in 12 days</span>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Community Resources</h3>
                      <div className="grid gap-3 grid-cols-2">
                        {[
                          { title: "Templates", description: "Budget spreadsheets & planners", count: 18 },
                          { title: "Calculators", description: "Financial planning tools", count: 12 },
                          { title: "Guides", description: "Step-by-step tutorials", count: 24 },
                          { title: "Scripts", description: "Automation helpers", count: 8 }
                        ].map((resource, index) => (
                          <div 
                            key={index}
                            className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100 + 600}ms` }}
                          >
                            <h4 className="font-medium text-sm">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground mb-1">{resource.description}</p>
                            <span className="text-xs text-primary">{resource.count} resources</span>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Community Events</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Financial Freedom Workshop",
                            date: "June 15, 2024",
                            time: "7:00 PM EST",
                            type: "Online"
                          },
                          {
                            title: "Ask Me Anything: Investment Tips",
                            date: "June 22, 2024",
                            time: "6:30 PM EST",
                            type: "Online"
                          }
                        ].map((event, index) => (
                          <div 
                            key={index} 
                            className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100 + 700}ms` }}
                          >
                            <h4 className="font-medium mb-1">{event.title}</h4>
                            <div className="flex items-center justify-between text-xs">
                              <div className="space-y-1">
                                <p className="text-muted-foreground">{event.date}</p>
                                <p className="text-muted-foreground">{event.time}</p>
                              </div>
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{event.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeModal === "tutorials" && (
                  <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2">
                    <section>
                      <div className="rounded-xl bg-primary/5 p-5 mb-6 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto text-primary mb-3 animate-float-slow" />
                        <h3 className="text-lg font-medium mb-2">Tutorials & Guides</h3>
                        <p className="text-muted-foreground text-sm mb-4">Learn how to make the most of Finance Footprint with our step-by-step guides</p>
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Getting Started</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Setting Up Your Account",
                            description: "Learn how to create and configure your account",
                            time: "5 min read",
                            difficulty: "Beginner"
                          },
                          {
                            title: "Adding Your First Transaction",
                            description: "Step-by-step guide to recording transactions",
                            time: "3 min read",
                            difficulty: "Beginner"
                          },
                          {
                            title: "Understanding the Dashboard",
                            description: "Overview of all the main features and screens",
                            time: "7 min read",
                            difficulty: "Beginner"
                          }
                        ].map((tutorial, index) => (
                          <div 
                            key={index}
                            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <h4 className="font-medium mb-1">{tutorial.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                            <div className="flex items-center space-x-3 text-xs">
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{tutorial.difficulty}</span>
                              <span className="text-muted-foreground">{tutorial.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Advanced Features</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Creating Custom Categories",
                            description: "Organize your finances with personalized categories",
                            time: "4 min read",
                            difficulty: "Intermediate"
                          },
                          {
                            title: "Analyzing Your Spending Patterns",
                            description: "Get insights into your financial habits using analytics",
                            time: "6 min read",
                            difficulty: "Intermediate"
                          },
                          {
                            title: "Setting Budgets and Goals",
                            description: "Learn how to plan and track your financial goals",
                            time: "8 min read",
                            difficulty: "Advanced"
                          }
                        ].map((tutorial, index) => (
                          <div 
                            key={index}
                            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${index * 100 + 300}ms` }}
                          >
                            <h4 className="font-medium mb-1">{tutorial.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
                            <div className="flex items-center space-x-3 text-xs">
                              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{tutorial.difficulty}</span>
                              <span className="text-muted-foreground">{tutorial.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <h3 className="text-base sm:text-lg font-medium">Video Tutorials</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Complete App Walkthrough",
                            description: "Full overview of all app features and functionality",
                            time: "15 min video",
                          },
                          {
                            title: "Creating Reports and Exports",
                            description: "How to generate and share financial reports",
                            time: "8 min video",
                          }
                        ].map((video, index) => (
                          <div 
                            key={index}
                            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in flex items-center space-x-3"
                            style={{ animationDelay: `${index * 100 + 600}ms` }}
                          >
                            <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                              <Play size={20} />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">{video.title}</h4>
                              <p className="text-sm text-muted-foreground mb-1">{video.description}</p>
                              <span className="text-xs text-muted-foreground">{video.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {activeModal === "guide" && (
                  <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2">
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
                )}

                {activeModal === "faq" && (
                  <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] pr-2">
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
                )}

                {activeModal === "about" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-mint-500 animate-float-slow">Finance Footprint</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Version 1.0.0</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
                      A simple, effective way to track your finances and manage your budget.
                      Built with ❤️ for a better financial future.
                    </p>
                    <div className="pt-4 text-center">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">© 2024 Finance Footprint</p>
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
