import React, { useState, useEffect } from 'react';
import { Scale, Activity, ChefHat } from 'lucide-react';

const HealthMonitoring = ({ petInfo }) => {
  const [metrics, setMetrics] = useState({
    weight: [],
    activity: [],
    meals: []
  });

  useEffect(() => {
    // 模拟数据加载
    generateDemoData();
  }, []);

  const generateDemoData = () => {
    const days = 7;
    const today = new Date();
    const data = {
      weight: [],
      activity: [],
      meals: []
    };

    for (let i = 0; i < days; i++) {
      const date = new Date(today - i * 24 * 60 * 60 * 1000);
      data.weight.push({
        date: date.toLocaleDateString(),
        value: petInfo.weight + (Math.random() - 0.5)
      });
      data.activity.push({
        date: date.toLocaleDateString(),
        value: Math.floor(70 + Math.random() * 30)
      });
      data.meals.push({
        date: date.toLocaleDateString(),
        value: Math.floor(85 + Math.random() * 15)
      });
    }

    setMetrics(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Health Monitoring</h2>

      {/* 健康指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 体重卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Scale className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold">Weight</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {petInfo.weight} kg
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* 活动水平卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Activity className="h-6 w-6 text-green-500" />
            <h3 className="ml-2 text-lg font-semibold">Activity Level</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {metrics.activity[0]?.value}%
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 rounded-full h-2"
              style={{ width: `${metrics.activity[0]?.value}%` }}
            />
          </div>
        </div>

        {/* 饮食完成度卡片 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <h3 className="ml-2 text-lg font-semibold">Meal Completion</h3>
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {metrics.meals[0]?.value}%
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 rounded-full h-2"
              style={{ width: `${metrics.meals[0]?.value}%` }}
            />
          </div>
        </div>
      </div>

      {/* 历史数据表格 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight (kg)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meals
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.weight.map((day, index) => (
                <tr key={day.date}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {day.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {day.value.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {metrics.activity[index].value}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {metrics.meals[index].value}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring;