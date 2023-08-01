import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const SalesExpenseChart = () => {
  // Sample data for sales and expenses
  const data = [
    { month: 'Jan', sales: 5000, expenses: 4000 },
    { month: 'Feb', sales: 6000, expenses: 3500 },
    { month: 'Mar', sales: 8000, expenses: 4500 },
    // Add more data points as needed
  ];

  return (
    <AreaChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="expenses" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  );
};

export default SalesExpenseChart;
