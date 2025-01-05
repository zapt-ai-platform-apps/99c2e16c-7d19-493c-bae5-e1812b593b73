import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Preview from './components/Preview';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
        <footer className="text-center p-4">
          <a href="https://www.zapt.ai" className="text-blue-500">مصنوع بواسطة ZAPT</a>
        </footer>
      </div>
    </Router>
  );
}