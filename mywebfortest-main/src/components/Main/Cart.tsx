import { useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart }) => {
  const { cartItems, updateCartItem, checkout, loading, error } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItem(id, item.quantity + change);
    }
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
    toggleCart();
  };

  return (
    <>
      {isOpen && (
        <div
          role="button"
          aria-label="Close cart"
          className="fixed inset-0 bg-black bg-opacity-50 z-1000"
          onClick={toggleCart}
        ></div>
      )}
      
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white transition-transform duration-300 shadow-lg overflow-y-auto z-1001 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          aria-label="Close cart"
          onClick={toggleCart}
          className="absolute top-2 right-2 border-none bg-transparent text-xl cursor-pointer"
        >
          &times;
        </button>
        <h2 className="mb-5 text-xl">สินค้าในตะกร้า ({totalItems} รายการ)</h2>
        {loading && <p>กำลังโหลด...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {cartItems.map((item) => (
          <div key={item.id} className="mb-4 border-b border-gray-200 pb-4">
            <h3 className="text-lg">{item.name}</h3>
            <p className="text-gray-600">ราคา: {item.price} บาท</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, -1)}
                className={buttonStyle}
                disabled={loading}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, 1)}
                className={buttonStyle}
                disabled={loading}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <strong>ราคารวม: {totalPrice.toFixed(2)} บาท</strong>
        </div>
        <button
          className={`${buttonStyle} w-full mt-5 py-2 bg-green-600 text-white`}
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
        >
          สั่งสินค้า
        </button>
      </div>
    </>
  );
};

const buttonStyle = 'px-3 py-1 border border-gray-300 bg-gray-100 cursor-pointer disabled:opacity-50';

export default Cart;