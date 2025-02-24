
import React from "react";
import { format } from "date-fns";
import { DollarSign, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Transaction, TransactionCategory } from "@/types/transaction";

const History = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const currency = storageService.getCurrency();

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
      CAD: "C$", CHF: "Fr", CNY: "¥", INR: "₹"
    };
    return symbols[currency] || currency;
  };

  const handleDeleteTransaction = (id: string) => {
    storageService.deleteTransaction(id);
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
      title: "Success",
      description: "Transaction deleted successfully",
    });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  const handleUpdateTransaction = () => {
    if (editingTransaction) {
      storageService.updateTransaction(editingTransaction);
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? editingTransaction : t
      ));
      setShowEditModal(false);
      setEditingTransaction(null);
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    }
  };

  return (
    <MobileLayout>
      <div className="p-6 bg-background">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Transaction History</h1>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-card p-4 rounded-xl shadow-sm flex items-center space-x-4 border border-border"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "income"
                    ? "bg-green-100 dark:bg-green-900 text-green-500"
                    : "bg-red-100 dark:bg-red-900 text-red-500"
                }`}
              >
                <DollarSign size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{transaction.category}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "MMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
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
                    onClick={() => handleEditTransaction(transaction)}
                    className="p-1 hover:bg-accent rounded-full transition-colors"
                  >
                    <Pencil size={16} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="p-1 hover:bg-accent rounded-full transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Transaction Modal */}
        {showEditModal && editingTransaction && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-foreground">Edit Transaction</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={editingTransaction.amount}
                    onChange={(e) => setEditingTransaction({
                      ...editingTransaction,
                      amount: parseFloat(e.target.value)
                    })}
                    className="w-full p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Category
                  </label>
                  <select
                    value={editingTransaction.category}
                    onChange={(e) => setEditingTransaction({
                      ...editingTransaction,
                      category: e.target.value as TransactionCategory
                    })}
                    className="w-full p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
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
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingTransaction.description}
                    onChange={(e) => setEditingTransaction({
                      ...editingTransaction,
                      description: e.target.value
                    })}
                    className="w-full p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={handleUpdateTransaction}
                  className="w-full py-3 rounded-lg bg-mint-500 text-white font-medium hover:bg-mint-600 transition-all"
                >
                  Update Transaction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default History;
