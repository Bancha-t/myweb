import React from 'react';
import { Link } from 'react-router-dom';
import hamburgerIcon from '../assets/Hamburger_icon.png';
import userbarIcon from '../assets/UserBar.png';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <img src={hamburgerIcon} alt="Hamburger icon" style={imgStyle} /> 
        Ani Meb
      </div>
      <div style={logoLoginStyle}>
        <Link to="/login" style={linkStyle}>
          <img src={userbarIcon} alt="User icon" style={imgStyle} />
        </Link>
        <Link to="login/" style={linkStyle}>เข้าสู่ระบบ</Link>
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
  gap: '5px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#2c5234',
};

const imgStyle: React.CSSProperties = {
  width: '30px',
  height: 'auto',
};

export default Header;
