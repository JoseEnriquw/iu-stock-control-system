import React, { createContext, useContext, useReducer } from 'react';
import type { SaleDetail } from '../../types/Sale';
import type { ProductDto } from '../../types/Product';

interface CartState {
  items: (SaleDetail & { product: ProductDto })[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: SaleDetail & { product: ProductDto } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + (action.payload.salePrice * action.payload.quantity)
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.salePrice * action.payload.quantity)
      };
    }

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.productId === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.salePrice * itemToRemove.quantity : 0)
      };

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(i => i.productId === action.payload.productId);
      if (!item) return state;

      const oldTotal = item.salePrice * item.quantity;
      const newTotal = item.salePrice * action.payload.quantity;

      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total - oldTotal + newTotal
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}