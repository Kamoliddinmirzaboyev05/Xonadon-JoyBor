import React, { useState } from 'react';
import { User, Mail, Phone, MessageCircle, Camera, Shield, CheckCircle, Clock, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

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
    <main>
      <Helmet>
        <title>Profil | Joy Bor</title>
        <meta name="description" content="Shaxsiy ma’lumotlaringiz va hujjatlaringizni boshqarish." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/profile" />
      </Helmet>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Profil</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Shaxsiy ma'lumotlaringizni boshqaring</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  <Camera size={12} />
                </button>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{user?.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user?.email}</p>
              
              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${verification.bgColor} ${verification.color}`}>
                <verification.icon size={12} />
                {verification.text}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone size={12} />
                  <span className="text-xs">{user?.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <MessageCircle size={12} />
                  <span className="text-xs">{formData.telegram}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">3</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Faol xonadonlar</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">4.8</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Reyting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{t('profile.personal.info')}</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                >
                  {isEditing ? t('common.cancel') : t('common.edit')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User size={12} className="inline mr-1" />
                    {t('profile.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail size={12} className="inline mr-1" />
                    {t('profile.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone size={12} className="inline mr-1" />
                    {t('profile.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MessageCircle size={12} className="inline mr-1" />
                    {t('profile.telegram')}
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Qisqacha ma'lumot
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manzil
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
                />
              </div>

              {isEditing && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {t('profile.save')}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('profile.documents')}</h3>
              
              <div className="space-y-3">
                {Object.entries(documents).map(([key, doc]) => (
                  <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        doc.verified ? 'bg-green-50 dark:bg-green-900/50' : doc.uploaded ? 'bg-yellow-50 dark:bg-yellow-900/50' : 'bg-gray-50 dark:bg-gray-700'
                      }`}>
                        {doc.verified ? (
                          <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                        ) : doc.uploaded ? (
                          <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <Upload size={16} className="text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {key === 'passport' ? t('profile.passport') : 
                           key === 'license' ? t('profile.license') : 'Sertifikat'}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {doc.verified ? 'Tasdiqlangan' : 
                           doc.uploaded ? 'Tekshirilmoqda' : 'Yuklanmagan'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.uploaded ? (
                        <span className="text-xs text-gray-600 dark:text-gray-400">{doc.name}</span>
                      ) : (
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium">
                          Yuklash
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start">
                  <Shield size={16} className="text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">{t('profile.verification')}</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Hujjatlaringizni yuklash va tasdiqlash orqali ishonchli uy egasi sifatida tanilasiz.
                      Bu sizning xonadonlaringizga bo'lgan talabni oshiradi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Faoliyat statistikasi</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">15</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Jami arizalar</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/50 rounded-lg">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">8</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Qabul qilingan</div>
                </div>
                <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/50 rounded-lg">
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-400">2.5h</div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">O'rtacha javob vaqti</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">4.8</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">O'rtacha reyting</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;