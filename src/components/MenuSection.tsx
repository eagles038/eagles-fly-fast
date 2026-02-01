import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaBbq from '@/assets/pizza-bbq.jpg';
import burgerClassic from '@/assets/burger-classic.jpg';
import burgerSpicy from '@/assets/burger-spicy.jpg';
import burgerChicken from '@/assets/burger-chicken.jpg';
import drinkCola from '@/assets/drink-cola.jpg';
import drinkJuice from '@/assets/drink-juice.jpg';
import drinkMilkshake from '@/assets/drink-milkshake.jpg';
import rollPhiladelphia from '@/assets/roll-philadelphia.jpg';
import rollCalifornia from '@/assets/roll-california.jpg';
import rollDragon from '@/assets/roll-dragon.jpg';

const menuItems = {
  pizza: [
    {
      id: 'pizza-1',
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
      id: 'pizza-2',
      name: 'Маргарита',
      description: 'Свежие томаты, моцарелла, базилик, оливковое масло',
      price: 399,
      image: pizzaMargherita,
      sizes: [
        { size: '25 см', price: 399 },
        { size: '30 см', price: 549 },
        { size: '40 см', price: 799 },
      ],
    },
    {
      id: 'pizza-3',
      name: 'BBQ Курица',
      description: 'Курица гриль, соус BBQ, кукуруза, красный лук, сыр',
      price: 549,
      image: pizzaBbq,
      badge: 'new' as const,
      sizes: [
        { size: '25 см', price: 549 },
        { size: '30 см', price: 749 },
        { size: '40 см', price: 1099 },
      ],
    },
  ],
  rolls: [
    {
      id: 'roll-1',
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
      id: 'roll-2',
      name: 'Калифорния',
      description: 'Краб, авокадо, огурец, тобико, кунжут',
      price: 299,
      image: rollCalifornia,
      piecesOptions: [
        { pieces: 6, price: 299 },
        { pieces: 8, price: 389 },
        { pieces: 12, price: 549 },
      ],
    },
    {
      id: 'roll-3',
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
  ],
  burgers: [
    {
      id: 'burger-1',
      name: 'Классический',
      description: 'Две котлеты из говядины, чеддер, салат, томаты, соленые огурцы',
      price: 399,
      image: burgerClassic,
      badge: 'hit' as const,
    },
    {
      id: 'burger-2',
      name: 'Острый',
      description: 'Говядина, халапеньо, бекон, острый соус, плавленый сыр',
      price: 449,
      image: burgerSpicy,
      badge: 'sale' as const,
      oldPrice: 549,
    },
    {
      id: 'burger-3',
      name: 'Чикен',
      description: 'Хрустящая куриная грудка, салат, майонез, булочка бриошь',
      price: 379,
      image: burgerChicken,
    },
  ],
  drinks: [
    {
      id: 'drink-1',
      name: 'Кола',
      description: 'Классическая газировка, 0.5л',
      price: 99,
      image: drinkCola,
    },
    {
      id: 'drink-2',
      name: 'Апельсиновый сок',
      description: 'Свежевыжатый апельсиновый сок, 0.3л',
      price: 149,
      image: drinkJuice,
      badge: 'new' as const,
    },
    {
      id: 'drink-3',
      name: 'Молочный коктейль',
      description: 'Ванильный молочный коктейль со взбитыми сливками',
      price: 199,
      image: drinkMilkshake,
    },
  ],
};

export function MenuSection() {
  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Наше меню</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите любимые блюда из нашего разнообразного меню
          </p>
        </div>

        <Tabs defaultValue="pizza" className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto mb-8 h-14 rounded-2xl bg-secondary p-1 grid grid-cols-4">
            <TabsTrigger
              value="pizza"
              className="rounded-xl text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Пицца
            </TabsTrigger>
            <TabsTrigger
              value="rolls"
              className="rounded-xl text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Роллы
            </TabsTrigger>
            <TabsTrigger
              value="burgers"
              className="rounded-xl text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Бургеры
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="rounded-xl text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Напитки
            </TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((item, index) => (
                  <ProductCard key={item.id} {...item} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
