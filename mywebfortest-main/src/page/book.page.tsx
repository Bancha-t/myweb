import React from 'react';
import Header from '../components/Main/Header';
import SearchBar from '../components/Main/SearchBar';
import { useCart } from '../hooks/useCart'; // Ensure this hook exists

const Book: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      <main className="flex flex-col md:flex-row items-start px-5 md:px-20 max-w-4xl mx-auto my-10">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <img
            src="../photo/alltomorowhohoho.png"
            alt="All Tomorrows book cover"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">All Tomorrows</h1>
          <h2 className="text-xl mb-4">จักรวาลแห่งวันพรุ่งนี้</h2>
          <h3 className="text-lg font-semibold mb-4">ราคา: ฿ 400.00</h3>
          <div className="flex items-center mb-4">
            <button className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900">
              -
            </button>
            <input
              type="number"
              value="1"
              min="1"
              className="w-12 text-center mx-3 p-2 border rounded-full"
            />
            <button className="bg-white text-green-900 rounded-full p-2 border-2 border-green-900">
              +
            </button>
            <p className="ml-4 text-gray-600">มีสินค้าทั้งหมด 4316 ชิ้น</p>
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
          <p>สำนักพิมพ์ : สำนักพิมพ์เวลา</p>
          <p>ผู้แต่ง : เอช. พี. เลิฟคราฟท์</p>
          <p>น้ำหนัก : 350 กรัม</p>
          <p>รหัสสินค้า : 1212312121123</p>
        </div>
        <div>
          <h3 className="font-bold">
            รายละเอียดสินค้า : <span className="font-normal">All Tomorrows จักรวาลแห่งวันพรุ่งนี้</span>
          </h3>
          <p>
            สิ่งที่ทำในวันนี้จะส่งผลต่อวันพรุ่งนี้ ไม่มีทางเป็นอื่นไปได้ จงรักวันนี้ และไขว่คว้าวันพรุ่งนี้! อนาคตอันมืดมนของมนุษยชาติในอีกพันล้านปีข้างหน้า...
          </p>
          {/* Add full product details as required */}
        </div>
      </div>

      <section className="text-center my-10">
        <h2 className="text-xl font-bold mb-6">สินค้าที่เกี่ยวข้อง</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="text-center">
              <img
                src="../photo/alltomorowhohoho.png"
                alt="All Tomorrows"
                className="w-3/5 mx-auto"
              />
              <h3 className="mt-2">All Tomorrows</h3>
              <p className="text-lg">฿ 400.00</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Book;
