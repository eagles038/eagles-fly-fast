import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ToppingOption } from './types';
import { Check } from 'lucide-react';

interface ToppingsSelectorProps {
  options: ToppingOption[];
  selected: ToppingOption[];
  onToggle: (option: ToppingOption) => void;
}

const categoryNames: Record<string, string> = {
  sauce: 'Соус',
  meat: 'Мясо',
  vegetables: 'Овощи',
  cheese: 'Сыры',
};

const categoryOrder = ['sauce', 'meat', 'vegetables', 'cheese'] as const;

export function ToppingsSelector({ options, selected, onToggle }: ToppingsSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('sauce');

  const groupedOptions = categoryOrder.reduce((acc, category) => {
    acc[category] = options.filter((o) => o.category === category);
    return acc;
  }, {} as Record<string, ToppingOption[]>);

  const isSelected = (option: ToppingOption) =>
    selected.some((t) => t.id === option.id);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">3. Добавьте начинку</h3>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categoryOrder.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-primary/20"
            )}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>

      {/* Toppings grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {groupedOptions[activeCategory]?.map((option) => {
          const checked = isSelected(option);
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option)}
              className={cn(
                "relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200",
                checked
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {checked && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-sm font-medium text-foreground text-center">
                {option.name}
              </span>
              <span className={cn(
                "text-xs font-medium mt-1",
                option.price === 0 ? "text-green-500" : "text-primary"
              )}>
                {option.price === 0 ? 'Бесплатно' : `+${option.price} ₽`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected toppings summary */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selected.map((topping) => (
            <span
              key={topping.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {topping.icon} {topping.name}
              <button
                onClick={() => onToggle(topping)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
