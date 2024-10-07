import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/hooks/useCart';
import { Heart } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  coverImage: string;
  stocksAvailable: number;
  description: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/books/${id}");
        console.log('Book details API Response:', response.data); // ตรวจสอบข้อมูลที่ได้รับ
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error); // ดีบัก
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>; // แสดงข้อความเมื่อไม่พบหนังสือ

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to update the favorite status
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <main className="flex flex-col md:flex-row items-start px-5 md:px-20 max-w-4xl mx-auto my-10">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img
            src={book.coverImage}
            alt={`${book.title} book cover`}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl mb-4">{book.subtitle}</h2>
          <h3 className="text-lg font-semibold mb-4">ราคา: ฿ {book.price.toFixed(2)}</h3>
          <div className="flex items-center mb-4">
            <button 
              className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              className="w-12 text-center mx-3 p-2 border rounded-full"
              readOnly
            />
            <button 
              className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
            <p className="ml-4 text-gray-600">มีสินค้าทั้งหมด {book.stocksAvailable} ชิ้น</p>
          </div>
          <div className="flex space-x-4 mb-6">
            <button 
              className="bg-green-900 text-white rounded-full px-6 py-2 shadow-md"
              onClick={handleAddToCart}
            >
              ซื้อทันที
            </button>
            <button 
              className="bg-white text-green-900 rounded-full px-6 py-2 border-2 border-green-900 shadow-md"
              onClick={handleAddToCart}
            >
              หยิบใส่รถเข็น
            </button>
            <button 
              className={`rounded-full p-2 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
              onClick={toggleFavorite}
            >
              <Heart fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </main>
      <div className="bg-purple-100 rounded-lg px-10 py-8 mx-auto mb-10 w-[80%]">
        <div className="mb-8">
          <h3 className="text-lg font-bold">ข้อมูลหนังสือ</h3>
          <p>รหัสสินค้า : {book.id}</p>
        </div>
        <div>
          <h3 className="font-bold">
            รายละเอียดสินค้า : <span className="font-normal">{book.title}</span>
          </h3>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;