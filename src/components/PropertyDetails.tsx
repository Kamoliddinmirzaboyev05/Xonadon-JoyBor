import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Star, Phone, MessageCircle, Shield, Clock, CheckCircle } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyDetailsProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onApply: (property: Property) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, isOpen, onClose, onApply }) => {
  const { language, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const title = language === 'uz' ? property.title : property.titleRu;
  const description = language === 'uz' ? property.description : property.descriptionRu;
  const location = language === 'uz' ? property.location : property.locationRu;
  const amenities = language === 'uz' ? property.amenities : property.amenitiesRu;
  const rules = language === 'uz' ? property.rules : property.rulesRu;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

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

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male':
        return 'Faqat o\'g\'il bolalar';
      case 'female':
        return 'Faqat qizlar';
      case 'coed':
        return 'Aralash';
      default:
        return gender;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <img
            src={property.images[currentImageIndex]}
            alt={title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Property Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('property.details.title')}</h3>
              <p className="text-gray-700 mb-4">{description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">{location}</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="mr-2 text-yellow-400" fill="currentColor" />
                  <span className="text-gray-700">{property.rating} ({property.reviewCount} {t('property.reviews')})</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {getRoomTypeText(property.roomType)}
                  </span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    {getGenderText(property.gender)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {property.price.toLocaleString()} {t('common.sum')}
                  <span className="text-sm text-gray-500 font-normal">/{t('property.month')}</span>
                </div>
                <div className="text-gray-600 mb-4">
                  {property.distanceFromUniversity} km {t('property.distance')}
                </div>
                <button
                  onClick={() => onApply(property)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t('property.apply.now')}
                </button>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('property.details.amenities')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('property.details.rules')}</h3>
            <ul className="space-y-2">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Landlord Info */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">{t('property.details.landlord')}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={property.landlord.photo}
                  alt={property.landlord.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900 flex items-center">
                    {property.landlord.name}
                    {property.landlord.verified && (
                      <Shield size={16} className="text-blue-500 ml-2" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <Star size={14} className="inline text-yellow-400 mr-1" fill="currentColor" />
                    {property.landlord.rating} • {property.landlord.responseTime}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${property.landlord.phone}`}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone size={18} />
                </a>
                <a
                  href={`https://t.me/${property.landlord.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;