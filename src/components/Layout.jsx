import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-20 px-4 md:px-8">{children}</main>
    </div>
  );
}
