import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart }) => {
  const { cartItems, updateCartItem, checkout, loading, error } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItem(id, item.quantity + change);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
    toggleCart();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-gray-100 shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="bg-white p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">สินค้าในตะกร้า ({cartItems.length} รายการ)</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {loading && <p className="p-4">กำลังโหลด...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white mb-2 p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">฿{item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 bg-green-600 text-white rounded-full"
                  disabled={loading}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 bg-green-600 text-white rounded-full"
                  disabled={loading}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">ราคารวม:</span>
            <span className="font-semibold">฿{totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="w-full py-2 bg-green-600 text-white rounded"
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
          >
            สั่งสินค้า
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;