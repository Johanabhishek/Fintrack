import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#34d399", "#f87171"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const data = [
    { name: "Income", value: 4000 },
    { name: "Expenses", value: 2300 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-white text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome, {user?.email}
      </motion.h1>

      <div className="flex justify-center mb-8">
        <Link to="/transactions">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transition">
            ➕ Add/View Transactions
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-xl shadow border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Spending Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Current Stats</h2>
          <p>💵 <strong>Income:</strong> $4000</p>
          <p>💸 <strong>Expenses:</strong> $2300</p>
          <p>📈 <strong>Net Savings:</strong> $1700</p>
        </div>
      </div>
    </div>
  );
}
