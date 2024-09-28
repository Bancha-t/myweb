import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
  items: CartItem[];
  updateQuantity: (id: number, change: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart, items, updateQuantity }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}
      
      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white z-50 p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button 
          onClick={toggleCart} 
          className="absolute top-4 right-4 text-2xl"
          aria-label="Close cart"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">สินค้าในตะกร้า ({totalItems} รายการ)</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p>ราคา: {item.price} บาท</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <strong>ราคารวม: {totalPrice} บาท</strong>
        </div>
        <button className="w-full mt-4 py-2 bg-green-500 text-white rounded">
          สั่งสินค้า
        </button>
      </div>
    </>
  );
};

export default Cart;