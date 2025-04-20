import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = auth.currentUser;
      if (!user) return; // prevent null UID error

      try {
        const snap = await getDocs(collection(db, 'users', user.uid, 'transactions'));
        const txns = snap.docs.map(doc => doc.data());
        setTransactions(txns);
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="text-white">
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        transactions.map((txn, i) => (
          <div key={i} className="bg-white/10 p-2 rounded mb-2">
            <p>{txn.category}: ${txn.amount}</p>
          </div>
        ))
      )}
    </div>
  );
}
