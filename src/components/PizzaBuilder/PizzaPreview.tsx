import { cn } from '@/lib/utils';
import { PizzaBase, getIngredientById } from '@/lib/pizza-data';

interface SelectedIngredient {
  id: string;
  isDouble: boolean;
  isRemoved: boolean;
}

interface PizzaPreviewProps {
  leftPizza: PizzaBase | null;
  rightPizza: PizzaBase | null;
  isHalfMode: boolean;
  leftIngredients: SelectedIngredient[];
  rightIngredients: SelectedIngredient[];
  activeHalf: 'left' | 'right' | null;
  onSelectHalf: (half: 'left' | 'right') => void;
}

export function PizzaPreview({
  leftPizza,
  rightPizza,
  isHalfMode,
  leftIngredients,
  rightIngredients,
  activeHalf,
  onSelectHalf,
}: PizzaPreviewProps) {
  const renderIngredientBadges = (ingredients: SelectedIngredient[], defaultIngredients: string[]) => {
    const allIngredients = [
      ...defaultIngredients.map(id => ({ id, isDouble: false, isRemoved: false, isDefault: true })),
      ...ingredients.filter(ing => !defaultIngredients.includes(ing.id)).map(ing => ({ ...ing, isDefault: false })),
    ];

    const visibleIngredients = allIngredients.filter(ing => {
      if (ing.isDefault) {
        const modified = ingredients.find(i => i.id === ing.id);
        return !modified?.isRemoved;
      }
      return !ing.isRemoved;
    });

    if (visibleIngredients.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {visibleIngredients.slice(0, 6).map(ing => {
          const ingredient = getIngredientById(ing.id);
          if (!ingredient) return null;
          
          const modified = ingredients.find(i => i.id === ing.id);
          const isDouble = modified?.isDouble ?? false;

          return (
            <span
              key={ing.id}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
                isDouble ? "bg-primary/20 text-primary font-semibold" : "bg-secondary text-foreground"
              )}
            >
              {ingredient.icon} {ingredient.name}
              {isDouble && <span className="text-[10px]">x2</span>}
            </span>
          );
        })}
        {visibleIngredients.length > 6 && (
          <span className="text-xs text-muted-foreground">+{visibleIngredients.length - 6}</span>
        )}
      </div>
    );
  };

  if (!leftPizza && !rightPizza) {
    return (
      <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-muted/30 to-muted/50 rounded-full flex items-center justify-center">
        <div className="text-center p-8">
          <span className="text-6xl mb-4 block">🍕</span>
          <p className="text-muted-foreground">Выберите пиццу для начала</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* Pizza visualization */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/20">
        {isHalfMode && leftPizza && rightPizza ? (
          // Half-and-half pizza
          <div className="relative w-full h-full">
            {/* Left half */}
            <div 
              className={cn(
                "absolute inset-0 transition-all duration-300 cursor-pointer",
                activeHalf === 'left' && "ring-4 ring-primary ring-inset z-10"
              )}
              style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
              onClick={() => onSelectHalf('left')}
            >
              <img 
                src={leftPizza.image} 
                alt={leftPizza.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent" />
            </div>

            {/* Right half */}
            <div 
              className={cn(
                "absolute inset-0 transition-all duration-300 cursor-pointer",
                activeHalf === 'right' && "ring-4 ring-primary ring-inset z-10"
              )}
              style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
              onClick={() => onSelectHalf('right')}
            >
              <img 
                src={rightPizza.image} 
                alt={rightPizza.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-foreground/20 to-transparent" />
            </div>

            {/* Center divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/80 shadow-lg transform -translate-x-1/2 z-20" />
          </div>
        ) : (
          // Single pizza
          <div 
            className={cn(
              "w-full h-full cursor-pointer transition-all",
              activeHalf === 'left' && "ring-4 ring-primary ring-inset"
            )}
            onClick={() => onSelectHalf('left')}
          >
            <img 
              src={leftPizza?.image || rightPizza?.image || ''} 
              alt={leftPizza?.name || rightPizza?.name || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Pizza info overlay */}
      <div className="mt-4 text-center space-y-2">
        {isHalfMode && leftPizza && rightPizza ? (
          <div className="flex gap-4 justify-center">
            <div 
              className={cn(
                "flex-1 p-3 rounded-xl transition-all cursor-pointer",
                activeHalf === 'left' ? "bg-primary/10 border-2 border-primary" : "bg-secondary"
              )}
              onClick={() => onSelectHalf('left')}
            >
              <p className="font-semibold text-sm">{leftPizza.name}</p>
              {renderIngredientBadges(leftIngredients, leftPizza.defaultIngredients)}
            </div>
            <div 
              className={cn(
                "flex-1 p-3 rounded-xl transition-all cursor-pointer",
                activeHalf === 'right' ? "bg-primary/10 border-2 border-primary" : "bg-secondary"
              )}
              onClick={() => onSelectHalf('right')}
            >
              <p className="font-semibold text-sm">{rightPizza.name}</p>
              {renderIngredientBadges(rightIngredients, rightPizza.defaultIngredients)}
            </div>
          </div>
        ) : leftPizza ? (
          <div className="bg-secondary rounded-xl p-3">
            <p className="font-semibold">{leftPizza.name}</p>
            {renderIngredientBadges(leftIngredients, leftPizza.defaultIngredients)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
