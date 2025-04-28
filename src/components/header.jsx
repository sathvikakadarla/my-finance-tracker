'use client';

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Hamburger icon
import styles from '@/styles/header.module.css'; // your custom styles

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dummy data
  const totalExpenses = 1200;
  const recentTransactions = [
    { id: 1, description: 'Food expense', amount: 200, date: '2025-04-28' },
    { id: 2, description: 'Shopping', amount: 300, date: '2025-04-27' },
    { id: 3, description: 'Rent', amount: 500, date: '2025-04-25' },
  ];
  const categoryBreakdown = {
    Food: 500,
    Shopping: 300,
    Rent: 400,
  };

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
          {/* Total Expenses */}
          <div className={styles.dashboardItem}>
            <h2>Total Expenses</h2>
            <p>${totalExpenses}</p>
          </div>

          {/* Recent Transactions */}
          <div className={styles.dashboardItem}>
            <h2>Recent Transactions</h2>
            <ul>
              {recentTransactions.map((transaction) => (
                <li key={transaction.id}>
                  <strong>{transaction.description}</strong> - ${transaction.amount} on {transaction.date}
                </li>
              ))}
            </ul>
          </div>

          {/* Category Breakdown */}
          <div className={styles.dashboardItem}>
            <h2>Category Breakdown</h2>
            <ul>
              {Object.entries(categoryBreakdown).map(([category, amount]) => (
                <li key={category}>
                  <strong>{category}</strong>: ${amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
