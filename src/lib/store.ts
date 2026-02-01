import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  pieces?: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (item) => {
    set((state) => {
      // Create unique id based on item id + size or pieces
      const uniqueId = item.size 
        ? `${item.id}-${item.size}` 
        : item.pieces 
        ? `${item.id}-${item.pieces}pcs` 
        : item.id;
      
      const existingItem = state.items.find((i) => {
        const existingUniqueId = i.size 
          ? `${i.id}-${i.size}` 
          : i.pieces 
          ? `${i.id}-${i.pieces}pcs` 
          : i.id;
        return existingUniqueId === uniqueId;
      });
      
      if (existingItem) {
        return {
          items: state.items.map((i) => {
            const iUniqueId = i.size 
              ? `${i.id}-${i.size}` 
              : i.pieces 
              ? `${i.id}-${i.pieces}pcs` 
              : i.id;
            return iUniqueId === uniqueId ? { ...i, quantity: i.quantity + 1 } : i;
          }),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => {
        const uniqueId = item.size 
          ? `${item.id}-${item.size}` 
          : item.pieces 
          ? `${item.id}-${item.pieces}pcs` 
          : item.id;
        return uniqueId !== id;
      }),
    }));
  },
  
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((item) => {
        const uniqueId = item.size 
          ? `${item.id}-${item.size}` 
          : item.pieces 
          ? `${item.id}-${item.pieces}pcs` 
          : item.id;
        return uniqueId === id ? { ...item, quantity } : item;
      }),
    }));
  },
  
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
