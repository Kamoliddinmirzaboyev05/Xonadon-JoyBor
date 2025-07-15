import React from 'react';
import { MapPin, Star, Users, Heart, Eye } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onApply: (property: Property) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, onApply, isFavorite = false, onToggleFavorite }) => {
  const { language, t } = useLanguage();

  const title = language === 'uz' ? property.title : property.titleRu;
  const location = language === 'uz' ? property.location : property.locationRu;
  const amenities = language === 'uz' ? property.amenities : property.amenitiesRu;

  const getRoomTypeText = (type: string) => {
    switch (type) {
      case 'single':
        return t('room.single');
      case 'shared':
        return t('room.shared');
      case 'family':
        return t('room.family');
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group p-2 sm:p-4">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={title}
          className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onToggleFavorite && onToggleFavorite(property.id)}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:bg-red-500 hover:text-white transition-colors shadow-md`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium">
          {getRoomTypeText(property.roomType)}
        </div>
      </div>
      {/* Content */}
      <div className="p-2 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center text-gray-600 mb-1 sm:mb-3">
          <MapPin size={12} className="mr-1" />
          <span className="text-xs sm:text-sm">{location}</span>
        </div>
        <div className="flex items-center justify-between mb-1 sm:mb-3">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
            <span className="text-xs sm:text-sm font-medium">{property.rating}</span>
            <span className="text-xs sm:text-sm text-gray-500 ml-1">
              ({property.reviewCount} {t('property.reviews')})
            </span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Users size={12} className="mr-1" />
            {property.distanceFromUniversity} km {t('property.distance')}
          </div>
        </div>
        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-4">
          {amenities.slice(0, 2).map((amenity, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 2 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-full">
              +{amenities.length - 2}
            </span>
          )}
        </div>
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {property.price.toLocaleString()} {t('common.sum')}
            <span className="text-xs sm:text-sm text-gray-500 font-normal">/{t('property.month')}</span>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-4">
          <button
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-gray-100 text-gray-700 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 sm:gap-2"
          >
            <Eye size={14} />
            {t('property.view.details')}
          </button>
          <button
            onClick={() => onApply(property)}
            className="flex-1 bg-blue-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-medium hover:bg-blue-700 transition-colors"
          >
            {t('property.apply.now')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;