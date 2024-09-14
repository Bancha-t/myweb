import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const NewBook = lazy(() => import('./pages/Showbook/NewBook'));

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position when route changes
    window.scrollTo(0, 0);
    // Reset any global styles that might have been changed
    document.body.style.overflow = '';
    document.body.style.height = '';
  }, [location.pathname]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/NewBook" element={<NewBook />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;