'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '@/styles/budget.module.css';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const categories = ['Food', 'Rent', 'Transport', 'Shopping', 'Entertainment', 'Other'];

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budget');
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !budgetAmount) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount: Number(budgetAmount) }),
      });

      if (response.ok) {
        toast.success('Budget saved!');
        setCategory('');
        setBudgetAmount('');
        fetchBudgets();
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      toast.error('Something went wrong.');
    }
  };

  const calculateTotalExpenses = (category) => {
    const filtered = expenses.filter((txn) => txn.category === category);
    const total = filtered.reduce((sum, txn) => sum + txn.amount, 0);
    return total;
  };

  const mergedData = budgets.map((b) => ({
    category: b.category,
    budget: b.amount,
    spent: calculateTotalExpenses(b.category),
  }));

  return (
    <div className={styles.budgetContainer}>
      <h2 className={styles.setBudget}>Set Your Budget</h2>

      <form onSubmit={handleSubmit} className={styles.budgetForm}>
        <div>
          <label className={styles.inputField}>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputValue}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.inputField}>Budget Amount:</label>
          <input
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            className={styles.inputValue}
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          Save Budget
        </button>
      </form>

      <h2 className={styles.spending}>Budget vs Actual Spending</h2>

      {mergedData.length === 0 ? (
        <p>No budget data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400} className={styles.graph}>
          <BarChart data={mergedData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className={styles.Actualbudget}>
        {mergedData.map((item) => (
          <div key={item.category} className="flex items-center space-x-4">
            <span className="font-semibold">{item.category}:</span>
            {item.spent > item.budget ? (
              <span className={styles.overBudget}>🔴 Over budget!</span>
            ) : (
              <span className={styles.perfectBudget}>🟢 Good!</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
