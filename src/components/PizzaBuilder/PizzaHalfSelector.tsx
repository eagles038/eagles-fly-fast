import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { PizzaBase, pizzaBases } from '@/lib/pizza-data';

interface PizzaHalfSelectorProps {
  selectedPizza: PizzaBase | null;
  onSelect: (pizza: PizzaBase) => void;
  onClear: () => void;
  half: 'left' | 'right';
  isActive: boolean;
  onActivate: () => void;
}

export function PizzaHalfSelector({
  selectedPizza,
  onSelect,
  onClear,
  half,
  isActive,
  onActivate,
}: PizzaHalfSelectorProps) {
  return (
    <div 
      className={cn(
        "flex-1 min-w-0 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden",
        isActive 
          ? "border-primary shadow-lg ring-2 ring-primary/20" 
          : "border-border hover:border-primary/50",
        selectedPizza && "bg-gradient-to-br from-primary/5 to-primary/10"
      )}
      onClick={onActivate}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {half === 'left' ? 'Левая половина' : 'Правая половина'}
          </span>
          {selectedPizza && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-1 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {selectedPizza ? (
          <div className="flex items-center gap-3">
            <img 
              src={selectedPizza.image} 
              alt={selectedPizza.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{selectedPizza.name}</h4>
              <p className="text-sm text-muted-foreground truncate">{selectedPizza.description}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/30">
            <span className="text-sm text-muted-foreground">Выберите пиццу</span>
          </div>
        )}
      </div>

      {/* Pizza selection dropdown */}
      {isActive && (
        <div className="border-t border-border bg-background/80 backdrop-blur-sm p-3 max-h-60 overflow-y-auto">
          <div className="grid gap-2">
            {pizzaBases.map((pizza) => (
              <button
                key={pizza.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(pizza);
                }}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-xl transition-all w-full text-left",
                  selectedPizza?.id === pizza.id
                    ? "bg-primary/10 border-2 border-primary"
                    : "hover:bg-accent border-2 border-transparent"
                )}
              >
                <img 
                  src={pizza.image} 
                  alt={pizza.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{pizza.name}</span>
                  <p className="text-xs text-muted-foreground truncate">{pizza.description}</p>
                </div>
                <span className="text-sm font-semibold text-primary whitespace-nowrap">
                  {pizza.basePrice} ₽
                </span>
                {selectedPizza?.id === pizza.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
