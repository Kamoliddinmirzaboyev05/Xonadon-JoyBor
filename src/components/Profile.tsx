import React, { useState } from 'react';
import { User, Mail, Phone, MessageCircle, Camera, Shield, CheckCircle, Clock, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    telegram: '@jamshid_k',
    bio: 'Men 5 yildan beri talabalar uchun xonadon ijaraga beraman. Sifatli xizmat va qulay narxlar.',
    address: 'Toshkent, Chilonzor tumani'
  });

  const [documents, setDocuments] = useState({
    passport: { uploaded: true, verified: true, name: 'passport.pdf' },
    license: { uploaded: true, verified: false, name: 'license.pdf' },
    certificate: { uploaded: false, verified: false, name: '' }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const getVerificationStatus = () => {
    if (user?.verified) {
      return {
        status: 'verified',
        text: t('profile.verified'),
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: CheckCircle
      };
    }
    return {
      status: 'pending',
      text: t('profile.pending'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: Clock
    };
  };

  const verification = getVerificationStatus();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('profile.title')}</h1>
        <p className="text-gray-600">Shaxsiy ma'lumotlaringizni boshqaring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${verification.bgColor} ${verification.color}`}>
              <verification.icon size={16} />
              {verification.text}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">{user?.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MessageCircle size={16} />
                <span className="text-sm">{formData.telegram}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-xs text-gray-600">Faol xonadonlar</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <div className="text-xs text-gray-600">Reyting</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('profile.personal.info')}</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEditing ? t('common.cancel') : t('common.edit')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-1" />
                  {t('profile.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-1" />
                  {t('profile.phone')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageCircle size={16} className="inline mr-1" />
                  {t('profile.telegram')}
                </label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qisqacha ma'lumot
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manzil
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            {isEditing && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('profile.save')}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('profile.documents')}</h3>
            
            <div className="space-y-4">
              {Object.entries(documents).map(([key, doc]) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      doc.verified ? 'bg-green-50' : doc.uploaded ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}>
                      {doc.verified ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : doc.uploaded ? (
                        <Clock size={20} className="text-yellow-600" />
                      ) : (
                        <Upload size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key === 'passport' ? t('profile.passport') : 
                         key === 'license' ? t('profile.license') : 'Sertifikat'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {doc.verified ? 'Tasdiqlangan' : 
                         doc.uploaded ? 'Tekshirilmoqda' : 'Yuklanmagan'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.uploaded ? (
                      <span className="text-sm text-gray-600">{doc.name}</span>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Yuklash
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <Shield size={20} className="text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">{t('profile.verification')}</h4>
                  <p className="text-sm text-blue-700">
                    Hujjatlaringizni yuklash va tasdiqlash orqali ishonchli uy egasi sifatida tanilasiz.
                    Bu sizning xonadonlaringizga bo'lgan talabni oshiradi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Faoliyat statistikasi</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-blue-700">Jami arizalar</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-green-700">Qabul qilingan</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">2.5h</div>
                <div className="text-sm text-amber-700">O'rtacha javob vaqti</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-purple-700">O'rtacha reyting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;