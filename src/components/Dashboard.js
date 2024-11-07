import React, { useState } from 'react';
import { 
  Layout, Activity, ChefHat, Heart, Settings 
} from 'lucide-react';
import HealthDashboard from './health/HealthDashboard';
import DietRecommendation from './diet/DietRecommendation';
import ExercisePlan from './exercise/ExercisePlan';

const Dashboard = ({ petInfo }) => {
  const [activeTab, setActiveTab] = useState('health');

  const tabs = [
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'diet', name: 'Diet', icon: ChefHat },
    { id: 'exercise', name: 'Exercise', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'health':
        return <HealthDashboard petInfo={petInfo} />;
      case 'diet':
        return <DietRecommendation petInfo={petInfo} />;
      case 'exercise':
        return <ExercisePlan petInfo={petInfo} />;
      default:
        return <HealthDashboard petInfo={petInfo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 概览卡片 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Health Status</h3>
                  <p className="text-sm text-gray-500">Overall condition</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Good
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <ChefHat className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Diet Plan</h3>
                  <p className="text-sm text-gray-500">Meal schedule</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Exercise</h3>
                  <p className="text-sm text-gray-500">Weekly progress</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                On Track
              </span>
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon 
                    className={`mr-2 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 内容区域 */}
        {renderContent()}
      </div>
    </div>
    
  );
};
export default Dashboard;