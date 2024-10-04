import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserRound } from 'lucide-react';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <header className="bg-white py-4 px-16 flex justify-between items-center">
      <div className="text-3xl font-bold text-green-800 flex items-center gap-3">
        <Menu className="w-8 h-auto text-green-800" />
        Ani Meb
      </div>
      <div className="flex gap-6">
        <div className="text-lg">Home</div>
        <div className="text-lg">BookAll</div>
      </div>
      <div className="flex items-center gap-3">
        {username ? (
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
            <Link to="/login" className="text-green-800 text-lg">
              เข้าสู่ระบบ
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
