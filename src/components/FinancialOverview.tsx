import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 7500, expenses: 3200 },
  { month: 'Feb', income: 7800, expenses: 3400 },
  { month: 'Mar', income: 8200, expenses: 3800 },
  { month: 'Apr', income: 8100, expenses: 3600 },
  { month: 'May', income: 8400, expenses: 3500 },
  { month: 'Jun', income: 8200, expenses: 3800 },
];

export default function FinancialOverview() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stackId="1"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="1"
            stroke="#EF4444"
            fill="#EF4444"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}