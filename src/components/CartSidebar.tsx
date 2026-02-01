import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, Truck, Sparkles, Tag, X, Check, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

import drinkCola from '@/assets/drink-cola.jpg';
import drinkMilkshake from '@/assets/drink-milkshake.jpg';
import drinkLemonade from '@/assets/drink-lemonade.jpg';

// Рекомендуемые товары для допродажи
const recommendedItems = [
  { id: 'rec-cola', name: 'Coca-Cola', price: 99, image: drinkCola },
  { id: 'rec-milkshake', name: 'Милкшейк', price: 199, image: drinkMilkshake },
  { id: 'rec-lemonade', name: 'Лимонад', price: 149, image: drinkLemonade },
];

const FREE_DELIVERY_THRESHOLD = 1500;

export function CartSidebar() {
  const navigate = useNavigate();
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart, addItem, openCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const totalPrice = getTotalPrice();
  const totalOldPrice = items.reduce((sum, item) => sum + (item.oldPrice || item.price) * item.quantity, 0);
  const productDiscount = totalOldPrice - totalPrice;
  const discountAmount = appliedPromo ? Math.round(totalPrice * appliedPromo.discount) : 0;
  const finalPrice = totalPrice - discountAmount;
  const totalDiscount = productDiscount + discountAmount;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - finalPrice);
  const deliveryProgress = Math.min(100, (finalPrice / FREE_DELIVERY_THRESHOLD) * 100);

  // Демо промокоды
  const validPromoCodes: Record<string, number> = {
    'СКИДКА10': 0.10,
    'СКИДКА20': 0.20,
    'ПЕРВЫЙ': 0.15,
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (validPromoCodes[code]) {
      setAppliedPromo({ code, discount: validPromoCodes[code] });
      setPromoError('');
      toast.success(`Промокод применён! Скидка ${validPromoCodes[code] * 100}%`);
    } else {
      setPromoError('Промокод не найден');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleOrder = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleAddRecommended = (item: typeof recommendedItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success(`${item.name} добавлен`, {
      action: { label: 'Отменить', onClick: () => removeItem(item.id) },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 gap-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xl font-bold">Ваш заказ</span>
                <p className="text-sm text-muted-foreground font-normal">
                  {items.length} {items.length === 1 ? 'позиция' : items.length < 5 ? 'позиции' : 'позиций'}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6 max-w-[250px]">
              Выберите что-нибудь вкусное из нашего меню
            </p>
            <Button onClick={closeCart} className="btn-primary px-8">
              Смотреть меню
            </Button>
          </div>
        ) : (
          <>
            {/* Delivery Progress */}
            <div className="px-6 py-4 bg-secondary/50">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-primary" />
                {remainingForFreeDelivery > 0 ? (
                  <span className="text-sm">
                    До бесплатной доставки: <strong className="text-primary">{remainingForFreeDelivery} ₽</strong>
                  </span>
                ) : (
                  <span className="text-sm font-medium flex items-center gap-1 text-primary">
                    <Sparkles className="w-4 h-4" />
                    Бесплатная доставка!
                  </span>
                )}
              </div>
              <Progress value={deliveryProgress} className="h-2" />
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-3">
                {items.map((item) => {
                  const uniqueId = item.size 
                    ? `${item.id}-${item.size}` 
                    : item.pieces 
                    ? `${item.id}-${item.pieces}pcs` 
                    : item.id;
                  
                  return (
                    <div
                      key={uniqueId}
                      className="flex gap-4 p-4 bg-background rounded-2xl border border-border shadow-sm animate-fade-in"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-lg font-bold text-primary">
                              {item.price * item.quantity} ₽
                            </p>
                            {item.oldPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {item.oldPrice * item.quantity} ₽
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(uniqueId)}
                            className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommended Items */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-base">Добавить к заказу</h4>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide">
                  {recommendedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddRecommended(item)}
                      className="flex-shrink-0 flex flex-col w-32 p-3 bg-secondary/50 hover:bg-secondary rounded-2xl border border-border hover:border-primary/30 transition-all group hover:shadow-md"
                    >
                      <div className="w-full aspect-square rounded-xl bg-muted overflow-hidden mb-3">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-sm leading-tight mb-1">{item.name}</p>
                        <p className="text-primary font-bold">{item.price} ₽</p>
                      </div>
                      <div className="w-full h-9 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors mt-3">
                        <Plus className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 space-y-4 bg-background">
              {/* Promo Code */}
              <div className="space-y-2">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{appliedPromo.code}</span>
                      <span className="text-primary font-bold">-{appliedPromo.discount * 100}%</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="Промокод"
                        className={`pl-10 rounded-xl ${promoError ? 'border-destructive' : ''}`}
                      />
                    </div>
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      className="rounded-xl px-4"
                      disabled={!promoCode.trim()}
                    >
                      Применить
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-sm text-destructive">{promoError}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Сумма заказа</span>
                  <div className="flex items-center gap-2">
                    <span>{totalPrice} ₽</span>
                    {productDiscount > 0 && (
                      <span className="text-muted-foreground line-through text-xs">{totalOldPrice} ₽</span>
                    )}
                  </div>
                </div>
                {productDiscount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Скидка на товары</span>
                    <span className="text-primary font-medium">-{productDiscount} ₽</span>
                  </div>
                )}
                {appliedPromo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Промокод ({appliedPromo.code})</span>
                    <span className="text-primary font-medium">-{discountAmount} ₽</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  {remainingForFreeDelivery > 0 ? (
                    <span>200 ₽</span>
                  ) : (
                    <span className="text-primary font-medium">Бесплатно</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="font-semibold">Итого</span>
                  <p className="text-2xl font-bold text-primary">
                    {remainingForFreeDelivery > 0 ? finalPrice + 200 : finalPrice} ₽
                  </p>
                </div>
              </div>

              <Button
                onClick={handleOrder}
                className="w-full btn-primary py-6 text-lg rounded-2xl"
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
