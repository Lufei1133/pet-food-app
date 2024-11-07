import React, { useState } from 'react';
import { Brain, ChefHat, Heart, Activity, Scale, Apple, Pill } from 'lucide-react';
import Alert from './Alert';

const AiRecommendation = ({ petInfo }) => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  // 计算基础代谢率(BMR)
  const calculateBMR = (weight, age, type) => {
    const baseFactor = type === 'dog' ? 30 : 25;
    const ageFactor = age > 7 ? 0.8 : 1;
    return Math.round(weight * baseFactor * ageFactor);
  };

  // 计算每日卡路里需求
  const calculateDailyCalories = (bmr, activity) => {
    const activityMultipliers = {
      low: 1.2,
      moderate: 1.4,
      high: 1.6
    };
    return Math.round(bmr * activityMultipliers[activity]);
  };

  // 生成营养分配
  const generateNutritionBreakdown = (healthIssues) => {
    let breakdown = {
      protein: 30,
      fat: 20,
      carbs: 35,
      fiber: 10,
      vitamins: 5
    };

    if (healthIssues.includes('Weight management')) {
      breakdown.protein += 5;
      breakdown.fat -= 5;
    }

    if (healthIssues.includes('Joint problems')) {
      breakdown.protein += 3;
      breakdown.vitamins += 2;
      breakdown.carbs -= 5;
    }

    return breakdown;
  };

  // 生成膳食建议
  const generateMealPlan = (calories, healthIssues) => {
    const basePlan = {
      morning: {
        meal: "Fresh protein mix",
        portions: Math.round(calories * 0.4) + " kcal",
        ingredients: ["Lean meat", "Sweet potato", "Green vegetables"]
      },
      snack: {
        meal: "Healthy snack",
        portions: Math.round(calories * 0.1) + " kcal",
        ingredients: ["Apple slices", "Carrot sticks"]
      },
      evening: {
        meal: "Balanced nutrition blend",
        portions: Math.round(calories * 0.5) + " kcal",
        ingredients: ["Fish", "Brown rice", "Mixed vegetables"]
      }
    };

    // 根据健康问题调整
    if (healthIssues.includes('Weight management')) {
      basePlan.morning.ingredients = ["Lean chicken", "Green vegetables", "Pumpkin"];
      basePlan.evening.ingredients = ["White fish", "Cauliflower rice", "Green beans"];
      basePlan.snack.ingredients = ["Celery sticks", "Cucumber slices"];
    }

    if (healthIssues.includes('Joint problems')) {
      basePlan.supplements = ["Glucosamine", "Omega-3 fatty acids", "Chondroitin"];
    }

    return basePlan;
  };

  // 生成健康建议
  const generateHealthTips = (petInfo) => {
    const tips = [];
    
    if (petInfo.activity === 'low') {
      tips.push({
        title: "Exercise Recommendation",
        description: "Gradually increase daily activity with short walks or play sessions"
      });
    }

    if (petInfo.healthIssues.includes('Joint problems')) {
      tips.push({
        title: "Joint Care",
        description: "Include low-impact exercises and consider raised food bowls"
      });
    }

    if (petInfo.healthIssues.includes('Weight management')) {
      tips.push({
        title: "Weight Control",
        description: "Monitor portions carefully and weigh food to ensure accurate serving sizes"
      });
    }

    return tips;
  };

  const analyzeData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bmr = calculateBMR(petInfo.weight, petInfo.age, petInfo.type);
    const dailyCalories = calculateDailyCalories(bmr, petInfo.activity);
    const nutritionBreakdown = generateNutritionBreakdown(petInfo.healthIssues);
    const mealPlan = generateMealPlan(dailyCalories, petInfo.healthIssues);
    const healthTips = generateHealthTips(petInfo);
    
    setRecommendations({
      dailyCalories,
      nutritionBreakdown,
      mealPlan,
      healthTips
    });
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!recommendations && (
        <button
          onClick={analyzeData}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={loading}
        >
          <Brain className="h-5 w-5" />
          {loading ? "Analyzing..." : "Generate AI Recommendations"}
        </button>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI is analyzing {petInfo.name}'s profile...</p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
            </div>
          </div>
        </div>
      )}

      {recommendations && (
        <div className="space-y-8">
          {/* 每日卡路里 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Daily Caloric Needs
            </h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {recommendations.dailyCalories} kcal/day
            </div>
            <p className="text-gray-600">
              Calculated based on {petInfo.name}'s weight, age, and activity level
            </p>
          </div>

          {/* 营养分配 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Apple className="h-5 w-5 text-blue-600" />
              Nutrition Breakdown
            </h3>
            <div className="space-y-4">
              {Object.entries(recommendations.nutritionBreakdown).map(([nutrient, percentage]) => (
                <div key={nutrient}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 capitalize">{nutrient}</span>
                    <span className="text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 膳食计划 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-blue-600" />
              Personalized Meal Plan
            </h3>
            <div className="space-y-4">
              {Object.entries(recommendations.mealPlan).map(([time, meal]) => (
                time !== 'supplements' && (
                  <div key={time} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold capitalize">{time}</h4>
                    <p className="text-gray-800">{meal.meal}</p>
                    <p className="text-sm text-gray-600 mt-1">{meal.portions}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Ingredients:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {meal.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ))}
            </div>

            {recommendations.mealPlan.supplements && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Pill className="h-5 w-5" />
                  <h4 className="font-semibold">Recommended Supplements</h4>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  {recommendations.mealPlan.supplements.map((supplement, index) => (
                    <li key={index}>{supplement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 健康建议 */}
          <div className="space-y-4">
            {recommendations.healthTips.map((tip, index) => (
              <Alert
                key={index}
                title={tip.title}
                description={tip.description}
              >
                <Heart className="h-5 w-5 text-blue-500" />
              </Alert>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;