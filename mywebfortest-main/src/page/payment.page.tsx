import React, { useState } from 'react';
import { useCart } from '../components/Main/CartProvider';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [activeSection, setActiveSection] = useState(1);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = totalPrice >= 500 ? 0 : 50;
  const totalWithShipping = totalPrice + shippingCost;

  const SectionTitle = ({ number, title }) => (
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
        <span className="text-purple-800 font-bold">{number}</span>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );

  const CartSummary = () => (
    <div className="bg-gray-100 p-4 rounded-lg sticky top-4">
      <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center mb-4">
          <img src={`/api/placeholder/64/96`} alt={item.name} className="w-16 h-24 object-cover mr-4" />
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>฿ {item.price.toFixed(2)}</p>
            <p>จำนวน: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>รวมราคาสินค้า</span>
          <span>฿ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>ค่าจัดส่งสินค้า</span>
          <span>฿ {shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>ราคาสุทธิ</span>
          <span>฿ {totalWithShipping.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row p-4 max-w-6xl mx-auto">
      <div className="w-full md:w-2/3 pr-4">
        <h1 className="text-2xl font-bold mb-4">Ani Meb</h1>
        
        <div className="mb-8">
          <SectionTitle number={1} title="การติดต่อ" />
          {activeSection === 1 && (
            <div className="space-y-2">
              <input type="text" placeholder="ชื่อ-นามสกุล" className="w-full p-2 border rounded" />
              <input type="email" placeholder="อีเมล" className="w-full p-2 border rounded" />
              <input type="tel" placeholder="เบอร์โทรศัพท์" className="w-full p-2 border rounded" />
            </div>
          )}
          {activeSection !== 1 && (
            <button onClick={() => setActiveSection(1)} className="text-blue-500">แก้ไข</button>
          )}
        </div>
        
        <div className="mb-8">
          <SectionTitle number={2} title="การจัดส่ง" />
          {activeSection === 2 && (
            <>
              <div className="space-y-2">
                <input type="text" placeholder="เลขที่ อาคาร ถนน ซอย และรายละเอียดอื่นๆ" className="w-full p-2 border rounded" />
                <input type="text" placeholder="รหัสไปรษณีย์" className="w-full p-2 border rounded" />
                <input type="text" placeholder="ตำบล อำเภอ จังหวัด" className="w-full p-2 border rounded" />
                <input type="text" placeholder="ชื่อผู้รับ" className="w-full p-2 border rounded" />
                <input type="text" placeholder="เบอร์โทรศัพท์ผู้รับ" className="w-full p-2 border rounded" />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">เลือกวิธีการจัดส่ง</h3>
                <div className="flex items-center">
                  <input type="radio" id="shipping-method" name="shipping-method" className="mr-2" checked readOnly />
                  <label htmlFor="shipping-method">ไปรษณีย์ด่วนพิเศษ ธรรมดา 500 บาทขึ้นไฟรี / ไม่ถึง 500 บาทค่าส่ง 50 บาท</label>
                </div>
                <input type="text" value={`${shippingCost.toFixed(2)} ฿`} className="w-24 p-2 border rounded mt-2" readOnly />
              </div>
            </>
          )}
          {activeSection !== 2 && (
            <button onClick={() => setActiveSection(2)} className="text-blue-500">แก้ไข</button>
          )}
        </div>
        
        <div className="mb-8">
          <SectionTitle number={3} title="การชำระเงิน" />
          {activeSection === 3 && (
            <div className="flex items-center">
              <input type="radio" id="payment-method" name="payment-method" className="mr-2" checked readOnly />
              <label htmlFor="payment-method" className="flex items-center">
                <img src="/api/placeholder/32/32" alt="PromptPay" className="h-8 mr-2" />
                QR Code PromptPay
              </label>
            </div>
          )}
          {activeSection !== 3 && (
            <button onClick={() => setActiveSection(3)} className="text-blue-500">แก้ไข</button>
          )}
        </div>

        <button 
          className="w-full bg-green-500 text-white py-2 rounded mt-4"
          onClick={() => {/* Handle order submission */}}
        >
          ยืนยันการสั่งซื้อ
        </button>
      </div>
      
      <div className="w-full md:w-1/3">
        <CartSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;