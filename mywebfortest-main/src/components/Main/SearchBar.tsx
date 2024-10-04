import React, { useState } from 'react';
import { ShoppingCart, Bell, Heart, Tally1 } from 'lucide-react';
import Cart from '../Cart/Cart';

const SearchBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <div className="bg-[#E2C9EF] p-3 flex justify-center items-center gap-[35vw]">
        <input
          type="text"
          placeholder="Search..."
          className="w-[50%] p-2 border-none rounded-[20px] text-[16px]"
        />
        <div className="flex gap-2 p-2">
          <Bell className="w-[30px] h-auto text-[rgb(44,82,52)]" />
          <Heart className="w-[30px] h-auto text-[rgb(44,82,52)]" />
          <Tally1 className="w-[30px] h-auto text-[rgb(44,82,52)]" />
          <ShoppingCart
            className="w-[30px] h-auto text-[rgb(44,82,52)] cursor-pointer"
            onClick={toggleCart}
          />
        </div>
      </div>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default SearchBar;