import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import BottomNavigation from './components/BottomNavigation';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyListings from './components/MyListings';
import Chat from './components/Chat';
import Profile from './components/Profile';
import ListingForm from './components/ListingForm';
import ListingDetails from './components/ListingDetails';
import LoginModal from './components/LoginModal';
import { useAuth } from './contexts/AuthContext';
import { Property } from './types';
import { Home as HomeIcon, MessageCircle, Plus, User, List } from 'lucide-react';

type AppView = 'home' | 'listings' | 'chat' | 'profile';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showListingForm, setShowListingForm] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Property | null>(null);
  const [editingListing, setEditingListing] = useState<Property | null>(null);

  const handleViewChange = (view: string) => {
    setCurrentView(view as AppView);
    setShowListingForm(false);
    setEditingListing(null);
    setSelectedListing(null);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleAddListing = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setEditingListing(null);
    setShowListingForm(true);
  };

  const handleEditListing = (listing: Property) => {
    setEditingListing(listing);
    setShowListingForm(true);
  };

  const handleSaveListing = (listingData: any) => {
    console.log('Saving listing:', listingData);
    setShowListingForm(false);
    setEditingListing(null);
  };

  const handleViewListing = (listing: Property) => {
    setSelectedListing(listing);
  };

  const handleContactSeller = (listing: Property) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Navigate to chat with this listing's owner
    setCurrentView('chat');
    // TODO: Initialize chat with the listing owner
  };

  const renderCurrentView = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Joy Bor
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Ijara uchun xonadonlar platformasi
              </p>
              <button
                onClick={handleLoginClick}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Kirish
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                E'lon berish va xabar almashuv uchun
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedListing) {
      return (
        <ListingDetails
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onContact={handleContactSeller}
        />
      );
    }

    switch (currentView) {
      case 'home':
        return <Home onViewListing={handleViewListing} onContact={handleContactSeller} />;
      case 'listings':
        return <MyListings onAddListing={handleAddListing} onEditListing={handleEditListing} />;
      case 'chat':
        return <Chat />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onViewListing={handleViewListing} onContact={handleContactSeller} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      {/* Navbar - Always visible when logged in */}
      {user && <Navbar />}

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Sidebar */}
        <div className={`w-72 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen fixed left-0 ${user ? 'top-16' : 'top-0'} transition-all duration-300`}>
          <div className="p-5">
            {/* Navigation */}
            <div className="space-y-1">
              <button
                onClick={() => handleViewChange('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'home' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <HomeIcon size={16} />
                Asosiy sahifa
              </button>
              <button
                onClick={() => handleViewChange('listings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'listings' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <List size={16} />
                E'lonlarim
              </button>
              <button
                onClick={() => handleViewChange('chat')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm ${
                  currentView === 'chat' 
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <MessageCircle size={16} />
                Xabarlar
                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                  3
                </span>
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
          <div className="flex-1">
            {renderCurrentView()}
          </div>
        </div>
      </div>
      
      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden flex-1 flex flex-col">
        <BottomNavigation 
          currentView={currentView} 
          onViewChange={handleViewChange}
          onAddListing={handleAddListing}
        />
        <div className="flex-1 pb-20 pb-safe">
          {renderCurrentView()}
        </div>
      </div>
      
      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      {showListingForm && (
        <ListingForm
          listing={editingListing || undefined}
          isOpen={showListingForm}
          onClose={() => {
            setShowListingForm(false);
            setEditingListing(null);
          }}
          onSave={handleSaveListing}
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