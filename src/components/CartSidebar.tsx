import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// Рекомендуемые товары для допродажи
const recommendedItems = [
  { id: 'rec-cola', name: 'Coca-Cola', price: 99, image: '/placeholder.svg' },
  { id: 'rec-sauce', name: 'Сырный соус', price: 49, image: '/placeholder.svg' },
  { id: 'rec-dessert', name: 'Чизкейк', price: 199, image: '/placeholder.svg' },
];

const FREE_DELIVERY_THRESHOLD = 1500;

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart, addItem, openCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totalPrice);
  const deliveryProgress = Math.min(100, (totalPrice / FREE_DELIVERY_THRESHOLD) * 100);

  const handleOrder = () => {
    toast.success('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    closeCart();
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
                          <p className="text-lg font-bold text-primary mt-1">
                            {item.price * item.quantity} ₽
                          </p>
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
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">Добавить к заказу</h4>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
                  {recommendedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddRecommended(item)}
                      className="flex-shrink-0 flex items-center gap-3 p-3 bg-secondary/50 hover:bg-secondary rounded-xl border border-border hover:border-primary/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-primary font-bold text-sm">{item.price} ₽</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors ml-2">
                        <Plus className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 space-y-4 bg-background">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground text-sm">Итого</span>
                  <p className="text-3xl font-bold text-primary">{totalPrice} ₽</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                {remainingForFreeDelivery > 0 ? (
                    <span>+ доставка 200 ₽</span>
                  ) : (
                    <span className="text-primary font-medium">Доставка 0 ₽</span>
                  )}
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
