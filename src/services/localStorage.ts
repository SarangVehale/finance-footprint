
import { Transaction, Budget } from "@/types/transaction";

const TRANSACTIONS_KEY = "finance_transactions";
const BUDGETS_KEY = "finance_budgets";

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
};
