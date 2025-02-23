import { Transaction, Budget } from "@/types/transaction";
import { Note } from "@/types/note";

const TRANSACTIONS_KEY = "finance_transactions";
const BUDGETS_KEY = "finance_budgets";
const NOTES_KEY = "finance_notes";
const THEME_KEY = "finance_theme";
const CURRENCY_KEY = "finance_currency";

export const storageService = {
  // Transactions
  getTransactions: (): Transaction[] => {
    const stored = localStorage.getItem(TRANSACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveTransaction: (transaction: Transaction) => {
    const transactions = storageService.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  },

  updateTransaction: (transaction: Transaction) => {
    const transactions = storageService.getTransactions();
    const index = transactions.findIndex((t) => t.id === transaction.id);
    if (index !== -1) {
      transactions[index] = transaction;
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
  },

  deleteTransaction: (id: string) => {
    const transactions = storageService.getTransactions();
    const filtered = transactions.filter((t) => t.id !== id);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
  },

  // Budgets
  getBudgets: (): Budget[] => {
    const stored = localStorage.getItem(BUDGETS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveBudget: (budget: Budget) => {
    const budgets = storageService.getBudgets();
    const existingIndex = budgets.findIndex((b) => b.category === budget.category);
    
    if (existingIndex !== -1) {
      budgets[existingIndex] = budget;
    } else {
      budgets.push(budget);
    }
    
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  },

  updateBudgetSpent: (category: string, amount: number) => {
    const budgets = storageService.getBudgets();
    const budget = budgets.find((b) => b.category === category);
    if (budget) {
      budget.spent += amount;
      localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
    }
  },

  // Notes
  getNotes: (): Note[] => {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveNote: (note: Note) => {
    const notes = storageService.getNotes();
    notes.push(note);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  updateNote: (note: Note) => {
    const notes = storageService.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes[index] = note;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }
  },

  deleteNote: (id: string) => {
    const notes = storageService.getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  },

  // Theme
  getTheme: (): "light" | "dark" | "system" => {
    return (localStorage.getItem(THEME_KEY) as "light" | "dark" | "system") || "system";
  },

  setTheme: (theme: "light" | "dark" | "system") => {
    localStorage.setItem(THEME_KEY, theme);
  },

  // Currency
  getCurrency: (): string => {
    return localStorage.getItem(CURRENCY_KEY) || "USD";
  },

  setCurrency: (currency: string) => {
    localStorage.setItem(CURRENCY_KEY, currency);
  },
};
