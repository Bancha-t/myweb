import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`/books?page=${currentPage}&limit=15`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book.id,
      name: book.title,
      price: book.price.toString(),
      quantity: 1
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">หนงสือขายดี</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} className="flex flex-col">
              <img src={book.imageUrl} alt={book.title} className="w-full h-64 object-cover mb-2" />
              <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{book.author}</p>
              <p className="font-bold mb-2">฿ {book.price.toFixed(2)}</p>
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