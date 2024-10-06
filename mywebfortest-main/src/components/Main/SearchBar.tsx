import React, { useState } from 'react';
import { ShoppingCart, Bell, Heart, Tally1 } from 'lucide-react';
import Cart from '../Cart/Cart';

const SearchBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // ฟังก์ชันสำหรับค้นหาหนังสือ
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {
      // Fetch ข้อมูลหนังสือจาก API
      const response = await fetch(`/api/books?method=search&q=${event.target.value}`);
      const results = await response.json();
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="bg-[#E2C9EF] p-3 flex justify-center items-center gap-[35vw]">
        <input
          type="text"
          placeholder="Search..."
          className="w-[50%] p-2 border-none rounded-[20px] text-[16px]"
          value={query}
          onChange={handleSearch}
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

      {/* แสดงผลลัพธ์การค้นหา */}
      {searchResults.length > 0 && (
        <ul className="bg-white p-4 rounded-md w-[50%] mx-auto">
          {searchResults.map((book) => (
            <li key={book.id} className="py-2 border-b">
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
