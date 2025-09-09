'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Item } from '@/data/products';

export interface CartItem extends Item {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Item; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (item: Item, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartData: () => CartState;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// LocalStorage helper functions
const CART_STORAGE_KEY = 'espacedecor-cart';

const saveCartToStorage = (cartState: CartState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.warn('Failed to save cart to localStorage:', error);
    }
  }
};

const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load cart from localStorage:', error);
    }
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        const updatedItems = state.items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
        newState = calculateTotals({ ...state, items: updatedItems });
      } else {
        const newItem: CartItem = { ...item, quantity };
        newState = calculateTotals({ ...state, items: [...state.items, newItem] });
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      newState = calculateTotals({ ...state, items: updatedItems });
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      newState = calculateTotals({ ...state, items: updatedItems });
      break;
    }

    case 'CLEAR_CART':
      newState = { items: [], totalItems: 0, totalPrice: 0 };
      break;

    case 'LOAD_FROM_STORAGE':
      return action.payload;

    default:
      return state;
  }

  // Save to localStorage after state change
  saveCartToStorage(newState);
  return newState;
};

const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { ...state, totalItems, totalPrice };
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.items.length > 0) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedCart });
    }
  }, []);

  const addItem = (item: Item, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartData = () => {
    return state;
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, getCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
