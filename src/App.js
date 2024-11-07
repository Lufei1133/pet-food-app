import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Navigation from './components/health/Navigation';
import HealthDashboard from './components/health/HealthDashboard';
import PetInfoForm from './components/PetInfoForm';  // 更新导入路径

function App() {
  const [user, setUser] = useState(null);
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

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleSavePetInfo = (newPetInfo) => {
    setPetInfo(newPetInfo);
    setShowEditForm(false);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onLogout={() => setUser(null)} />
      {showEditForm ? (
        <PetInfoForm 
          petInfo={petInfo} 
          onSubmit={handleSavePetInfo}
          onCancel={() => setShowEditForm(false)}
        />
      ) : (
        <HealthDashboard 
          petInfo={petInfo}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;