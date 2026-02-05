import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DoughSelector } from './DoughSelector';
import { SizeSelector } from './SizeSelector';
import { ToppingsSelector } from './ToppingsSelector';
import { PizzaPreview } from './PizzaPreview';
import {
  doughOptions,
  sizeOptions,
  toppingOptions,
  ToppingOption,
  DoughOption,
  SizeOption,
  ConstructorState,
  BASE_PRICE,
} from './types';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { ShoppingCart, RotateCcw, ChefHat } from 'lucide-react';

export function PizzaConstructor() {
  const { addItem, openCart } = useCartStore();
  const [state, setState] = useState<ConstructorState>({
    dough: doughOptions[0],
    size: sizeOptions[1], // Medium by default
    toppings: [toppingOptions.find((t) => t.id === 'tomato-sauce')!], // Default sauce
  });

  const handleDoughSelect = (dough: DoughOption) => {
    setState((prev) => ({ ...prev, dough }));
  };

  const handleSizeSelect = (size: SizeOption) => {
    setState((prev) => ({ ...prev, size }));
  };

  const handleToppingToggle = (topping: ToppingOption) => {
    setState((prev) => {
      const exists = prev.toppings.some((t) => t.id === topping.id);
      if (exists) {
        return {
          ...prev,
          toppings: prev.toppings.filter((t) => t.id !== topping.id),
        };
      }
      return { ...prev, toppings: [...prev.toppings, topping] };
    });
  };

  const handleReset = () => {
    setState({
      dough: doughOptions[0],
      size: sizeOptions[1],
      toppings: [toppingOptions.find((t) => t.id === 'tomato-sauce')!],
    });
  };

  const handleAddToCart = () => {
    if (!state.dough || !state.size) {
      toast.error('Выберите тесто и размер пиццы');
      return;
    }

    const doughPrice = state.dough.priceModifier;
    const sizePrice = state.size.priceModifier;
    const toppingsPrice = state.toppings.reduce((sum, t) => sum + t.price, 0);
    const totalPrice = BASE_PRICE + doughPrice + sizePrice + toppingsPrice;

    const toppingNames = state.toppings.map((t) => t.name).join(', ');
    const pizzaName = `Пицца от шефа (${state.size.diameter} см)`;
    const description = `${state.dough.name} тесто, ${toppingNames || 'без начинки'}`;

    addItem({
      id: `custom-pizza-${Date.now()}`,
      name: pizzaName,
      price: totalPrice,
      image: '/placeholder.svg', // Would be a generated image in real app
      size: `${state.size.diameter} см`,
    });

    toast.success('Ваша пицца добавлена в корзину!', {
      description: description,
      action: {
        label: 'Открыть корзину',
        onClick: openCart,
      },
    });
  };

  const isValid = state.dough && state.size;

  return (
    <section id="constructor" className="py-12 md:py-20 bg-secondary/30 scroll-mt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <ChefHat className="w-5 h-5" />
            <span className="font-semibold">Конструктор пиццы</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Создай свою идеальную пиццу
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите тесто, размер и любимые ингредиенты — мы приготовим пиццу специально для вас!
          </p>
        </div>

        {/* Constructor layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Options */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-2xl p-6 shadow-food">
              <DoughSelector
                options={doughOptions}
                selected={state.dough}
                onSelect={handleDoughSelect}
              />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-food">
              <SizeSelector
                options={sizeOptions}
                selected={state.size}
                onSelect={handleSizeSelect}
              />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-food">
              <ToppingsSelector
                options={toppingOptions}
                selected={state.toppings}
                onToggle={handleToppingToggle}
              />
            </div>
          </div>

          {/* Right side - Preview & Actions */}
          <div className="space-y-4">
            <PizzaPreview state={state} />

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!isValid}
                className="w-full h-14 text-lg font-bold rounded-2xl shadow-orange"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Добавить в корзину
              </Button>

              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full rounded-2xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Сбросить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
