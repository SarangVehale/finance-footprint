
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { TransactionCategory } from "@/types/transaction";

interface CategoriesModalProps {
  categories: TransactionCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TransactionCategory[]>>;
}

const CategoriesModal: React.FC<CategoriesModalProps> = ({ 
  categories, 
  setCategories 
}) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory as TransactionCategory)) {
      setCategories([...categories, newCategory as TransactionCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: TransactionCategory) => {
    if (category !== "Other") {
      setCategories(categories.filter(c => c !== category));
    }
  };

  return (
    <div className="space-y-4 max-h-[60vh]">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
          placeholder="New category name"
        />
        <button
          onClick={handleAddCategory}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {categories.map((category, index) => (
          <div
            key={category}
            className="flex justify-between items-center p-2.5 sm:p-3 bg-accent rounded-lg group hover:bg-accent/80 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-foreground text-sm sm:text-base">{category}</span>
            {category !== "Other" && (
              <button
                onClick={() => handleDeleteCategory(category)}
                className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90"
              >
                <Trash2 size={16} className="sm:hidden" />
                <Trash2 size={18} className="hidden sm:block" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesModal;
