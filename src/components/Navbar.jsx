import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Goals', path: '/goals' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-4">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm md:text-base px-3 py-2 rounded transition font-medium ${
              location.pathname === item.path
                ? 'text-white bg-white/10'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition" aria-label="Toggle Dark Mode">
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun className="w-5 h-5 text-yellow-400" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon className="w-5 h-5 text-blue-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {user ? (
          <>
            <span className="text-sm text-white">{user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full transition shadow">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full transition shadow">
              Login / Register
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
