import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Camera, MapPin, Calendar, 
  Users, Filter, Search, Video, Image as ImageIcon, Star
} from 'lucide-react';

const PetSocial = ({ petInfo }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // 宠物配对推荐数据
  const [matchSuggestions] = useState([
    {
      id: 1,
      name: "Luna",
      breed: "Golden Retriever",
      age: 2,
      distance: "1.5 km",
      image: "/api/placeholder/100/100",
      interests: ["Playing fetch", "Swimming", "Park walks"],
      compatibilityScore: 95
    },
    {
      id: 2,
      name: "Charlie",
      breed: "Labrador",
      age: 3,
      distance: "2.8 km",
      image: "/api/placeholder/100/100",
      interests: ["Ball games", "Beach walks", "Dog parks"],
      compatibilityScore: 88
    }
  ]);

  // 活动数据
  const [events] = useState([
    {
      id: 1,
      title: "Weekend Dog Park Meetup",
      date: "2024-02-20",
      time: "15:00",
      location: "Central Park Dog Run",
      attendees: 12,
      description: "Join us for a fun afternoon at the dog park! All friendly dogs welcome.",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Pet Photography Session",
      date: "2024-02-25",
      time: "10:00",
      location: "Sunset Beach",
      attendees: 8,
      description: "Professional pet photographer will be taking free photos!",
      image: "/api/placeholder/400/200"
    }
  ]);

  // 社交帖子数据
  const [posts] = useState([
    {
      id: 1,
      author: "Max's Mom",
      petName: "Max",
      content: "Amazing day at the beach! 🐾",
      image: "/api/placeholder/400/300",
      likes: 24,
      comments: 5,
      location: "Sunny Beach",
      timestamp: "2 hours ago",
      type: "image"
    },
    {
      id: 2,
      author: "Charlie's Dad",
      petName: "Charlie",
      content: "First time trying agility training! 🏃‍♂️",
      video: "/api/placeholder/400/300",
      likes: 18,
      comments: 3,
      timestamp: "1 day ago",
      type: "video"
    }
  ]);

  // 宠物配对卡片组件
  const MatchCard = ({ match }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <img 
          src={match.image} 
          alt={match.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{match.name}</h3>
          <p className="text-sm text-gray-500">{match.breed}, {match.age} years</p>
          <p className="text-sm text-gray-500">{match.distance} away</p>
          <div className="mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm">{match.compatibilityScore}% match</span>
            </div>
          </div>
        </div>
        <button className="p-2 text-pink-500 hover:bg-pink-50 rounded-full">
          <Heart className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {match.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <button className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Connect
      </button>
    </div>
  );

  // 活动卡片组件
  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <div className="flex items-center text-gray-500 mt-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center text-gray-500 mt-1">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.attendees} attending</span>
        </div>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Join Event
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Share
          </button>
        </div>
      </div>
    </div>
  );

  // 新建帖子模态框
  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Post</h3>
          <button 
            onClick={() => setShowNewPostModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <textarea
            placeholder="What's on your pet's mind?"
            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <ImageIcon className="h-5 w-5 mr-2" />
              Add Photo
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Video className="h-5 w-5 mr-2" />
              Add Video
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Add Location
            </button>
          </div>
          <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Post
          </button>
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
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'feed' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'matching' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              Pet Matching
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              Events
            </button>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Camera className="h-5 w-5 mr-2" />
            New Post
          </button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="space-y-6">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center mb-4">
                  <img
                    src="/api/placeholder/40/40"
                    alt={post.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{post.author}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      {post.location && (
                        <>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="mr-2">{post.location}</span>
                        </>
                      )}
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                {post.type === 'image' ? (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="rounded-lg mb-4 w-full"
                  />
                ) : (
                  <video
                    src={post.video}
                    controls
                    className="rounded-lg mb-4 w-full"
                  />
                )}
                <div className="flex items-center justify-between text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Matching Tab */}
        {activeTab === 'matching' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Suggested Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchSuggestions.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <button 
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Event
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* 模态框 */}
      {showNewPostModal && <NewPostModal />}
    </div>
  );
};

export default PetSocial;