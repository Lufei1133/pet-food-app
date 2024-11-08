import React, {useRef, useState} from 'react';
import {
  Pencil, MessageCircle, Bell, Activity,
  DollarSign, Users, Calendar, Book,
  ShoppingCart, Heart, ChartBar, Settings,
  Syringe, Award, ChevronDown, MoreHorizontal,
  BarChart2, ChevronLeft, ChevronRight  // 添加缺失的图标
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAiDoctor, setShowAiDoctor] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'wellness', label: 'Wellness', icon: Activity },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'shop', label: 'Shop', icon: ShoppingCart },
    { id: 'analytics', label: 'Analysis', icon: BarChart2 },
  ];
  const mobileNavGroups = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'social', name: 'Social', icon: Users },
    { id: 'shop', name: 'Shop', icon: ShoppingCart }
  ];
  // 处理导航点击
  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left'
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Update scroll buttons visibility
      setShowLeftScroll(newScrollLeft > 0);
      setShowRightScroll(
          newScrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftScroll(container.scrollLeft > 0);
      setShowRightScroll(
          container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header with Title and Notification */}
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-bold">
              Welcome back!<br />
              Here's {petInfo.name}'s dashboard
            </h1>
            <div className="relative">
              <button
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              7
            </span>
              </button>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex justify-between items-center mb-8">  {/* 添加 mb-8 设置下边距 */}
            {/* AI Doctor Button */}
            <button
                onClick={() => setShowAiDoctor(!showAiDoctor)}
                className="flex items-center px-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              AI Doctor
            </button>

            {/* Edit Info Button */}
            <button
                onClick={onEdit}
                className="flex items-center px-6 py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Pet Info
            </button>
          </div>

          {/* Navigation Section */}
          <div className="relative mt-2">  {/* 添加 mt-2 设置上边距 */}

          {/* Navigation Items */}
          <div
              ref={scrollContainerRef}
              className="flex space-x-1 overflow-x-auto scrollbar-hide"
              onScroll={checkScrollButtons}
          >
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        activeTab === item.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="h-4 w-4 mr-2"/>
                  {item.label}
                </button>
            ))}
          </div>

        </div>
      </div>


  {/* AI医生界面 */
  }
  {
    showAiDoctor && (
        <div className="mb-6">
          <AiDoctor petInfo={petInfo}/>
        </div>
    )
  }

  {/* 主要内容区域 */
  }
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
                <HealthMonitoring petInfo={petInfo}/>
                <AiRecommendation petInfo={petInfo}/>
              </>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
              <>
                <HealthMonitoring petInfo={petInfo}/>
                <HealthRecords petInfo={petInfo}/>
                <AiRecommendation petInfo={petInfo}/>
              </>
          )}
          {/* Wellness Tab */}
          {/*{activeTab === 'wellness' && (*/}
          {/*    // <>*/}
          {/*    //   <WellnessMonitoring petInfo={petInfo}/>*/}
          {/*    // </>*/}
          {/*)}*/}

          {/* Medical Tab */}
          {activeTab === 'medical' && (
              <MedicalCenter petInfo={petInfo}/>
          )}

          {/* Diet Tab */}
          {activeTab === 'diet' && (
              <DietRecommendation petInfo={petInfo}/>
          )}

          {/* Exercise Tab */}
          {activeTab === 'exercise' && (
              <ExercisePlan petInfo={petInfo}/>
          )}

          {/* Training Tab */}
          {activeTab === 'training' && (
              <TrainingPlan petInfo={petInfo}/>
          )}

          {/* Analytics Tab - 新增 */}
          {activeTab === 'analytics' && (
              <Analytics petInfo={petInfo}/>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
              <Appointments petInfo={petInfo}/>
          )}

          {/* Social Tab */}
          {activeTab === 'social' && (
              <PetSocial petInfo={petInfo}/>
          )}

          {/* Shop Tab */}
          {activeTab === 'shop' && (
              <PetShop petInfo={petInfo}/>
          )}

          {/* Expenses Tab */}
          {activeTab === 'expenses' && (
              <ExpenseTracker petInfo={petInfo}/>
          )}

          {/* Records Tab */}
          {activeTab === 'records' && (
              <div className="space-y-6">
                <HealthRecords petInfo={petInfo}/>
                <ExpenseTracker petInfo={petInfo}/>
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


        {/* 移动设备底部导航 - 使用更新后的 mobileNavGroups */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="grid grid-cols-4 gap-1 p-2">
            {mobileNavGroups.map(group => (
                <button
                    key={group.id}
                    onClick={() => handleNavClick(group.id)}
                    className={`flex flex-col items-center justify-center p-2 ${
                        activeTab === group.id
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