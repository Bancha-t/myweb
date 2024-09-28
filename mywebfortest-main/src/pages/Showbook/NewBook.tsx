import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Cart from '../../components/Cart';
import { useCart } from '../../contexts/CartContext';

function NewBook() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity } = useCart();

  return (
    <>
      <Header />
      <SearchBar />
      <div style={{ fontSize: '20px' }}>New Book</div>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} updateQuantity={updateQuantity} />
    </>
  );
}

export default NewBook;