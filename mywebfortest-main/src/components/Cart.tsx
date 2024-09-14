import React, { useState } from 'react';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          opacity: isOpen ? 0.5 : 0,
          transition: 'opacity 0.5s',
          zIndex: 1001,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={toggleCart}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-100%',
          width: '300px',
          height: '100%',
          background: '#ffffff',
          transition: 'right 0.3s',
          zIndex: 1002,
          padding: '20px',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2>Your Cart</h2>
        <p>Item 1</p>
        <p>Item 2</p>
      </div>
    </>
  );
};

export default Cart;
