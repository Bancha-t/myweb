import React from 'react';
import adImage from '../assets/ad1.jpg';

const Banner: React.FC = () => {
  return (
    <div style={bannerStyle}>
      <a href="#">
        <img src={adImage} alt="Advertisement" style={imgStyle} />
      </a>
    </div>
  );
};

const bannerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center',
};

const imgStyle: React.CSSProperties = {
  maxWidth: '100%', 
  height: 'auto',
  
};

export default Banner;
