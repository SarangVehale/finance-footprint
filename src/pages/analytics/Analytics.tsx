
import React, { useState, useMemo } from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Transaction } from "@/types/transaction";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from "date-fns";

// Import components
import AnalyticsFilters from "./components/AnalyticsFilters";
import OverviewCards from "./components/OverviewCards";
import ExpenseDistribution from "./components/ExpenseDistribution";
import ExpenseTrend from "./components/ExpenseTrend";
import CategoryBreakdown from "./components/CategoryBreakdown";

type DateRange = "week" | "month" | "year" | "custom";

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
  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  // Get currency symbol helper function
  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
      CAD: "C$", CHF: "Fr", CNY: "¥", INR: "₹",
    };
    return symbols[currency] || currency;
  };

  // Get date range for filtering
  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case "week":
        return { start: startOfWeek(now), end: endOfWeek(now) };
      case "month":
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case "year":
        return { start: startOfYear(now), end: endOfYear(now) };
      case "custom":
        return {
          start: new Date(customStartDate),
          end: new Date(customEndDate),
        };
      default:
        return { start: startOfMonth(now), end: endOfMonth(now) };
    }
  };

  // Filter transactions by date range
  const filteredTransactions = useMemo(() => {
    const { start, end } = getDateRange();
    return transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start, end })
    );
  }, [transactions, dateRange, customStartDate, customEndDate]);

  // Calculate expenses by category
  const expensesByCategory = useMemo(() => {
    const expenses = filteredTransactions.filter((t) => t.type === "expense");
    const grouped = expenses.reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    return grouped.sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Calculate daily expenses
  const dailyExpenses = useMemo(() => {
    const expenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => {
        const date = format(new Date(curr.date), "MMM d");
        const existing = acc.find((item) => item.date === date);
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push({ date, amount: curr.amount });
        }
        return acc;
      }, [] as { date: string; amount: number }[]);

    return expenses.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredTransactions]);

  // Calculate total income and expenses
  const totalIncome = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );

  const totalExpenses = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );

  const currencySymbol = getCurrencySymbol(currency);

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
