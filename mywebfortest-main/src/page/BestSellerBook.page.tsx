import { useState } from 'react';
import Header from '../components/Main/Header';
import SearchBar from '../components/Main/SearchBar';
import Cart from '../components/Main/Cart';
import { CartProvider, useCart } from '../components/Main/CartProvider';

function BestSellerBook() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, setCartItems } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 0) } : item
      )
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchBar onCartClick={toggleCart} />
      <Cart 
        isOpen={isCartOpen} 
        toggleCart={toggleCart} 
        items={cartItems} 
        updateQuantity={updateQuantity} 
      />
      <div className="text-2xl font-semibold p-7 text-center">BestSellerBook</div>
    </div>
  );
}

// Wrap the Home component with the CartProvider
const BestSellerBookWithProvider = () => (
  <CartProvider>
    <BestSellerBook />
  </CartProvider>
);

export default BestSellerBookWithProvider;
