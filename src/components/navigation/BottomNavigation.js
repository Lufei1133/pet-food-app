import React, { useState } from 'react';
import {
    Activity, Heart, ChefHat, Users, Settings,
    MessageCircle, Bell, Plus
} from 'lucide-react';

const BottomNavigation = ({ currentTab, onChangeTab, onOpenChat, notifications = 0 }) => {
    const [showMore, setShowMore] = useState(false);

    const mainTabs = [
        { id: 'overview', name: 'Overview', icon: Activity },
        { id: 'health', name: 'Health', icon: Heart },
        { id: 'diet', name: 'Diet', icon: ChefHat },
        { id: 'social', name: 'Social', icon: Users }
    ];

    const moreActions = [
        { id: 'chat', name: 'AI Chat', icon: MessageCircle, action: onOpenChat },
        { id: 'settings', name: 'Settings', icon: Settings }
    ];

    return (
        <>
            {/* 固定在底部的主导航 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
                <div className="max-w-md mx-auto px-4 h-16">
                    <div className="flex items-center justify-around h-full">
                        {mainTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => onChangeTab(tab.id)}
                                className="flex flex-col items-center justify-center flex-1"
                            >
                                <tab.icon
                                    className={`w-6 h-6 mb-1 ${
                                        currentTab === tab.id
                                            ? 'text-blue-500'
                                            : 'text-gray-500'
                                    }`}
                                />
                                <span className={`text-xs ${
                                    currentTab === tab.id
                                        ? 'text-blue-500 font-medium'
                                        : 'text-gray-500'
                                }`}>
                  {tab.name}
                </span>
                            </button>
                        ))}

                        {/* 快速操作按钮 */}
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="flex flex-col items-center justify-center flex-1 relative"
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center -mt-2">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">More</span>

                            {notifications > 0 && (
                                <span className="absolute top-0 right-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 更多操作的弹出菜单 */}
            {showMore && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center pb-20">
                    <div className="bg-white w-full max-w-md rounded-t-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Quick Actions</h3>
                            <button
                                onClick={() => setShowMore(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Plus className="w-6 h-6 transform rotate-45" />
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {moreActions.map(action => (
                                <button
                                    key={action.id}
                                    onClick={() => {
                                        if (action.action) action.action();
                                        setShowMore(false);
                                    }}
                                    className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-xl"
                                >
                                    <action.icon className="w-6 h-6 text-gray-600 mb-2" />
                                    <span className="text-sm text-gray-600">{action.name}</span>
                                </button>
                            ))}
                        </div>

                        {notifications > 0 && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center">
                                    <Bell className="w-5 h-5 text-blue-500 mr-2" />
                                    <span className="text-sm text-blue-700">
                    You have {notifications} new notifications
                  </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomNavigation;