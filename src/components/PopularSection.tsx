import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import useEmblaCarousel from 'embla-carousel-react';

import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import rollPhiladelphia from '@/assets/roll-philadelphia.jpg';
import rollDragon from '@/assets/roll-dragon.jpg';
import burgerClassic from '@/assets/burger-classic.jpg';
import drinkMilkshake from '@/assets/drink-milkshake.jpg';

const popularItems = [
  { id: 'pizza-1', name: 'Пепперони', price: 499, image: pizzaPepperoni },
  { id: 'roll-1', name: 'Филадельфия', price: 349, image: rollPhiladelphia },
  { id: 'burger-1', name: 'Классический', price: 399, image: burgerClassic },
  { id: 'pizza-2', name: 'Маргарита', price: 399, image: pizzaMargherita },
  { id: 'roll-3', name: 'Дракон', price: 449, image: rollDragon },
  { id: 'drink-3', name: 'Молочный коктейль', price: 199, image: drinkMilkshake },
];

export function PopularSection() {
  const { addItem, openCart } = useCartStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const handleAddToCart = (item: typeof popularItems[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast.success(`${item.name} добавлен в корзину`, {
      action: {
        label: 'Открыть',
        onClick: openCart,
      },
    });
  };

  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Новое и популярное</h2>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {popularItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] bg-card rounded-2xl overflow-hidden shadow-food group cursor-pointer transition-all duration-300 hover:shadow-food-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleAddToCart(item)}
              >
                <div className="flex items-center gap-4 p-4">
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate mb-1">{item.name}</h3>
                    <p className="text-xl font-bold text-primary">{item.price} ₽</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-90">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
