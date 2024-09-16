// Header.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hamburgerIcon from '../assets/Hamburger_icon.png';
import userbarIcon from '../assets/UserBar.png';

const Header: React.FC = () => {
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
        <img src={hamburgerIcon} alt="Hamburger icon" style={imgStyle} /> 
        Ani Meb
      </div>
      <div style={logoLoginStyle}>
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
              <img src={userbarIcon} alt="User icon" style={imgStyle} />
            </Link>
            <Link to="/login" style={linkStyle}>เข้าสู่ระบบ</Link>
          </>
        )}
      </div>
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

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#2c5234',
};

const imgStyle: React.CSSProperties = {
  width: '30px',
  height: 'auto',
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
