import React, { useState, useEffect } from 'react';
import {
  Activity,
  ChevronLeft,
  CheckCircle,
  Edit,
  Plus,
  X,
  Save,
  Clock
} from 'lucide-react';

const ExercisePlan = ({ petInfo, onBack }) => {  // 添加 onBack prop
  // 运动计划状态
  const [exercises, setExercises] = useState([
    {
      id: 1,
      day: 'Monday',
      activities: '30 min cardio, 20 min strength training',
      completed: false,
      color: 'pink',
      timeSpent: 0
    },
    {
      id: 2,
      day: 'Wednesday',
      activities: '45 min swimming',
      completed: false,
      color: 'blue',
      timeSpent: 0
    },
    {
      id: 3,
      day: 'Friday',
      activities: '1 hour yoga',
      completed: false,
      color: 'green',
      timeSpent: 0
    },
    {
      id: 4,
      day: 'Sunday',
      activities: '1 hour outdoor jogging',
      completed: false,
      color: 'yellow',
      timeSpent: 0
    }
  ]);

  const [editingExercise, setEditingExercise] = useState(null);
  const [progress, setProgress] = useState(0);

  // 定时器状态
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 定时器效果
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // 更新完成状态
  const toggleComplete = (id) => {
    setExercises(exercises.map(ex =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
    updateProgress();
  };

  // 更新总体进度
  const updateProgress = () => {
    const completed = exercises.filter(ex => ex.completed).length;
    setProgress((completed / exercises.length) * 100);
  };

  // 编辑运动计划
  const handleEdit = (exercise) => {
    setEditingExercise({ ...exercise });
  };

  // 保存编辑
  const handleSave = () => {
    if (editingExercise) {
      setExercises(exercises.map(ex =>
          ex.id === editingExercise.id ? editingExercise : ex
      ));
      setEditingExercise(null);
    }
  };

  // 开始/停止计时器
  const toggleTimer = (id) => {
    if (activeTimer === id && timerRunning) {
      setTimerRunning(false);
      setActiveTimer(null);
      setExercises(exercises.map(ex =>
          ex.id === id ? { ...ex, timeSpent: ex.timeSpent + elapsedTime } : ex
      ));
      setElapsedTime(0);
    } else {
      setTimerRunning(true);
      setActiveTimer(id);
      setElapsedTime(0);
    }
  };

  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Exercise Card 组件
  const ExerciseCard = ({ exercise }) => (
      <div className={`bg-white p-4 rounded-xl border-2 border-${exercise.color}-100 mb-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
                onClick={() => toggleComplete(exercise.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${exercise.completed
                    ? `bg-${exercise.color}-500 border-${exercise.color}-500`
                    : `border-${exercise.color}-500`
                }`}
            >
              {exercise.completed && (
                  <CheckCircle className="w-4 h-4 text-white" />
              )}
            </button>

            <div className="ml-3 flex-1">
              <h3 className="font-medium text-gray-900">
                {exercise.day}:
              </h3>
              <p className="text-gray-600">{exercise.activities}</p>
              {exercise.timeSpent > 0 && (
                  <p className="text-sm text-gray-500">
                    Total time: {formatTime(exercise.timeSpent)}
                  </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
                onClick={() => toggleTimer(exercise.id)}
                className={`p-2 rounded-full ${
                    activeTimer === exercise.id && timerRunning
                        ? `bg-${exercise.color}-200`
                        : `bg-${exercise.color}-100`
                }`}
            >
              <Clock className={`w-4 h-4 text-${exercise.color}-500`} />
            </button>

            <button
                onClick={() => handleEdit(exercise)}
                className={`p-2 rounded-full bg-${exercise.color}-100`}
            >
              <Edit className={`w-4 h-4 text-${exercise.color}-500`} />
            </button>
          </div>
        </div>

        {activeTimer === exercise.id && timerRunning && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`bg-${exercise.color}-500 h-2 rounded-full`}
                    style={{ width: `${(elapsedTime / 60) * 100}%` }}
                />
              </div>
              <p className="text-sm text-center mt-1">{formatTime(elapsedTime)}</p>
            </div>
        )}
      </div>
  );

  // 编辑表单组件
  const EditForm = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Edit Exercise</h3>
            <button onClick={() => setEditingExercise(null)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Day</label>
              <input
                  type="text"
                  value={editingExercise?.day || ''}
                  onChange={e => setEditingExercise({
                    ...editingExercise,
                    day: e.target.value
                  })}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Activities</label>
              <textarea
                  value={editingExercise?.activities || ''}
                  onChange={e => setEditingExercise({
                    ...editingExercise,
                    activities: e.target.value
                  })}
                  className="mt-1 block w-full rounded-xl border border-gray-300 p-2"
                  rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                  onClick={() => setEditingExercise(null)}
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
            onClick={onBack}  // 使用 onBack prop 而不是 window.history.back()
            className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>

        {/* Header Card with Progress */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">Exercise Plan</h1>
                <p className="text-white/80">Your personalized fitness journey</p>
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

        {/* Exercise List */}
        <div className="space-y-2">
          {exercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>

        {/* Add Exercise Button */}
        <button
            onClick={() => setEditingExercise({ id: Date.now(), day: '', activities: '', completed: false, color: 'pink', timeSpent: 0 })}
            className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Exercise
        </button>

        {/* Exercise Tips */}
        <div className="mt-6 bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <h2 className="text-xl font-semibold text-purple-500 p-6 pb-4">
            Exercise Tips
          </h2>
          <div className="p-6 pt-0 space-y-4">
            {[
              "Always warm up before exercising to prevent injuries",
              "Stay hydrated by drinking water before, during, and after workouts",
              "Listen to your body and rest when needed",
              "Gradually increase intensity and duration of workouts"
            ].map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="text-gray-600">{tip}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {editingExercise && <EditForm />}
      </div>
  );
};

export default ExercisePlan;