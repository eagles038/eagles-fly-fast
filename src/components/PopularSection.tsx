import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import rollPhiladelphia from '@/assets/roll-philadelphia.jpg';
import burgerClassic from '@/assets/burger-classic.jpg';
import rollDragon from '@/assets/roll-dragon.jpg';
import pizza4cheese from '@/assets/pizza-4cheese.jpg';
import drinkLemonade from '@/assets/drink-lemonade.jpg';

const popularItems = [
  {
    id: 'popular-1',
    name: 'Пепперони',
    description: 'Пикантная пепперони, моцарелла, томатный соус, орегано',
    price: 499,
    image: pizzaPepperoni,
    badge: 'hit' as const,
    sizes: [
      { size: '25 см', price: 499 },
      { size: '30 см', price: 699 },
      { size: '40 см', price: 999 },
    ],
  },
  {
    id: 'popular-2',
    name: 'Филадельфия',
    description: 'Лосось, сливочный сыр, огурец, рис, нори',
    price: 349,
    image: rollPhiladelphia,
    badge: 'hit' as const,
    piecesOptions: [
      { pieces: 6, price: 349 },
      { pieces: 8, price: 449 },
      { pieces: 12, price: 649 },
    ],
  },
  {
    id: 'popular-3',
    name: 'Классический',
    description: 'Две котлеты из говядины, чеддер, салат, томаты, соленые огурцы',
    price: 399,
    image: burgerClassic,
    badge: 'hit' as const,
  },
  {
    id: 'popular-4',
    name: 'Дракон',
    description: 'Угорь, авокадо, огурец, унаги соус, кунжут',
    price: 449,
    image: rollDragon,
    badge: 'new' as const,
    oldPrice: 549,
    piecesOptions: [
      { pieces: 6, price: 449 },
      { pieces: 8, price: 579 },
      { pieces: 12, price: 849 },
    ],
  },
  {
    id: 'popular-5',
    name: '4 сыра',
    description: 'Моцарелла, пармезан, горгонзола, чеддер на сливочной основе',
    price: 599,
    image: pizza4cheese,
    sizes: [
      { size: '25 см', price: 599 },
      { size: '30 см', price: 799 },
      { size: '40 см', price: 1149 },
    ],
  },
  {
    id: 'popular-6',
    name: 'Лимонад',
    description: 'Домашний лимонад с мятой и льдом, 0.4л',
    price: 129,
    image: drinkLemonade,
    badge: 'hit' as const,
  },
];

export function PopularSection() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Популярное
            </h2>
            <p className="text-muted-foreground text-lg">
              Самые любимые блюда наших гостей
            </p>
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {popularItems.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard {...item} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 h-12 w-12 border-2 border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 h-12 w-12 border-2 border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
