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

const menuItems = {
  pizza: [
    {
      id: 'pizza-1',
      name: 'Пепперони',
      description: 'Пикантная пепперони, моцарелла, томатный соус, орегано',
      price: 599,
      image: pizzaPepperoni,
    },
    {
      id: 'pizza-2',
      name: 'Маргарита',
      description: 'Свежие томаты, моцарелла, базилик, оливковое масло',
      price: 499,
      image: pizzaMargherita,
    },
    {
      id: 'pizza-3',
      name: 'BBQ Курица',
      description: 'Курица гриль, соус BBQ, кукуруза, красный лук, сыр',
      price: 649,
      image: pizzaBbq,
    },
  ],
  burgers: [
    {
      id: 'burger-1',
      name: 'Классический',
      description: 'Две котлеты из говядины, чеддер, салат, томаты, соленые огурцы',
      price: 399,
      image: burgerClassic,
    },
    {
      id: 'burger-2',
      name: 'Острый',
      description: 'Говядина, халапеньо, бекон, острый соус, плавленый сыр',
      price: 449,
      image: burgerSpicy,
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
          <TabsList className="w-full max-w-md mx-auto mb-8 h-14 rounded-2xl bg-secondary p-1">
            <TabsTrigger
              value="pizza"
              className="flex-1 rounded-xl text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Пицца
            </TabsTrigger>
            <TabsTrigger
              value="burgers"
              className="flex-1 rounded-xl text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Бургеры
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="flex-1 rounded-xl text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
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
