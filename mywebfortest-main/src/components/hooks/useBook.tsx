import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  stocksAvailable: number;
  sold: number;
  price: number;
  categories: { id: number; name: string }[];
    publisher: string;      // เพิ่มคุณสมบัตินี้
  author: string;        // เพิ่มคุณสมบัตินี้
  weight: number;        // เพิ่มคุณสมบัตินี้
  fullDescription: string; // เพิ่มคุณสมบัตินี้
}

export const useBook = (bookId: number) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        // ตรวจสอบว่าข้อผิดพลาดเป็น Error หรือไม่
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  return { book, loading, error };
};
