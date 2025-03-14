import React from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  PlusCircle,
  MinusCircle,
  X,
  Pencil,
  Trash2,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Transaction, TransactionCategory } from "@/types/transaction";

const Index = () => {
  const { toast } = useToast();
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<"income" | "expense">("income");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState<TransactionCategory>("Food & Dining");
  const [description, setDescription] = React.useState("");
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);
  const [storageAvailable, setStorageAvailable] = React.useState(true);
  const currency = storageService.getCurrency();

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
    
    const available = storageService.isStorageAvailable();
    setStorageAvailable(available);
    
    if (!available) {
      toast({
        title: "Storage Access Issue",
        description: "This app needs storage access to save your data. Some features may not work properly.",
        variant: "destructive",
        duration: 6000,
      });
    }
  }, [toast]);

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
      CAD: "C$", CHF: "Fr", CNY: "¥", INR: "₹"
    };
    return symbols[currency] || currency;
  };

  const totalBalance = transactions.reduce(
    (sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
    0
  );

  const monthlyIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleOpenModal = (type: "income" | "expense", transaction?: Transaction) => {
    if (!storageAvailable) {
      toast({
        title: "Storage Access Required",
        description: "This app needs storage access to save your data. Please refresh the page and allow storage access.",
        variant: "destructive",
      });
      return;
    }
    
    if (transaction) {
      setEditingTransaction(transaction);
      setModalType(transaction.type);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDescription(transaction.description);
    } else {
      setEditingTransaction(null);
      setModalType(type);
      setAmount("");
      setCategory("Food & Dining");
      setDescription("");
    }
    setShowModal(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (!storageAvailable) {
      toast({
        title: "Storage Access Required",
        description: "Cannot delete transaction. Storage access is required.",
        variant: "destructive",
      });
      return;
    }
    
    const success = storageService.deleteTransaction(id);
    if (success) {
      setTransactions(transactions.filter(t => t.id !== id));
      toast({
        title: "Success",
        description: "Transaction deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddOrUpdateTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!storageAvailable) {
      toast({
        title: "Storage Access Required",
        description: "Cannot save transaction. Storage access is required.",
        variant: "destructive",
      });
      return;
    }

    const transactionData = {
      id: editingTransaction?.id || crypto.randomUUID(),
      type: modalType,
      amount: parseFloat(amount),
      category,
      date: editingTransaction?.date || new Date().toISOString(),
      description,
    };

    console.log("Attempting to save transaction:", transactionData);

    let success = false;
    if (editingTransaction) {
      success = storageService.updateTransaction(transactionData);
      if (success) {
        setTransactions(transactions.map(t => 
          t.id === transactionData.id ? transactionData : t
        ));
      }
    } else {
      success = storageService.saveTransaction(transactionData);
      if (success) {
        setTransactions([transactionData, ...transactions]);
      }
    }

    if (success) {
      setShowModal(false);
      toast({
        title: "Success",
        description: `Transaction ${editingTransaction ? "updated" : "added"} successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: `Failed to ${editingTransaction ? "update" : "add"} transaction. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 dark:bg-gray-900">
        {!storageAvailable && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4 flex items-center space-x-3 mb-4 animate-pulse">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-sm text-red-700 dark:text-red-300">
              Storage access is limited. Your data may not be saved.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
            <h1 className="text-3xl font-semibold animate-fade-in dark:text-white">
              {getCurrencySymbol(currency)}{totalBalance.toFixed(2)}
            </h1>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-green-500">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">Income</span>
              </div>
              <p className="text-lg font-medium animate-fade-in dark:text-white">
                {getCurrencySymbol(currency)}{monthlyIncome.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-red-500">
                <TrendingUp size={16} className="mr-1 transform rotate-180" />
                <span className="text-sm">Expenses</span>
              </div>
              <p className="text-lg font-medium animate-fade-in dark:text-white">
                {getCurrencySymbol(currency)}{monthlyExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleOpenModal("income")}
            className="flex items-center justify-center space-x-2 bg-mint-500 text-white p-4 rounded-xl transition-all duration-300 hover:bg-mint-600 active:scale-95 shadow-sm hover:shadow-md"
          >
            <PlusCircle size={20} />
            <span>Add Income</span>
          </button>
          <button
            onClick={() => handleOpenModal("expense")}
            className="flex items-center justify-center space-x-2 bg-red-500 text-white p-4 rounded-xl transition-all duration-300 hover:bg-red-600 active:scale-95 shadow-sm hover:shadow-md"
          >
            <MinusCircle size={20} />
            <span>Add Expense</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    <DollarSign size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium dark:text-white">{transaction.category}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <p
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {getCurrencySymbol(currency)}
                      {transaction.amount.toFixed(2)}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(transaction.type, transaction)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <Pencil size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">
                  {editingTransaction ? "Edit" : "Add"} {modalType === "income" ? "Income" : "Expense"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} className="dark:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                    placeholder="Enter description"
                  />
                </div>

                <button
                  onClick={handleAddOrUpdateTransaction}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                    modalType === "income"
                      ? "bg-mint-500 hover:bg-mint-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {editingTransaction ? "Update" : "Add"} {modalType === "income" ? "Income" : "Expense"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Index;
