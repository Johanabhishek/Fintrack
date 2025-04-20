import React from 'react';

export default function TransactionFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl shadow border border-white/10">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by description"
        className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
      />
      <input
        type="text"
        name="category"
        value={filters.category}
        onChange={handleChange}
        placeholder="Filter by category"
        className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
      />
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400"
      />
    </div>
  );
}