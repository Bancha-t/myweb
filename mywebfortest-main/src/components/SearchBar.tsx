import React from 'react';
import bellIcon from '../assets/iconbellbarshop.png';
import likeBookIcon from '../assets/likebook.png';
import lineVectorIcon from '../assets/linevector.png';
import cartIcon from '../assets/carshopping.png';

const SearchBar: React.FC = () => {
  return (
    <div style={searchBarStyle}>
      <input type="text" placeholder="Search..." style={inputStyle} />
      <div style={iconShoppingStyle}>
        <img src={bellIcon} alt="Bell icon" style={imgStyle} />
        <img src={likeBookIcon} alt="Like book" style={imgStyle} />
        <img src={lineVectorIcon} alt="Line vector" style={imgStyle} />
        <img src={cartIcon} alt="Shopping cart" className="cart-icon" style={cartIconStyle} />
      </div>
    </div>
  );
};

const searchBarStyle: React.CSSProperties = {
  backgroundColor: '#E2C9EF',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '450px',
};

const imgStyle: React.CSSProperties = {
  width: '30px',
  height: 'auto',
};

const inputStyle: React.CSSProperties = {
  width: '50%',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '20px',
  fontSize: '16px',
};

const iconShoppingStyle: React.CSSProperties = {
  padding: '10px',
  display: 'flex',
  gap: '10px',
};

const cartIconStyle: React.CSSProperties = {
  width: '27px',
  height: 'auto',
};

export default SearchBar;
