import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const changeLanguage = () => {
    alert('ميزة تغيير اللغة قيد التطوير.');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">مولد الأدوات</Link>
      <button onClick={changeLanguage} className="text-blue-500">
        English
      </button>
    </nav>
  );
}