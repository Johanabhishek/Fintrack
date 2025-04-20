// src/firebase/firestoreService.js
import { db } from './firebaseConfig';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';



export async function deleteGoal(goalId, userId) {
  try {
    await deleteDoc(doc(db, 'users', userId, 'goals', goalId));
    console.log('Goal deleted successfully.');
  } catch (err) {
    console.error('Error deleting goal:', err);
  }
}

export async function addGoal(goal, userId) {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'goals'), goal);
    console.log('Goal added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding goal: ', e);
    throw e;
  }
}

export async function addTransaction(transaction, userId) {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'transactions'), transaction);
    console.log('Transaction added with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding transaction: ', e);
    throw e;
  }
}
