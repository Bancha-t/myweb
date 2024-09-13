import React, { useState } from 'react';
import { ShoppingCart, Bell, Heart, Menu } from 'lucide-react';

const AllTomorrowsBookDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-3xl font-bold text-green-800">
          <Menu size={30} />
          <span>Ani Meb</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/api/placeholder/30/30" alt="User icon" className="w-8 h-8" />
          <a href="#" className="text-green-800">เข้าสู่ระบบ</a>
        </div>
      </header>

      <div className="bg-purple-200 p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-2 rounded-full"
        />
        <div className="flex gap-4">
          <Bell size={24} />
          <Heart size={24} />
          <div className="w-px h-6 bg-black" />
          <ShoppingCart size={24} />
        </div>
      </div>

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto flex gap-8">
          <div className="w-1/3">
            <img src="/api/placeholder/300/450" alt="All Tomorrows book cover" className="w-full" />
          </div>
          <div className="w-2/3">
            <h1 className="text-3xl font-bold">All Tomorrows</h1>
            <h2 className="text-xl">จักรวาลแห่งวันพรุ่งนี้</h2>
            <p className="text-2xl font-bold mt-4">ราคา: ฿ 400.00</p>
            <div className="flex items-center gap-4 my-4">
              <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 border border-green-800 rounded-full text-green-800">-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 border border-green-800 rounded-full text-green-800">+</button>
              <span>มีสินค้าทั้งหมด 4316 ชิ้น</span>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-2 bg-green-800 text-white rounded-full">ซื้อทันที</button>
              <button className="px-6 py-2 border border-green-800 text-green-800 rounded-full">หยิบใส่รถเข็น</button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-purple-100 rounded-3xl p-8">
          <div className="flex gap-8">
            <div className="w-1/2">
              <h3 className="text-xl font-bold mb-4">ข้อมูลหนังสือ</h3>
              <p>สำนักพิมพ์ : สำนักพิมพ์เวลา</p>
              <p>ผู้แต่ง : เอช. พี. เลิฟคราฟท์</p>
              <p>น้ำหนัก : 350 กรัม</p>
              <p>รหัสสินค้า : 1212312121123</p>
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-bold mb-4">รายละเอียดสินค้า : <span className="font-normal">All Tomorrows จักรวาลแห่งวันพรุ่งนี้</span></h3>
              <p>สิ่งที่ทำในวันนี้จะส่งผลต่อวันพรุ่งนี้ ไม่มีทางเป็นอื่นไปได้ จงรักวันนี้ และไขว่คว้าวันพรุ่งนี้! ...</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">สินค้าที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <img src="/api/placeholder/150/225" alt="Related book" className="mx-auto" />
                <h3 className="mt-2">All Tomorrows</h3>
                <p>฿ 400.00</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllTomorrowsBookDetails;