import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  const handleOrder = () => {
    toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    closeCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Корзина
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">
              Добавьте что-нибудь вкусное из нашего меню
            </p>
            <Button onClick={closeCart} className="btn-primary">
              Перейти в меню
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => {
                const uniqueId = item.size 
                  ? `${item.id}-${item.size}` 
                  : item.pieces 
                  ? `${item.id}-${item.pieces}pcs` 
                  : item.id;
                
                return (
                  <div
                    key={uniqueId}
                    className="flex gap-4 p-3 bg-secondary rounded-xl animate-fade-in"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      <p className="text-primary font-bold">{item.price} ₽</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-background flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-background flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(uniqueId)}
                          className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Итого:</span>
                <span className="text-2xl font-bold text-primary">
                  {totalPrice} ₽
                </span>
              </div>

              <Button
                onClick={handleOrder}
                className="w-full btn-primary py-6 text-lg"
              >
                Оформить заказ
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Бесплатная доставка от 1500₽
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
