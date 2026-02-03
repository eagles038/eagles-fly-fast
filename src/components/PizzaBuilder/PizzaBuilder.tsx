import { useState, useMemo } from 'react';
import { X, ShoppingCart, Shuffle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { 
  PizzaBase, 
  pizzaBases, 
  sizeOptions, 
  crustOptions, 
  getIngredientById,
  ingredients 
} from '@/lib/pizza-data';
import { PizzaHalfSelector } from './PizzaHalfSelector';
import { IngredientSelector } from './IngredientSelector';
import { PizzaPreview } from './PizzaPreview';

interface SelectedIngredient {
  id: string;
  isDouble: boolean;
  isRemoved: boolean;
}

interface PizzaBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PizzaBuilder({ isOpen, onClose }: PizzaBuilderProps) {
  const { addItem, openCart } = useCartStore();

  // Mode: single pizza or half-and-half
  const [isHalfMode, setIsHalfMode] = useState(false);

  // Selected pizzas
  const [leftPizza, setLeftPizza] = useState<PizzaBase | null>(null);
  const [rightPizza, setRightPizza] = useState<PizzaBase | null>(null);

  // Active half for ingredient editing
  const [activeHalf, setActiveHalf] = useState<'left' | 'right' | null>('left');

  // Ingredients for each half
  const [leftIngredients, setLeftIngredients] = useState<SelectedIngredient[]>([]);
  const [rightIngredients, setRightIngredients] = useState<SelectedIngredient[]>([]);

  // Size and crust
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1].size);
  const [selectedCrust, setSelectedCrust] = useState(crustOptions[1].id);

  // Reset when switching modes
  const handleModeChange = (checked: boolean) => {
    setIsHalfMode(checked);
    if (!checked) {
      setRightPizza(null);
      setRightIngredients([]);
    }
    setActiveHalf('left');
  };

  // Select pizza for a half
  const handleSelectPizza = (half: 'left' | 'right', pizza: PizzaBase) => {
    if (half === 'left') {
      setLeftPizza(pizza);
      setLeftIngredients(pizza.defaultIngredients.map(id => ({ id, isDouble: false, isRemoved: false })));
    } else {
      setRightPizza(pizza);
      setRightIngredients(pizza.defaultIngredients.map(id => ({ id, isDouble: false, isRemoved: false })));
    }
    setActiveHalf(half);
  };

  // Clear pizza selection
  const handleClearPizza = (half: 'left' | 'right') => {
    if (half === 'left') {
      setLeftPizza(null);
      setLeftIngredients([]);
    } else {
      setRightPizza(null);
      setRightIngredients([]);
    }
  };

  // Get current ingredients based on active half
  const currentIngredients = activeHalf === 'right' ? rightIngredients : leftIngredients;
  const currentPizza = activeHalf === 'right' ? rightPizza : leftPizza;
  const setCurrentIngredients = activeHalf === 'right' ? setRightIngredients : setLeftIngredients;

  // Toggle ingredient
  const handleToggleIngredient = (ingredientId: string) => {
    setCurrentIngredients(prev => {
      const existing = prev.find(i => i.id === ingredientId);
      if (existing) {
        return prev.filter(i => i.id !== ingredientId);
      }
      return [...prev, { id: ingredientId, isDouble: false, isRemoved: false }];
    });
  };

  // Toggle double portion
  const handleToggleDouble = (ingredientId: string) => {
    setCurrentIngredients(prev => 
      prev.map(i => 
        i.id === ingredientId ? { ...i, isDouble: !i.isDouble } : i
      )
    );
  };

  // Remove/restore default ingredient
  const handleRemoveDefault = (ingredientId: string) => {
    setCurrentIngredients(prev => {
      const existing = prev.find(i => i.id === ingredientId);
      if (existing) {
        return prev.map(i => 
          i.id === ingredientId ? { ...i, isRemoved: !i.isRemoved } : i
        );
      }
      return prev;
    });
  };

  // Random pizza selection
  const handleRandomize = () => {
    const randomPizza = pizzaBases[Math.floor(Math.random() * pizzaBases.length)];
    handleSelectPizza('left', randomPizza);
    
    if (isHalfMode) {
      let secondPizza = pizzaBases[Math.floor(Math.random() * pizzaBases.length)];
      while (secondPizza.id === randomPizza.id) {
        secondPizza = pizzaBases[Math.floor(Math.random() * pizzaBases.length)];
      }
      handleSelectPizza('right', secondPizza);
    }

    toast.success('Случайная пицца выбрана! 🎲');
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    const sizeMultiplier = sizeOptions.find(s => s.size === selectedSize)?.multiplier || 1;
    const crustPrice = crustOptions.find(c => c.id === selectedCrust)?.price || 0;

    let basePrice = 0;
    let ingredientPrice = 0;

    if (isHalfMode && leftPizza && rightPizza) {
      // Average of both pizzas for half-and-half
      basePrice = (leftPizza.basePrice + rightPizza.basePrice) / 2;

      // Calculate extra ingredients for left half
      leftIngredients.forEach(ing => {
        if (!ing.isRemoved && !leftPizza.defaultIngredients.includes(ing.id)) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += (ing.isDouble ? ingredient.price * 2 : ingredient.price) / 2;
          }
        } else if (!ing.isRemoved && ing.isDouble) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += ingredient.price / 2;
          }
        }
      });

      // Calculate extra ingredients for right half
      rightIngredients.forEach(ing => {
        if (!ing.isRemoved && !rightPizza.defaultIngredients.includes(ing.id)) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += (ing.isDouble ? ingredient.price * 2 : ingredient.price) / 2;
          }
        } else if (!ing.isRemoved && ing.isDouble) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += ingredient.price / 2;
          }
        }
      });
    } else if (leftPizza) {
      basePrice = leftPizza.basePrice;

      leftIngredients.forEach(ing => {
        if (!ing.isRemoved && !leftPizza.defaultIngredients.includes(ing.id)) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += ing.isDouble ? ingredient.price * 2 : ingredient.price;
          }
        } else if (!ing.isRemoved && ing.isDouble) {
          const ingredient = getIngredientById(ing.id);
          if (ingredient) {
            ingredientPrice += ingredient.price;
          }
        }
      });
    }

    return Math.round((basePrice * sizeMultiplier) + ingredientPrice + crustPrice);
  }, [leftPizza, rightPizza, leftIngredients, rightIngredients, selectedSize, selectedCrust, isHalfMode]);

  // Add to cart
  const handleAddToCart = () => {
    if (!leftPizza) {
      toast.error('Выберите пиццу');
      return;
    }

    if (isHalfMode && !rightPizza) {
      toast.error('Выберите вторую половину пиццы');
      return;
    }

    const pizzaName = isHalfMode && rightPizza
      ? `${leftPizza.name} + ${rightPizza.name} (${selectedSize})`
      : `${leftPizza.name} (${selectedSize})`;

    const crust = crustOptions.find(c => c.id === selectedCrust);

    addItem({
      id: `custom-pizza-${Date.now()}`,
      name: pizzaName,
      price: totalPrice,
      image: leftPizza.image,
      size: selectedSize,
    });

    toast.success(`${pizzaName} добавлена в корзину!`, {
      action: {
        label: 'Открыть корзину',
        onClick: openCart,
      },
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Конструктор пиццы
            </h2>
            <Button variant="outline" size="sm" onClick={handleRandomize}>
              <Shuffle className="w-4 h-4 mr-2" />
              Случайная
            </Button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-2 gap-6 p-6">
            {/* Left column: Pizza selection and preview */}
            <div className="space-y-6">
              {/* Half mode toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
                <div>
                  <Label htmlFor="half-mode" className="text-base font-semibold">
                    Пицца из половинок
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Выберите две разных пиццы на одной основе
                  </p>
                </div>
                <Switch
                  id="half-mode"
                  checked={isHalfMode}
                  onCheckedChange={handleModeChange}
                />
              </div>

              {/* Pizza selection */}
              <div className={cn("flex gap-4", !isHalfMode && "max-w-sm")}>
                <PizzaHalfSelector
                  selectedPizza={leftPizza}
                  onSelect={(pizza) => handleSelectPizza('left', pizza)}
                  onClear={() => handleClearPizza('left')}
                  half="left"
                  isActive={activeHalf === 'left'}
                  onActivate={() => setActiveHalf('left')}
                />
                
                {isHalfMode && (
                  <PizzaHalfSelector
                    selectedPizza={rightPizza}
                    onSelect={(pizza) => handleSelectPizza('right', pizza)}
                    onClear={() => handleClearPizza('right')}
                    half="right"
                    isActive={activeHalf === 'right'}
                    onActivate={() => setActiveHalf('right')}
                  />
                )}
              </div>

              {/* Pizza preview */}
              <PizzaPreview
                leftPizza={leftPizza}
                rightPizza={rightPizza}
                isHalfMode={isHalfMode}
                leftIngredients={leftIngredients}
                rightIngredients={rightIngredients}
                activeHalf={activeHalf}
                onSelectHalf={setActiveHalf}
              />

              {/* Size selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Размер</Label>
                <div className="flex gap-2">
                  {sizeOptions.map(option => (
                    <button
                      key={option.size}
                      onClick={() => setSelectedSize(option.size)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl text-center transition-all border-2",
                        selectedSize === option.size
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="block font-semibold">{option.size}</span>
                      <span className="text-xs text-muted-foreground">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crust selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Тесто</Label>
                <div className="grid grid-cols-2 gap-2">
                  {crustOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedCrust(option.id)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-center transition-all border-2",
                        selectedCrust === option.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="block font-medium text-sm">{option.name}</span>
                      {option.price > 0 && (
                        <span className="text-xs text-primary">+{option.price} ₽</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: Ingredients */}
            <div className="lg:border-l lg:border-border lg:pl-6">
              {currentPizza ? (
                <IngredientSelector
                  selectedIngredients={currentIngredients}
                  defaultIngredients={currentPizza.defaultIngredients}
                  onToggleIngredient={handleToggleIngredient}
                  onToggleDouble={handleToggleDouble}
                  onRemoveDefault={handleRemoveDefault}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <span className="text-4xl block mb-4">👈</span>
                    <p>Выберите пиццу, чтобы настроить ингредиенты</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-secondary/50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Итого:</span>
              <span className="text-3xl font-bold text-primary ml-2">{totalPrice} ₽</span>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!leftPizza || (isHalfMode && !rightPizza)}
              className="rounded-xl font-semibold px-8"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
