
import React, { useState, useEffect } from "react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Transaction } from "@/types/transaction";

// Import components
import AnalyticsFilters from "./components/AnalyticsFilters";
import OverviewCards from "./components/OverviewCards";
import ExpenseDistribution from "./components/ExpenseDistribution";
import ExpenseTrend from "./components/ExpenseTrend";
import CategoryBreakdown from "./components/CategoryBreakdown";

// Import hooks
import { useAnalyticsData, DateRange } from "./hooks/useAnalyticsData";

/**
 * Analytics - Page component for financial analytics and data visualization
 * 
 * Provides filtering options, summary cards, and various charts to visualize financial data.
 */
const Analytics = () => {
  // State for filters and data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  // Get currency from storage
  const currency = storageService.getCurrency();

  // Load transactions on component mount
  useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  // Use the analytics data hook
  const {
    expensesByCategory,
    dailyExpenses,
    totalIncome,
    totalExpenses,
    currencySymbol
  } = useAnalyticsData({
    transactions,
    dateRange,
    customStartDate,
    customEndDate,
    currency
  });

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Analytics</h1>
          <AnalyticsFilters 
            dateRange={dateRange}
            setDateRange={setDateRange}
            customStartDate={customStartDate}
            setCustomStartDate={setCustomStartDate}
            customEndDate={customEndDate}
            setCustomEndDate={setCustomEndDate}
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
          />
        </div>

        {/* Overview Cards */}
        <OverviewCards 
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          currencySymbol={currencySymbol}
        />

        {/* Expense Distribution */}
        <ExpenseDistribution 
          expensesByCategory={expensesByCategory}
          currencySymbol={currencySymbol}
        />

        {/* Daily Expenses Trend */}
        <ExpenseTrend 
          dailyExpenses={dailyExpenses}
          currencySymbol={currencySymbol}
        />

        {/* Category Breakdown */}
        <CategoryBreakdown 
          expensesByCategory={expensesByCategory}
          totalExpenses={totalExpenses}
          currencySymbol={currencySymbol}
        />
      </div>
    </MobileLayout>
  );
};

export default Analytics;
