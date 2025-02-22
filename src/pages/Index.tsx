
import React from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  PlusCircle,
  MinusCircle,
  X,
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

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

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

  const handleOpenModal = (type: "income" | "expense") => {
    setModalType(type);
    setShowModal(true);
    setAmount("");
    setDescription("");
  };

  const handleAddTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type: modalType,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
      description,
    };

    storageService.saveTransaction(transaction);
    setTransactions([transaction, ...transactions]);
    setShowModal(false);
    
    toast({
      title: "Success",
      description: `${modalType === "income" ? "Income" : "Expense"} added successfully`,
    });
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Balance</p>
            <h1 className="text-3xl font-semibold animate-fade-in">
              ${totalBalance.toFixed(2)}
            </h1>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-green-500">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">Income</span>
              </div>
              <p className="text-lg font-medium animate-fade-in">
                ${monthlyIncome.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-red-500">
                <TrendingUp size={16} className="mr-1 transform rotate-180" />
                <span className="text-sm">Expenses</span>
              </div>
              <p className="text-lg font-medium animate-fade-in">
                ${monthlyExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
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

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    <DollarSign size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{transaction.category}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Add {modalType === "income" ? "Income" : "Expense"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
                    placeholder="Enter description"
                  />
                </div>

                <button
                  onClick={handleAddTransaction}
                  className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                    modalType === "income"
                      ? "bg-mint-500 hover:bg-mint-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Add {modalType === "income" ? "Income" : "Expense"}
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
