import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../components/Main/Header';
import SearchBar from '../components/Main/SearchBar';
import { CartProvider, useCart } from '../components/Main/CartProvider';
import SidebarSetting from '../components/AccountsSetting/SidebarSetting';

// Import new components (you'll need to create these)
import PersonalInfo from '../components/AccountsSetting/PersonalInfo';
import AddressBook from '../components/AccountsSetting/AddressBook';
import PurchaseHistory from '../components/AccountsSetting/PurchaseHistory';
import FavoriteItems from '../components/AccountsSetting/FavoriteItems';

function SettingsMain() {
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
    <Router>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <SearchBar />
        <div className="flex">
          <SidebarSetting />
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/settings/personal-info" element={<PersonalInfo />} />
              <Route path="/settings/address-book" element={<AddressBook />} />
              <Route path="/settings/purchase-history" element={<PurchaseHistory />} />
              <Route path="/settings/favorites" element={<FavoriteItems />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

// Wrap the SettingsMain component with the CartProvider
const SettingsMainWithProvider = () => (
  <CartProvider>
    <SettingsMain />
  </CartProvider>
);

export default SettingsMainWithProvider;