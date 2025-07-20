import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Star,
  MapPin,
  Users,
  Home,
  MoreVertical
} from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Bu xonadonni o\'chirishni xohlaysizmi?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    }
  };

  const togglePropertyStatus = (propertyId: string) => {
    setProperties(prev => prev.map(p => 
      p.id === propertyId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : p
    ));
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
    const title = language === 'uz' ? property.title : property.titleRu;
    const location = language === 'uz' ? property.location : property.locationRu;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.status === 'active' 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}>
              {property.status === 'active' ? 'Faol' : 'Nofaol'}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <div className="relative">
              <button
                onClick={() => setSelectedProperty(selectedProperty === property.id ? null : property.id)}
                className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <MoreVertical size={14} />
              </button>
              {selectedProperty === property.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => onEditProperty(property)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <Edit size={14} />
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => togglePropertyStatus(property.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                  >
                    <Eye size={14} />
                    {property.status === 'active' ? 'Nofaol qilish' : 'Faol qilish'}
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 text-sm"
                  >
                    <Trash2 size={14} />
                    O'chirish
                  </button>
                </div>
              )}
            </div>
          </div>
          {property.featured && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                Tavsiya etilgan
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
            <MapPin size={12} />
            <span className="text-xs">{location}</span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400" fill="currentColor" />
              <span className="text-xs font-medium">{property.rating}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({property.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Users size={12} />
              {property.availableRooms}/{property.totalRooms} bo'sh
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                {(property.price / 1000000).toFixed(1)}M so'm
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/oy</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEditProperty(property)}
                className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Edit size={14} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Eye size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PropertyListItem: React.FC<{ property: Property }> = ({ property }) => {
    const title = language === 'uz' ? property.title : property.titleRu;
    const location = language === 'uz' ? property.location : property.locationRu;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <img
            src={property.images[0]}
            alt={title}
            className="w-20 h-20 rounded-lg object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin size={12} />
                  <span className="text-xs">{location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  property.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}>
                  {property.status === 'active' ? 'Faol' : 'Nofaol'}
                </span>
                {property.featured && (
                  <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star size={10} fill="currentColor" />
                    Tavsiya etilgan
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" fill="currentColor" />
                <span className="text-xs font-medium">{property.rating}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({property.reviewCount} sharh)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <Users size={12} />
                {property.availableRooms}/{property.totalRooms} bo'sh xona
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <Home size={12} />
                {property.roomType === 'single' ? '1 kishilik' : 
                 property.roomType === 'shared' ? '2 kishilik' : 'Oilaviy'}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                  {(property.price / 1000000).toFixed(1)}M so'm
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">/oy</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditProperty(property)}
                  className="flex items-center gap-1 px-2 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-xs"
                >
                  <Edit size={12} />
                  Tahrirlash
                </button>
                <button
                  onClick={() => togglePropertyStatus(property.id)}
                  className="flex items-center gap-1 px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-xs"
                >
                  <Eye size={12} />
                  {property.status === 'active' ? 'Nofaol qilish' : 'Faol qilish'}
                </button>
                <button
                  onClick={() => handleDeleteProperty(property.id)}
                  className="flex items-center gap-1 px-2 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg transition-colors text-xs"
                >
                  <Trash2 size={12} />
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Mening xonadonlarim
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {properties.length} ta xonadon, {properties.filter(p => p.status === 'active').length} ta faol
          </p>
        </div>
        <button
          onClick={onAddProperty}
          className="mt-4 lg:mt-0 flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
        >
          <Plus size={16} />
          Yangi xonadon qo'shish
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Xonadon qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Barcha holat</option>
            <option value="active">Faol</option>
            <option value="inactive">Nofaol</option>
            <option value="pending">Kutilmoqda</option>
          </select>
          
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="w-3 h-3 flex flex-col gap-0.5">
                <div className="bg-current h-0.5 rounded-sm"></div>
                <div className="bg-current h-0.5 rounded-sm"></div>
                <div className="bg-current h-0.5 rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Properties */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Xonadon topilmadi</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm ? 'Qidiruv bo\'yicha natija topilmadi' : 'Hali xonadon qo\'shilmagan'}
          </p>
          <button
            onClick={onAddProperty}
            className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors mx-auto"
          >
            <Plus size={20} />
            Birinchi xonadonni qo'shish
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'space-y-3'
        }>
          {filteredProperties.map((property) => (
            viewMode === 'grid' ? (
              <PropertyCard key={property.id} property={property} />
            ) : (
              <PropertyListItem key={property.id} property={property} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;