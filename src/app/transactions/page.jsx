'use client'; // Ensure this is a client-side component

import { React, useState, useEffect } from 'react';
import styles from '@/styles/form.module.css'; // Your CSS Module
import Image from 'next/image';

export default function TransactionForm() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null); // Track if editing
  const [showTransactions, setShowTransactions] = useState(false); // Toggle to show/hide transactions

  // Fetch transactions on mount
  useEffect(() => {
    if (showTransactions) fetchTransactions(); // Only fetch when showing transactions
  }, [showTransactions]);

  // Function to fetch all transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  // Handle form submission for add or edit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || !date || !description) {
      alert('Please fill all fields');
      return;
    }

    const transactionData = {
      amount: Number(amount),
      date,
      description,
    };

    try {
      let response;
      if (editId) {
        // Update existing transaction
        response = await fetch('/api/transactions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId, ...transactionData }),
        });
      } else {
        // Create new transaction
        response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData),
        });
      }

      if (response.ok) {
        alert(editId ? 'Transaction updated!' : 'Transaction recorded!');
        resetForm();
        if (showTransactions) fetchTransactions(); // Refresh list if showing
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    try {
      const response = await fetch(`/api/transactions?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Transaction deleted!');
        if (showTransactions) fetchTransactions(); // Refresh list if showing
      } else {
        const data = await response.json();
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (transaction) => {
    setAmount(transaction.amount);
    setDate(transaction.date.split('T')[0]); // Remove time part
    setDescription(transaction.description);
    setEditId(transaction._id);
  };

  // Reset form
  const resetForm = () => {
    setAmount('');
    setDate('');
    setDescription('');
    setEditId(null);
  };

  // Toggle showing transactions
  const toggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  return (
    <div>
      <h2 className={styles.subtitle}>
        {editId ? 'Edit Transaction' : 'Add Your Transactions'}
      </h2>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div>
          <label htmlFor="amount" className={styles.label}>Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.inputField}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className={styles.label}>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className={styles.label}>Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputField}
            placeholder="Enter description"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {editId ? 'Update Transaction' : 'Submit'}
        </button>
        
        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className={styles.cancelButton}
          >
            Cancel Edit
          </button>
        )}
      </form>
      <p className={styles.note}>want to check you transactions</p>
      <div className={styles.buttonContainer}>
        <button onClick={toggleTransactions} className={styles.transactionButton}>
            {showTransactions ? 'Hide My Transactions' : 'Show My Transactions'}
        </button>
      </div>
      {showTransactions && (
        <>
          <h3 className={styles.subtitle}>Transaction List</h3>
          <ul className={styles.transactionList}>
            {transactions.map((txn) => (
              <li key={txn._id} className={styles.transactionItem}>
                <span><strong>₹{txn.amount}</strong> - {txn.description} - {new Date(txn.date).toLocaleDateString()}</span>
                <div className={styles.transactionActions}>
                  <button onClick={() => handleEdit(txn)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(txn._id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <Image src="/images/report.gif" alt="report" width={200} height={200} className={styles.reportgif}/>
    </div>
  );
}

