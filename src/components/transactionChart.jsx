'use client';  // Ensures this is a client-side component

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '@/styles/form.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD'];
const validCategories = ['Food', 'Shopping', 'Travel', 'Entertainment', 'Other'];

const TransactionChart = ({ transactions }) => {
    console.log('Transactions Received:', transactions);
  
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return <div>No transactions available for the chart</div>;
    }
  
    const calculateCategoryTotals = () => {
      const categoryTotals = {};
  
      transactions.forEach((txn) => {
        console.log('Transaction Category:', txn.category); 
        const category = txn.category || 'Uncategorized'; 
        categoryTotals[category] = (categoryTotals[category] || 0) + txn.amount;
      });
  
      console.log('Category Totals:', categoryTotals);
  
      return Object.keys(categoryTotals).length > 0
        ? Object.keys(categoryTotals).map((category) => ({
            name: category,
            value: categoryTotals[category],
          }))
        : [];
    };
  
    const chartData = calculateCategoryTotals();
  
    if (!chartData || chartData.length === 0) {
      return <div>No data available for the chart</div>;
    }
  
    return (
      <div>
        <h3 className={styles.subtitle}>Spending per Category</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
export default TransactionChart;