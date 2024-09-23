import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserRound, ShoppingCart } from 'lucide-react'; // Import ShoppingCart icon
import Cart from './Cart'; // Import Cart component

interface HeaderProps {
  isCartOpen: boolean;
  toggleCart: () => void;
  cartItems: { id: number; name: string; price: number; quantity: number }[];
}

const Header: React.FC<HeaderProps> = ({ isCartOpen, toggleCart, cartItems }) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Menu style={iconStyle} />
        Ani Meb
      </div>
      <div style={logoLoginStyle}>
        <div style={cartContainerStyle}>
          <ShoppingCart style={iconStyle} onClick={toggleCart} />
          <span style={cartCountStyle}>{cartItems.length}</span>
        </div>

        {username ? (
          <>
            <span style={welcomeStyle}>สวัสดี, {username}</span>
            <button style={logoutButtonStyle} onClick={handleLogout}>
              ออกจากระบบ
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              <UserRound style={iconStyle} />
            </Link>
            <Link to="/login" style={linkStyle}>เข้าสู่ระบบ</Link>
          </>
        )}
      </div>
      
      {/* เพิ่ม Cart overlay */}
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={cartItems} />
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '15px 70px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle: React.CSSProperties = {
  fontSize: '35px',
  fontWeight: 'bold',
  color: '#2c5234',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const logoLoginStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const cartContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const cartCountStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '5px',
  fontSize: '12px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#2c5234',
  fontSize: '20px',
};

const iconStyle: React.CSSProperties = {
  width: '30px',
  height: 'auto',
  color: '#2c5234',
};

const welcomeStyle: React.CSSProperties = {
  color: '#2c5234',
  fontSize: '16px',
};

const logoutButtonStyle: React.CSSProperties = {
  background: '#667848',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;
