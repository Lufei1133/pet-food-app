import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';
import {
    User, CreditCard, MapPin, Settings, HelpCircle,
    Shield, ChevronRight, Edit, Trash, Plus, Camera,
    LogOut, Bell, Lock, FileText, MessageCircle, X
} from 'lucide-react';

const AccountProfile = ({ user, onLogout }) => {
    const navigate = useNavigate();
    // 初始化所有状态
    const [activeSection, setActiveSection] = useState('profile');
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showAddPayment, setShowAddPayment] = useState(false);

    // 初始化 profile 状态
    const [profile, setProfile] = useState({
        name: user?.name || 'John Doe',
        email: user?.email || 'john@example.com',
        phone: user?.phone || '+1 234 567 8900',
        avatar: user?.avatar || '/api/placeholder/100/100',
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            profileVisibility: 'public',
            showActivity: true,
            showLocation: false
        }
    });
    const handleLogout = () => {
        AuthService.logout(); // 清除 localStorage
        if (onLogout) {
            onLogout(); // 调用父组件传入的 onLogout（可选）
        }
        navigate('/login', { replace: true }); // 导航到登录页
    };

    // 组件定义
    const MenuCard = ({ icon: Icon, title, subtitle, onClick }) => (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
        </motion.div>
    );

    // 编辑个人资料模态框
    const EditProfileModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit Profile</h3>
                    <button onClick={() => setShowEditProfile(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* 头像上传 */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src={profile.avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-50"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* 表单字段 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={() => setShowEditProfile(false)}
                            className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setShowEditProfile(false)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-6 mb-8 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
                <div className="relative z-10">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/10"
                            />
                            <button
                                onClick={() => setShowEditProfile(true)}
                                className="absolute -bottom-2 -right-2 p-2 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-colors"
                            >
                                <Camera className="h-4 w-4 text-white" />
                            </button>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                            <p className="text-white/80">{profile.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => setShowEditProfile(true)}
                            className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-colors flex items-center"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20 transition-colors flex items-center"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Menu Cards */}
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <MenuCard
                        icon={MapPin}
                        title="Shipping Addresses"
                        subtitle="Manage your delivery addresses"
                        onClick={() => setActiveSection('addresses')}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <MenuCard
                        icon={CreditCard}
                        title="Payment Methods"
                        subtitle="Manage your payment options"
                        onClick={() => setActiveSection('payments')}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <MenuCard
                        icon={Lock}
                        title="Privacy & Security"
                        subtitle="Control your account privacy"
                        onClick={() => setActiveSection('privacy')}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <MenuCard
                        icon={Bell}
                        title="Notifications"
                        subtitle="Manage your notification preferences"
                        onClick={() => setActiveSection('notifications')}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <MenuCard
                        icon={HelpCircle}
                        title="Help & Support"
                        subtitle="Get help and read FAQs"
                        onClick={() => setActiveSection('support')}
                    />
                </motion.div>
            </div>

            {/* Terms and Privacy Links */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center space-y-2"
            >
                <a href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                    Terms of Service
                </a>
                <span className="mx-2 text-gray-300">•</span>
                <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                    Privacy Policy
                </a>
            </motion.div>

            {/* Modals */}
            {showEditProfile && <EditProfileModal />}
        </div>
    );
};

export default AccountProfile;