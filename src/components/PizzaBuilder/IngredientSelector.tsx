import { cn } from '@/lib/utils';
import { Plus, Minus, Check, X } from 'lucide-react';
import { Ingredient, ingredients } from '@/lib/pizza-data';

interface SelectedIngredient {
  id: string;
  isDouble: boolean;
  isRemoved: boolean;
}

interface IngredientSelectorProps {
  selectedIngredients: SelectedIngredient[];
  defaultIngredients: string[];
  onToggleIngredient: (ingredientId: string) => void;
  onToggleDouble: (ingredientId: string) => void;
  onRemoveDefault: (ingredientId: string) => void;
}

const categoryLabels: Record<string, string> = {
  meat: '🍖 Мясо',
  seafood: '🦐 Морепродукты',
  cheese: '🧀 Сыры',
  vegetable: '🥬 Овощи и грибы',
  sauce: '🍯 Соусы',
};

const categoryOrder = ['meat', 'seafood', 'cheese', 'vegetable', 'sauce'];

export function IngredientSelector({
  selectedIngredients,
  defaultIngredients,
  onToggleIngredient,
  onToggleDouble,
  onRemoveDefault,
}: IngredientSelectorProps) {
  const ingredientsByCategory = categoryOrder.reduce((acc, category) => {
    acc[category] = ingredients.filter(ing => ing.category === category);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  const isIngredientSelected = (id: string) => {
    const selected = selectedIngredients.find(s => s.id === id);
    return selected && !selected.isRemoved;
  };

  const isIngredientDouble = (id: string) => {
    const selected = selectedIngredients.find(s => s.id === id);
    return selected?.isDouble ?? false;
  };

  const isDefaultIngredient = (id: string) => {
    return defaultIngredients.includes(id);
  };

  const isRemovedDefault = (id: string) => {
    const selected = selectedIngredients.find(s => s.id === id);
    return isDefaultIngredient(id) && selected?.isRemoved;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span>🍕</span> Добавить ингредиенты
      </h3>

      {categoryOrder.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            {categoryLabels[category]}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ingredientsByCategory[category]?.map(ingredient => {
              const isSelected = isIngredientSelected(ingredient.id);
              const isDouble = isIngredientDouble(ingredient.id);
              const isDefault = isDefaultIngredient(ingredient.id);
              const isRemoved = isRemovedDefault(ingredient.id);

              return (
                <div
                  key={ingredient.id}
                  className={cn(
                    "relative flex flex-col p-3 rounded-xl border-2 transition-all",
                    isRemoved 
                      ? "border-destructive/50 bg-destructive/5 opacity-60"
                      : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{ingredient.icon}</span>
                      <span className="text-sm font-medium leading-tight">{ingredient.name}</span>
                    </div>
                    {isDefault && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-secondary text-muted-foreground rounded-full whitespace-nowrap">
                        В составе
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className={cn(
                      "text-sm font-semibold",
                      isDouble ? "text-primary" : "text-foreground"
                    )}>
                      {isDouble ? `+${ingredient.price * 2}` : `+${ingredient.price}`} ₽
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Remove default ingredient */}
                      {isDefault && !isRemoved && (
                        <button
                          onClick={() => onRemoveDefault(ingredient.id)}
                          className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                          title="Убрать ингредиент"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Restore removed default ingredient */}
                      {isRemoved && (
                        <button
                          onClick={() => onRemoveDefault(ingredient.id)}
                          className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Вернуть ингредиент"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}

                      {/* Add/remove ingredient (non-default) */}
                      {!isDefault && (
                        <button
                          onClick={() => onToggleIngredient(ingredient.id)}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-accent"
                          )}
                        >
                          {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      )}

                      {/* Double portion */}
                      {isSelected && !isRemoved && (
                        <button
                          onClick={() => onToggleDouble(ingredient.id)}
                          className={cn(
                            "p-1.5 rounded-lg text-xs font-bold transition-colors",
                            isDouble
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-accent"
                          )}
                          title="Двойная порция"
                        >
                          x2
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
