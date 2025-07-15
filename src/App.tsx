import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Properties from './components/Properties';
import Applications from './components/Applications';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import PropertyForm from './components/PropertyForm';
import LoginModal from './components/LoginModal';
import { useAuth } from './contexts/AuthContext';
import { Property } from './types';
import BottomNavigation from './components/BottomNavigation';
import PropertyCard from './components/PropertyCard';
import { mockProperties } from './data/mockData';

type AppView = 'home' | 'favorites' | 'add' | 'applications' | 'profile';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Barcha e'lonlar uchun mockData
  const allProperties = mockProperties || [];

  const handleViewChange = (view: string) => {
    setCurrentView(view as AppView);
    setShowPropertyForm(false);
    setEditingProperty(null);
    setSelectedProperty(null);
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
    // Save property logic here
    console.log('Saving property:', propertyData);
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Sahifalar uchun qisqacha interfeyslar
  const renderCurrentView = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Xonadon.uz
              </h1>
              <p className="text-gray-600 mb-8">
                Uy egalar uchun boshqaruv paneli
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Kirish
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Xonadonlaringizni boshqaring va arizalarni ko'ring
              </p>
            </div>
          </div>
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <div className="pb-20 max-w-md mx-auto px-1 pt-1">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Barcha xonadonlar</h2>
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {allProperties.map((property: Property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => setSelectedProperty(property)}
                  onApply={() => {}}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={() => handleToggleFavorite(property.id)}
                />
              ))}
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="pb-20 max-w-md mx-auto px-1 pt-1">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Saralanganlar</h2>
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {allProperties.filter((p: Property) => favorites.includes(p.id)).length === 0 ? (
                <div className="text-gray-400 text-center py-8 sm:py-12">Saralanganlar yo‘q</div>
              ) : (
                allProperties
                  .filter((property: Property) => favorites.includes(property.id))
                  .map((property: Property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={() => setSelectedProperty(property)}
                      onApply={() => {}}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={() => handleToggleFavorite(property.id)}
                    />
                  ))
              )}
            </div>
          </div>
        );
      case 'add':
        return (
          <div className="pb-20 max-w-md mx-auto px-1 pt-1">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Yangi e’lon berish</h2>
            <PropertyForm
              property={editingProperty || undefined}
              isOpen={true}
              onClose={() => setEditingProperty(null)}
              onSave={handleSaveProperty}
            />
          </div>
        );
      case 'applications':
        return (
          <div className="pb-20 max-w-md mx-auto px-1 pt-1">
            <Applications />
          </div>
        );
      case 'profile':
        return (
          <div className="pb-20 max-w-md mx-auto px-1 pt-1">
            <Profile />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Headerni olib tashladim, mobil ilova uchun kerak emas */}
      {renderCurrentView()}
      <BottomNavigation currentView={currentView} onViewChange={handleViewChange} />
      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;