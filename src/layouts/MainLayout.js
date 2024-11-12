import React, { useState } from 'react';
import {
    ShoppingBag, Heart, MessageSquareText, Users, User,
    ChevronDown, Bell, Camera, MapPin, Search, Settings
} from 'lucide-react';

const MainLayout = ({
                        children,
                        user,
                        petInfo,
                        activeTab,
                        onTabChange,
                        onLogout
                    }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        // ... 通知数据
    ]);

    const navItems = [
        { id: 'shop', label: 'Shop', icon: ShoppingBag },
        { id: 'health', label: 'Health', icon: Heart },
        { id: 'aivet', label: 'AI Vet', icon: MessageSquareText },
        { id: 'social', label: 'Social', icon: Users },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 顶部导航 */}
            <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* 宠物选择器 */}
                    <div className="flex items-center">
                        <img
                            src={petInfo.image || '/api/placeholder/40/40'}
                            alt={petInfo.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3 flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1">
                            <span className="font-medium">{petInfo.name}</span>
                            <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                        </div>
                    </div>

                    {/* 通知中心 */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 hover:bg-gray-50 rounded-full"
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
                            )}
                        </button>

                        {/* 通知下拉框 */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg">
                                {/* ... 通知列表内容 ... */}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 主要内容区域 */}
            <main className="pt-16 pb-20">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {children}
                </div>
            </main>

            {/* 底部导航 */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-around">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`flex flex-col items-center py-3 px-5 ${
                                    activeTab === item.id
                                        ? 'text-blue-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs mt-1">{item.label}</span>
                                {activeTab === item.id && (
                                    <div className="absolute bottom-0 w-10 h-0.5 bg-blue-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MainLayout;