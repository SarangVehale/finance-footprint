
import React from 'react';
import { useTheme } from "next-themes";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

const COLORS = [
  "#2a9d8f",
  "#e76f51",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#264653",
];

interface ExpenseDistributionProps {
  expensesByCategory: { name: string; value: number }[];
  currencySymbol: string;
}

/**
 * ExpenseDistribution - Component showing pie chart of expenses by category
 * 
 * @param expensesByCategory - Array of expense data by category
 * @param currencySymbol - Currency symbol to display
 */
const ExpenseDistribution: React.FC<ExpenseDistributionProps> = ({
  expensesByCategory,
  currencySymbol
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Expense Distribution</h2>
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
                    fill={(theme === "dark" || theme === "system") ? "#fff" : "#333"}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {`${currencySymbol}${value.toFixed(0)}`}
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
            <Tooltip
              formatter={(value: number) =>
                `${currencySymbol}${value.toFixed(2)}`
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseDistribution;
