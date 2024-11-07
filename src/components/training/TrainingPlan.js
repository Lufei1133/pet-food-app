import React, { useState } from 'react';
import {
  PlayCircle, Calendar, Trophy, Target, Clock,
  CheckCircle, Star, Video, BookOpen, BarChart,
  Plus, X, ArrowRight
} from 'lucide-react';

const TrainingPlan = ({ petInfo }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [showAddSession, setShowAddSession] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  // 训练课程数据
  const [trainingSessions] = useState([
    {
      id: 1,
      name: "Basic Obedience",
      description: "Learn fundamental commands like sit, stay, and come",
      duration: "30 min",
      level: "beginner",
      progress: 60,
      nextSession: "2024-02-15",
      completed: 3,
      total: 5,
      instructor: "Sarah Wilson",
      schedule: "Mon, Wed, Fri",
      achievements: [
        { id: 1, name: "First Command", date: "2024-01-10", icon: "Star" },
        { id: 2, name: "Perfect Sit", date: "2024-01-15", icon: "Trophy" }
      ],
      lessons: [
        {
          id: 1,
          title: "Sit Command",
          status: "completed",
          date: "2024-01-10"
        },
        {
          id: 2,
          title: "Stay Command",
          status: "completed",
          date: "2024-01-12"
        },
        {
          id: 3,
          title: "Come Command",
          status: "completed",
          date: "2024-01-14"
        },
        {
          id: 4,
          title: "Heel Command",
          status: "in-progress",
          date: "2024-01-16"
        },
        {
          id: 5,
          title: "Leave It Command",
          status: "upcoming",
          date: "2024-01-18"
        }
      ]
    },
    {
      id: 2,
      name: "Agility Training",
      description: "Introduction to basic agility obstacles and courses",
      duration: "45 min",
      level: "intermediate",
      progress: 30,
      nextSession: "2024-02-16",
      completed: 2,
      total: 6,
      instructor: "Mike Brown",
      schedule: "Tue, Thu",
      achievements: [
        { id: 1, name: "Jump Master", date: "2024-01-20", icon: "Trophy" }
      ],
      lessons: [
        {
          id: 1,
          title: "Jump Introduction",
          status: "completed",
          date: "2024-01-20"
        },
        {
          id: 2,
          title: "Tunnel Training",
          status: "completed",
          date: "2024-01-22"
        },
        {
          id: 3,
          title: "Weave Poles",
          status: "in-progress",
          date: "2024-01-24"
        }
      ]
    }
  ]);

  // 训练资源库
  const [trainingResources] = useState([
    {
      id: 1,
      type: "video",
      title: "Basic Obedience Training Guide",
      duration: "15 min",
      instructor: "Sarah Wilson",
      thumbnail: "/api/placeholder/300/200",
      description: "Learn the fundamentals of dog obedience training"
    },
    {
      id: 2,
      type: "guide",
      title: "Puppy Training Handbook",
      pages: 25,
      author: "Dr. James Smith",
      description: "Comprehensive guide for training puppies"
    }
  ]);

  // 新增训练课程模态框
  const AddSessionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Training Session</h3>
          <button 
            onClick={() => setShowAddSession(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Training Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Basic Obedience</option>
              <option>Agility Training</option>
              <option>Behavior Modification</option>
              <option>Trick Training</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Schedule</label>
            <div className="mt-1 grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <button
                  key={day}
                  type="button"
                  className="p-2 text-sm border rounded-md hover:bg-blue-50 hover:border-blue-500 focus:outline-none"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              min="15"
              step="15"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Goals</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="What do you want to achieve?"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddSession(false)}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // 训练课程卡片
  const TrainingSessionCard = ({ session }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{session.name}</h3>
          <p className="text-gray-600 mt-1">{session.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          session.level === 'beginner' ? 'bg-green-100 text-green-800' :
          session.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {session.level}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {session.duration}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {session.schedule}
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            {session.completed}/{session.total} completed
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{session.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${session.progress}%` }}
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Lessons</h4>
          <div className="space-y-2">
            {session.lessons.slice(0, 3).map(lesson => (
              <div
                key={lesson.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center">
                  <CheckCircle className={`w-4 h-4 mr-2 ${
                    lesson.status === 'completed' ? 'text-green-500' :
                    lesson.status === 'in-progress' ? 'text-yellow-500' :
                    'text-gray-300'
                  }`} />
                  <span>{lesson.title}</span>
                </div>
                <span className="text-gray-500">{lesson.date}</span>
              </div>
            ))}
          </div>
        </div>

        {session.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Achievements</h4>
            <div className="flex space-x-2">
              {session.achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className="flex items-center px-2 py-1 bg-yellow-50 rounded-full"
                >
                  <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-xs text-yellow-800">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 训练资源卡片
  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-4">
        {resource.type === 'video' ? (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold">{resource.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            {resource.type === 'video' ? (
              <>
                <Clock className="w-4 h-4 mr-1" />
                <span>{resource.duration}</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{resource.pages} pages</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 顶部操作栏 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'current' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Current Training
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'resources' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Resources
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'progress' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <BarChart className="w-5 h-5 mr-2" />
              Progress
            </button>
          </div>
          <button
            onClick={() => setShowAddSession(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Training
          </button>
        </div>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <PlayCircle className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Active Courses</p>
              <p className="text-xl font-bold">{trainingSessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Completed Lessons</p>
              <p className="text-xl font-bold">
                {trainingSessions.reduce((acc, session) => 
                  acc + session.lessons.filter(lesson => lesson.status === 'completed').length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Achievements</p>
              <p className="text-xl font-bold">
                {trainingSessions.reduce((acc, session) => 
                  acc + session.achievements.length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-xl font-bold">
                {Math.round(
                  trainingSessions.reduce((acc, session) => acc + session.progress, 0) / 
                  trainingSessions.length
                )}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="space-y-6">
        {/* 当前训练 */}
        {activeTab === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingSessions.map(session => (
              <TrainingSessionCard key={session.id} session={session} />
            ))}
          </div>
        )}

        {/* 训练资源 */}
        {activeTab === 'resources' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Recommended Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Training Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trainingResources
                  .filter(resource => resource.type === 'video')
                  .map(video => (
                    <div key={video.id} className="relative">
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="mt-2 font-medium">{video.title}</h3>
                      <p className="text-sm text-gray-500">{video.duration}</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}

        {/* 训练进度 */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Training Progress</h2>
              <div className="space-y-6">
                {trainingSessions.map(session => (
                  <div key={session.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{session.name}</h3>
                      <span className="text-sm text-gray-500">
                        {session.completed}/{session.total} completed
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
                        <div className="space-y-2">
                          {session.achievements.map(achievement => (
                            <div
                              key={achievement.id}
                              className="flex items-center text-sm"
                            >
                              <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                              <span>{achievement.name}</span>
                              <span className="ml-auto text-gray-500">
                                {achievement.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Next Steps</h4>
                        <div className="space-y-2">
                          {session.lessons
                            .filter(lesson => lesson.status !== 'completed')
                            .slice(0, 3)
                            .map(lesson => (
                              <div
                                key={lesson.id}
                                className="flex items-center text-sm"
                              >
                                <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                                <span>{lesson.title}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 模态框 */}
      {showAddSession && <AddSessionModal />}
    </div>
  );
};

export default TrainingPlan;