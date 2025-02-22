
import React from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { format } from "date-fns";
import MobileLayout from "@/components/MobileLayout";

const Index = () => {
  const transactions = [
    {
      id: 1,
      type: "expense",
      amount: 42.50,
      category: "Food & Dining",
      date: new Date(),
      description: "Grocery shopping",
    },
    {
      id: 2,
      type: "income",
      amount: 2000,
      category: "Salary",
      date: new Date(),
      description: "Monthly salary",
    },
  ];

  const totalBalance = 3580.75;
  const monthlyIncome = 4500;
  const monthlyExpenses = 919.25;

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Balance</p>
            <h1 className="text-3xl font-semibold">${totalBalance.toFixed(2)}</h1>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-green-500">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">Income</span>
              </div>
              <p className="text-lg font-medium">
                ${monthlyIncome.toFixed(2)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-red-500">
                <TrendingUp size={16} className="mr-1 transform rotate-180" />
                <span className="text-sm">Expenses</span>
              </div>
              <p className="text-lg font-medium">
                ${monthlyExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-mint-500 text-white p-4 rounded-xl transition-transform active:scale-95">
            <PlusCircle size={20} />
            <span>Add Income</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-red-500 text-white p-4 rounded-xl transition-transform active:scale-95">
            <MinusCircle size={20} />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
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
                    {format(transaction.date, "MMM d, yyyy")}
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
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
