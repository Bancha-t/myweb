import React, { useState } from 'react';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleCart}></div>
      <div className={`overlay-content ${isOpen ? 'active' : ''}`}>
        <h2>Your Cart</h2>
        <p>Item 1</p>
        <p>Item 2</p>
      </div>
    </>
  );
};

export default Cart;