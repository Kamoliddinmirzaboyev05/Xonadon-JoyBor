import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'uz' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    // Header & Navigation
    'site.title': 'Joy Bor - Ijara platformasi',
    
    // Common
    'room.single': '1 kishilik',
    'room.shared': '2 kishilik', 
    'room.family': 'Oilaviy',
    'nav.home': 'Asosiy sahifa',
    'nav.listings': 'E\'lonlarim',
    'nav.chat': 'Xabarlar',
    'nav.profile': 'Profil',
    'nav.login': 'Kirish',
    'nav.logout': 'Chiqish',
    'lang.switch': 'Русский',
    
    // Listings
    'listings.title': 'Mening e\'lonlarim',
    'listings.add.new': 'Yangi e\'lon qo\'shish',
    'listings.edit': 'Tahrirlash',
    'listings.delete': 'O\'chirish',
    'listings.view': 'Ko\'rish',
    'listings.status.active': 'Faol',
    'listings.status.inactive': 'Nofaol',
    'listings.featured': 'Tavsiya etilgan',
    
    // Chat
    'chat.title': 'Xabarlar',
    'chat.send': 'Yuborish',
    'chat.type.message': 'Xabar yozing...',
    'chat.no.conversations': 'Hech qanday suhbat yo\'q',
    
    // Profile
    'profile.title': 'Profil sozlamalari',
    'profile.personal.info': 'Shaxsiy ma\'lumotlar',
    'profile.name': 'To\'liq ism',
    'profile.email': 'Email',
    'profile.phone': 'Telefon',
    'profile.telegram': 'Telegram',
    'profile.photo': 'Profil rasmi',
    'profile.documents': 'Hujjatlar',
    'profile.passport': 'Pasport',
    'profile.license': 'Litsenziya',
    'profile.verification': 'Tasdiqlash',
    'profile.verified': 'Tasdiqlangan',
    'profile.pending': 'Kutilmoqda',
    'profile.save': 'Saqlash',
    
    // Common
    'common.loading': 'Yuklanmoqda...',
    'common.error': 'Xatolik yuz berdi',
    'common.success': 'Muvaffaqiyat!',
    'common.cancel': 'Bekor qilish',
    'common.save': 'Saqlash',
    'common.delete': 'O\'chirish',
    'common.edit': 'Tahrirlash',
    'common.view': 'Ko\'rish',
    'common.close': 'Yopish',
    'common.back': 'Orqaga',
    'common.next': 'Keyingi',
    'common.previous': 'Oldingi',
    'common.search': 'Qidirish',
    'common.filter': 'Filtr',
    'common.sort': 'Saralash',
    'common.sum': 'so\'m',
    'common.month': 'oy',
    'common.year': 'yil',
    'common.day': 'kun',
    'common.today': 'Bugun',
    'common.yesterday': 'Kecha',
    'common.week': 'Hafta',
    'common.confirm': 'Tasdiqlash',
    'common.yes': 'Ha',
    'common.no': 'Yo\'q',
  },
  ru: {
    // Header & Navigation
    'site.title': 'Joy Bor - Платформа аренды',
    
    // Common
    'room.single': 'Одноместная',
    'room.shared': 'Двухместная',
    'room.family': 'Семейная',
    'nav.home': 'Главная',
    'nav.listings': 'Мои объявления',
    'nav.chat': 'Сообщения',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'nav.logout': 'Выйти',
    'lang.switch': 'O\'zbekcha',
    
    // Listings
    'listings.title': 'Мои объявления',
    'listings.add.new': 'Добавить объявление',
    'listings.edit': 'Редактировать',
    'listings.delete': 'Удалить',
    'listings.view': 'Просмотр',
    'listings.status.active': 'Активное',
    'listings.status.inactive': 'Неактивное',
    'listings.featured': 'Рекомендуемое',
    
    // Chat
    'chat.title': 'Сообщения',
    'chat.send': 'Отправить',
    'chat.type.message': 'Напишите сообщение...',
    'chat.no.conversations': 'Нет разговоров',
    
    // Profile
    'profile.title': 'Настройки профиля',
    'profile.personal.info': 'Личная информация',
    'profile.name': 'Полное имя',
    'profile.email': 'Email',
    'profile.phone': 'Телефон',
    'profile.telegram': 'Telegram',
    'profile.photo': 'Фото профиля',
    'profile.documents': 'Документы',
    'profile.passport': 'Паспорт',
    'profile.license': 'Лицензия',
    'profile.verification': 'Верификация',
    'profile.verified': 'Подтвержден',
    'profile.pending': 'Ожидает',
    'profile.save': 'Сохранить',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.success': 'Успешно!',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.view': 'Просмотр',
    'common.close': 'Закрыть',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Предыдущий',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.sort': 'Сортировка',
    'common.sum': 'сум',
    'common.month': 'месяц',
    'common.year': 'год',
    'common.day': 'день',
    'common.today': 'Сегодня',
    'common.yesterday': 'Вчера',
    'common.week': 'Неделя',
    'common.confirm': 'Подтвердить',
    'common.yes': 'Да',
    'common.no': 'Нет',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['uz', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};