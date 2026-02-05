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
    name: 'Хрустящее',
    description: 'Тонкое и хрустящее как чипс',
    priceModifier: 0,
  },
  {
    id: 'thick',
    name: 'Пушистое',
    description: 'Мягкое и воздушное тесто',
    priceModifier: 50,
  },
  {
    id: 'cheese-crust',
    name: 'С сыром в бортике',
    description: 'Моцарелла прячется в краешке',
    priceModifier: 100,
  },
];

export const sizeOptions: SizeOption[] = [
  {
    id: 'small',
    name: 'Мини',
    diameter: 25,
    priceModifier: 0,
  },
  {
    id: 'medium',
    name: 'Стандарт',
    diameter: 30,
    priceModifier: 150,
  },
  {
    id: 'large',
    name: 'Семейная',
    diameter: 40,
    priceModifier: 350,
  },
];

export const toppingOptions: ToppingOption[] = [
  // Мясо
  { id: 'pepperoni', name: 'Пепперони', price: 79, category: 'meat', icon: '🍕' },
  { id: 'chicken', name: 'Курочка', price: 89, category: 'meat', icon: '🍗' },
  { id: 'bacon', name: 'Хрустящий бекон', price: 99, category: 'meat', icon: '🥓' },
  { id: 'ham', name: 'Нежная ветчина', price: 79, category: 'meat', icon: '🍖' },
  
  // Овощи
  { id: 'tomato', name: 'Свежие томаты', price: 49, category: 'vegetables', icon: '🍅' },
  { id: 'mushrooms', name: 'Грибочки', price: 59, category: 'vegetables', icon: '🍄' },
  { id: 'pepper', name: 'Сладкий перец', price: 49, category: 'vegetables', icon: '🫑' },
  { id: 'onion', name: 'Красный лук', price: 29, category: 'vegetables', icon: '🧅' },
  { id: 'olives', name: 'Оливки', price: 69, category: 'vegetables', icon: '🫒' },
  { id: 'jalapeno', name: 'Острый халапеньо', price: 59, category: 'vegetables', icon: '🌶️' },
  
  // Сыры
  { id: 'mozzarella', name: 'Тягучая моцарелла', price: 89, category: 'cheese', icon: '🧀' },
  { id: 'parmesan', name: 'Пармезан', price: 99, category: 'cheese', icon: '🧀' },
  { id: 'cheddar', name: 'Чеддер', price: 79, category: 'cheese', icon: '🧀' },
  { id: 'feta', name: 'Солёная фета', price: 89, category: 'cheese', icon: '🧀' },
  
  // Соусы
  { id: 'tomato-sauce', name: 'Классический томатный', price: 0, category: 'sauce', icon: '🍅' },
  { id: 'cream-sauce', name: 'Нежный сливочный', price: 30, category: 'sauce', icon: '🥛' },
  { id: 'bbq-sauce', name: 'Дымный BBQ', price: 30, category: 'sauce', icon: '🍯' },
];

export const BASE_PRICE = 299;
