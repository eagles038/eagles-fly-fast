import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter, pizzaFilters, rollsFilters, burgersFilters, FilterOption } from '@/components/CategoryFilter';
import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaBbq from '@/assets/pizza-bbq.jpg';
import pizza4cheese from '@/assets/pizza-4cheese.jpg';
import burgerClassic from '@/assets/burger-classic.jpg';
import burgerSpicy from '@/assets/burger-spicy.jpg';
import burgerChicken from '@/assets/burger-chicken.jpg';
import burgerDouble from '@/assets/burger-double.jpg';
import drinkCola from '@/assets/drink-cola.jpg';
import drinkJuice from '@/assets/drink-juice.jpg';
import drinkMilkshake from '@/assets/drink-milkshake.jpg';
import drinkLemonade from '@/assets/drink-lemonade.jpg';
import rollPhiladelphia from '@/assets/roll-philadelphia.jpg';
import rollCalifornia from '@/assets/roll-california.jpg';
import rollDragon from '@/assets/roll-dragon.jpg';
import rollUnagi from '@/assets/roll-unagi.jpg';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: 'hit' | 'new' | 'sale';
  oldPrice?: number;
  sizes?: { size: string; price: number }[];
  piecesOptions?: { pieces: number; price: number }[];
  filterTags?: string[];
};

type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
  filters?: FilterOption[];
};

const menuCategories: MenuCategory[] = [
  {
    id: 'pizza',
    title: 'Пицца',
    description: 'Ароматная пицца на тонком тесте с натуральными ингредиентами',
    filters: pizzaFilters,
    items: [
      {
        id: 'pizza-1',
        name: 'Пепперони',
        description: 'Пикантная пепперони, моцарелла, томатный соус, орегано',
        price: 499,
        image: pizzaPepperoni,
        badge: 'hit' as const,
        filterTags: ['spicy', 'with-meat'],
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
        filterTags: ['vegetarian', 'cheese'],
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
        filterTags: ['with-chicken'],
        sizes: [
          { size: '25 см', price: 549 },
          { size: '30 см', price: 749 },
          { size: '40 см', price: 1099 },
        ],
      },
      {
        id: 'pizza-4',
        name: '4 сыра',
        description: 'Моцарелла, пармезан, горгонзола, чеддер на сливочной основе',
        price: 599,
        image: pizza4cheese,
        filterTags: ['vegetarian', 'cheese'],
        sizes: [
          { size: '25 см', price: 599 },
          { size: '30 см', price: 799 },
          { size: '40 см', price: 1149 },
        ],
      },
    ],
  },
  {
    id: 'rolls',
    title: 'Роллы',
    description: 'Свежие роллы с отборными морепродуктами и рыбой',
    filters: rollsFilters,
    items: [
      {
        id: 'roll-1',
        name: 'Филадельфия',
        description: 'Лосось, сливочный сыр, огурец, рис, нори',
        price: 349,
        image: rollPhiladelphia,
        badge: 'hit' as const,
        filterTags: ['hot', 'with-salmon', 'premium'],
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
        filterTags: ['baked'],
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
        filterTags: ['sale', 'with-eel', 'premium'],
        piecesOptions: [
          { pieces: 6, price: 449 },
          { pieces: 8, price: 579 },
          { pieces: 12, price: 849 },
        ],
      },
      {
        id: 'roll-4',
        name: 'Унаги',
        description: 'Копчёный угорь, сливочный сыр, авокадо, соус унаги',
        price: 479,
        image: rollUnagi,
        badge: 'sale' as const,
        oldPrice: 579,
        filterTags: ['sale', 'with-eel', 'baked'],
        piecesOptions: [
          { pieces: 6, price: 479 },
          { pieces: 8, price: 619 },
          { pieces: 12, price: 899 },
        ],
      },
    ],
  },
  {
    id: 'burgers',
    title: 'Бургеры',
    description: 'Сочные бургеры с фирменными соусами и свежими овощами',
    filters: burgersFilters,
    items: [
      {
        id: 'burger-1',
        name: 'Классический',
        description: 'Две котлеты из говядины, чеддер, салат, томаты, соленые огурцы',
        price: 399,
        image: burgerClassic,
        badge: 'hit' as const,
        filterTags: ['with-beef'],
      },
      {
        id: 'burger-2',
        name: 'Острый',
        description: 'Говядина, халапеньо, бекон, острый соус, плавленый сыр',
        price: 449,
        image: burgerSpicy,
        badge: 'sale' as const,
        oldPrice: 549,
        filterTags: ['sale', 'spicy', 'with-beef'],
      },
      {
        id: 'burger-3',
        name: 'Чикен',
        description: 'Хрустящая куриная грудка, салат, майонез, булочка бриошь',
        price: 379,
        image: burgerChicken,
        filterTags: ['with-chicken'],
      },
      {
        id: 'burger-4',
        name: 'Двойной',
        description: 'Двойная котлета, двойной сыр, бекон, фирменный соус',
        price: 549,
        image: burgerDouble,
        badge: 'new' as const,
        filterTags: ['with-beef', 'double'],
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Напитки',
    description: 'Освежающие напитки и коктейли к вашему заказу',
    items: [
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
      {
        id: 'drink-4',
        name: 'Лимонад',
        description: 'Домашний лимонад с мятой и льдом, 0.4л',
        price: 129,
        image: drinkLemonade,
        badge: 'hit' as const,
      },
    ],
  },
];

function MenuCategorySection({ category }: { category: MenuCategory }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredItems = useMemo(() => {
    if (selectedFilters.length === 0) {
      return category.items;
    }
    return category.items.filter((item) =>
      selectedFilters.some((filter) => item.filterTags?.includes(filter))
    );
  }, [category.items, selectedFilters]);

  return (
    <section
      id={category.id}
      className="py-12 md:py-16 even:bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {category.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {category.description}
          </p>
        </div>

        {category.filters && (
          <CategoryFilter
            filters={category.filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredItems.map((item, index) => (
              <ProductCard key={item.id} {...item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Нет товаров по выбранным фильтрам
            </p>
            <button
              onClick={() => setSelectedFilters([])}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function MenuSection() {
  return (
    <div id="menu">
      {menuCategories.map((category) => (
        <MenuCategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}
