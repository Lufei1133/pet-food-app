import { Card, CardHeader, CardTitle } from "../ui/card"
import { FileText, Activity, Apple } from "lucide-react"
import ExercisePlan from './/ExercisePlan';
import DietRecommendation from './/DietRecommendation';
import MedicalRecords from './MedicalRecords';
import {useState} from "react";
export default function HealthDashboard({ petInfo }) {
  const [currentView, setCurrentView] = useState('dashboard');

  // 渲染主要内容
  const renderContent = () => {
    switch(currentView) {
      case 'exercise-plan':
        return <ExercisePlan petInfo={petInfo} onBack={() => setCurrentView('dashboard')} />;
      case 'diet-recommendation':
        return <DietRecommendation petInfo={petInfo} onBack={() => setCurrentView('dashboard')} />;
      case 'medical-records':
        return <MedicalRecords petInfo={petInfo} onBack={() => setCurrentView('dashboard')} />;
      default:
        return (
            <div className="p-4 max-w-md mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-center mb-6">Health Dashboard</h1>

              <div onClick={() => setCurrentView('exercise-plan')} className="cursor-pointer">
                <Card className="rounded-2xl hover:shadow-md transition-shadow border-2 border-pink-100">
                  <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="bg-pink-50 p-3 rounded-xl">
                      <Activity className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1">Exercise Plan</CardTitle>
                      <p className="text-gray-600">View your workout routine</p>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <div onClick={() => setCurrentView('diet-recommendation')} className="cursor-pointer">
                <Card className="rounded-2xl hover:shadow-md transition-shadow border-2 border-green-100">
                  <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="bg-green-50 p-3 rounded-xl">
                      <Apple className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1">Diet Recommendation</CardTitle>
                      <p className="text-gray-600">Get nutrition tips</p>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <div onClick={() => setCurrentView('medical-records')} className="cursor-pointer">
                <Card className="rounded-2xl hover:shadow-md transition-shadow border-2 border-blue-100">
                  <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold mb-1">Medical Records</CardTitle>
                      <p className="text-gray-600">View your health information</p>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
        );
    }
  };

  return renderContent();
}