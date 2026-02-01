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
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Яркий градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-orange-600" />
      
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-semibold text-sm uppercase tracking-wider">Хиты продаж</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
              Популярное
            </h2>
            <p className="text-white/80 text-lg md:text-xl">
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
                <div className="transform hover:scale-[1.02] transition-transform duration-300">
                  <ProductCard {...item} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 h-14 w-14 border-0 bg-white text-primary shadow-xl hover:bg-white hover:scale-110 transition-transform" />
          <CarouselNext className="hidden md:flex -right-4 h-14 w-14 border-0 bg-white text-primary shadow-xl hover:bg-white hover:scale-110 transition-transform" />
        </Carousel>

        {/* Нижний декоративный текст */}
        <div className="mt-10 text-center">
          <p className="text-white/60 text-sm">
            ⭐ Более 10 000 довольных клиентов выбирают эти блюда
          </p>
        </div>
      </div>
    </section>
  );
}
