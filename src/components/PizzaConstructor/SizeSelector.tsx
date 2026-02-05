import { cn } from '@/lib/utils';
import { SizeOption } from './types';

interface SizeSelectorProps {
  options: SizeOption[];
  selected: SizeOption | null;
  onSelect: (option: SizeOption) => void;
}

export function SizeSelector({ options, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">Шаг 2 — Размер</h3>
      <div className="flex gap-3 justify-center">
        {options.map((option, index) => {
          const sizes = [60, 80, 100]; // visual sizes for icons
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={cn(
                "flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 flex-1 max-w-[140px]",
                selected?.id === option.id
                  ? "border-primary bg-primary/10 shadow-orange"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
              )}
            >
              <div
                className={cn(
                  "rounded-full border-4 flex items-center justify-center mb-3 transition-all",
                  selected?.id === option.id
                    ? "border-primary bg-primary/20"
                    : "border-muted-foreground/30 bg-secondary"
                )}
                style={{ width: sizes[index], height: sizes[index] }}
              >
                <span className="text-lg font-bold">{option.diameter}</span>
              </div>
              <span className="font-semibold text-foreground">{option.name}</span>
              <span className="text-xs text-muted-foreground">{option.diameter} см</span>
              {option.priceModifier > 0 && (
                <span className="text-xs text-primary font-medium mt-1">
                  +{option.priceModifier} ₽
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
