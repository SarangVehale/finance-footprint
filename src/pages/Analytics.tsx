
import React from "react";
import {
  PieChart as PieChartIcon,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Transaction, Budget } from "@/types/transaction";

const COLORS = [
  "#2a9d8f",
  "#e76f51",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#264653",
];

const Analytics = () => {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [budgets, setBudgets] = React.useState<Budget[]>([]);

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    const loadedBudgets = storageService.getBudgets();
    setTransactions(loadedTransactions);
    setBudgets(loadedBudgets);
  }, []);

  const expensesByCategory = React.useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const grouped = expenses.reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    return grouped;
  }, [transactions]);

  const totalIncome = React.useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = React.useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Analytics</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center text-green-500 mb-2">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm">Total Income</span>
            </div>
            <p className="text-lg font-semibold">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center text-red-500 mb-2">
              <TrendingUp size={16} className="mr-1 transform rotate-180" />
              <span className="text-sm">Total Expenses</span>
            </div>
            <p className="text-lg font-semibold">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#333"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`$${value.toFixed(0)}`}
                      </text>
                    );
                  }}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Budget Progress</h2>
          {budgets.map((budget) => (
            <div
              key={budget.category}
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{budget.category}</span>
                <span className="text-sm text-gray-500">
                  ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    budget.spent > budget.amount
                      ? "bg-red-500"
                      : budget.spent / budget.amount > 0.8
                      ? "bg-yellow-500"
                      : "bg-mint-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (budget.spent / budget.amount) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Analytics;
