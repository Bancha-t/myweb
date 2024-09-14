import React from 'react';
import { Link } from 'react-router-dom';

interface BookSectionProps {
  title: string;
}

const BookSection: React.FC<BookSectionProps> = ({ title }) => {
  return (
    <div style={bookSectionStyle}>
      <div style={sectionTitleStyle}>
        <h2>{title}</h2>
        <Link to="/NewBook" style={linkStyle}>ดูทั้งหมด &gt;</Link>
      </div>
      <div style={bookGridStyle}>
        {/* Add book items here */}
      </div>
    </div>
  );
};

const bookSectionStyle: React.CSSProperties = {
  padding: '20px',
};

const bookGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '20px',
};

const sectionTitleStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000', // Change this color as needed
};

export default BookSection;
