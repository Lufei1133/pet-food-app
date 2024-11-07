import React, { useState } from 'react';
import { ChefHat, Apple, Info, AlertTriangle } from 'lucide-react';

const DietRecommendation = ({ petInfo }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  // 基于宠物信息生成膳食建议
  const generateDietPlan = () => {
    const basedOnWeight = petInfo.weight * 30; // 基础卡路里需求
    const activityMultiplier = {
      low: 1.2,
      moderate: 1.4,
      high: 1.6
    }[petInfo.activityLevel];

    const dailyCalories = Math.round(basedOnWeight * activityMultiplier);

    const meals = [
      {
        name: "Morning Meal",
        calories: Math.round(dailyCalories * 0.4),
        time: "7:00 AM",
        ingredients: [
          { name: "Lean Protein", amount: "100g" },
          { name: "Complex Carbs", amount: "50g" },
          { name: "Vegetables", amount: "30g" }
        ],
        notes: "Rich in protein for morning energy"
      },
      {
        name: "Afternoon Snack",
        calories: Math.round(dailyCalories * 0.2),
        time: "2:00 PM",
        ingredients: [
          { name: "Healthy Treats", amount: "30g" },
          { name: "Fresh Fruits", amount: "20g" }
        ],
        notes: "Light and nutritious"
      },
      {
        name: "Evening Meal",
        calories: Math.round(dailyCalories * 0.4),
        time: "6:00 PM",
        ingredients: [
          { name: "Mixed Protein", amount: "100g" },
          { name: "Whole Grains", amount: "50g" },
          { name: "Mixed Vegetables", amount: "40g" }
        ],
        notes: "Balanced dinner for good sleep"
      }
    ];

    // 根据健康问题调整建议
    if (petInfo.healthIssues.includes('Weight management')) {
      meals.forEach(meal => {
        meal.calories = Math.round(meal.calories * 0.9);
        meal.notes += " (Portion reduced for weight management)";
      });
    }

    return {
      dailyCalories,
      meals
    };
  };

  const dietPlan = generateDietPlan();

  const MealCard = ({ meal }) => (
    <div 
      className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all ${
        selectedMeal?.name === meal.name ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={() => setSelectedMeal(meal)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
        <span className="text-sm text-gray-500">{meal.time}</span>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold text-blue-600">
          {meal.calories} kcal
        </div>
        <div className="text-sm text-gray-500">{meal.notes}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 每日卡路里概览 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ChefHat className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              Daily Nutrition Plan
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            Based on {petInfo.name}'s profile
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Daily Calories</div>
            <div className="text-2xl font-bold text-blue-700">
              {dietPlan.dailyCalories} kcal
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 mb-1">Meals</div>
            <div className="text-2xl font-bold text-green-700">
              {dietPlan.meals.length} per day
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-orange-600 mb-1">Water</div>
            <div className="text-2xl font-bold text-orange-700">
              {Math.round(petInfo.weight * 60)} ml
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        {petInfo.healthIssues.length > 0 && (
          <div className="flex items-start p-4 bg-yellow-50 rounded-lg mb-6">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800">
                Special Dietary Considerations
              </h4>
              <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
              {petInfo.healthIssues.map(issue => (
                  <li key={issue} className="ml-4">
                    {issue === 'Weight management' && 'Reduced portion sizes and low-fat options'}
                    {issue === 'Joint problems' && 'Added supplements for joint health'}
                    {issue === 'Allergies' && 'Hypoallergenic ingredients only'}
                    {issue === 'Digestive issues' && 'Easy-to-digest ingredients and smaller portions'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 膳食时间表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dietPlan.meals.map(meal => (
            <MealCard key={meal.name} meal={meal} />
          ))}
        </div>
      </div>

      {/* 选中餐食的详细信息 */}
      {selectedMeal && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedMeal.name} Details
            </h3>
            <span className="text-sm text-gray-500">{selectedMeal.time}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Ingredients</h4>
              <ul className="space-y-2">
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Apple className="h-4 w-4 mr-2 text-green-500" />
                    <span>{ingredient.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({ingredient.amount})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Nutritional Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-medium">{selectedMeal.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-medium">
                    {Math.round(selectedMeal.calories * 0.3 / 4)}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-medium">
                    {Math.round(selectedMeal.calories * 0.4 / 4)}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats</span>
                  <span className="font-medium">
                    {Math.round(selectedMeal.calories * 0.3 / 9)}g
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Feeding Instructions
                </h4>
                <p className="mt-1 text-sm text-blue-700">
                  Serve at room temperature. Ensure fresh water is always available.
                  Monitor your pet's response to the meal and adjust portions if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietRecommendation;