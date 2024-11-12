import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// 导入现有组件
import HealthDashboard from './components/health/HealthDashboard';
import PetShop from './components/shop/PetShop';
import AiDoctor from './components/AI-Vet/AiDoctor';
import PetSocial from './components/Social/Social';
import AccountProfile from './components/profile/AccountProfile';
import ExercisePlan from './components/health/ExercisePlan';
import DietRecommendation from './components/health/DietRecommendation';
import MedicalRecords from './components/health/MedicalRecords';
import AuthService from './services/auth';
import {useNavigate} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
        />
      </Routes>
  );
}

function MainContent() {
  const navigate = useNavigate();
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
  const [user, setUser] = useState(AuthService.getCurrentUser());

  const renderContent = () => {
    switch (activeTab) {
      case 'shop':
        return <PetShop petInfo={petInfo}/>;
      case 'health':
        return <HealthDashboard petInfo={petInfo}/>;
      case 'aivet':
        return <AiDoctor petInfo={petInfo}/>;
      case 'social':
        return <PetSocial petInfo={petInfo}/>;
      case 'profile':
        return <AccountProfile petInfo={petInfo} user={user} onLogout={() => setUser(null)}/>;
      default:
        return <PetShop petInfo={petInfo}/>;
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
      <MainLayout
          user={user}
          petInfo={petInfo}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/exercise-plan" element={<ExercisePlan petInfo={petInfo} />} />
          <Route path="/diet-recommendation" element={<DietRecommendation petInfo={petInfo} />} />
          <Route path="/medical-records" element={<MedicalRecords petInfo={petInfo} />} />
        </Routes>
      </MainLayout>
  );
}

export default App;