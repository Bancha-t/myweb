import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <img src="photo/Hamburger_icon.png" alt="Hamburger icon" /> Ani Meb
      </div>
      <div className="logo-login">
        <a href="login/login.html">
          <img src="photo/userbar.png" alt="User icon" />
        </a>
        <a href="login/login.html">เข้าสู่ระบบ</a>
      </div>
    </header>
  );
};

export default Header;