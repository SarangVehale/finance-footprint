
import { Transaction, Budget } from "@/types/transaction";
import { Note } from "@/types/note";

const TRANSACTIONS_KEY = "finance_transactions";
const BUDGETS_KEY = "finance_budgets";
const NOTES_KEY = "finance_notes";
const THEME_KEY = "finance_theme";
const CURRENCY_KEY = "finance_currency";
const STORAGE_PERMISSION_ASKED = "storage_permission_asked";

// Helper function to safely interact with localStorage
const safeStorage = {
  // Check if storage is available and accessible
  checkStorageAvailability: (): boolean => {
    try {
      const testKey = "storage_test";
      localStorage.setItem(testKey, "test");
      const result = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return result === "test";
    } catch (e) {
      console.error("Storage is not available:", e);
      return false;
    }
  },
  
  // Request storage permission explicitly for PWA context
  requestStoragePermission: async (): Promise<boolean> => {
    if (safeStorage.checkStorageAvailability()) {
      return true;
    }
    
    // Set flag to avoid asking multiple times
    if (localStorage.getItem(STORAGE_PERMISSION_ASKED) === "true") {
      return false;
    }
    
    try {
      // We can't actually "request" storage permission directly,
      // but we can notify the user and attempt a write operation
      console.log("Attempting to access local storage...");
      localStorage.setItem(STORAGE_PERMISSION_ASKED, "true");
      return safeStorage.checkStorageAvailability();
    } catch (e) {
      console.error("Failed to get storage permission:", e);
      return false;
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      if (!safeStorage.checkStorageAvailability()) {
        console.error("Storage is not available");
        return null;
      }
      
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      if (!safeStorage.checkStorageAvailability()) {
        console.error("Storage is not available");
        return false;
      }
      
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
      if (!safeStorage.checkStorageAvailability()) {
        console.error("Storage is not available");
        return false;
      }
      
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }
};

// Initialize storage on app load
(() => {
  safeStorage.requestStoragePermission().then(available => {
    if (!available) {
      console.warn("Storage permission not granted. App functionality will be limited.");
    }
  });
})();

export const storageService = {
  // Check storage availability - public method for UI to check
  isStorageAvailable: (): boolean => {
    return safeStorage.checkStorageAvailability();
  },

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
    try {
      const transactions = storageService.getTransactions();
      const newTransactions = [...transactions, transaction];
      console.log("Saving transaction:", transaction);
      console.log("All transactions:", newTransactions);
      return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(newTransactions));
    } catch (error) {
      console.error("Error saving transaction:", error);
      return false;
    }
  },

  updateTransaction: (transaction: Transaction): boolean => {
    try {
      const transactions = storageService.getTransactions();
      const index = transactions.findIndex((t) => t.id === transaction.id);
      if (index !== -1) {
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = transaction;
        console.log("Updating transaction:", transaction);
        return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
      }
      return false;
    } catch (error) {
      console.error("Error updating transaction:", error);
      return false;
    }
  },

  deleteTransaction: (id: string): boolean => {
    try {
      const transactions = storageService.getTransactions();
      const filtered = transactions.filter((t) => t.id !== id);
      console.log("Deleting transaction:", id);
      return safeStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return false;
    }
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
    try {
      const budgets = storageService.getBudgets();
      const existingIndex = budgets.findIndex((b) => b.category === budget.category);
      
      const updatedBudgets = [...budgets];
      if (existingIndex !== -1) {
        updatedBudgets[existingIndex] = budget;
      } else {
        updatedBudgets.push(budget);
      }
      
      return safeStorage.setItem(BUDGETS_KEY, JSON.stringify(updatedBudgets));
    } catch (error) {
      console.error("Error saving budget:", error);
      return false;
    }
  },

  updateBudgetSpent: (category: string, amount: number): boolean => {
    try {
      const budgets = storageService.getBudgets();
      const budget = budgets.find((b) => b.category === category);
      if (budget) {
        const updatedBudgets = [...budgets];
        const index = updatedBudgets.findIndex((b) => b.category === category);
        updatedBudgets[index] = {...budget, spent: budget.spent + amount};
        return safeStorage.setItem(BUDGETS_KEY, JSON.stringify(updatedBudgets));
      }
      return false;
    } catch (error) {
      console.error("Error updating budget spent:", error);
      return false;
    }
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
    try {
      const notes = storageService.getNotes();
      const newNotes = [...notes, note];
      console.log("Saving note:", note);
      return safeStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    } catch (error) {
      console.error("Error saving note:", error);
      return false;
    }
  },

  updateNote: (note: Note): boolean => {
    try {
      const notes = storageService.getNotes();
      const index = notes.findIndex((n) => n.id === note.id);
      if (index !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[index] = note;
        console.log("Updating note:", note);
        return safeStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      }
      return false;
    } catch (error) {
      console.error("Error updating note:", error);
      return false;
    }
  },

  deleteNote: (id: string): boolean => {
    try {
      const notes = storageService.getNotes();
      const filtered = notes.filter((n) => n.id !== id);
      console.log("Deleting note:", id);
      return safeStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting note:", error);
      return false;
    }
  },

  // Theme
  getTheme: (): "light" | "dark" | "system" => {
    return (safeStorage.getItem(THEME_KEY) as "light" | "dark" | "system") || "system";
  },

  setTheme: (theme: "light" | "dark" | "system"): boolean => {
    console.log("Setting theme:", theme);
    return safeStorage.setItem(THEME_KEY, theme);
  },

  // Currency
  getCurrency: (): string => {
    return safeStorage.getItem(CURRENCY_KEY) || "USD";
  },

  setCurrency: (currency: string): boolean => {
    console.log("Setting currency:", currency);
    return safeStorage.setItem(CURRENCY_KEY, currency);
  },

  // Debug
  clearAll: (): void => {
    try {
      safeStorage.removeItem(TRANSACTIONS_KEY);
      safeStorage.removeItem(BUDGETS_KEY);
      safeStorage.removeItem(NOTES_KEY);
      console.log("All data cleared from localStorage");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
};
