import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,           // Overview - 主页健康监控
  Heart,          // Diet & Training - 健康饮食训练
  Stethoscope,    // AI Doctor - 医生咨询 (但我们会用自定义医生图标替代)
  MessageSquare,  // Social - 社交聊天
  User           // Profile - 用户信息
} from 'lucide-react';

// 自定义医生图标
const DoctorIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v2H8a2 2 0 0 0-2 2v2M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1v-2a3 3 0 0 0-3-3h-2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 9v6"/>
      <path d="M9 12h6"/>
    </svg>
);

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'overview',
      icon: Home,
      label: 'Home',
      color: 'from-teal-400 to-cyan-500',
      gradient: 'hover:bg-gradient-to-r from-teal-400/10 to-cyan-500/10'
    },
    {
      id: 'health',
      icon: Heart,
      label: 'Health',
      color: 'from-red-400 to-pink-500',
      gradient: 'hover:bg-gradient-to-r from-red-400/10 to-pink-500/10'
    },
    {
      id: 'ai-doctor',
      icon: DoctorIcon,
      label: 'Doctor',
      color: 'from-violet-500 to-purple-600',
      gradient: 'hover:bg-gradient-to-r from-violet-500/10 to-purple-600/10'
    },
    {
      id: 'social',
      icon: MessageSquare,
      label: 'Chat',
      color: 'from-blue-400 to-indigo-500',
      gradient: 'hover:bg-gradient-to-r from-blue-400/10 to-indigo-500/10'
    },
    {
      id: 'profile',
      icon: User,
      label: 'Profile',
      color: 'from-gray-400 to-gray-600',
      gradient: 'hover:bg-gradient-to-r from-gray-400/10 to-gray-600/10'
    }
  ];

  return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-200 dark:border-gray-700">
        <div className="px-3 h-16 flex items-center justify-around">
          {navItems.map((item) => (
              <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative p-3 rounded-xl transition-all duration-300 ${item.gradient}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
              >
                {item.id === activeTab && (
                    <motion.div
                        layoutId="nav-background"
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-20`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* AI Doctor 特殊处理 */}
                {item.id === 'ai-doctor' ? (
                    <div className={`relative rounded-xl p-2.5 bg-gradient-to-r ${item.color} shadow-lg -mt-8`}>
                      <item.icon className={`w-7 h-7 text-white`} />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} blur-lg opacity-50 -z-10`} />
                      <div className="absolute inset-0 rounded-xl animate-ping bg-purple-400 opacity-20" />
                    </div>
                ) : (
                    <div className="w-6 h-6">
                      <item.icon
                          className={`w-full h-full ${
                              activeTab === item.id
                                  ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent`
                                  : 'text-gray-400 dark:text-gray-500'
                          }`}
                      />
                    </div>
                )}

                {activeTab === item.id && item.id !== 'ai-doctor' && (
                    <motion.div
                        className="absolute -bottom-1 left-1/2 w-1 h-1 bg-current rounded-full"
                        layoutId="nav-dot"
                    />
                )}
              </motion.button>
          ))}
        </div>
      </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="p-4"><h1>Overview</h1></div>;
      case 'health':
        return <div className="p-4"><h1>Health</h1></div>;
      case 'ai-doctor':
        return <div className="p-4"><h1>AI Doctor</h1></div>;
      case 'social':
        return <div className="p-4"><h1>Social</h1></div>;
      case 'profile':
        return <div className="p-4"><h1>Profile</h1></div>;
      default:
        return <div className="p-4"><h1>Overview</h1></div>;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="pb-24">
          {renderContent()}
        </div>

        <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
      </div>
  );
};

export default App;