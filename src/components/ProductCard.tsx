import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  index?: number;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  index = 0,
}: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
    toast.success(`${name} добавлен в корзину`, {
      action: {
        label: 'Открыть корзину',
        onClick: openCart,
      },
    });
  };

  return (
    <div
      className="food-card group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price} ₽</span>
          <Button
            onClick={handleAddToCart}
            className="rounded-xl bg-primary hover:bg-orange-dark text-primary-foreground font-semibold px-4 py-2 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
}
