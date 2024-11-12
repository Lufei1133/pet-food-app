import React, { useState } from 'react';
import {
  Apple, ChevronLeft, Coffee, Utensils,
  Moon, Edit, CheckCircle, Plus, X
} from 'lucide-react';

const DietRecommendation = ({ petInfo, onBack }) => {
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealPlan, setMealPlan] = useState([
    {
      id: 1,
      type: 'Breakfast',
      icon: Coffee,
      color: 'amber',
      meal: 'Whole grain bread with eggs and vegetables',
      completed: false
    },
    {
      id: 2,
      type: 'Lunch',
      icon: Utensils,
      color: 'emerald',
      meal: 'Mixed salad with grilled chicken breast',
      completed: false
    },
    {
      id: 3,
      type: 'Dinner',
      icon: Utensils,
      color: 'blue',
      meal: 'Grilled fish with quinoa and steamed vegetables',
      completed: false
    },
    {
      id: 4,
      type: 'Snack',
      icon: Apple,
      color: 'rose',
      meal: 'A piece of fruit or a handful of nuts',
      completed: false
    }
  ]);

  // 计算进度
  const progress =
      (mealPlan.filter(meal => meal.completed).length / mealPlan.length) * 100;

  // 切换完成状态
  const toggleComplete = (id) => {
    setMealPlan(mealPlan.map(meal =>
        meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  // 修改餐点内容
  const handleEdit = (meal) => {
    setEditingMeal({ ...meal });
  };

  // 保存修改
  const handleSave = () => {
    if (editingMeal) {
      setMealPlan(mealPlan.map(meal =>
          meal.id === editingMeal.id ? editingMeal : meal
      ));
      setEditingMeal(null);
    }
  };

  // 餐点卡片组件
  const MealCard = ({ meal }) => (
      <div className="bg-white border-2 border-gray-100 p-4 rounded-xl mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
                onClick={() => toggleComplete(meal.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${meal.completed
                    ? `bg-${meal.color}-500 border-${meal.color}-500`
                    : `border-${meal.color}-500`
                }`}
            >
              {meal.completed && (
                  <CheckCircle className="w-4 h-4 text-white" />
              )}
            </button>

            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <meal.icon className={`w-5 h-5 mr-2 text-${meal.color}-500`} />
                <h3 className="font-medium text-gray-900">
                  {meal.type}:
                </h3>
              </div>
              <p className="text-gray-600 mt-1">{meal.meal}</p>
            </div>
          </div>

          <button
              onClick={() => handleEdit(meal)}
              className={`p-2 rounded-full hover:bg-${meal.color}-50`}
          >
            <Edit className={`w-4 h-4 text-${meal.color}-500`} />
          </button>
        </div>
      </div>
  );

  // 编辑表单组件
  const EditForm = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Edit Meal</h3>
            <button onClick={() => setEditingMeal(null)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meal Type</label>
              <input
                  type="text"
                  value={editingMeal?.type || ''}
                  onChange={e => setEditingMeal({
                    ...editingMeal,
                    type: e.target.value
                  })}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                  value={editingMeal?.meal || ''}
                  onChange={e => setEditingMeal({
                    ...editingMeal,
                    meal: e.target.value
                  })}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-2"
                  rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                  onClick={() => setEditingMeal(null)}
                  className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
  );

  return (
      <div className="max-w-2xl mx-auto p-4">
        {/* Back button */}
        <button
            onClick={onBack}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>

        {/* Header Card with Progress */}
        <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Diet Recommendation</h1>
                <p className="text-white/80">Your personalized nutrition guide</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
              <p className="text-white/80">Completed</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Daily Meal Plan */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-6">
          <h2 className="text-xl font-semibold text-green-500 p-6 pb-4">
            Daily Meal Plan
          </h2>
          <div className="p-4">
            {mealPlan.map(meal => (
                <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>

        {/* Nutrition Tips */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <h2 className="text-xl font-semibold text-blue-500 p-6 pb-4">
            Nutrition Tips
          </h2>
          <div className="p-6 pt-0 space-y-4">
            {[
              "Drink at least 8 glasses of water daily",
              "Include a variety of colorful vegetables in your meals",
              "Choose lean proteins like fish, chicken, and legumes",
              "Limit processed foods and added sugars"
            ].map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-gray-600">{tip}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {editingMeal && <EditForm />}
      </div>
  );
};

export default DietRecommendation;