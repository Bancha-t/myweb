import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Banner from './components/Banner';
import BookSection from './components/BookSection';
import Cart from './components/Cart';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Banner />
      <BookSection title="หนังสือขายดี" />
      <BookSection title="หนังสือมาใหม่" />
      <Cart />
    </div>
  );
};

export default App;