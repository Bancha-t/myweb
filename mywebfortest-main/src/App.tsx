import React from 'react';
import Header from './components/Header.tsx';
import SearchBar from './components/SearchBar.tsx';
import Banner from './components/Banner.tsx';
import BookSection from './components/BookSection.tsx';
import Cart from './components/Cart.tsx';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <SearchBar />
        <Banner />
        <BookSection title="หนังสือขายดี" />
        <BookSection title="หนังสือมาใหม่" />
      </main>
      <Cart />
    </div>
  );
};

export default App;