import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingCart, Bell, Heart, Tally1 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cart from '../Main/Cart';
import { useSearchBooks } from '../hooks/useSearchBooks';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import DOMPurify from 'dompurify';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  price: string;
  categories: { id: number; name: string }[];
}

const SearchBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchBooks, searchResults, isLoading, error } = useSearchBooks();
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const lastSearchRef = useRef<string>('');

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length >= 1 && searchTerm !== lastSearchRef.current) {
        searchBooks(searchTerm);
        setShowResults(true);
        lastSearchRef.current = searchTerm;
      } else if (searchTerm.trim().length === 0) {
        setShowResults(false);
      }
    }, 300),
    [searchBooks]
  );

  useEffect(() => {
    if (query !== lastSearchRef.current) {
      debouncedSearch(query);
    }
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

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
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim().length === 0) {
      setShowResults(false);
    }
  };

  return (
    <>
      <div className="bg-[#E2C9EF] p-3 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-[35vw]">
        <div className="relative w-full md:w-[50%]" ref={searchRef}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-none rounded-[20px] text-[14px]"
            value={query}
            onChange={handleSearchChange}
          />
          {showResults && (
            <div className="absolute w-full mt-1 bg-white rounded-[10px] shadow-lg z-10 max-h-[80vh] overflow-y-auto p-2">
              {isLoading && <p className="p-1">กำลังโหลด...</p>}
              {error && <p className="p-1 text-red-500">Error: {error}</p>}
              {searchResults.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {searchResults.map((book: Book) => (
                    <Link 
                      key={book.id} 
                      to={`/api/book/${encodeURIComponent(book.id)}`} 
                      className="flex p-1 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300"
                    >
                      <div className="flex-none w-16 h-24 md:w-20 md:h-30 mr-2">
                        <img 
                          src={DOMPurify.sanitize(book.coverImage)} 
                          alt={DOMPurify.sanitize(book.title)} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xs font-bold text-gray-800">{DOMPurify.sanitize(book.title)}</h3>
                        <p className="text-xs font-bold text-gray-600">{DOMPurify.sanitize(book.price)} บาท</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {book.categories.map(cat => DOMPurify.sanitize(cat.name)).join(', ')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                query.trim().length > 0 && !isLoading && <p className="p-1">ไม่พบผลลัพธ์</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2 p-2">
          <Bell className="w-5 h-5 md:w-[25px] md:h-auto text-[rgb(44,82,52)]" />
          <Heart className="w-5 h-5 md:w-[25px] md:h-auto text-[rgb(44,82,52)]" />
          <Tally1 className="w-5 h-5 md:w-[25px] md:h-auto text-[rgb(44,82,52)]" />
          <ShoppingCart
            className="w-5 h-5 md:w-[25px] md:h-auto text-[rgb(44,82,52)] cursor-pointer"
            onClick={toggleCart}
          />
        </div>
      </div>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default SearchBar;
