// src/components/ios/Button.js
export const IOSButton = ({ children, variant = 'filled', ...props }) => {
    return (
      <button
        className={`
          px-6 py-3 rounded-full font-semibold text-[17px]
          transition-all duration-200 active:scale-95
          ${variant === 'filled' 
            ? 'bg-[#007AFF] text-white active:bg-[#0051FF]' 
            : 'bg-transparent text-[#007AFF] active:bg-[#007AFF1A]'}
          focus:outline-none
        `}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  // src/components/ios/Card.js
  export const IOSCard = ({ children, large = false }) => {
    return (
      <div className={`
        bg-white/95 backdrop-blur-xl
        ${large ? 'rounded-[24px]' : 'rounded-[16px]'}
        shadow-sm p-6
        transition-all duration-300
        active:scale-[0.98]
      `}>
        {children}
      </div>
    );
  };
  
  // src/components/ios/NavigationBar.js
  export const IOSNavigationBar = ({ title, leftButton, rightButton }) => {
    return (
      <div className="
        fixed top-0 left-0 right-0 
        h-[48px] pt-safe-top
        bg-white/80 backdrop-blur-xl
        border-b border-gray-200/50
        z-50
      ">
        <div className="flex justify-between items-center h-full px-4">
          <div className="w-24">{leftButton}</div>
          <h1 className="text-[17px] font-semibold">{title}</h1>
          <div className="w-24 flex justify-end">{rightButton}</div>
        </div>
      </div>
    );
  };