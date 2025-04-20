import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

export default function AddTransactionForm() {
  const [form, setForm] = useState({
    type: "income",
    category: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, amount, type, date } = form;
    if (!category || !amount) return;

    const signedAmount = type === "expense" ? -Math.abs(amount) : +Math.abs(amount);

    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "transactions"), {
        category,
        amount: signedAmount,
        date,
        createdAt: new Date().toISOString(),
      });
      setForm({ type: "income", category: "", amount: "", date: new Date().toISOString().slice(0, 10) });
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow space-y-4 text-white border border-white/10">
      <h2 className="text-lg font-bold mb-4">Add Transaction</h2>

      {/* Fancy toggle */}
      <div className="flex bg-zinc-800 rounded-xl overflow-hidden w-full mb-4 border border-white/10">
        {["income", "expense"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, type }))}
            className={`flex-1 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${
              form.type === type
                ? "bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 text-black"
                : "bg-zinc-900 text-white hover:bg-zinc-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-900 border border-white/20"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-900 border border-white/20"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 rounded bg-zinc-900 border border-white/20"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-medium w-full">
        Add Transaction
      </button>
    </form>
  );
}
