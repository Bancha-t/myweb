import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  price: string; // เปลี่ยนเป็น string เนื่องจาก price เป็น numeric ในฐานข้อมูล
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
      setBooks(data.slice(0, 5)); // จำกัดที่ 5 เล่มสำหรับแต่ละส่วน
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('ไม่สามารถโหลดข้อมูลหนังสือได้ กรุณาลองใหม่อีกครั้ง');
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

export default BookSection;
