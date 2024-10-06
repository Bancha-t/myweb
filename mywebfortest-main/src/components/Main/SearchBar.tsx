import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Bell, Heart, Tally1 } from 'lucide-react';
import Cart from '../Cart/Cart';
import { useSearchBooks } from '../../hooks/useSearchBooks';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchBooks, searchResults, isLoading, error } = useSearchBooks();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchBooks(query);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchBooks]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
    setShowResults(false);
  };

  return (
    <>
      <div className="bg-[#E2C9EF] p-3 flex justify-center items-center gap-[35vw]">
        <div className="relative w-[50%]" ref={searchRef}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-none rounded-[20px] text-[16px]"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
          />
          {showResults && (
            <div className="absolute w-full mt-1 bg-white rounded-[10px] shadow-lg z-10 max-h-[400px] overflow-y-auto">
              {isLoading && <p className="p-2">Loading...</p>}
              {error && <p className="p-2 text-red-500">Error: {error}</p>}
              {searchResults.length > 0 ? (
                searchResults.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="flex items-center">
                      <img src={book.coverImage} alt={book.title} className="w-10 h-14 object-cover mr-2" />
                      <div>
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-sm text-gray-600">฿{book.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                query && !isLoading && <p className="p-2">No results found</p>
              )}
            </div>
          )}
        </div>
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