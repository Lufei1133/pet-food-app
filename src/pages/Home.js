// src/pages/Home.js
export const Home = () => {
    const [activeTab, setActiveTab] = useState('home');
  
    return (
      <>
        <IOSNavigationBar 
          title="PawEmbrace"
          rightButton={
            <button className="text-[#007AFF] text-[17px]">
              Edit
            </button>
          }
        />
  
        <IOSLayout>
          {/* 状态概览 */}
          <div className="px-6 mb-8">
            <h2 className="text-[28px] font-bold mb-6">
              Hello, {petInfo.name}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <IOSCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-[13px]">Health Score</p>
                    <p className="text-[28px] font-semibold text-[#34C759]">
                      95
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#34C759]/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#34C759]" />
                  </div>
                </div>
              </IOSCard>
              
              <IOSCard>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-[13px]">Activity</p>
                    <p className="text-[28px] font-semibold text-[#007AFF]">
                      85%
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#007AFF]" />
                  </div>
                </div>
              </IOSCard>
            </div>
          </div>
  
          {/* 今日任务 */}
          <div className="px-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[22px] font-bold">Today's Tasks</h3>
              <button className="text-[#007AFF] text-[17px]">See All</button>
            </div>
  
            <IOSCard large>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${task.completed 
                        ? 'bg-[#34C759]/10 text-[#34C759]' 
                        : 'bg-gray-100 text-gray-400'}
                    `}>
                      {task.completed ? <Check /> : <Clock />}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-[17px] font-medium">{task.title}</p>
                      <p className="text-[15px] text-gray-500">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </IOSCard>
          </div>
  
          {/* 快速操作 */}
          <div className="px-6">
            <h3 className="text-[22px] font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <IOSButton variant="filled">
                Book Appointment
              </IOSButton>
              <IOSButton variant="outlined">
                Chat with AI
              </IOSButton>
            </div>
          </div>
        </IOSLayout>
  
        <IOSTabBar 
          tabs={[
            { id: 'home', name: 'Home', icon: Home },
            { id: 'health', name: 'Health', icon: Heart },
            { id: 'training', name: 'Training', icon: Activity },
            { id: 'profile', name: 'Profile', icon: User },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </>
    );
  };