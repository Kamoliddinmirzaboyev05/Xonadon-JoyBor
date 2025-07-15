import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Star, Users, MapPin, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

interface PropertiesProps {
  onAddProperty: () => void;
  onEditProperty: (property: Property) => void;
}

const Properties: React.FC<PropertiesProps> = ({ onAddProperty, onEditProperty }) => {
  const { language, t } = useLanguage();
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProperties = properties.filter(property => {
    const title = language === 'uz' ? property.title : property.titleRu;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && property.status === 'active') ||
                         (statusFilter === 'inactive' && property.status === 'inactive') ||
                         (statusFilter === 'available' && property.available) ||
                         (statusFilter === 'full' && !property.available);
    
    return matchesSearch && matchesStatus;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleDelete = (propertyId: string) => {
    if (window.confirm('Bu xonadonni o\'chirishni xohlaysizmi?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    }
  };

  const toggleFeatured = (propertyId: string) => {
    setProperties(prev => prev.map(p => 
      p.id === propertyId ? { ...p, featured: !p.featured } : p
    ));
  };

  const getStatusBadge = (property: Property) => {
    if (!property.available) {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">To'liq band</span>;
    }
    if (property.status === 'active') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Faol</span>;
    }
    if (property.status === 'inactive') {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Nofaol</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Kutilmoqda</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('properties.title')}</h1>
          <p className="text-gray-600">{properties.length} ta xonadon</p>
        </div>
        <button
          onClick={onAddProperty}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {t('properties.add.new')}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Xonadon qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Barcha holat</option>
            <option value="active">Faol</option>
            <option value="inactive">Nofaol</option>
            <option value="available">Bo'sh joylar bor</option>
            <option value="full">To'liq band</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Eng yangi</option>
            <option value="oldest">Eng eski</option>
            <option value="price-high">Narx: yuqoridan pastga</option>
            <option value="price-low">Narx: pastdan yuqoriga</option>
            <option value="rating">Reyting bo'yicha</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter size={16} />
            Qo'shimcha filtrlar
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProperties.map((property) => {
          const title = language === 'uz' ? property.title : property.titleRu;
          const location = language === 'uz' ? property.location : property.locationRu;
          
          return (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {getStatusBadge(property)}
                  {property.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      Tavsiya etilgan
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleFeatured(property.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    property.featured ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600'
                  } hover:bg-yellow-500 hover:text-white transition-colors`}
                >
                  <Star size={16} fill={property.featured ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {property.price.toLocaleString()} {t('common.sum')}
                    <span className="text-sm text-gray-500 font-normal">/{t('common.month')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={14} className="mr-1" />
                    {property.availableRooms}/{property.totalRooms}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({property.reviewCount})</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {property.distanceFromUniversity} km dan universitet
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                    <Eye size={16} />
                    {t('common.view')}
                  </button>
                  <button
                    onClick={() => onEditProperty(property)}
                    className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit size={16} />
                    {t('common.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h3>
          <p className="text-gray-600">Qidiruv shartlarini o'zgartirib qayta urinib ko'ring.</p>
        </div>
      )}
    </div>
  );
};

export default Properties;