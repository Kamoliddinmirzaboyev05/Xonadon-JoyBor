import React, { useState } from 'react';
import { Search, MapPin, GraduationCap, DollarSign, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { regions, roomTypes, mockUniversities } from '../data/mockData';

interface QuickSearchProps {
  onSearch: (filters: any) => void;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch }) => {
  const { language, t } = useLanguage();
  const [filters, setFilters] = useState({
    location: '',
    university: '',
    priceRange: [500000, 2000000],
    roomType: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 -mt-12 relative z-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            {t('search.location')}
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('search.location')}</option>
            {regions.map(region => (
              <option key={region.value} value={region.value}>
                {language === 'uz' ? region.label : region.labelRu}
              </option>
            ))}
          </select>
        </div>

        {/* University */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap size={16} className="inline mr-1" />
            {t('search.university')}
          </label>
          <select
            value={filters.university}
            onChange={(e) => setFilters(prev => ({ ...prev, university: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('search.university')}</option>
            {mockUniversities.map(uni => (
              <option key={uni.id} value={uni.id}>
                {language === 'uz' ? uni.name : uni.nameRu}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign size={16} className="inline mr-1" />
            {t('search.price.range')}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="500000"
              max="3000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-gray-600">
              {filters.priceRange[1].toLocaleString()} {t('common.sum')}
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Home size={16} className="inline mr-1" />
            {t('search.room.type')}
          </label>
          <select
            value={filters.roomType}
            onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('search.room.type')}</option>
            {roomTypes.map(type => (
              <option key={type.value} value={type.value}>
                {language === 'uz' ? type.label : type.labelRu}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">
            Search
          </label>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Search size={20} />
            {t('search.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;