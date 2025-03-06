
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface OverviewCardsProps {
  totalIncome: number;
  totalExpenses: number;
  currencySymbol: string;
}

/**
 * OverviewCards - Component showing income and expense summary cards
 * 
 * @param totalIncome - Total income value
 * @param totalExpenses - Total expenses value
 * @param currencySymbol - Currency symbol to display
 */
const OverviewCards: React.FC<OverviewCardsProps> = ({
  totalIncome,
  totalExpenses,
  currencySymbol
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center text-green-500 mb-2">
          <TrendingUp size={16} className="mr-1" />
          <span className="text-sm dark:text-white">Total Income</span>
        </div>
        <p className="text-lg font-semibold dark:text-white">
          {currencySymbol}
          {totalIncome.toFixed(2)}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center text-red-500 mb-2">
          <TrendingUp size={16} className="mr-1 transform rotate-180" />
          <span className="text-sm dark:text-white">Total Expenses</span>
        </div>
        <p className="text-lg font-semibold dark:text-white">
          {currencySymbol}
          {totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OverviewCards;
