import React, { useState } from 'react';
import {
  BarChart2, Activity, TrendingUp, Calendar,
  Download, FileText, Filter, PieChart,
  Printer, Share2, Clock, ArrowUp, ArrowDown
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Pie, Cell
} from 'recharts';

const Analytics = ({ petInfo }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [showReport, setShowReport] = useState(false);

  // 健康趋势数据
  const healthTrends = {
    weight: [
      { month: 'Jan', value: 14.2 },
      { month: 'Feb', value: 14.5 },
      { month: 'Mar', value: 14.3 },
      { month: 'Apr', value: 14.1 },
      { month: 'May', value: 14.0 }
    ],
    activity: [
      { month: 'Jan', value: 75 },
      { month: 'Feb', value: 82 },
      { month: 'Mar', value: 78 },
      { month: 'Apr', value: 85 },
      { month: 'May', value: 88 }
    ]
  };

  // 训练进度数据
  const trainingProgress = [
    { name: 'Basic Obedience', completed: 80 },
    { name: 'Agility', completed: 60 },
    { name: 'Tricks', completed: 45 },
    { name: 'Social Skills', completed: 90 }
  ];

  // 支出分析数据
  const expenses = {
    monthly: [
      { category: 'Food', amount: 120 },
      { category: 'Healthcare', amount: 80 },
      { category: 'Training', amount: 60 },
      { category: 'Supplies', amount: 40 },
      { category: 'Others', amount: 30 }
    ],
    trends: [
      { month: 'Jan', amount: 280 },
      { month: 'Feb', amount: 320 },
      { month: 'Mar', amount: 290 },
      { month: 'Apr', amount: 310 },
      { month: 'May', amount: 330 }
    ]
  };

  // 生成报告
  const generateReport = () => {
    setShowReport(true);
  };

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6B7280'];

  // 关键指标卡片组件
  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <div className={`flex items-center mt-2 ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend === 'up' ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm">{change}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 顶部操作栏 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button
              onClick={generateReport}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* 关键指标概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Health Score"
          value="85/100"
          change="+5% vs last month"
          icon={Activity}
          trend="up"
        />
        <MetricCard
          title="Training Progress"
          value="68%"
          change="+12% vs last month"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Monthly Expenses"
          value="$330"
          change="+6.5% vs last month"
          icon={BarChart2}
          trend="up"
        />
        <MetricCard
          title="Activity Level"
          value="88%"
          change="+3% vs last month"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* 健康趋势图表 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Health Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthTrends.weight}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Weight (kg)"
                stroke="#3B82F6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 训练进度和支出分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 训练进度图表 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Training Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trainingProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" name="Progress %" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 支出分析图表 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={expenses.monthly}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {expenses.monthly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 报告生成模态框 */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Generate Report</h3>
              <button
                onClick={() => setShowReport(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Report Type
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Comprehensive Report</option>
                  <option>Health Report</option>
                  <option>Training Report</option>
                  <option>Expense Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Period
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Last Month</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Format
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowReport(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;