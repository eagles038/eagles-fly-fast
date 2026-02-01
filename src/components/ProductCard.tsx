import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SizeOption {
  size: string;
  price: number;
}

interface PiecesOption {
  pieces: number;
  price: number;
}

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  index?: number;
  badge?: 'hit' | 'new' | 'sale';
  oldPrice?: number;
  sizes?: SizeOption[];
  piecesOptions?: PiecesOption[];
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  index = 0,
  badge,
  oldPrice,
  sizes,
  piecesOptions,
}: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]?.size || null);
  const [selectedPieces, setSelectedPieces] = useState(piecesOptions?.[0]?.pieces || null);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const getCurrentPrice = () => {
    if (sizes && selectedSize) {
      return sizes.find(s => s.size === selectedSize)?.price || price;
    }
    if (piecesOptions && selectedPieces) {
      return piecesOptions.find(p => p.pieces === selectedPieces)?.price || price;
    }
    return price;
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const currentPrice = getCurrentPrice();
    for (let i = 0; i < localQuantity; i++) {
      addItem({ 
        id, 
        name: sizes && selectedSize 
          ? `${name} (${selectedSize})` 
          : piecesOptions && selectedPieces 
          ? `${name} (${selectedPieces} шт)` 
          : name, 
        price: currentPrice,
        oldPrice: oldPrice,
        image,
        size: selectedSize || undefined,
        pieces: selectedPieces || undefined,
      });
    }
    toast.success(`${name} добавлен в корзину`, {
      action: {
        label: 'Открыть корзину',
        onClick: openCart,
      },
    });
    setLocalQuantity(1);
    
    setTimeout(() => setIsAdding(false), 600);
  };

  const getBadgeContent = () => {
    switch (badge) {
      case 'hit':
        return { text: 'Хит', className: 'bg-primary text-primary-foreground' };
      case 'new':
        return { text: 'New', className: 'bg-green-500 text-white' };
      case 'sale':
        return { text: 'Акция', className: 'bg-destructive text-destructive-foreground' };
      default:
        return null;
    }
  };

  const badgeContent = getBadgeContent();
  const currentPrice = getCurrentPrice();

  return (
    <div
      className="food-card group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden">
        {badgeContent && (
          <Badge className={cn("absolute top-3 left-3 z-10 text-sm font-semibold px-3 py-1", badgeContent.className)}>
            {badgeContent.text}
          </Badge>
        )}
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

        {/* Size options for pizza */}
        {sizes && sizes.length > 0 && (
          <div className="flex gap-2 mb-4">
            {sizes.map((sizeOption) => (
              <button
                key={sizeOption.size}
                onClick={() => setSelectedSize(sizeOption.size)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all border-2",
                  selectedSize === sizeOption.size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:border-primary/50"
                )}
              >
                {sizeOption.size}
              </button>
            ))}
          </div>
        )}

        {/* Pieces options for rolls */}
        {piecesOptions && piecesOptions.length > 0 && (
          <div className="flex gap-2 mb-4">
            {piecesOptions.map((piecesOption) => (
              <button
                key={piecesOption.pieces}
                onClick={() => setSelectedPieces(piecesOption.pieces)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all border-2",
                  selectedPieces === piecesOption.pieces
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:border-primary/50"
                )}
              >
                {piecesOption.pieces} шт
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{currentPrice} ₽</span>
            {oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {oldPrice} ₽
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Quantity selector */}
            <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
              <button
                onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                className="p-1.5 rounded-lg hover:bg-background transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold">{localQuantity}</span>
              <button
                onClick={() => setLocalQuantity(localQuantity + 1)}
                className="p-1.5 rounded-lg hover:bg-background transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                "rounded-xl text-primary-foreground font-semibold px-4 py-2 transition-all duration-300",
                isAdding 
                  ? "bg-emerald-500 scale-110" 
                  : "bg-primary hover:bg-orange-dark hover:scale-105"
              )}
            >
              {isAdding ? (
                <Check className="w-5 h-5 animate-scale-in" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
