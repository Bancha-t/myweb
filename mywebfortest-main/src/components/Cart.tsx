import React from 'react';

interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
  items: { id: number; name: string; price: number; quantity: number }[];
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart, items }) => {
  return (
    <>
      {/* Overlay */}
      <div
        role="button"
        aria-label="Close cart"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
          zIndex: 1001,
        }}
        onClick={toggleCart}
      ></div>
      
      {/* Cart Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-400px',
          width: '400px',
          height: '100%',
          background: '#ffffff',
          transition: 'right 0.3s',
          zIndex: 1002,
          padding: '20px',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
          overflowY: 'auto',
        }}
      >
        <button 
          aria-label="Close cart"
          onClick={toggleCart} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <h2 style={{ marginBottom: '20px' }}>สินค้าในตะกร้า ({items.length} รายการ)</h2>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <h3>{item.name}</h3>
            <p>ราคา: {item.price} บาท</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button style={buttonStyle}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button style={buttonStyle}>+</button>
            </div>
          </div>
        ))}
        <div style={{ marginTop: '20px' }}>
          <strong>ราคารวม: {items.reduce((sum, item) => sum + item.price * item.quantity, 0)} บาท</strong>
        </div>
        <button style={{
          ...buttonStyle,
          width: '100%',
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
        }}>
          สั่งสินค้า
        </button>
      </div>
    </>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '5px 10px',
  border: '1px solid #ddd',
  background: '#f0f0f0',
  cursor: 'pointer',
};

export default Cart;