import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isArabic = location.pathname.startsWith('/ar');

  const changeLanguage = () => {
    // Logic to change language
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">مولد الأدوات</Link>
      <button onClick={changeLanguage} className="text-blue-500">
        {isArabic ? 'English' : 'العربية'}
      </button>
    </nav>
  );
}