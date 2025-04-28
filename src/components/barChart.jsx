import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'January', totalSpent: 1200 },
  { month: 'February', totalSpent: 1500 },
  { month: 'March', totalSpent: 900 },
  { month: 'April', totalSpent: 1600 },
  { month: 'May', totalSpent: 1300 },
  { month: 'June', totalSpent: 1800 },
  { month: 'July', totalSpent: 1100 },
  { month: 'August', totalSpent: 1400 },
  { month: 'September', totalSpent: 950 },
  { month: 'October', totalSpent: 1700 },
  { month: 'November', totalSpent: 1600 },
  { month: 'December', totalSpent: 2000 },
];

const TotalSpentChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpent" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalSpentChart;
