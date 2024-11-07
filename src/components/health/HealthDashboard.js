import React, { useState } from 'react';
import { 
  Pencil, MessageCircle, Bell, Activity, 
  DollarSign, Users, Calendar, Book,
  ShoppingCart, Heart, ChartBar, Settings,
  Syringe, Award, ChevronDown, MoreHorizontal,
  BarChart2  // 新增图标
} from 'lucide-react';

import HealthMonitoring from './HealthMonitoring';
import AiRecommendation from './AiRecommendation';
import DietRecommendation from '../diet/DietRecommendation';
import HealthRecords from './HealthRecords';
import AiDoctor from './AiDoctor';
import Appointments from './Appointments';
import PetSocial from '../Social/Social';
import ExpenseTracker from '../Finance/Finance';
import PetShop from '../shop/PetShop';
import ExercisePlan from '../exercise/ExercisePlan';
import MedicalCenter from '../medical/MedicalCenter';
import TrainingPlan from '../training/TrainingPlan';
import Analytics from '../analytics/Analytics'; // 新增分析组件导入

const HealthDashboard = ({ petInfo, onEdit }) => {
  const [showAiDoctor, setShowAiDoctor] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  // 更新导航分组，添加分析选项
  const navGroups = [
    {
      id: 'overview',
      name: 'Overview',
      icon: Activity,
      standalone: true
    },
    {
      id: 'health',
      name: 'Health',
      icon: Heart,
      items: [
        { id: 'health-main', name: 'Health', icon: Heart },
        { id: 'medical', name: 'Medical', icon: Syringe }
      ]
    },
    {
      id: 'wellness',
      name: 'Wellness',
      icon: ChartBar,
      items: [
        { id: 'diet', name: 'Diet', icon: ChartBar },
        { id: 'exercise', name: 'Exercise', icon: Activity },
        { id: 'training', name: 'Training', icon: Award }
      ]
    },
    {
      id: 'social',
      name: 'Social',
      icon: Users,
      items: [
        { id: 'appointments', name: 'Appointments', icon: Calendar },
        { id: 'social-main', name: 'Social', icon: Users }
      ]
    },
    {
      id: 'shop',
      name: 'Shop',
      icon: ShoppingCart,
      standalone: true
    },
    {
      id: 'analysis', // 新增分析组
      name: 'Analysis',
      icon: BarChart2,
      items: [
        { id: 'analytics', name: 'Analytics', icon: BarChart2 },
        { id: 'expenses', name: 'Expenses', icon: DollarSign },
        { id: 'records', name: 'Records', icon: Book }
      ]
    }
  ];

  // 通知数据保持不变，添加分析相关通知
  const notifications = [
    { 
      id: 1, 
      type: 'health', 
      message: 'Time for annual checkup!',
      timestamp: 'Just now' 
    },
    { 
      id: 2, 
      type: 'appointment', 
      message: 'Vet appointment tomorrow', 
      timestamp: '2 hours ago'
    },
    {
      id: 3,
      type: 'shop',
      message: 'New recommended products',
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      type: 'exercise',
      message: "Time for today's exercise!",
      timestamp: '5 mins ago'
    },
    {  
      id: 5,
      type: 'medical',
      message: 'Vaccination due next week',
      timestamp: '1 day ago'
    },
    {
      id: 6,
      type: 'training',
      message: 'Next training session today at 3 PM',
      timestamp: '30 mins ago'
    },
    {  // 新增分析相关通知
      id: 7,
      type: 'analytics',
      message: 'Monthly health report is ready',
      timestamp: '1 hour ago'
    }
  ];

  // 处理导航点击
  const handleNavClick = (itemId) => {
    const idMapping = {
      'health-main': 'health',
      'social-main': 'social'
    };
    setActiveTab(idMapping[itemId] || itemId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 顶部导航区域 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome back! Here's {petInfo.name}'s dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {/* 通知按钮 */}
            <div className="relative">
              <button 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                        <div className="flex items-center">
                          {notification.type === 'health' && (
                            <Heart className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          {notification.type === 'appointment' && (
                            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                          )}
                          {notification.type === 'shop' && (
                            <ShoppingCart className="h-5 w-5 text-green-500 mr-2" />
                          )}
                          {notification.type === 'exercise' && (
                            <Activity className="h-5 w-5 text-purple-500 mr-2" />
                          )}
                          {notification.type === 'medical' && (
                            <Syringe className="h-5 w-5 text-yellow-500 mr-2" />
                          )}
                          {notification.type === 'training' && (
                            <Award className="h-5 w-5 text-indigo-500 mr-2" />
                          )}
                          {notification.type === 'analytics' && (
                            <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                          )}
                          <div>
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* AI医生按钮 */}
            <button
              onClick={() => setShowAiDoctor(!showAiDoctor)}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              AI Doctor
            </button>

            {/* 编辑信息按钮 */}
            <button
              onClick={onEdit}
              className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Pet Info
            </button>
          </div>
        </div>

        {/* 优化后的导航栏 */}
        <div className="flex space-x-2 mt-6 border-b">
          {navGroups.map(group => (
            group.standalone ? (
              <button
                key={group.id}
                onClick={() => handleNavClick(group.id)}
                className={`flex items-center px-4 py-2 rounded-t-lg ${
                  activeTab === group.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <group.icon className="h-4 w-4 mr-2" />
                {group.name}
              </button>
            ) : (
              <div key={group.id} className="relative group">
                <button
                  className={`flex items-center px-4 py-2 rounded-t-lg ${
                    group.items.some(item => activeTab === (item.id === 'health-main' ? 'health' : 
                                                          item.id === 'social-main' ? 'social' : item.id))
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <group.icon className="h-4 w-4 mr-2" />
                  {group.name}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="hidden group-hover:block absolute z-10 left-0 mt-1 bg-white rounded-lg shadow-lg py-2">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* AI医生界面 */}
      {showAiDoctor && (
        <div className="mb-6">
          <AiDoctor petInfo={petInfo} />
        </div>
      )}

      {/* 主要内容区域 */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Pet Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{petInfo.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Age</p>
                  <p className="font-medium">{petInfo.age} years</p>
                </div>
                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="font-medium">{petInfo.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-500">Breed</p>
                  <p className="font-medium">{petInfo.breed}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Training</p>
                  <p className="font-medium text-indigo-600">Today at 3 PM</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Vaccine</p>
                  <p className="font-medium text-yellow-600">Due in 7 days</p>
                </div>
                <div>
                  <p className="text-gray-500">Health Score</p>
                  <p className="font-medium text-green-600">85/100</p>
                </div>
              </div>
            </div>
            <HealthMonitoring petInfo={petInfo} />
            <AiRecommendation petInfo={petInfo} />
          </>
        )}

        {/* Health Tab */}
        {activeTab === 'health' && (
          <>
            <HealthMonitoring petInfo={petInfo} />
            <HealthRecords petInfo={petInfo} />
            <AiRecommendation petInfo={petInfo} />
          </>
        )}

        {/* Medical Tab */}
        {activeTab === 'medical' && (
          <MedicalCenter petInfo={petInfo} />
        )}

        {/* Diet Tab */}
        {activeTab === 'diet' && (
          <DietRecommendation petInfo={petInfo} />
        )}

        {/* Exercise Tab */}
        {activeTab === 'exercise' && (
          <ExercisePlan petInfo={petInfo} />
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <TrainingPlan petInfo={petInfo} />
        )}

        {/* Analytics Tab - 新增 */}
        {activeTab === 'analytics' && (
          <Analytics petInfo={petInfo} />
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <Appointments petInfo={petInfo} />
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <PetSocial petInfo={petInfo} />
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <PetShop petInfo={petInfo} />
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <ExpenseTracker petInfo={petInfo} />
        )}

        {/* Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <HealthRecords petInfo={petInfo} />
            <ExpenseTracker petInfo={petInfo} />
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Analytics Report</h2>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Full Analytics
                </button>
              </div>
              {/* 分析摘要数据 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Health Score</h3>
                  <p className="text-2xl font-bold text-green-600">85/100</p>
                  <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Training Progress</h3>
                  <p className="text-2xl font-bold text-blue-600">68%</p>
                  <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Monthly Expenses</h3>
                  <p className="text-2xl font-bold text-purple-600">$330</p>
                  <p className="text-sm text-gray-500 mt-1">+6.5% from last month</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Training Records</h2>
                <button
                  onClick={() => setActiveTab('training')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View All Training
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Medical Records</h2>
                <button
                  onClick={() => setActiveTab('medical')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 移动设备底部导航 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navGroups.slice(0, 4).map(group => (
            <button
              key={group.id}
              onClick={() => handleNavClick(group.standalone ? group.id : group.items[0].id)}
              className={`flex flex-col items-center justify-center p-2 ${
                activeTab === group.id || 
                (group.items && group.items.some(item => 
                  activeTab === (item.id === 'health-main' ? 'health' : 
                             item.id === 'social-main' ? 'social' : item.id)
                ))
                  ? 'text-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <group.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{group.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;