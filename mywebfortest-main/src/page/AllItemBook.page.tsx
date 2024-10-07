import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Main/Header';
import SearchBar from '../components/Main/SearchBar';
import { useCart } from '../components/Main/CartProvider';
import Pagination from '../components/Main/Pagination';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

function AllItemBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/books?method=newest&page=${currentPage}&limit=15`);
      
      if (response.data && response.data.books && response.data.totalPages) {
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      setError('Error fetching books');
      console.error(error);  
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      name: book.title,
      price: book.price.toString(),
      quantity: 1,
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">หนังสือมาใหม่</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {books.length === 0 && !loading && <div>No books available</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <Link to={`/book/${book.id}`}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-64 object-cover mb-2"
                />
                <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                <p className="font-bold mb-2">฿ {book.price.toFixed(2)}</p>
              </Link>
              <button
                onClick={() => handleAddToCart(book)}
                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default AllItemBook;