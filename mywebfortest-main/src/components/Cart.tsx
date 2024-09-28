import React, { createContext, useState, useContext } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  isCartOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  updateQuantity: (id: number, change: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "alya sometimes hides her feelings in russian 1", price: 650, quantity: 3 },
    { id: 2, name: "Spy x family 1", price: 95, quantity: 1 },
    { id: 3, name: "All Tomorrows", price: 400, quantity: 1 },
  ]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ isCartOpen, cartItems, toggleCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};