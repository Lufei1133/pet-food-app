import React, { useState } from 'react';
import { 
  Activity, Clock, Calendar, PlayCircle, 
  CheckCircle, AlertCircle, BarChart2, Flag 
} from 'lucide-react';

const ExercisePlan = ({ petInfo }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activities, setActivities] = useState({
    Monday: [
      {
        id: 1,
        name: 'Morning Walk',
        duration: 30,
        intensity: 'moderate',
        completed: false,
        time: '08:00',
        notes: 'Regular route through the park'
      },
      {
        id: 2,
        name: 'Evening Play',
        duration: 20,
        intensity: 'high',
        completed: false,
        time: '17:00',
        notes: 'Fetch and agility training'
      }
    ],
    // ... 其他天的活动
  });

  const [activityStats, setActivityStats] = useState({
    weeklyGoal: 180, // 分钟
    completed: 120,
    averageIntensity: 'moderate',
    streak: 5
  });

  // 添加新活动
  const AddActivityForm = () => {
    const [newActivity, setNewActivity] = useState({
      name: '',
      duration: 30,
      intensity: 'moderate',
      time: '09:00',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const activity = {
        ...newActivity,
        id: Date.now(),
        completed: false
      };

      setActivities(prev => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), activity]
      }));
      setShowAddActivity(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Activity Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newActivity.name}
                onChange={e => setNewActivity({...newActivity, name: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (min)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newActivity.duration}
                  onChange={e => setNewActivity({...newActivity, duration: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newActivity.time}
                  onChange={e => setNewActivity({...newActivity, time: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Intensity</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newActivity.intensity}
                onChange={e => setNewActivity({...newActivity, intensity: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newActivity.notes}
                onChange={e => setNewActivity({...newActivity, notes: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddActivity(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Activity
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 渲染进度统计
  const ProgressStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Flag className="h-5 w-5 text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-500">Weekly Goal</h4>
          </div>
          <span className="text-lg font-bold">{activityStats.weeklyGoal} min</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-500">Completed</h4>
          </div>
          <span className="text-lg font-bold">{activityStats.completed} min</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-orange-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-500">Avg Intensity</h4>
          </div>
          <span className="text-lg font-bold capitalize">{activityStats.averageIntensity}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 text-purple-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-500">Active Streak</h4>
          </div>
          <span className="text-lg font-bold">{activityStats.streak} days</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Exercise Plan</h2>
        <button
          onClick={() => setShowAddActivity(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Add Activity
        </button>
      </div>

      <ProgressStats />

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* 周计划导航 */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* 活动列表 */}
        <div className="space-y-4">
          {activities[selectedDay]?.map(activity => (
            <div key={activity.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => {
                      setActivities(prev => ({
                        ...prev,
                        [selectedDay]: prev[selectedDay].map(a =>
                          a.id === activity.id ? {...a, completed: !a.completed} : a
                        )
                      }));
                    }}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <h3 className="ml-3 font-medium">{activity.name}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {activity.time}
                  </span>
                  <span className="text-sm text-gray-500">{activity.duration} min</span>
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                    activity.intensity === 'high' ? 'bg-red-100 text-red-800' :
                    activity.intensity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.intensity}
                  </span>
                </div>
              </div>
              {activity.notes && (
                <p className="mt-2 text-sm text-gray-600 ml-7">{activity.notes}</p>
              )}
            </div>
          ))}

          {(!activities[selectedDay] || activities[selectedDay].length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No activities planned for this day.</p>
              <button
                onClick={() => setShowAddActivity(true)}
                className="mt-2 text-blue-500 hover:text-blue-600"
              >
                Add an activity
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddActivity && <AddActivityForm />}
    </div>
  );
};

export default ExercisePlan;