
import React from 'react';

interface CategoryBreakdownProps {
  expensesByCategory: { name: string; value: number }[];
  totalExpenses: number;
  currencySymbol: string;
}

/**
 * CategoryBreakdown - Component showing detailed breakdown of expenses by category
 * 
 * @param expensesByCategory - Array of expense data by category
 * @param totalExpenses - Total expenses value
 * @param currencySymbol - Currency symbol to display
 */
const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  expensesByCategory,
  totalExpenses,
  currencySymbol
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Category Breakdown</h2>
      <div className="space-y-4">
        {expensesByCategory.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm dark:text-white">{category.name}</span>
              <span className="text-sm font-medium dark:text-white">
                {currencySymbol}
                {category.value.toFixed(2)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-mint-500"
                style={{
                  width: `${(category.value / totalExpenses) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
