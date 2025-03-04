
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { useLocation, useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { TransactionCategory } from "@/types/transaction";
import { storageService } from "@/services/localStorage";
import ModalContainer, { ModalType } from "@/components/settings/ModalContainer";
import SettingsMenu from "@/components/settings/SettingsMenu";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeModal, setActiveModal] = React.useState<ModalType>(() => {
    // Check if we're coming back from a tutorial page with state
    if (location.state?.openModal) {
      return location.state.openModal;
    }
    return null;
  });
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
    toast({
      title: "Theme Updated",
      description: `Theme set to ${newTheme} mode`,
      duration: 2000,
    });
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    storageService.setCurrency(newCurrency);
    toast({
      title: "Currency Updated",
      description: `Currency set to ${newCurrency}`,
      duration: 2000,
    });
    setActiveModal(null); // Auto-close the modal
  };

  // Handle back button logic for settings submenus
  const handleBackClick = () => {
    if (activeModal) {
      setActiveModal(null); // Go back to main settings if in a modal
      return;
    }
    
    navigate('/home'); // Go back to home if on main settings page
  };

  return (
    <MobileLayout 
      showBackButton={true}
      onBackClick={handleBackClick}
      title="Settings"
    >
      <div className="p-4 sm:p-6 space-y-4 bg-background">
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
