import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flame, Leaf, Drumstick, Pizza, Fish, Star, Percent, Beef, Sparkles } from 'lucide-react';

export type FilterOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

interface CategoryFilterProps {
  filters: FilterOption[];
  selectedFilters: string[];
  onFilterChange: (filterId: string) => void;
}

export function CategoryFilter({ filters, selectedFilters, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => {
        const isActive = selectedFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              'border hover:shadow-md',
              isActive
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent'
            )}
          >
            {filter.icon && <span className="w-4 h-4">{filter.icon}</span>}
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

// Filter definitions for each category
export const pizzaFilters: FilterOption[] = [
  { id: 'sale', label: 'Акция', icon: <Percent className="w-4 h-4" /> },
  { id: 'spicy', label: 'Острая', icon: <Flame className="w-4 h-4" /> },
  { id: 'vegetarian', label: 'Вегетарианская', icon: <Leaf className="w-4 h-4" /> },
  { id: 'with-chicken', label: 'С курицей', icon: <Drumstick className="w-4 h-4" /> },
  { id: 'with-meat', label: 'С мясом', icon: <Beef className="w-4 h-4" /> },
  { id: 'cheese', label: 'Сырная', icon: <Pizza className="w-4 h-4" /> },
];

export const rollsFilters: FilterOption[] = [
  { id: 'sale', label: 'Акция', icon: <Percent className="w-4 h-4" /> },
  { id: 'hot', label: 'Хит', icon: <Star className="w-4 h-4" /> },
  { id: 'baked', label: 'Запечённые', icon: <Flame className="w-4 h-4" /> },
  { id: 'with-salmon', label: 'С лососем', icon: <Fish className="w-4 h-4" /> },
  { id: 'with-eel', label: 'С угрём', icon: <Fish className="w-4 h-4" /> },
  { id: 'premium', label: 'Премиум', icon: <Sparkles className="w-4 h-4" /> },
];

export const burgersFilters: FilterOption[] = [
  { id: 'sale', label: 'Акция', icon: <Percent className="w-4 h-4" /> },
  { id: 'spicy', label: 'Острый', icon: <Flame className="w-4 h-4" /> },
  { id: 'with-beef', label: 'С говядиной', icon: <Beef className="w-4 h-4" /> },
  { id: 'with-chicken', label: 'С курицей', icon: <Drumstick className="w-4 h-4" /> },
  { id: 'double', label: 'Двойной', icon: <Star className="w-4 h-4" /> },
];
