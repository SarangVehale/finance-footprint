
import React from "react";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Transaction } from "@/types/transaction";

const History = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  return (
    <MobileLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4"
            >
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
                <h3 className="font-medium">{transaction.category}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(transaction.date), "MMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-500">{transaction.description}</p>
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
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default History;
