import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  Star,
  MapPin,
  MoreVertical,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';
import { Helmet } from 'react-helmet-async';

interface MyListingsProps {
  onAddListing: () => void;
  onEditListing: (listing: Property) => void;
}

const MyListings: React.FC<MyListingsProps> = ({ onAddListing, onEditListing }) => {
  const { language } = useLanguage();
  const [listings, setListings] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteListing = (listingId: string) => {
    if (window.confirm('Bu e\'lonni o\'chirishni xohlaysizmi?')) {
      setListings(prev => prev.filter(l => l.id !== listingId));
    }
  };

  const toggleListingStatus = (listingId: string) => {
    setListings(prev => prev.map(l => 
      l.id === listingId 
        ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : l
    ));
  };

  const ListingCard: React.FC<{ listing: Property }> = ({ listing }) => {
    const title = language === 'uz' ? listing.title : listing.titleRu;
    const location = language === 'uz' ? listing.location : listing.locationRu;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={listing.images[0]}
            alt={title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              listing.status === 'active' 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}>
              {listing.status === 'active' ? 'Faol' : 'Nofaol'}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <div className="relative">
              <button
                onClick={() => setSelectedListing(selectedListing === listing.id ? null : listing.id)}
                className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <MoreVertical size={14} />
              </button>
              {selectedListing === listing.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => onEditListing(listing)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <Edit size={14} />
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => toggleListingStatus(listing.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <Eye size={14} />
                    {listing.status === 'active' ? 'Nofaol qilish' : 'Faol qilish'}
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 text-sm"
                  >
                    <Trash2 size={14} />
                    O'chirish
                  </button>
                </div>
              )}
            </div>
          </div>
          {listing.featured && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                Tavsiya etilgan
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
            <MapPin size={14} />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">({listing.reviewCount})</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {listing.availableRooms}/{listing.totalRooms} bo'sh
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {(listing.price / 1000000).toFixed(1)}M so'm
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/oy</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <MessageCircle size={14} />
              <span>5 xabar</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEditListing(listing)}
              className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Edit size={14} />
              Tahrirlash
            </button>
            <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
              <Eye size={14} />
              Ko'rish
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <Helmet>
        <title>E'lonlarim | Joy Bor</title>
        <meta name="description" content="Mening e'lonlarimni boshqarish va yangi e'lon qo'shish." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/listings" />
      </Helmet>
      
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Mening e'lonlarim
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {listings.length} ta e'lon, {listings.filter(l => l.status === 'active').length} ta faol
            </p>
          </div>
          <button
            onClick={onAddListing}
            className="mt-4 lg:mt-0 flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
          >
            <Plus size={16} />
            Yangi e'lon qo'shish
          </button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="E'lon qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hech qanday e'lon yo'q</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm ? 'Qidiruv bo\'yicha natija topilmadi' : 'Hali e\'lon qo\'shilmagan'}
            </p>
            <button
              onClick={onAddListing}
              className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors mx-auto"
            >
              <Plus size={20} />
              Birinchi e'lonni qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyListings;