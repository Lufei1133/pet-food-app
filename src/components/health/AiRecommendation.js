import React from 'react';
import { ChefHat, Apple, Carrot, Fish } from 'lucide-react';

const DietRecommendation = ({ petInfo }) => {
  const meals = [
    {
      time: 'Morning',
      items: [
        { name: 'High-protein kibble', amount: '100g', icon: Fish },
        { name: 'Fresh vegetables', amount: '50g', icon: Carrot }
      ]
    },
    {
      time: 'Afternoon',
      items: [
        { name: 'Healthy treats', amount: '30g', icon: Apple },
        { name: 'Fresh water', amount: 'Always available', icon: null }
      ]
    }
  ];

  const calculateCalories = () => {
    const baseCalories = petInfo.weight * 30;
    const activityMultiplier = {
      low: 1.2,
      moderate: 1.4,
      high: 1.6
    }[petInfo.activityLevel];
    
    return Math.round(baseCalories * activityMultiplier);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <ChefHat className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold">Diet Plan</h2>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Daily Nutrition Goals</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-2xl font-bold">{calculateCalories()} kcal</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-2xl font-bold">25-30%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fat</p>
              <p className="text-2xl font-bold">15-20%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="text-2xl font-bold">30-35%</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Meal Schedule</h3>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">{meal.time}</h4>
                <div className="space-y-2">
                  {meal.items.map((item, i) => (
                    <div key={i} className="flex items-center">
                      {item.icon && <item.icon className="h-4 w-4 text-gray-500 mr-2" />}
                      <span className="text-gray-700">{item.name}</span>
                      <span className="ml-2 text-gray-500">({item.amount})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietRecommendation;