import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-8 lg:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Joy Bor</h3>
            <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base">
              Universitet talabalar uchun eng yaxshi xonadonlarni topishda yordam beruvchi platforma.
            </p>
            <div className="flex space-x-3 lg:space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle size={18} className="lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Havolalar</h4>
            <ul className="space-y-2 text-sm lg:text-base">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Biz haqimizda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Aloqa</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yordam</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Maxfiylik</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shartlar</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Aloqa</h4>
            <div className="space-y-2 lg:space-y-3 text-sm lg:text-base">
              <div className="flex items-center">
                <Phone size={14} className="mr-2 lg:w-4 lg:h-4" />
                <span className="text-gray-400">+998 (78) 123-45-67</span>
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-2 lg:w-4 lg:h-4" />
                <span className="text-gray-400">info@xonadon.joybor.uz</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-2 lg:w-4 lg:h-4" />
                <span className="text-gray-400">Toshkent, O'zbekiston</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Yangiliklar</h4>
            <p className="text-gray-400 mb-3 lg:mb-4 text-sm lg:text-base">
              Eng so'ngi takliflardan xabardor bo'ling.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors text-sm">
                Obuna
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-gray-400">
          <p className="text-sm lg:text-base">&copy; 2024 Joy Bor. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;