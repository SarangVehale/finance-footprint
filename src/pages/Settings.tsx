
import React from "react";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";
import ModalContainer, { ModalType } from "@/components/settings/ModalContainer";
import SettingsMenu from "@/components/settings/SettingsMenu";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [activeModal, setActiveModal] = React.useState<ModalType>(() => {
    // Check if we're coming back from a tutorial page with state
    if (location.state?.openModal) {
      return location.state.openModal;
    }
    return null;
  });
  const [newCategory, setNewCategory] = React.useState("");
  const [categories, setCategories] = React.useState<TransactionCategory[]>([
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Housing",
    "Salary",
    "Investment",
    "Other"
  ]);
  const [currency, setCurrency] = React.useState(storageService.getCurrency());

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    storageService.setCurrency(newCurrency);
    setActiveModal(null); // Auto-close the modal
  };

  return (
    <MobileLayout>
      <div className="p-4 sm:p-6 space-y-4 bg-background pt-safe-top">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground animate-fade-in">Settings</h1>

        <SettingsMenu setActiveModal={setActiveModal} />

        <ModalContainer 
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          theme={theme}
          handleThemeChange={handleThemeChange}
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </MobileLayout>
  );
};

export default Settings;
