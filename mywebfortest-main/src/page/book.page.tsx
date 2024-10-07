import React, { useState } from 'react';
import Header from '../components/Main/Header';
import SearchBar from '../components/Main/SearchBar';
import { useCart } from '../components/hooks/useCart';
import { useBook } from '../components/hooks/useBook';

const Book: React.FC = () => {
  const { cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  // Assume we get the bookId from route params or props
  const bookId = 1; // This should be dynamic based on the current book
  const { book, loading, error } = useBook(bookId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= book.stocksAvailable) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      <main className="flex flex-col md:flex-row items-start px-5 md:px-20 max-w-4xl mx-auto my-10">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img
            src={book.coverImage}
            alt={`${book.title} book cover`}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl mb-4">{book.description}</h2>
          <h3 className="text-lg font-semibold mb-4">ราคา: ฿ {book.price.toFixed(2)}</h3>
          <div className="flex items-center mb-4">
            <button 
              className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              min="1"
              max={book.stocksAvailable}
              className="w-12 text-center mx-3 p-2 border rounded-full"
            />
            <button 
              className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
            <p className="ml-4 text-gray-600">มีสินค้าทั้งหมด {book.stocksAvailable} ชิ้น</p>
          </div>
          <div className="flex space-x-4 mb-6">
            <button className="bg-green-900 text-white rounded-full px-6 py-2 shadow-md">
              ซื้อทันที
            </button>
            <button className="bg-white text-green-900 rounded-full px-6 py-2 border-2 border-green-900 shadow-md">
              หยิบใส่รถเข็น
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
          <p>{book.fullDescription}</p>
        </div>
      </div>

    </div>
  );
};

export default Book;