import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { debounce } from 'lodash'; // Make sure to install lodash if not already installed

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCartItem: (bookId: number, amount: number) => void;
  checkout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  addToCart: (item: CartItem) => void;
  fetchCartItems: () => Promise<void>;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/cart');
      setCartItems(
        response.data.items.map((item: any) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: item.amount,
          image: item.image
        }))
      );
    } catch (err) {
      setError('Failed to fetch cart items');
      toast.error('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    toast.success(`${item.name} added to cart`);
  }, []);

  const debouncedUpdateCart = useCallback(
    debounce(async (bookId: number, amount: number) => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/cart', { bookId, amount }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await fetchCartItems();
        toast.success('Cart updated successfully');
      } catch (err) {
        setError('Failed to update cart item');
        toast.error('Failed to update cart item');
      }
    }, 500),
    [fetchCartItems]
  );

  const updateCartItem = useCallback((bookId: number, amount: number) => {
    if (amount === 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === bookId ? { ...item, quantity: amount } : item
      )
    );
    debouncedUpdateCart(bookId, amount);
  }, [debouncedUpdateCart]);

  const checkout = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.get('/api/cart/checkout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
      toast.success('Checkout successful');
    } catch (err) {
      setError('Failed to checkout');
      toast.error('Failed to checkout');
    } finally {
      setLoading(false);
    }
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      updateCartItem,
      checkout,
      loading,
      error,
      addToCart,
      fetchCartItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};