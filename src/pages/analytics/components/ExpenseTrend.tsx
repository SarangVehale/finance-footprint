
import React from 'react';
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface ExpenseTrendProps {
  dailyExpenses: { date: string; amount: number }[];
  currencySymbol: string;
}

/**
 * ExpenseTrend - Component showing bar chart of expense trends over time
 * 
 * @param dailyExpenses - Array of expense data by date
 * @param currencySymbol - Currency symbol to display
 */
const ExpenseTrend: React.FC<ExpenseTrendProps> = ({
  dailyExpenses,
  currencySymbol
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Expense Trend</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyExpenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke={(theme === "dark" || theme === "system") ? "#fff" : "#333"}
            />
            <YAxis
              stroke={(theme === "dark" || theme === "system") ? "#fff" : "#333"}
              tickFormatter={(value) =>
                `${currencySymbol}${value}`
              }
            />
            <Tooltip
              formatter={(value: number) =>
                `${currencySymbol}${value.toFixed(2)}`
              }
            />
            <Bar dataKey="amount" fill="#2a9d8f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrend;
