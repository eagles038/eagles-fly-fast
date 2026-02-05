export interface DoughOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface SizeOption {
  id: string;
  name: string;
  diameter: number;
  priceModifier: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  category: 'meat' | 'vegetables' | 'cheese' | 'sauce';
  icon: string;
}

export interface ConstructorState {
  dough: DoughOption | null;
  size: SizeOption | null;
  toppings: ToppingOption[];
}

export const doughOptions: DoughOption[] = [
  {
    id: 'thin',
    name: 'Тонкое',
    description: 'Хрустящее тесто для любителей классики',
    priceModifier: 0,
  },
  {
    id: 'thick',
    name: 'Пышное',
    description: 'Воздушное тесто с мягким краем',
    priceModifier: 50,
  },
  {
    id: 'cheese-crust',
    name: 'Сырный борт',
    description: 'С расплавленным сыром в бортике',
    priceModifier: 100,
  },
];

export const sizeOptions: SizeOption[] = [
  {
    id: 'small',
    name: 'Маленькая',
    diameter: 25,
    priceModifier: 0,
  },
  {
    id: 'medium',
    name: 'Средняя',
    diameter: 30,
    priceModifier: 150,
  },
  {
    id: 'large',
    name: 'Большая',
    diameter: 40,
    priceModifier: 350,
  },
];

export const toppingOptions: ToppingOption[] = [
  // Мясо
  { id: 'pepperoni', name: 'Пепперони', price: 79, category: 'meat', icon: '🥓' },
  { id: 'chicken', name: 'Курица', price: 89, category: 'meat', icon: '🍗' },
  { id: 'bacon', name: 'Бекон', price: 99, category: 'meat', icon: '🥓' },
  { id: 'ham', name: 'Ветчина', price: 79, category: 'meat', icon: '🍖' },
  
  // Овощи
  { id: 'tomato', name: 'Томаты', price: 49, category: 'vegetables', icon: '🍅' },
  { id: 'mushrooms', name: 'Шампиньоны', price: 59, category: 'vegetables', icon: '🍄' },
  { id: 'pepper', name: 'Болгарский перец', price: 49, category: 'vegetables', icon: '🫑' },
  { id: 'onion', name: 'Лук', price: 29, category: 'vegetables', icon: '🧅' },
  { id: 'olives', name: 'Маслины', price: 69, category: 'vegetables', icon: '🫒' },
  { id: 'jalapeno', name: 'Халапеньо', price: 59, category: 'vegetables', icon: '🌶️' },
  
  // Сыры
  { id: 'mozzarella', name: 'Моцарелла', price: 89, category: 'cheese', icon: '🧀' },
  { id: 'parmesan', name: 'Пармезан', price: 99, category: 'cheese', icon: '🧀' },
  { id: 'cheddar', name: 'Чеддер', price: 79, category: 'cheese', icon: '🧀' },
  { id: 'feta', name: 'Фета', price: 89, category: 'cheese', icon: '🧀' },
  
  // Соусы
  { id: 'tomato-sauce', name: 'Томатный', price: 0, category: 'sauce', icon: '🍅' },
  { id: 'cream-sauce', name: 'Сливочный', price: 30, category: 'sauce', icon: '🥛' },
  { id: 'bbq-sauce', name: 'BBQ', price: 30, category: 'sauce', icon: '🍯' },
];

export const BASE_PRICE = 299;
