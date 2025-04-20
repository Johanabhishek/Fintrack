import React from "react";
import AddTransactionForm from "./AddTransactionForm";
import Transactions from "./Transactions";

export default function TransactionSection() {
  const totalIncome = 4200;
  const totalExpenses = 3100;
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col gap-6 px-4 md:px-10 py-10">
      {/* Upper Section: Form + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        {/* Add Transaction Form */}
        <div>
          <AddTransactionForm />
        </div>

        {/* Flash Card Summary */}
        <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 space-y-4 border border-white/10 h-fit">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-white">💰 Summary</h2>
          <div className="space-y-2 text-sm md:text-base">
            <p className="text-green-400">
              Income: <span className="font-semibold text-white">${totalIncome}</span>
            </p>
            <p className="text-red-400">
              Expenses: <span className="font-semibold text-white">${totalExpenses}</span>
            </p>
            <p className={`font-semibold ${netBalance >= 0 ? "text-green-300" : "text-red-300"}`}>
              Net Balance: ${netBalance}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: History (35% height) */}
      <div className="h-[35vh] overflow-y-auto">
        <Transactions />
      </div>
    </div>
  );
}
