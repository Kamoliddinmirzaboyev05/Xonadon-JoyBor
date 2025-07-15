import React from 'react';
import { Home, Heart, PlusCircle, FileText, User } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { key: 'home', label: 'Bosh sahifa', icon: Home },
  { key: 'favorites', label: 'Saralanganlar', icon: Heart },
  { key: 'add', label: 'E’lon berish', icon: PlusCircle },
  { key: 'applications', label: 'Arizalar', icon: FileText },
  { key: 'profile', label: 'Profil', icon: User },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-between items-center px-0 py-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              className={`flex flex-col items-center flex-1 py-1 sm:py-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              style={{ minWidth: 0 }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 2} fill={isActive ? '#2563eb' : 'none'} />
              <span className="text-[10px] sm:text-xs mt-0.5 font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 