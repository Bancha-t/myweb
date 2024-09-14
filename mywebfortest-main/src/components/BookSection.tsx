import React from 'react';

interface BookSectionProps {
  title: string;
}

const BookSection: React.FC<BookSectionProps> = ({ title }) => {
  return (
    <div className="book-section">
      <div className="section-title">
        <h2>{title}</h2>
        <a href="#">ดูทั้งหมด &gt;</a>
      </div>
      <div className="book-grid">
        {/* Add book items here */}
      </div>
    </div>
  );
};

export default BookSection;