import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#34d399', '#f87171', '#facc15', '#60a5fa', '#a78bfa', '#f472b6', '#10b981'];

export default function Analytics() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snap = await getDocs(collection(db, 'users', auth.currentUser.uid, 'transactions'));
        const txns = snap.docs.map(doc => doc.data());
        setTransactions(txns);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  // Group income & expenses by month
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    income: 0,
    expenses: 0
  }));

  const categoryTotals = {};

  transactions.forEach(txn => {
    const date = new Date(txn.date);
    if (!isNaN(date)) {
      const monthIndex = date.getMonth();
      const amount = parseFloat(txn.amount || 0);

      if (amount >= 0) {
        monthlyData[monthIndex].income += amount;
      } else {
        monthlyData[monthIndex].expenses += Math.abs(amount);

        // Category logic
        const cat = txn.category || 'Other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(amount);
      }
    }
  });

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analytics Overview
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading data...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-400">No transactions to analyze.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white/5 rounded-xl p-4 text-white shadow-md">
            <h3 className="text-lg font-semibold mb-4">Monthly Income & Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#ddd" />
                <YAxis stroke="#ddd" />
                <Tooltip />
                <Bar dataKey="income" fill="#34d399" />
                <Bar dataKey="expenses" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/5 rounded-xl p-4 text-white shadow-md">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
