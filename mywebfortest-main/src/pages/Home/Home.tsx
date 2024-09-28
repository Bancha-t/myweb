import React from 'react';
import BookSection from '../../components/BookSection';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Cart from '../../components/Cart';
import { useCart } from '../../contexts/CartContext';

const homeContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

function Home() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity } = useCart();

  return (
    <div style={homeContainerStyle}>
      <Header />
      <SearchBar />
      <Banner />
      <BookSection title="หนังสือขายดี" />
      <BookSection title="หนังสือมาใหม่" />
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} updateQuantity={updateQuantity} />
    </div>
  );
}

export default Home;