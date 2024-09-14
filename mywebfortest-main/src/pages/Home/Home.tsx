import React from 'react';
import BookSection from '../../components/BookSection';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Cart from '../../components/Cart';
import styles from './Home.module.css';  // Import CSS module

function Home() {
  return (
    <div className={styles.homeContainer}>      
      <Header />
      <SearchBar />
      <Banner />
      <BookSection title="หนังสือขายดี" />
      <BookSection title="หนังสือมาใหม่" />
      <Cart />
    </div>
  );
}

export default Home;