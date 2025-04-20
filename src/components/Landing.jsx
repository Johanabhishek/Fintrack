import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white text-center p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Smart Finance Tracker
      </h1>
      <p className="text-lg md:text-xl max-w-xl mb-10 text-zinc-300">
        Track your income, expenses, and financial goals with a modern,
        intuitive, and stylish dashboard.
      </p>
      <div className="space-x-4">
        <Link to="/dashboard">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-medium transition">
            Go to Dashboard
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-white hover:bg-zinc-200 text-black py-2 px-6 rounded-lg font-medium transition">
            Login
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
