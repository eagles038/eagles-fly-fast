import { cn } from '@/lib/utils';
import { DoughOption } from './types';
import { Circle, Cookie, CircleDot } from 'lucide-react';

interface DoughSelectorProps {
  options: DoughOption[];
  selected: DoughOption | null;
  onSelect: (option: DoughOption) => void;
}

const doughIcons: Record<string, React.ReactNode> = {
  thin: <Circle className="w-8 h-8" />,
  thick: <Cookie className="w-8 h-8" />,
  'cheese-crust': <CircleDot className="w-8 h-8" />,
};

export function DoughSelector({ options, selected, onSelect }: DoughSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Шаг 1 — Основа</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={cn(
              "flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300",
              selected?.id === option.id
                ? "border-primary bg-primary/10 shadow-orange"
                : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
            )}
          >
            <div className={cn(
              "mb-3 text-muted-foreground transition-colors",
              selected?.id === option.id && "text-primary"
            )}>
              {doughIcons[option.id]}
            </div>
            <span className="font-semibold text-foreground">{option.name}</span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              {option.description}
            </span>
            {option.priceModifier > 0 && (
              <span className="text-xs text-primary font-medium mt-2">
                +{option.priceModifier} ₽
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
