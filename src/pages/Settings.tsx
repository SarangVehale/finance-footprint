
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Transaction, TransactionCategory, Budget } from "@/types/transaction";
import { storageService } from "@/services/localStorage";

const Settings = () => {
  const [budgets, setBudgets] = React.useState<Budget[]>([]);
  const [newCategory, setNewCategory] = React.useState<TransactionCategory>("Food & Dining");
  const [newAmount, setNewAmount] = React.useState("");

  React.useEffect(() => {
    const loadedBudgets = storageService.getBudgets();
    setBudgets(loadedBudgets);
  }, []);

  const handleAddBudget = () => {
    if (!newAmount) return;

    const budget: Budget = {
      category: newCategory,
      amount: parseFloat(newAmount),
      spent: 0,
    };

    storageService.saveBudget(budget);
    setBudgets([...budgets, budget]);
    setNewAmount("");
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Budget Management */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Budget Management</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as TransactionCategory)}
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Utilities">Utilities</option>
                <option value="Housing">Housing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget Amount
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <button
              className="w-full bg-mint-500 text-white py-2 rounded-lg hover:bg-mint-600 transition-colors"
              onClick={handleAddBudget}
            >
              Add Budget
            </button>
          </div>

          {/* Current Budgets */}
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Current Budgets</h3>
            {budgets.map((budget) => (
              <div
                key={budget.category}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <span>{budget.category}</span>
                <span className="font-medium">${budget.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-600">
            Finance Footprint v1.0.0
            <br />
            A simple, effective way to track your finances.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
