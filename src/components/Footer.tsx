import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('site.title')}</h3>
            <p className="text-gray-400 mb-6">
              Universitet talabalar uchun eng yaxshi xonadonlarni topishda yordam beruvchi platforma.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.about')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.support')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-400">+998 (78) 123-45-67</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-400">info@xonadon.joybor.uz</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-gray-400">Toshkent, O'zbekiston</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-2" />
                <span className="text-gray-400">@xonadon_uz</span>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.follow')}</h4>
            <p className="text-gray-400 mb-4">
              Eng so'ngi yangiliklar va takliflar uchun bizni kuzatib boring.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Xonadon.uz. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;