import React from 'react';
import { Home, List, MessageCircle, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onAddListing?: () => void;
}

const navItems = [
  { key: 'home', label: 'Asosiy', icon: Home },
  { key: 'listings', label: 'E\'lonlarim', icon: List },
  { key: 'add', label: 'Qo\'shish', icon: Plus, isSpecial: true },
  { key: 'chat', label: 'Xabarlar', icon: MessageCircle, badge: 3 },
  { key: 'profile', label: 'Profil', icon: User },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentView, 
  onViewChange, 
  onAddListing 
}) => {
  const handleAddClick = () => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    if (onAddListing) {
      onAddListing();
    } else {
      // Fallback: listings sahifasiga o'tish
      onViewChange('listings');
    }
  };

  const handleNavClick = (key: string) => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    onViewChange(key);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 pb-2">
        <div className="relative flex justify-between items-center px-2 py-2 pb-safe">
          {/* Left nav items */}
          <div className="flex flex-1 justify-evenly">
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex flex-col items-center justify-center min-w-0 px-3 py-2 rounded-lg transition-all duration-200 transform active:scale-95 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      size={18} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
                    />
                  </div>
                  <span className={`text-[10px] mt-1 font-medium leading-none transition-all duration-200 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Center add button */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex justify-center items-center z-10">
            <button
              onClick={handleAddClick}
              className="flex flex-col items-center justify-center w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95 border-4 border-white dark:border-gray-800"
              style={{ marginBottom: '0.5rem' }}
            >
              <Plus size={28} strokeWidth={2.5} />
            </button>
          </div>
          {/* Right nav items */}
          <div className="flex flex-1 justify-evenly">
            {navItems.slice(3).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex flex-col items-center justify-center min-w-0 px-3 py-2 rounded-lg transition-all duration-200 transform active:scale-95 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      size={18} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium leading-none transition-all duration-200 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Safe area spacer for content */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default BottomNavigation;