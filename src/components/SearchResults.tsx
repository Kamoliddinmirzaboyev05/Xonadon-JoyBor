import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Grid3X3, List, MapPin, Star } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import PropertyCard from './PropertyCard';
import { regions, roomTypes, genderOptions, mockUniversities } from '../data/mockData';

interface SearchResultsProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  onApply: (property: Property) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ properties, onPropertySelect, onApply }) => {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    location: '',
    university: '',
    priceRange: [500000, 3000000],
    roomType: '',
    gender: '',
    rating: 0,
    amenities: [] as string[]
  });

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters
    let filtered = properties.filter(property => {
      if (newFilters.location && !property.location.toLowerCase().includes(newFilters.location.toLowerCase())) {
        return false;
      }
      if (newFilters.university && property.university !== newFilters.university) {
        return false;
      }
      if (property.price < newFilters.priceRange[0] || property.price > newFilters.priceRange[1]) {
        return false;
      }
      if (newFilters.roomType && property.roomType !== newFilters.roomType) {
        return false;
      }
      if (newFilters.gender && property.gender !== newFilters.gender) {
        return false;
      }
      if (newFilters.rating && property.rating < newFilters.rating) {
        return false;
      }
      return true;
    });

    // Apply sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      filtered.sort((a, b) => a.distanceFromUniversity - b.distanceFromUniversity);
    }

    setFilteredProperties(filtered);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    handleFilterChange('', ''); // Trigger re-filtering with new sort
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      university: '',
      priceRange: [500000, 3000000],
      roomType: '',
      gender: '',
      rating: 0,
      amenities: []
    });
    setFilteredProperties(properties);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('search.results')}</h1>
          <p className="text-gray-600">{filteredProperties.length} ta natija topildi</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={18} />
            Filtrlar
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-white px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rating">Reyting bo'yicha</option>
            <option value="price-low">Narx: pastdan yuqoriga</option>
            <option value="price-high">Narx: yuqoridan pastga</option>
            <option value="distance">Masofa bo'yicha</option>
          </select>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 bg-white rounded-xl shadow-md p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filtrlar</h3>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Tozalash
                </button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Joylashuv
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Barcha joylar</option>
                    {regions.map(region => (
                      <option key={region.value} value={region.value}>
                        {language === 'uz' ? region.label : region.labelRu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Universitet
                  </label>
                  <select
                    value={filters.university}
                    onChange={(e) => handleFilterChange('university', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Barcha universitetlar</option>
                    {mockUniversities.map(uni => (
                      <option key={uni.id} value={uni.id}>
                        {language === 'uz' ? uni.name : uni.nameRu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Narx oralig'i
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="500000"
                      max="3000000"
                      step="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{filters.priceRange[0].toLocaleString()}</span>
                      <span>{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xona turi
                  </label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => handleFilterChange('roomType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Barcha turlar</option>
                    {roomTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {language === 'uz' ? type.label : type.labelRu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jins
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Barcha</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {language === 'uz' ? option.label : option.labelRu}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Star size={16} className="inline mr-1" />
                    Minimal reyting
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>Barcha</option>
                    <option value={4}>4+ yulduz</option>
                    <option value={4.5}>4.5+ yulduz</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h3>
                <p className="text-gray-600">Filtrlarni o'zgartirib qayta urinib ko'ring.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={onPropertySelect}
                    onApply={onApply}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;