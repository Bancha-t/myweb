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
      const data = await response.json();
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

  return (
    <div style={bookSectionStyle}>
      <div style={sectionTitleStyle}>
        <h2>{title}</h2>
        <Link to="/NewBook" style={linkStyle}>ดูทั้งหมด &gt;</Link>
      </div>
      <div style={bookGridStyle}>
        {books.map((book) => (
          <div key={book.id} style={bookItemStyle}>
            <img src={book.coverImage} alt={book.title} style={bookImageStyle} />
            <h3 style={bookTitleStyle}>{book.title}</h3>
            <p style={bookPriceStyle}>{book.price} บาท</p>
            <p style={bookCategoryStyle}>
              {book.categories.map(cat => cat.name).join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const bookSectionStyle: React.CSSProperties = {
  padding: '20px',
};

const bookGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '20px',
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000', // Change this color as needed
};

const bookCategoryStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#666',
  marginTop: '5px',
};

const bookItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const bookImageStyle: React.CSSProperties = {
  width: '150px',
  height: '200px',
  objectFit: 'cover',
  marginBottom: '10px',
};

const bookTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '10px 0',
  color: '#333',
};

const bookPriceStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#555',
};

export default BookSection;
