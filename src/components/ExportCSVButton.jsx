import React from 'react';

export default function ExportCSVButton({ data }) {
  const handleExport = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const csvRows = [headers.join(',')];

    data.forEach((tx) => {
      const row = [tx.date, tx.description, tx.category, tx.amount];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transactions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button onClick={handleExport} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
      Export CSV
    </button>
  );
}