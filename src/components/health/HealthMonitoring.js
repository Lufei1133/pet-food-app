import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity, Heart, Calendar, Plus, ChevronRight, Target, Apple, AlertCircle } from 'lucide-react';

const HealthMonitoring = ({ petData }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1W');

  const healthData = [
    { date: 'Mon', activity: 85, mood: 90, appetite: 95, water: 85 },
    { date: 'Tue', activity: 75, mood: 85, appetite: 90, water: 80 },
    { date: 'Wed', activity: 90, mood: 95, appetite: 100, water: 90 },
    { date: 'Thu', activity: 70, mood: 80, appetite: 85, water: 75 },
    { date: 'Fri', activity: 85, mood: 90, appetite: 95, water: 85 },
    { date: 'Sat', activity: 95, mood: 100, appetite: 100, water: 95 },
    { date: 'Sun', activity: 80, mood: 85, appetite: 90, water: 85 }
  ];

  // 健康状况评分计算
  const calculateHealthScore = () => {
    const latestData = healthData[healthData.length - 1];
    const score = (latestData.activity + latestData.mood + latestData.appetite + latestData.water) / 4;
    return Math.round(score);
  };

  return (
      <div className="min-h-screen bg-[#f5f5f7]">
        {/* 顶部导航栏 */}
        <div className="bg-white px-4 pt-14 pb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Pet Health</h1>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* 宠物概况卡片 */}
          <div className="px-4 py-6">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl p-4 text-white">
              <div className="flex items-center space-x-4">
                <img
                    src="/api/placeholder/60/60"
                    alt="Pet"
                    className="w-15 h-15 rounded-xl"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Bobby</h2>
                  <p className="text-white/80 text-sm">Golden Retriever • 3y</p>
                  <div className="mt-2 flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Health Score: {calculateHealthScore()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 主要指标卡片 */}
          <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  title: 'Activity',
                  value: '90%',
                  icon: Activity,
                  color: 'bg-green-50',
                  textColor: 'text-green-600',
                  description: 'Very Active'
                },
                {
                  title: 'Appetite',
                  value: '95%',
                  icon: Apple,
                  color: 'bg-orange-50',
                  textColor: 'text-orange-600',
                  description: 'Excellent'
                }
              ].map((metric, index) => (
                  <button
                      key={index}
                      className={`${metric.color} rounded-2xl p-4 flex flex-col items-start`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <metric.icon className={`w-4 h-4 ${metric.textColor}`} />
                      <span className="text-sm text-gray-600">{metric.title}</span>
                    </div>
                    <div className={`text-xl font-semibold ${metric.textColor}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {metric.description}
                    </div>
                  </button>
              ))}
            </div>
          </div>

          {/* 活动状态图表 */}
          <div className="px-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Daily Activity</h3>
                <div className="flex space-x-2">
                  {['1W', '1M', '3M'].map((range) => (
                      <button
                          key={range}
                          onClick={() => setSelectedTimeRange(range)}
                          className={`px-3 py-1 rounded-lg text-sm ${
                              selectedTimeRange === range
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {range}
                      </button>
                  ))}
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis hide={true} />
                    <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="activity"
                        stroke="#22C55E"
                        strokeWidth={2}
                        fill="url(#colorActivity)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 饮食记录 */}
          <div className="px-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Diet Tracking</h3>
              <div className="space-y-3">
                {[
                  { meal: 'Morning', time: '08:00', status: 'Completed', amount: '100%' },
                  { meal: 'Noon', time: '13:00', status: 'Completed', amount: '95%' },
                  { meal: 'Evening', time: '19:00', status: 'Upcoming' }
                ].map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                            meal.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <div className="font-medium text-gray-900">{meal.meal}</div>
                          <div className="text-sm text-gray-500">{meal.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${
                            meal.status === 'Completed' ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {meal.status}
                        </div>
                        {meal.amount && (
                            <div className="text-xs text-gray-500">{meal.amount}</div>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* 健康提醒 */}
          <div className="px-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Reminders</h3>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Next Check-up</p>
                    <p className="text-sm text-blue-700 mt-1">Scheduled for next week</p>
                    <button className="mt-3 text-sm text-blue-600 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HealthMonitoring;