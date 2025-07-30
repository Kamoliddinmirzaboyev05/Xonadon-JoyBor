import React, { useState } from 'react';
import { X, User, Lock, Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useLanguage();
  const { autoLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password2) {
      setError('Parollar mos kelmaydi');
      return;
    }

    if (formData.password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://joyboryangi.pythonanywhere.com/register/tenant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          password2: formData.password2
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        setSuccess('Ro\'yxatdan o\'tish muvaffaqiyatli! Tizimga kirilmoqda...');
        
        // Auto-login after successful registration
        try {
          await autoLogin(formData.username, formData.password);
          
          // Reset form
          setFormData({
            username: '',
            email: '',
            phone: '',
            password: '',
            password2: ''
          });

          // Close modal after successful auto-login
          setTimeout(() => {
            setSuccess('');
            onClose();
          }, 1500);
        } catch (loginError) {
          console.log('Auto-login failed:', loginError);
          setSuccess('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi tizimga kirishingiz mumkin.');
          
          // Reset form
          setFormData({
            username: '',
            email: '',
            phone: '',
            password: '',
            password2: ''
          });

          // Redirect to login after 2 seconds
          setTimeout(() => {
            setSuccess('');
            onSuccess();
            onClose();
          }, 2000);
        }
      } else {
        // Handle specific error messages from API
        if (data.username) {
          setError(`Foydalanuvchi nomi: ${data.username[0]}`);
        } else if (data.email) {
          setError(`Email: ${data.email[0]}`);
        } else if (data.phone) {
          setError(`Telefon: ${data.phone[0]}`);
        } else if (data.password) {
          setError(`Parol: ${data.password[0]}`);
        } else if (data.password2) {
          setError(`Parol tasdiqi: ${data.password2[0]}`);
        } else {
          setError(data.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Tarmoq xatosi. Iltimos, qayta urinib ko\'ring');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Ro'yxatdan o'tish
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User size={16} className="inline mr-1" />
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Foydalanuvchi nomini kiriting"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={16} className="inline mr-1" />
                Telefon raqam
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+998901234567"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Lock size={16} className="inline mr-1" />
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Parolni kiriting"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Lock size={16} className="inline mr-1" />
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                required
                className="w-full p-3 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Parolni qayta kiriting"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-base text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-base text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 text-base rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Ro\'yxatdan o\'tmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Hisobingiz bormi?{' '}
              <button
                type="button"
                onClick={onClose}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Kirish
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;