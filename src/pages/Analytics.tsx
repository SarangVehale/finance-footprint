
import React from "react";
import { useTheme } from "next-themes";
import {
  PieChart as PieChartIcon,
  TrendingUp,
  Calendar,
  ChevronDown,
  Filter,
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Transaction } from "@/types/transaction";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from "date-fns";

type DateRange = "week" | "month" | "year" | "custom";

const COLORS = [
  "#2a9d8f",
  "#e76f51",
  "#2a9d8f",
  "#e9c46a",
  "#f4a261",
  "#264653",
];

const Analytics = () => {
  const { theme } = useTheme();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange>("month");
  const [customStartDate, setCustomStartDate] = React.useState<string>("");
  const [customEndDate, setCustomEndDate] = React.useState<string>("");
  const [showDateFilter, setShowDateFilter] = React.useState(false);
  const currency = storageService.getCurrency();

  React.useEffect(() => {
    const loadedTransactions = storageService.getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      CAD: "C$",
      CHF: "Fr",
      CNY: "¥",
      INR: "₹",
    };
    return symbols[currency] || currency;
  };

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

  const filteredTransactions = React.useMemo(() => {
    const { start, end } = getDateRange();
    return transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start, end })
    );
  }, [transactions, dateRange, customStartDate, customEndDate]);

  const expensesByCategory = React.useMemo(() => {
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

  const dailyExpenses = React.useMemo(() => {
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

  const totalIncome = React.useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );

  const totalExpenses = React.useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Analytics</h1>
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter size={16} />
            <span className="dark:text-white">{dateRange}</span>
            <ChevronDown size={16} />
          </button>
        </div>

        {showDateFilter && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {["week", "month", "year", "custom"].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range as DateRange);
                    if (range !== "custom") setShowDateFilter(false);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    dateRange === range
                      ? "bg-mint-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center text-green-500 mb-2">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm dark:text-white">Total Income</span>
            </div>
            <p className="text-lg font-semibold dark:text-white">
              {getCurrencySymbol(currency)}
              {totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center text-red-500 mb-2">
              <TrendingUp size={16} className="mr-1 transform rotate-180" />
              <span className="text-sm dark:text-white">Total Expenses</span>
            </div>
            <p className="text-lg font-semibold dark:text-white">
              {getCurrencySymbol(currency)}
              {totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Expense Distribution */}
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
                        {`${getCurrencySymbol(currency)}${value.toFixed(0)}`}
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
                    `${getCurrencySymbol(currency)}${value.toFixed(2)}`
                  }
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Expenses Trend */}
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
                    `${getCurrencySymbol(currency)}${value}`
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    `${getCurrencySymbol(currency)}${value.toFixed(2)}`
                  }
                />
                <Bar dataKey="amount" fill="#2a9d8f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Category Breakdown</h2>
          <div className="space-y-4">
            {expensesByCategory.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm dark:text-white">{category.name}</span>
                  <span className="text-sm font-medium dark:text-white">
                    {getCurrencySymbol(currency)}
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
      </div>
    </MobileLayout>
  );
};

export default Analytics;
