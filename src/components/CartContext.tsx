import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type CartAction = 
  | { type: 'ADD_ITEM', item: CartItem }
  | { type: 'INCREASE_QUANTITY', id: number }
  | { type: 'DECREASE_QUANTITY', id: number }
  | { type: 'REMOVE_ITEM', id: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.item.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.item, quantity: 1 }];
      }
    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<{
  cartItems: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
  totalItems: number;
  totalPrice: number;
}>({
  cartItems: [],
  dispatch: () => null,
  addToCart: () => null,
  totalItems: 0,
  totalPrice: 0
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, dispatch, addToCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
