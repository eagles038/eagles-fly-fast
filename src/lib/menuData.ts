import { FilterOption, pizzaFilters, rollsFilters, burgersFilters } from '@/components/CategoryFilter';
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

export type MenuItem = {
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

export type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
  filters?: FilterOption[];
};

export const menuCategories: MenuCategory[] = [
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
        badge: 'hit',
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
        badge: 'new',
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
        badge: 'hit',
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
        badge: 'new',
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
        badge: 'sale',
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
        badge: 'hit',
        filterTags: ['with-beef'],
      },
      {
        id: 'burger-2',
        name: 'Острый',
        description: 'Говядина, халапеньо, бекон, острый соус, плавленый сыр',
        price: 449,
        image: burgerSpicy,
        badge: 'sale',
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
        badge: 'new',
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
        badge: 'new',
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
        badge: 'hit',
      },
    ],
  },
];

export function getCategoryById(id: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.id === id);
}
