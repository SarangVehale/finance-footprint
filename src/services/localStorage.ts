
import { Transaction, Budget } from "@/types/transaction";
import { Note } from "@/types/note";

const TRANSACTIONS_KEY = "finance_transactions";
const BUDGETS_KEY = "finance_budgets";
const NOTES_KEY = "finance_notes";
const THEME_KEY = "finance_theme";
const CURRENCY_KEY = "finance_currency";

// Helper function to safely interact with localStorage
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      // Try clearing some space if we hit a quota error
      if (error instanceof DOMException && 
          (error.name === 'QuotaExceededError' || 
           error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn("Storage quota exceeded, trying to make space...");
        // Try to make some space by removing old data
        const keysToPreserve = [TRANSACTIONS_KEY, BUDGETS_KEY, NOTES_KEY, THEME_KEY, CURRENCY_KEY];
        for (let i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i);
          if (storageKey && !keysToPreserve.includes(storageKey)) {
            localStorage.removeItem(storageKey);
          }
        }
        // Try again
        try {
          localStorage.setItem(key, value);
          return true;
        } catch (retryError) {
          console.error("Still failed after cleanup:", retryError);
          return false;
        }
      }
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }
};

export const storageService = {
  // Transactions
  getTransactions: (): Transaction[] => {
    const stored = safeStorage.getItem(TRANSACTIONS_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing transactions:", error);
      return [];
    }
  },

  saveTransaction: (transaction: Transaction): boolean => {
    const transactions = storageService.getTransactions();
    transactions.push(transaction);
    return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  },

  updateTransaction: (transaction: Transaction): boolean => {
    const transactions = storageService.getTransactions();
    const index = transactions.findIndex((t) => t.id === transaction.id);
    if (index !== -1) {
      transactions[index] = transaction;
      return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
    return false;
  },

  deleteTransaction: (id: string): boolean => {
    const transactions = storageService.getTransactions();
    const filtered = transactions.filter((t) => t.id !== id);
    return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
  },

  // Budgets
  getBudgets: (): Budget[] => {
    const stored = safeStorage.getItem(BUDGETS_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing budgets:", error);
      return [];
    }
  },

  saveBudget: (budget: Budget): boolean => {
    const budgets = storageService.getBudgets();
    const existingIndex = budgets.findIndex((b) => b.category === budget.category);
    
    if (existingIndex !== -1) {
      budgets[existingIndex] = budget;
    } else {
      budgets.push(budget);
    }
    
    return safeStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  },

  updateBudgetSpent: (category: string, amount: number): boolean => {
    const budgets = storageService.getBudgets();
    const budget = budgets.find((b) => b.category === category);
    if (budget) {
      budget.spent += amount;
      return safeStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
    }
    return false;
  },

  // Notes
  getNotes: (): Note[] => {
    const stored = safeStorage.getItem(NOTES_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing notes:", error);
      return [];
    }
  },

  saveNote: (note: Note): boolean => {
    const notes = storageService.getNotes();
    notes.push(note);
    return safeStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  updateNote: (note: Note): boolean => {
    const notes = storageService.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes[index] = note;
      return safeStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }
    return false;
  },

  deleteNote: (id: string): boolean => {
    const notes = storageService.getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    return safeStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  },

  // Theme
  getTheme: (): "light" | "dark" | "system" => {
    return (safeStorage.getItem(THEME_KEY) as "light" | "dark" | "system") || "system";
  },

  setTheme: (theme: "light" | "dark" | "system"): boolean => {
    return safeStorage.setItem(THEME_KEY, theme);
  },

  // Currency
  getCurrency: (): string => {
    return safeStorage.getItem(CURRENCY_KEY) || "USD";
  },

  setCurrency: (currency: string): boolean => {
    return safeStorage.setItem(CURRENCY_KEY, currency);
  },
};
