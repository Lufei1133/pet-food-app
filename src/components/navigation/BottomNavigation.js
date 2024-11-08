import React from 'react';
import { motion } from 'framer-motion';
import {
    Overview,    // Overview页 - 健康监测
    ChefHat,     // Diet & Training页 - 饮食训练
    AIDOC, // Health页 - AI医生&预约
    Social,       // Social页 - 社交
    Profile,        // Profile页 - 用户信息
} from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
    const navItems = [
        {
            id: 'overview',
            icon: Overview,
            label: 'Overview',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'diet-training',
            icon: ChefHat,
            label: 'Diet & Train',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'AIDOC',
            icon: AIDOC,
            label: 'Health',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'social',
            icon: Social,
            label: 'Social',
            color: 'from-pink-500 to-pink-600'
        },
        {
            id: 'profile',
            icon: User,
            label: 'Profile',
            color: 'from-gray-500 to-gray-600'
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe">
            <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        whileTap={{ scale: 0.9 }}
                        className="relative flex flex-col items-center justify-center w-16"
                    >
                        {item.id === 'health' && (
                            // 特殊突出显示的健康标签
                            <motion.div
                                className={`absolute -top-6 w-14 h-14 rounded-full bg-gradient-to-r ${item.color} shadow-lg flex items-center justify-center`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <item.icon className="w-6 h-6 text-white" />
                            </motion.div>
                        )}
                        {item.id !== 'health' && (
                            <item.icon
                                className={`w-6 h-6 mb-1 ${
                                    activeTab === item.id
                                        ? `text-gradient bg-gradient-to-r ${item.color}`
                                        : 'text-gray-400'
                                }`}
                            />
                        )}
                        <span className={`text-xs ${
                            activeTab === item.id
                                ? 'font-medium text-gray-900 dark:text-white'
                                : 'text-gray-500'
                        }`}>
              {item.label}
            </span>
                        {activeTab === item.id && item.id !== 'health' && (
                            <motion.div
                                layoutId="nav-indicator"
                                className="absolute -bottom-1 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default BottomNavigation;