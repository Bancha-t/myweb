import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './global.css';

import Loader from './components/Loader';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const NewBook = lazy(() => import('./pages/Showbook/NewBook'));
const AllBook = lazy(() => import('./pages/Showbook/AllBook'));

const App: React.FC = () => {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    // Data ของสินค้าในตะกร้า
  ]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  }, [location.pathname]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* วาง Header นอก Routes */}
      <Header 
        isCartOpen={isCartOpen} 
        toggleCart={toggleCart} 
        cartItems={cartItems} 
      />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/AllBook" element={<AllBook />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
