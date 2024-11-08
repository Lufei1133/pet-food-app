import React, { useState } from 'react';
import BottomNavigation from './components/navigation/BottomNavigation';
import HealthDashboard from './components/health/HealthDashboard';
import DietRecommendation from './components/diet/DietRecommendation';
import ExercisePlan from './components/exercise/ExercisePlan';
import PetSocial from './components/Social/Social';
import AiDoctor from './components/health/AiDoctor';
import PetInfoForm from './components/PetInfoForm';
import Login from './components/Auth/Login';

function App() {
  // 用户和宠物信息状态
  const [user, setUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [petInfo, setPetInfo] = useState({
    name: 'Max',
    type: 'dog',
    age: 5,
    weight: 14,
    breed: 'Golden Retriever',
    activityLevel: 'moderate',
    healthIssues: ['Joint problems']
  });

  // 如果用户未登录，显示登录页面
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // 渲染主要内容
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
      case 'health':
        return (
            <HealthDashboard
                petInfo={petInfo}
                onEdit={() => setShowEditForm(true)}
            />
        );
      case 'diet':
        return <DietRecommendation petInfo={petInfo} />;
      case 'social':
        return <PetSocial petInfo={petInfo} />;
      default:
        return <HealthDashboard petInfo={petInfo} />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* 主要内容区域 */}
        <div className="pb-16"> {/* 为底部导航预留空间 */}
          {/* AI医生聊天界面 */}
          {showAiChat && (
              <div className="mb-6">
                <AiDoctor
                    petInfo={petInfo}
                    onClose={() => setShowAiChat(false)}
                />
              </div>
          )}

          {/* 主要内容 */}
          {showEditForm ? (
              <PetInfoForm
                  petInfo={petInfo}
                  onSubmit={(newPetInfo) => {
                    setPetInfo(newPetInfo);
                    setShowEditForm(false);
                  }}
                  onCancel={() => setShowEditForm(false)}
              />
          ) : (
              renderContent()
          )}
        </div>

        {/* 底部导航 */}
        <BottomNavigation
            currentTab={activeTab}
            onChangeTab={setActiveTab}
            onOpenChat={() => setShowAiChat(true)}
            notifications={3}
            onLogout={() => setUser(null)}
        />
      </div>
  );
}

export default App;