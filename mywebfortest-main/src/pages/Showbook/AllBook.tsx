import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Cart from '../../components/Cart';
import { useCart } from '../../contexts/CartContext';

const styles: { [key: string]: React.CSSProperties } = {
  Tital: {
    fontSize: '20px'
  }
};

function AllBook() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity } = useCart();

  return (
    <>
      <Header />
      <SearchBar />
      <div style={styles.Tital}>All Book</div>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} updateQuantity={updateQuantity} />
    </>
  );
}

export default AllBook;