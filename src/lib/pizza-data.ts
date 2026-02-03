// Pizza data and ingredients for the pizza builder

import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaBbq from '@/assets/pizza-bbq.jpg';
import pizza4cheese from '@/assets/pizza-4cheese.jpg';

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  category: 'meat' | 'seafood' | 'cheese' | 'vegetable' | 'sauce';
  icon: string;
  isDouble?: boolean;
};

export type PizzaBase = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  defaultIngredients: string[];
};

export const ingredients: Ingredient[] = [
  // Meats
  { id: 'pepperoni', name: 'Пепперони', price: 79, category: 'meat', icon: '🍖' },
  { id: 'ham', name: 'Ветчина', price: 69, category: 'meat', icon: '🥓' },
  { id: 'bacon', name: 'Бекон', price: 89, category: 'meat', icon: '🥓' },
  { id: 'chicken', name: 'Курица', price: 79, category: 'meat', icon: '🍗' },
  { id: 'sausage', name: 'Колбаски', price: 89, category: 'meat', icon: '🌭' },
  
  // Seafood
  { id: 'shrimp', name: 'Креветки', price: 129, category: 'seafood', icon: '🦐' },
  { id: 'tuna', name: 'Тунец', price: 119, category: 'seafood', icon: '🐟' },
  
  // Cheese
  { id: 'mozzarella', name: 'Моцарелла', price: 59, category: 'cheese', icon: '🧀' },
  { id: 'parmesan', name: 'Пармезан', price: 79, category: 'cheese', icon: '🧀' },
  { id: 'cheddar', name: 'Чеддер', price: 69, category: 'cheese', icon: '🧀' },
  { id: 'gorgonzola', name: 'Горгонзола', price: 89, category: 'cheese', icon: '🧀' },
  
  // Vegetables
  { id: 'mushrooms', name: 'Шампиньоны', price: 49, category: 'vegetable', icon: '🍄' },
  { id: 'tomatoes', name: 'Томаты', price: 39, category: 'vegetable', icon: '🍅' },
  { id: 'onion', name: 'Лук', price: 29, category: 'vegetable', icon: '🧅' },
  { id: 'pepper', name: 'Болгарский перец', price: 39, category: 'vegetable', icon: '🫑' },
  { id: 'olives', name: 'Оливки', price: 49, category: 'vegetable', icon: '🫒' },
  { id: 'jalapeno', name: 'Халапеньо', price: 49, category: 'vegetable', icon: '🌶️' },
  { id: 'corn', name: 'Кукуруза', price: 39, category: 'vegetable', icon: '🌽' },
  { id: 'pineapple', name: 'Ананас', price: 49, category: 'vegetable', icon: '🍍' },
  { id: 'basil', name: 'Базилик', price: 39, category: 'vegetable', icon: '🌿' },
  
  // Sauces
  { id: 'tomato-sauce', name: 'Томатный соус', price: 0, category: 'sauce', icon: '🍅' },
  { id: 'cream-sauce', name: 'Сливочный соус', price: 29, category: 'sauce', icon: '🥛' },
  { id: 'bbq-sauce', name: 'Соус BBQ', price: 29, category: 'sauce', icon: '🍯' },
  { id: 'pesto', name: 'Песто', price: 49, category: 'sauce', icon: '🌿' },
];

export const pizzaBases: PizzaBase[] = [
  {
    id: 'pepperoni',
    name: 'Пепперони',
    description: 'Пикантная пепперони, моцарелла, томатный соус',
    basePrice: 499,
    image: pizzaPepperoni,
    defaultIngredients: ['pepperoni', 'mozzarella', 'tomato-sauce'],
  },
  {
    id: 'margherita',
    name: 'Маргарита',
    description: 'Свежие томаты, моцарелла, базилик',
    basePrice: 399,
    image: pizzaMargherita,
    defaultIngredients: ['tomatoes', 'mozzarella', 'basil', 'tomato-sauce'],
  },
  {
    id: 'bbq-chicken',
    name: 'BBQ Курица',
    description: 'Курица гриль, соус BBQ, кукуруза, сыр',
    basePrice: 549,
    image: pizzaBbq,
    defaultIngredients: ['chicken', 'corn', 'onion', 'mozzarella', 'bbq-sauce'],
  },
  {
    id: 'four-cheese',
    name: '4 сыра',
    description: 'Моцарелла, пармезан, горгонзола, чеддер',
    basePrice: 599,
    image: pizza4cheese,
    defaultIngredients: ['mozzarella', 'parmesan', 'gorgonzola', 'cheddar', 'cream-sauce'],
  },
];

export const sizeOptions = [
  { size: '25 см', multiplier: 1, label: 'Маленькая' },
  { size: '30 см', multiplier: 1.35, label: 'Средняя' },
  { size: '40 см', multiplier: 1.8, label: 'Большая' },
];

export const crustOptions = [
  { id: 'thin', name: 'Тонкое тесто', price: 0 },
  { id: 'classic', name: 'Классическое', price: 0 },
  { id: 'thick', name: 'Пышное', price: 49 },
  { id: 'cheese-crust', name: 'Сырный борт', price: 99 },
];

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredients.find(ing => ing.id === id);
}

export function getPizzaById(id: string): PizzaBase | undefined {
  return pizzaBases.find(pizza => pizza.id === id);
}
