import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import BottomNavigation from './components/BottomNavigation';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Properties from './components/Properties';
import Applications from './components/Applications';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import PropertyForm from './components/PropertyForm';
import LoginModal from './components/LoginModal';
import { useAuth } from './contexts/AuthContext';
import { Property } from './types';
import { Home, Building, FileText, BarChart3, User } from 'lucide-react';

type AppView = 'dashboard' | 'properties' | 'applications' | 'analytics' | 'profile';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleViewChange = (view: string) => {
    setCurrentView(view as AppView);
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowPropertyForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleSaveProperty = (propertyData: any) => {
    console.log('Saving property:', propertyData);
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  const renderCurrentView = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Xonadon.uz
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Uy egalar uchun boshqaruv paneli
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Kirish
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Xonadonlaringizni boshqaring va arizalarni ko'ring
              </p>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onAddProperty={handleAddProperty} onEditProperty={handleEditProperty} />;
      case 'properties':
        return <Properties onAddProperty={handleAddProperty} onEditProperty={handleEditProperty} />;
      case 'applications':
        return <Applications />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onAddProperty={handleAddProperty} onEditProperty={handleEditProperty} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navbar - Always visible when logged in */}
      {user && (
        <Navbar />
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Sidebar */}
        <div className={`w-72 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen fixed left-0 ${user ? 'top-16' : 'top-0'} transition-all duration-300`}>
          <div className="p-5">
            {/* Navigation */}
            <div className="space-y-1">
              <button
                onClick={() => handleViewChange('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'dashboard' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Home size={16} />
                Boshqaruv paneli
              </button>
              <button
                onClick={() => handleViewChange('properties')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'properties' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Building size={16} />
                Mening xonadonlarim
              </button>
              <button
                onClick={() => handleViewChange('applications')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'applications' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <FileText size={16} />
                Arizalar
                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                  5
                </span>
              </button>
              <button
                onClick={() => handleViewChange('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'analytics' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 size={16} />
                Statistika
              </button>
              <button
                onClick={() => handleViewChange('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'profile' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <User size={16} />
                Profil
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 ml-72">
          <div className="min-h-screen">
            {renderCurrentView()}
          </div>
        </div>
      </div>
      
      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden">
        <BottomNavigation 
          currentView={currentView} 
          onViewChange={handleViewChange}
          onAddProperty={handleAddProperty}
        />
        <div className="pb-24 pb-safe">
          {renderCurrentView()}
        </div>
      </div>
      
      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      {showPropertyForm && (
        <PropertyForm
          property={editingProperty || undefined}
          isOpen={showPropertyForm}
          onClose={() => {
            setShowPropertyForm(false);
            setEditingProperty(null);
          }}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;