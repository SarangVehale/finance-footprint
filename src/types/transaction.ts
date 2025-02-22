
export type TransactionType = "income" | "expense";
export type TransactionCategory =
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Healthcare"
  | "Utilities"
  | "Housing"
  | "Salary"
  | "Investment"
  | "Other";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  date: string;
  description: string;
}

export interface Budget {
  category: TransactionCategory;
  amount: number;
  spent: number;
}
