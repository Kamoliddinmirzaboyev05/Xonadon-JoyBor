import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Eye, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProperties, regions, roomTypes } from '../data/mockData';
import { Property } from '../types';
import { Helmet } from 'react-helmet-async';

interface HomeProps {
  onViewListing: (listing: Property) => void;
  onContact: (listing: Property) => void;
}

const Home: React.FC<HomeProps> = ({ onViewListing, onContact }) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || property.location.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesRoomType = !selectedRoomType || property.roomType === selectedRoomType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesRegion && matchesRoomType && matchesPrice && property.status === 'active';
  });

  const ListingCard: React.FC<{ listing: Property }> = ({ listing }) => {
    const title = language === 'uz' ? listing.title : listing.titleRu;
    const location = language === 'uz' ? listing.location : listing.locationRu;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={listing.images[0]}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {listing.featured && (
            <div className="absolute top-2 left-2">
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
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onViewListing(listing)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={14} />
              Ko'rish
            </button>
            <button
              onClick={() => onContact(listing)}
              className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              Xabar yuborish
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <Helmet>
        <title>Joy Bor - Ijara uchun xonadonlar</title>
        <meta name="description" content="O'zbekistonda ijara uchun xonadonlar. Eng yaxshi narxlar va qulay joylashuv." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/" />
      </Helmet>
      
      <div className="p-4 lg:p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Ijara uchun xonadonlar
            </h1>
            <p className="text-blue-100 text-lg mb-6">
              O'zbekiston bo'ylab eng yaxshi xonadonlarni toping
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Xonadon qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="flex gap-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Barcha hududlar</option>
                {regions.map(region => (
                  <option key={region.value} value={region.value}>
                    {language === 'uz' ? region.label : region.labelRu}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Barcha turlar</option>
                {roomTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {language === 'uz' ? type.label : type.labelRu}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <SlidersHorizontal size={18} />
                Filtrlar
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Narx oralig'i (so'm)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0] || ''}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1] || ''}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000000])}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Barcha e'lonlar
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredListings.length} ta e'lon topildi
          </p>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hech narsa topilmadi</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Qidiruv shartlarini o'zgartirib qayta urinib ko'ring
            </p>
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

export default Home;