import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src="photo/Hamburger_icon.png" alt="Hamburger icon" /> Ani Meb
      </div>
      <div className="logo-login">
        <Link to="/login">
          <img src="photo/userbar.png" alt="User icon" />
        </Link>
        <Link to="/login">เข้าสู่ระบบ</Link>
      </div>
    </header>
  );
};

export default Header;