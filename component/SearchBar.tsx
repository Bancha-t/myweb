import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <div className="icon-shopping">
        <img src="photo/iconbellbarshop.png" alt="Bell icon" />
        <img src="photo/likebook.png" alt="Like book" />
        <img src="photo/linevector.png" alt="Line vector" />
        <img src="photo/carshopping.png" alt="Shopping cart" className="cart-icon" />
      </div>
    </div>
  );
};

export default SearchBar;