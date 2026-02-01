import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export function MobileCartButton() {
  const { openCart, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Не показываем кнопку если корзина пуста
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-fade-in">
      <Button
        onClick={openCart}
        className="w-full h-14 rounded-2xl bg-primary hover:bg-orange-dark text-primary-foreground font-semibold flex items-center justify-between px-5 shadow-orange"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-background text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span className="text-base">Корзина</span>
        </div>
        <span className="text-lg font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
      </Button>
    </div>
  );
}
