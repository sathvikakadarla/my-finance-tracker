'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/styles/form.module.css'; 
import Image from 'next/image';
import TransactionChart from '@/components/transactionChart';
import { toast } from 'react-hot-toast';


export default function TransactionForm() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [showTransactions, setShowTransactions] = useState(false);

  const categories = ['Food', 'Rent', 'Transport', 'Shopping', 'Entertainment', 'Other']; 

  useEffect(() => {
    if (showTransactions) fetchTransactions();
  }, [showTransactions]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || !date || !description || !category) {
      toast.error('Please fill all fields');
      return;
    }

    const transactionData = {
      amount: Number(amount),
      date,
      description,
      category,
    };

    try {
      let response;
      if (editId) {
        response = await fetch('/api/transactions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editId, ...transactionData }),
        });
      } else {
        response = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData),
        });
      }

      if (response.ok) {
        toast.success(editId ? 'Transaction updated!' : 'Transaction recorded!');
        resetForm();
        if (showTransactions) fetchTransactions();
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <span style={{ fontSize: '18px' }}>
        Are you sure?
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              const response = await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
              if (response.ok) {
                toast.success('Transaction deleted!');
                if (showTransactions) fetchTransactions();
              } else {
                const data = await response.json();
                toast.error(`Error: ${data.message || 'Something went wrong'}`);
              }
            } catch (error) {
              console.error('Error deleting transaction:', error);
              toast.error('Something went wrong. Please try again.');
            }
          }}
          style={{
            marginLeft: '20px',
            background: 'green',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Yes
        </button>
  
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            marginLeft: '10px',
            background: 'red',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          No
        </button>
      </span>
    ), { duration: Infinity }); // Make it stay forever until user clicks
  };
  

  const handleEdit = (transaction) => {
    setAmount(transaction.amount);
    setDate(transaction.date.split('T')[0]);
    setDescription(transaction.description);
    setCategory(transaction.category || 'Food'); 
    setEditId(transaction._id);
  };

  const resetForm = () => {
    setAmount('');
    setDate('');
    setDescription('');
    setCategory(''); 
    setEditId(null);
  };

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

        <div>
        <label htmlFor="category" className={styles.label}>Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputField}
            required
          >
            <option value="">Select Category</option> 
              {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
              ))}
          </select>
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

      <p className={styles.note}>Want to check your transactions?</p>

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
                <span>
                  <strong>₹{txn.amount}</strong> - {txn.description} ({txn.category}) - {new Date(txn.date).toLocaleDateString()}
                </span>
                <div className={styles.transactionActions}>
                  <button onClick={() => handleEdit(txn)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(txn._id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <TransactionChart transactions={transactions} /> 
        </>
      )}

      <Image src="/images/report.gif" alt="report" width={200} height={200} className={styles.reportgif}/>
    </div>
  );
}
