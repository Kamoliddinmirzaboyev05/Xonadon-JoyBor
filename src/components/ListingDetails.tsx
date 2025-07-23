import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Star, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ListingDetailsProps {
  listing: Property;
  onClose: () => void;
  onContact: (listing: Property) => void;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing, onClose, onContact }) => {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const title = language === 'uz' ? listing.title : listing.titleRu;
  const description = language === 'uz' ? listing.description : listing.descriptionRu;
  const location = language === 'uz' ? listing.location : listing.locationRu;
  const amenities = language === 'uz' ? listing.amenities : listing.amenitiesRu;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const getRoomTypeText = (type: string) => {
    switch (type) {
      case 'single':
        return '1 kishilik';
      case 'shared':
        return '2 kishilik';
      case 'family':
        return 'Oilaviy';
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
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate mx-4">
          {title}
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <img
          src={listing.images[currentImageIndex]}
          alt={title}
          className="w-full h-64 md:h-96 object-cover"
        />
        {listing.images.length > 1 && (
          <>
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
              {currentImageIndex + 1} / {listing.images.length}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Basic Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h1>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-4">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" fill="currentColor" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-gray-500 dark:text-gray-400">({listing.reviewCount} sharh)</span>
            </div>
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
              {getRoomTypeText(listing.roomType)}
            </span>
            <span className="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
              {getGenderText(listing.gender)}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {(listing.price / 1000000).toFixed(1)}M so'm
            <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/oy</span>
          </div>
          
          <div className="text-gray-600 dark:text-gray-400">
            {listing.availableRooms}/{listing.totalRooms} xona bo'sh
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tavsif</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Qulayliklar</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Bog'lanish</h3>
          <div className="flex gap-3">
            <button
              onClick={() => onContact(listing)}
              className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Xabar yuborish
            </button>
            <a
              href={`tel:+998901234567`}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Qo'ng'iroq qilish
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
            Xabar yuborish orqali uy egasi bilan to'g'ridan-to'g'ri muloqot qiling
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;