'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '@/styles/header.module.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});

  const router = useRouter();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);

      // Calculate total expenses
      const total = data.reduce((sum, txn) => sum + txn.amount, 0);
      setTotalExpenses(total);

      // Calculate category breakdown
      const breakdown = {};
      data.forEach((txn) => {
        if (!breakdown[txn.category]) {
          breakdown[txn.category] = 0;
        }
        breakdown[txn.category] += txn.amount;
      });
      setCategoryBreakdown(breakdown);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  // Sort transactions by date (latest first) and take top 5
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <header className={styles.headerContainer}>
      {/* Top Header */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Finance Tracker</h1>
        <button className={styles.menuButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars size={24} />
        </button>
      </div>

        {/* Sidebar */}
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.dashboardHeader}>
            <h1>Dashboard</h1>
            {/* Cross Icon to Close Sidebar */}
            <button
              className={styles.closeSidebarButton}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar when cross icon is clicked
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className={styles.dashboardItem}>
            <button
              onClick={() => {
                setIsSidebarOpen(false); // Close sidebar after click
                router.push('/transactions');   // Navigate to /budget page
              }}
              className={styles.setBudgetButton}
            >
              Add Transactions
            </button>
          </div>
          {/* Total Expenses */}
          <div className={styles.dashboardItem}>
            <h2>Total Expenses</h2>
            <p>${totalExpenses}</p>
          </div>

          {/* Recent Transactions */}
          <div className={styles.dashboardItem}>
            <h2>Recent Transactions</h2>
            {recentTransactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <ul>
                {recentTransactions.map((transaction) => (
                  <li key={transaction._id}>
                    <strong>{transaction.description}</strong> - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Category Breakdown */}
          <div className={styles.dashboardItem}>
            <h2>Category Breakdown</h2>
            {Object.keys(categoryBreakdown).length === 0 ? (
              <p>No data available.</p>
            ) : (
              <ul>
                {Object.entries(categoryBreakdown).map(([category, amount]) => (
                  <li key={category}>
                    <strong>{category}</strong>: ${amount}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* SET BUDGET BUTTON */}
          <div className={styles.dashboardItem}>
            <button
              onClick={() => {
                setIsSidebarOpen(false); // Close sidebar after click
                router.push('/budget');   // Navigate to /budget page
              }}
              className={styles.setBudgetButton}
            >
              ➕ Set Budget
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
