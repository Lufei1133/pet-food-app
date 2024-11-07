import React, { useState } from 'react';
import { DollarSign, PieChart, TrendingUp, Filter } from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const ExpenseTracker = ({ petInfo }) => {
  const [timeRange, setTimeRange] = useState('month'); // month, year, all
  const [expenseType, setExpenseType] = useState('all'); // all, food, medical, etc.

  const expenseData = {
    total: 1250,
    monthlyAverage: 250,
    categories: [
      { name: 'Food', value: 400, color: '#3B82F6' },
      { name: 'Medical', value: 300, color: '#EF4444' },
      { name: 'Grooming', value: 200, color: '#10B981' },
      { name: 'Toys', value: 150, color: '#F59E0B' },
      { name: 'Others', value: 200, color: '#6B7280' }
    ],
    monthlyTrend: [
      { month: 'Jan', amount: 220 },
      { month: 'Feb', amount: 240 },
      { month: 'Mar', amount: 280 },
      { month: 'Apr', amount: 250 },
      { month: 'May', amount: 260 }
    ],
    recentTransactions: [
      {
        id: 1,
        date: '2024-02-01',
        description: 'Monthly food supply',
        category: 'Food',
        amount: 80
      },
      {
        id: 2,
        date: '2024-02-03',
        description: 'Veterinary check-up',
        category: 'Medical',
        amount: 150
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Total Expenses</div>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">${expenseData.total}</div>
          <div className="text-sm text-gray-500 mt-1">This month</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Monthly Average</div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">${expenseData.monthlyAverage}</div>
          <div className="text-sm text-gray-500 mt-1">Last 6 months</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Biggest Expense</div>
            <Filter className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold">Food</div>
          <div className="text-sm text-gray-500 mt-1">32% of total</div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 支出趋势图 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseData.monthlyTrend}>
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 支出分类图 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartRecharts>
                <Pie
                  data={expenseData.categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {expenseData.categories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChartRecharts>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 近期交易记录 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button className="text-blue-500 hover:text-blue-600">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Description</th>
                <th className="text-left py-3">Category</th>
                <th className="text-right py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.recentTransactions.map(transaction => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-3">{transaction.date}</td>
                  <td className="py-3">{transaction.description}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 text-right">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;