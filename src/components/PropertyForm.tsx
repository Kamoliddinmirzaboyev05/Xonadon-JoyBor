import React, { useState } from 'react';
import { X, Upload, MapPin, DollarSign, Home, Users, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Property } from '../types';
import { mockUniversities, regions, roomTypes, genderOptions } from '../data/mockData';

interface PropertyFormProps {
  property?: Property;
  isOpen: boolean;
  onClose: () => void;
  onSave: (propertyData: any) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property, isOpen, onClose, onSave }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    title: property?.title || '',
    titleRu: property?.titleRu || '',
    description: property?.description || '',
    descriptionRu: property?.descriptionRu || '',
    price: property?.price || 0,
    location: property?.location || '',
    address: property?.address || '',
    university: property?.university || '',
    distanceFromUniversity: property?.distanceFromUniversity || 0,
    roomType: property?.roomType || 'single',
    gender: property?.gender || 'coed',
    totalRooms: property?.totalRooms || 1,
    availableRooms: property?.availableRooms || 1,
    amenities: property?.amenities || [],
    rules: property?.rules || [''],
    rulesRu: property?.rulesRu || [''],
    featured: property?.featured || false,
    images: property?.images || []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleRuleChange = (index: number, value: string, isRussian = false) => {
    const field = isRussian ? 'rulesRu' : 'rules';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((rule, i) => i === index ? value : rule)
    }));
  };

  const addRule = (isRussian = false) => {
    const field = isRussian ? 'rulesRu' : 'rules';
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeRule = (index: number, isRussian = false) => {
    const field = isRussian ? 'rulesRu' : 'rules';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave({
        ...formData,
        id: property?.id || Date.now().toString(),
        createdAt: property?.createdAt || new Date(),
        updatedAt: new Date(),
        status: 'active',
        available: formData.availableRooms > 0,
        rating: property?.rating || 0,
        reviewCount: property?.reviewCount || 0,
        landlordId: '1'
      });
      onClose();
    } catch (error) {
      console.error('Failed to save property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonAmenities = [
    'WiFi', 'Konditsioner', 'Kir yuvish mashinasi', 'Oshxona', 'Parking',
    'Issiq suv', 'Muzlatgich', 'Balkon', 'Lift', 'Qulflangan eshik',
    'Kamera kuzatuvi', 'Bog\'', 'Gym', 'Umumiy xona', 'Kir yuvish joyi'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {property ? 'Xonadonni tahrirlash' : 'Yangi xonadon qo\'shish'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('property.form.basic.info')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.title.uz')}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.title.ru')}
                  </label>
                  <input
                    type="text"
                    name="titleRu"
                    value={formData.titleRu}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.description.uz')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.description.ru')}
                  </label>
                  <textarea
                    name="descriptionRu"
                    value={formData.descriptionRu}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Location and Price */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Joylashuv va narx</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    {t('property.form.location')}
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Viloyatni tanlang</option>
                    {regions.map(region => (
                      <option key={region.value} value={region.value}>
                        {language === 'uz' ? region.label : region.labelRu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign size={16} className="inline mr-1" />
                    {t('property.form.price')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.address')}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.university')}
                  </label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Universitetni tanlang</option>
                    {mockUniversities.map(uni => (
                      <option key={uni.id} value={uni.id}>
                        {language === 'uz' ? uni.name : uni.nameRu}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('property.form.distance')}
                </label>
                <input
                  type="number"
                  name="distanceFromUniversity"
                  value={formData.distanceFromUniversity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Room Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Xona ma'lumotlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home size={16} className="inline mr-1" />
                    {t('property.form.room.type')}
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roomTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {language === 'uz' ? type.label : type.labelRu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users size={16} className="inline mr-1" />
                    {t('property.form.gender')}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {language === 'uz' ? option.label : option.labelRu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.total.rooms')}
                  </label>
                  <input
                    type="number"
                    name="totalRooms"
                    value={formData.totalRooms}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('property.form.available.rooms')}
                </label>
                <input
                  type="number"
                  name="availableRooms"
                  value={formData.availableRooms}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max={formData.totalRooms}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('property.form.amenities')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qoidalar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.rules.uz')}
                  </label>
                  {formData.rules.map((rule, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Qoida kiriting..."
                      />
                      <button
                        type="button"
                        onClick={() => removeRule(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRule()}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Qoida qo'shish
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('property.form.rules.ru')}
                  </label>
                  {formData.rulesRu.map((rule, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value, true)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Введите правило..."
                      />
                      <button
                        type="button"
                        onClick={() => removeRule(index, true)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRule(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Добавить правило
                  </button>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('property.form.images')}</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Xonadon rasmlarini yuklang</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="mt-2 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Rasmlarni tanlash
                </label>
              </div>
            </div>

            {/* Featured */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 flex items-center">
                  <Star size={16} className="mr-1" />
                  {t('property.form.featured')}
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t('property.form.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t('common.loading') : t('property.form.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;