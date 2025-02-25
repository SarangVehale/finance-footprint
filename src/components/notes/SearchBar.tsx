
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative animate-fade-in">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full pl-10 pr-4 py-2 border rounded-2xl bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-foreground"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
