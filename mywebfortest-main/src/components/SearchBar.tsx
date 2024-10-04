import React from 'react';
import {ShoppingCart, Bell, Heart, Tally1} from 'lucide-react'

interface SearchBarProps{
  onCartClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onCartClick}) => {
  
  
  return (
    <div style={searchBarStyle}>
      <input type="text" placeholder="Search..." style={inputStyle} />
      <div style={iconShoppingStyle}>
        <Bell style={iconStyle} />
        <Heart style={iconStyle} />
        <Tally1 style={iconStyle}/>
        <ShoppingCart
          style={{...iconStyle}}
          onClick={onCartClick}
        />
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

const iconStyle: React.CSSProperties = {
  width: '30px',
  height: 'auto',
  color: 'rgb(44, 82, 52'
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