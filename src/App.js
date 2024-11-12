import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Login from './components/Auth/Login';

// 导入现有组件
import HealthDashboard from './components/health/HealthDashboard';
import PetShop from './components/shop/PetShop';
import AiDoctor from './components/ai-vet/AiDoctor';
import PetSocial from './components/social/Social';
import AccountProfile from './components/profile/AccountProfile';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('shop');
  const [petInfo, setPetInfo] = useState({
    name: 'Max',
    type: 'dog',
    age: 5,
    weight: 14,
    breed: 'Golden Retriever',
    activityLevel: 'moderate',
    healthIssues: ['Joint problems']
  });

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'shop':
        return <PetShop petInfo={petInfo} />;
      case 'health':
        return <HealthDashboard petInfo={petInfo} />;
      case 'aivet':
        return <AiDoctor petInfo={petInfo} />;
      case 'social':
        return <PetSocial petInfo={petInfo} />;
      case 'profile':
        return <AccountProfile petInfo={petInfo} user={user} onLogout={() => setUser(null)} />;
      default:
        return <PetShop petInfo={petInfo} />;
    }
  };

  return (
      <MainLayout
          user={user}
          petInfo={petInfo}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={() => setUser(null)}
      >
        {renderContent()}
      </MainLayout>
  );
}

export default App;