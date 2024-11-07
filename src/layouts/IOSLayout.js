// src/layouts/IOSLayout.js
export const IOSLayout = ({ children }) => {
    return (
      <div className="
        min-h-screen bg-[#F2F2F7]
        pt-[calc(env(safe-area-inset-top)+48px)]
        pb-[calc(env(safe-area-inset-bottom)+83px)]
      ">
        {children}
      </div>
    );
  };
  
  // src/components/ios/TabBar.js
  export const IOSTabBar = ({ tabs, activeTab, onChange }) => {
    return (
      <div className="
        fixed bottom-0 left-0 right-0
        h-[83px] pb-safe-bottom
        bg-white/80 backdrop-blur-xl
        border-t border-gray-200/50
        flex items-stretch
        z-50
      ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex-1 flex flex-col items-center justify-center
              pt-2 pb-safe-bottom
              ${activeTab === tab.id ? 'text-[#007AFF]' : 'text-gray-500'}
            `}
          >
            <tab.icon className="h-6 w-6 mb-1" />
            <span className="text-[10px]">{tab.name}</span>
          </button>
        ))}
      </div>
    );
  };