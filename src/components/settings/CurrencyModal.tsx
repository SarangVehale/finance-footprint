
import React from "react";

interface CurrencyModalProps {
  currency: string;
  handleCurrencyChange: (currency: string) => void;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({ 
  currency, 
  handleCurrencyChange 
}) => {
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
    { code: "CHF", symbol: "Fr" },
    { code: "CNY", symbol: "¥" },
    { code: "INR", symbol: "₹" }
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {currencies.map((curr) => (
        <button
          key={curr.code}
          onClick={() => handleCurrencyChange(curr.code)}
          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
            currency === curr.code
              ? "bg-mint-50 dark:bg-mint-900/20 text-mint-500"
              : "hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          <span className="text-sm sm:text-base">{curr.code}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {curr.symbol}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CurrencyModal;
