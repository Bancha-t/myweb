import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserRound } from 'lucide-react';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
  };

  const UserSection = () => (
    username ? (
      <>
        <span className="text-green-800 text-base">สวัสดี, {username}</span>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </>
    ) : (
      <>
        <Link to="/login" className="text-green-800">
          <UserRound className="w-8 h-auto text-green-800" />
        </Link>
        <Link to="/login" className="text-green-800 text-lg">เข้าสู่ระบบ</Link>
      </>
    )
  );

  return (
    <header className="bg-white py-4 px-4 sm:px-8 md:px-16 lg:px-32 flex justify-between items-center">
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 flex items-center gap-3">
        Ani Meb
      </div>
      <nav className="flex gap-3 sm:gap-5">
        <Link to="/" className="text-sm sm:text-lg">หน้าหลัก</Link>
        <Link to="/AllItemBook" className="text-sm sm:text-lg">หนังสือทั้งหมด</Link>
      </nav>
      <div className="flex items-center gap-3">
        <UserSection />
      </div>
    </header>
  );
};

export default Header;
