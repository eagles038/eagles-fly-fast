import { cn } from '@/lib/utils';
import { ConstructorState, BASE_PRICE } from './types';

interface PizzaPreviewProps {
  state: ConstructorState;
}

export function PizzaPreview({ state }: PizzaPreviewProps) {
  const { dough, size, toppings } = state;

  // Calculate total price
  const doughPrice = dough?.priceModifier || 0;
  const sizePrice = size?.priceModifier || 0;
  const toppingsPrice = toppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = BASE_PRICE + doughPrice + sizePrice + toppingsPrice;

  // Size of the pizza preview based on selected size
  const previewSize = size?.id === 'large' ? 280 : size?.id === 'medium' ? 240 : 200;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-food sticky top-24">
      <h3 className="text-lg font-bold text-foreground mb-4 text-center">
        Ваша пицца
      </h3>

      {/* Pizza visual */}
      <div className="flex justify-center mb-6">
        <div
          className={cn(
            "relative rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 transition-all duration-500",
            dough?.id === 'cheese-crust' && "ring-4 ring-amber-400"
          )}
          style={{
            width: previewSize,
            height: previewSize,
          }}
        >
          {/* Crust */}
          <div
            className={cn(
              "absolute inset-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-800/50 dark:to-amber-700/50",
              dough?.id === 'thin' && "inset-1",
              dough?.id === 'thick' && "inset-4"
            )}
          >
            {/* Sauce layer */}
            {toppings.some((t) => t.category === 'sauce') && (
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-400/60 to-red-500/60 dark:from-red-700/60 dark:to-red-800/60" />
            )}

            {/* Cheese layer */}
            {toppings.some((t) => t.category === 'cheese') && (
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-100/80 to-yellow-200/80 dark:from-yellow-600/40 dark:to-yellow-500/40" />
            )}

            {/* Toppings icons scattered */}
            <div className="absolute inset-6 flex flex-wrap items-center justify-center gap-1 overflow-hidden">
              {toppings
                .filter((t) => t.category !== 'sauce')
                .map((topping, i) => (
                  <span
                    key={topping.id}
                    className="text-lg animate-fade-in"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  >
                    {topping.icon}
                  </span>
                ))}
            </div>
          </div>

          {/* Size indicator */}
          {size && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
              {size.diameter} см
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Базовая цена</span>
          <span className="font-medium">{BASE_PRICE} ₽</span>
        </div>
        {dough && dough.priceModifier > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Тесто ({dough.name})</span>
            <span className="font-medium">+{dough.priceModifier} ₽</span>
          </div>
        )}
        {size && size.priceModifier > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Размер ({size.name})</span>
            <span className="font-medium">+{size.priceModifier} ₽</span>
          </div>
        )}
        {toppingsPrice > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Начинки ({toppings.length} шт.)
            </span>
            <span className="font-medium">+{toppingsPrice} ₽</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Итого</span>
          <span className="text-primary">{totalPrice} ₽</span>
        </div>
      </div>
    </div>
  );
}
