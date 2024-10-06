import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  price: string;
  description: string;
  stocksAvailable: number;
  sold: number;
  createdAt: string;
  categories: { id: number; name: string }[];
}

interface BookSectionProps {
  title: string;
  method: 'newest' | 'best-selling';
}

const BookSection: React.FC<BookSectionProps> = ({ title, method }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, [method]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/books?method=${method}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const text = await response.text();
      console.log('Response text:', text);
      const data = JSON.parse(text);
      setBooks(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>กำลังโหลด...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const linkTo = title === "หนังสือมาใหม่" ? "/NewBook" : "/BestSellerBook";

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link to={linkTo} className="text-black text-xl hover:underline ">
          ดูทั้งหมด &gt;
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col items-center border border-gray-300 p-3 rounded-lg bg-gray-100 shadow-md">
            <img src={book.coverImage} alt={book.title} className="w-36 h-48 object-cover mb-2" />
            <h3 className="text-md font-bold text-center mb-1 text-gray-800">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.price} บาท</p>
            <p className="text-xs text-gray-500 mt-1">
              {book.categories.map(cat => cat.name).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSection;
