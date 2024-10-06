import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css'

import Loader from './components/Main/Loader';
import { CartProvider } from './components/Main/CartProvider';

const Home = lazy(() => import('./page/Home.page'));
const Login = lazy(() => import('./page/Login.page'));
const AllItemBook = lazy(() => import('./page/AllItemBook.page'));
const SettingAccounts = lazy(() => import('./page/SettingAccounts.page'));
const BestSellerBook = lazy(() => import('./page/BestSellerBook.page'));
const NewBook = lazy(() => import('./page/NewBook.page'));

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  }, [location.pathname]);

  return (
    <CartProvider>
      <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AllItemBook" element={<AllItemBook />} />
            <Route path="/SettingAccounts" element={<SettingAccounts />} />
            <Route path="/BestSellerBook" element={<BestSellerBook />} />
            <Route path="/NewBook" element={<NewBook />} />
            <Route path="/Loader" element={<Loader />} />
          </Routes>
        </Suspense>
      </div>
    </CartProvider>
  );
};

export default App;