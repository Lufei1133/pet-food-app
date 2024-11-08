import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity, Heart, ChefHat, Users,
  MessageCircle, Bell, Plus, Settings
} from 'lucide-react';

import HealthDashboard from './components/health/HealthDashboard';

import AiDoctor from './components/health/AiDoctor';
import PetInfoForm from './components/PetInfoForm';
import Login from './components/Auth/Login';
import Overview from './components/Overview';
import DietRecommendation from './components/diet/DietRecommendation';
import PetSocial from './components/Social/Social';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAiChat, setShowAiChat] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [petInfo, setPetInfo] = useState({
    name: 'Max',
    type: 'dog',
    age: 5,
    weight: 14,
    breed: 'Golden Retriever',
    activityLevel: 'moderate',
    healthIssues: ['Joint problems']
  });

  // 页面切换动画配置
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 主要导航项
  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'diet', name: 'Diet', icon: ChefHat },
    { id: 'social', name: 'Social', icon: Users }
  ];

  // 快速操作菜单项
  const quickActions = [
    {
      id: 'chat',
      name: 'AI Chat',
      icon: MessageCircle,
      action: () => setShowAiChat(true)
    },
    {
      id: 'editPet',
      name: 'Edit Pet',
      icon: Settings,
      action: () => setShowEditForm(true)
    }
  ];

  // 底部导航组件
  const BottomNav = () => {
    const [showQuickActions, setShowQuickActions] = useState(false);

    return (
        <>
          {/* 底部导航栏 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg pb-safe">
            <div className="max-w-md mx-auto px-6 h-16">
              <div className="flex items-center justify-around h-full">
                {navigationItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="flex flex-col items-center justify-center group"
                    >
                      <item.icon
                          className={`w-6 h-6 mb-1 transition-colors duration-200 ${
                              activeTab === item.id
                                  ? 'text-blue-500'
                                  : 'text-gray-400 group-hover:text-gray-600'
                          }`}
                      />
                      <span className={`text-xs transition-colors duration-200 ${
                          activeTab === item.id
                              ? 'text-blue-500 font-medium'
                              : 'text-gray-400 group-hover:text-gray-600'
                      }`}>
                    {item.name}
                  </span>
                    </button>
                ))}

                {/* 快速操作按钮 */}
                <button
                    onClick={() => setShowQuickActions(true)}
                    className="relative group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center -mt-4 shadow-lg transition-transform duration-200 group-hover:scale-105">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 快速操作菜单 */}
          <AnimatePresence>
            {showQuickActions && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    onClick={() => setShowQuickActions(false)}
                >
                  <motion.div
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      exit={{ y: 100 }}
                      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
                      onClick={e => e.stopPropagation()}
                  >
                    <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
                    <div className="grid grid-cols-4 gap-4">
                      {quickActions.map(action => (
                          <button
                              key={action.id}
                              onClick={() => {
                                action.action();
                                setShowQuickActions(false);
                              }}
                              className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                          >
                            <action.icon className="w-6 h-6 text-gray-600 mb-2" />
                            <span className="text-sm text-gray-600">{action.name}</span>
                          </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </>
    );
  };

  // 主要内容区域
  const MainContent = () => (
      <motion.div
          key={activeTab}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 pb-20"
      >
        <div className="max-w-md mx-auto px-4 py-6">
          {/* 页面标题 */}
          {/*<div className="flex items-center justify-between mb-6">*/}
          {/*  <h1 className="text-2xl font-bold">*/}
          {/*    Welcome back, {petInfo.name}!*/}
          {/*  </h1>*/}
          {/*  <div className="relative">*/}
          {/*    <Bell className="w-6 h-6 text-gray-400" />*/}
          {/*    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">*/}
          {/*    3*/}
          {/*  </span>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* 健康状态卡片 */}
          {/*<div className="bg-white rounded-2xl shadow-sm p-6 mb-6">*/}
          {/*  <div className="grid grid-cols-2 gap-4">*/}
          {/*    <div>*/}
          {/*      <span className="text-sm text-gray-500">Health Score</span>*/}
          {/*      <div className="text-3xl font-bold text-green-500 mt-1">95/100</div>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <span className="text-sm text-gray-500">Next Check-up</span>*/}
          {/*      <div className="text-lg font-medium text-gray-900 mt-1">In 7 days</div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* 动态内容区域 */}
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </motion.div>
  );

  const renderContent = () => {
    // 根据activeTab返回相应的组件
    switch (activeTab) {
      case 'overview':
        return (
            <motion.div
                key="overview"
                variants={pageVariants}
            >
              <Overview petInfo={petInfo} />
            </motion.div>
        );
      case 'health':
        return (
            <motion.div
                key="health"
                variants={pageVariants}
            >
              <HealthDashboard petInfo={petInfo} />
            </motion.div>
        );
      case 'diet':
        return <DietRecommendation petInfo={petInfo} />;
      case 'social':
        return <PetSocial petInfo={petInfo} />;
      default:
        return <HealthDashboard petInfo={petInfo} />;
    }
  };

  // 如果没有登录，显示登录页面
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
      <div className="bg-gray-50 min-h-screen">
        <MainContent />
        <BottomNav />

        {/* AI聊天弹窗 */}
        <AnimatePresence>
          {showAiChat && (
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 bg-white z-50"
              >
                <AiDoctor
                    petInfo={petInfo}
                    onClose={() => setShowAiChat(false)}
                />
              </motion.div>
          )}
        </AnimatePresence>

        {/* 编辑宠物信息弹窗 */}
        <AnimatePresence>
          {showEditForm && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
                >
                  <PetInfoForm
                      petInfo={petInfo}
                      onSubmit={(newPetInfo) => {
                        setPetInfo(newPetInfo);
                        setShowEditForm(false);
                      }}
                      onCancel={() => setShowEditForm(false)}
                  />
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default App;