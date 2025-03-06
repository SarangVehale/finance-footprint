
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

type DateRange = "week" | "month" | "year" | "custom";

interface AnalyticsFiltersProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
}

/**
 * AnalyticsFilters - Component for filtering analytics data by date range
 * 
 * @param dateRange - Current selected date range
 * @param setDateRange - Function to update date range
 * @param customStartDate - Custom start date for custom range
 * @param setCustomStartDate - Function to set custom start date
 * @param customEndDate - Custom end date for custom range
 * @param setCustomEndDate - Function to set custom end date
 * @param showDateFilter - Whether filter UI is shown
 * @param setShowDateFilter - Function to toggle filter UI
 */
const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  dateRange,
  setDateRange,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  showDateFilter,
  setShowDateFilter
}) => {
  return (
    <>
      <button
        onClick={() => setShowDateFilter(!showDateFilter)}
        className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter size={16} />
        <span className="dark:text-white">{dateRange}</span>
        <ChevronDown size={16} />
      </button>

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
    </>
  );
};

export default AnalyticsFilters;
