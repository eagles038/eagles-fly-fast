import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, Truck, Tag, X, Check, Zap } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { QuickOrderModal } from '@/components/QuickOrderModal';

const FREE_DELIVERY_THRESHOLD = 1500;

export function CartSidebar() {
  const navigate = useNavigate();
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);

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

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 h-full max-h-[100dvh]">
        {/* Header — compact on mobile */}
        <SheetHeader className="p-3 sm:p-6 sm:pb-4 border-b border-border">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <span className="text-base sm:text-xl font-bold">Ваш заказ</span>
                <span className="text-xs sm:text-sm text-muted-foreground font-normal ml-2 sm:ml-0 sm:block">
                  {items.length} {items.length === 1 ? 'позиция' : items.length < 5 ? 'позиции' : 'позиций'}
                </span>
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
            {/* Delivery Progress — compact on mobile */}
            <div className="px-3 py-2 sm:px-6 sm:py-4 bg-secondary/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                {remainingForFreeDelivery > 0 ? (
                  <span className="text-xs sm:text-sm">
                    До бесплатной доставки: <strong className="text-primary">{remainingForFreeDelivery} ₽</strong>
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm font-medium flex items-center gap-1 text-primary">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    Бесплатная доставка!
                  </span>
                )}
              </div>
              <Progress value={deliveryProgress} className="h-1.5 sm:h-2" />
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto min-h-0">
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
                      className="flex items-center gap-3 p-2.5 bg-background rounded-xl border border-border animate-fade-in"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-primary">
                            {item.price * item.quantity} ₽
                          </span>
                          {item.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {item.oldPrice * item.quantity} ₽
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-0.5 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(uniqueId)}
                        className="w-7 h-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-3 space-y-2 bg-background flex-shrink-0">
              {/* Promo Code */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary" />
                      <span className="font-medium text-xs">{appliedPromo.code}</span>
                      <span className="text-primary font-bold text-xs">-{appliedPromo.discount * 100}%</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="w-5 h-5 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="Промокод"
                        className={`pl-8 rounded-lg h-8 text-xs ${promoError ? 'border-destructive' : ''}`}
                      />
                    </div>
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      className="rounded-lg px-3 h-8 text-xs"
                      disabled={!promoCode.trim()}
                    >
                      OK
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-xs text-destructive">{promoError}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-1">
                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Скидка</span>
                    <span className="text-primary font-medium">-{totalDiscount} ₽</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Доставка</span>
                  {remainingForFreeDelivery > 0 ? (
                    <span>200 ₽</span>
                  ) : (
                    <span className="text-primary font-medium">Бесплатно</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border">
                  <span className="font-semibold text-sm">Итого</span>
                  <span className="text-lg font-bold text-primary">
                    {remainingForFreeDelivery > 0 ? finalPrice + 200 : finalPrice} ₽
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleOrder}
                  className="flex-1 btn-primary h-10 text-sm rounded-xl"
                >
                  Оформить заказ
                </Button>
                <Button
                  onClick={() => { closeCart(); setQuickOrderOpen(true); }}
                  variant="outline"
                  className="h-10 px-3 rounded-xl border-2 border-primary text-primary hover:bg-primary/10"
                  title="Быстрый заказ"
                >
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
      <QuickOrderModal open={quickOrderOpen} onOpenChange={setQuickOrderOpen} />
    </Sheet>
  );
}
