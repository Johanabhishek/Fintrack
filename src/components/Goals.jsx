import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { addGoal } from '../firebase/firestoreService';
import { deleteGoal } from '../firebase/firestoreService';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('time');
  const [goalInput, setGoalInput] = useState({
    title: '',
    endDate: '',
    budget: ''
  });

  // Fetch transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const snap = await getDocs(collection(db, 'users', auth.currentUser.uid, 'transactions'));
        const txns = snap.docs.map(doc => doc.data());
        setTransactions(txns);
      } catch (err) {
        console.error("Error fetching transactions", err);
      }
    };
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setGoalInput({ ...goalInput, [e.target.name]: e.target.value });
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!goalInput.title || !goalInput.endDate || !goalInput.budget) return;

    try {
      const goalId = await addGoal(goalInput, auth.currentUser.uid);
      setGoals((prev) => [...prev, { ...goalInput, id: goalId }]);
      setGoalInput({ title: '', endDate: '', budget: '' });
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDelete = async (index) => {
    const goalToDelete = goals[index];
    try {
      await deleteGoal(goalToDelete.id, auth.currentUser.uid);
      setGoals(goals.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };
  

  // Compute progress and sort
  const goalsWithProgress = goals.map(goal => {
    const relatedTxns = transactions.filter(t => t.category?.toLowerCase() === goal.title.toLowerCase());
    const spent = relatedTxns.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const percent = Math.min((spent / parseFloat(goal.budget)) * 100, 100);
    return { ...goal, spent, percent };
  });

  const sortedGoals = [...goalsWithProgress].sort((a, b) => {
    if (sortBy === 'completion') return b.percent - a.percent;
    if (sortBy === 'time') return new Date(a.endDate) - new Date(b.endDate);
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Financial Goals
      </motion.h2>

      <form
        onSubmit={handleAddGoal}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-6 rounded-xl shadow border border-white/10 mb-8"
      >
        <input
          type="text"
          name="title"
          value={goalInput.title}
          onChange={handleChange}
          placeholder="Goal Title"
          className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
        />
        <input
          type="date"
          name="endDate"
          value={goalInput.endDate}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
        />
        <input
          type="number"
          name="budget"
          value={goalInput.budget}
          onChange={handleChange}
          placeholder="Estimated Budget ($)"
          className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="md:col-span-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition mt-2"
        >
          Add Goal
        </button>
      </form>

      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-zinc-800 text-white p-2 rounded"
        >
          <option value="time">Sort by Time Left</option>
          <option value="completion">Sort by Completion</option>
        </select>
      </div>

      <div className="grid gap-4">
        {sortedGoals.length === 0 ? (
          <p className="text-center text-gray-400">No goals added yet.</p>
        ) : (
          sortedGoals.map((goal, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 p-4 rounded-xl border border-white/10 shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                  <p className="text-sm text-gray-300">Target: {goal.endDate}</p>
                  <p className="text-sm text-gray-300">Budget: ${goal.budget}</p>
                  <p className="text-sm text-green-400">
                    Spent: ${goal.spent.toFixed(2)} ({goal.percent.toFixed(1)}%)
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.percent}%` }}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
