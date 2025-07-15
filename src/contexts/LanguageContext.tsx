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
    'site.title': 'Xonadon.uz - Uy egalar uchun',
    'nav.dashboard': 'Boshqaruv paneli',
    'nav.properties': 'Xonadonlar',
    'nav.applications': 'Arizalar',
    'nav.analytics': 'Statistika',
    'nav.profile': 'Profil',
    'nav.login': 'Kirish',
    'nav.logout': 'Chiqish',
    'lang.switch': 'Русский',
    
    // Dashboard
    'dashboard.title': 'Boshqaruv paneli',
    'dashboard.welcome': 'Xush kelibsiz',
    'dashboard.stats.properties': 'Jami xonadonlar',
    'dashboard.stats.active': 'Faol xonadonlar',
    'dashboard.stats.applications': 'Jami arizalar',
    'dashboard.stats.pending': 'Kutilayotgan arizalar',
    'dashboard.stats.accepted': 'Qabul qilingan',
    'dashboard.stats.revenue': 'Oylik daromad',
    'dashboard.stats.occupancy': 'Band bo\'lish darajasi',
    'dashboard.recent.applications': 'So\'nggi arizalar',
    'dashboard.recent.properties': 'So\'nggi xonadonlar',
    
    // Properties
    'properties.title': 'Mening xonadonlarim',
    'properties.add.new': 'Yangi xonadon qo\'shish',
    'properties.edit': 'Tahrirlash',
    'properties.delete': 'O\'chirish',
    'properties.view': 'Ko\'rish',
    'properties.status.active': 'Faol',
    'properties.status.inactive': 'Nofaol',
    'properties.status.pending': 'Kutilmoqda',
    'properties.featured': 'Tavsiya etilgan',
    'properties.available.rooms': 'Bo\'sh xonalar',
    'properties.total.rooms': 'Jami xonalar',
    
    // Add/Edit Property
    'property.form.title': 'Xonadon ma\'lumotlari',
    'property.form.basic.info': 'Asosiy ma\'lumotlar',
    'property.form.title.uz': 'Sarlavha (O\'zbekcha)',
    'property.form.title.ru': 'Sarlavha (Ruscha)',
    'property.form.description.uz': 'Tavsif (O\'zbekcha)',
    'property.form.description.ru': 'Tavsif (Ruscha)',
    'property.form.price': 'Oylik narx (so\'m)',
    'property.form.location': 'Joylashuv',
    'property.form.address': 'Aniq manzil',
    'property.form.university': 'Yaqin universitet',
    'property.form.distance': 'Universitetgacha masofa (km)',
    'property.form.room.type': 'Xona turi',
    'property.form.gender': 'Jins',
    'property.form.total.rooms': 'Jami xonalar soni',
    'property.form.available.rooms': 'Bo\'sh xonalar soni',
    'property.form.amenities': 'Qulayliklar',
    'property.form.rules.uz': 'Qoidalar (O\'zbekcha)',
    'property.form.rules.ru': 'Qoidalar (Ruscha)',
    'property.form.images': 'Rasmlar',
    'property.form.featured': 'Tavsiya etilgan sifatida belgilash',
    'property.form.save': 'Saqlash',
    'property.form.cancel': 'Bekor qilish',
    
    // Applications
    'applications.title': 'Talabalar arizalari',
    'applications.pending': 'Kutilayotgan',
    'applications.accepted': 'Qabul qilingan',
    'applications.rejected': 'Rad etilgan',
    'applications.expired': 'Muddati tugagan',
    'applications.student.info': 'Talaba ma\'lumotlari',
    'applications.university': 'Universitet',
    'applications.program': 'Ta\'lim yo\'nalishi',
    'applications.move.date': 'Kirish sanasi',
    'applications.duration': 'Muddati',
    'applications.message': 'Xabar',
    'applications.documents': 'Hujjatlar',
    'applications.response': 'Javob berish',
    'applications.accept': 'Qabul qilish',
    'applications.reject': 'Rad etish',
    'applications.contact': 'Bog\'lanish',
    
    // Analytics
    'analytics.title': 'Statistika va hisobotlar',
    'analytics.overview': 'Umumiy ko\'rinish',
    'analytics.revenue.chart': 'Daromad grafigi',
    'analytics.applications.chart': 'Arizalar grafigi',
    'analytics.occupancy.rate': 'Band bo\'lish darajasi',
    'analytics.popular.properties': 'Mashhur xonadonlar',
    
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
    'site.title': 'Xonadon.uz - Для арендодателей',
    'nav.dashboard': 'Панель управления',
    'nav.properties': 'Недвижимость',
    'nav.applications': 'Заявки',
    'nav.analytics': 'Аналитика',
    'nav.profile': 'Профиль',
    'nav.login': 'Войти',
    'nav.logout': 'Выйти',
    'lang.switch': 'O\'zbekcha',
    
    // Dashboard
    'dashboard.title': 'Панель управления',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.stats.properties': 'Всего объектов',
    'dashboard.stats.active': 'Активных объектов',
    'dashboard.stats.applications': 'Всего заявок',
    'dashboard.stats.pending': 'Ожидающих заявок',
    'dashboard.stats.accepted': 'Принятых',
    'dashboard.stats.revenue': 'Месячный доход',
    'dashboard.stats.occupancy': 'Уровень заполненности',
    'dashboard.recent.applications': 'Последние заявки',
    'dashboard.recent.properties': 'Последние объекты',
    
    // Properties
    'properties.title': 'Моя недвижимость',
    'properties.add.new': 'Добавить новый объект',
    'properties.edit': 'Редактировать',
    'properties.delete': 'Удалить',
    'properties.view': 'Просмотр',
    'properties.status.active': 'Активный',
    'properties.status.inactive': 'Неактивный',
    'properties.status.pending': 'Ожидает',
    'properties.featured': 'Рекомендуемый',
    'properties.available.rooms': 'Свободных комнат',
    'properties.total.rooms': 'Всего комнат',
    
    // Add/Edit Property
    'property.form.title': 'Информация об объекте',
    'property.form.basic.info': 'Основная информация',
    'property.form.title.uz': 'Заголовок (Узбекский)',
    'property.form.title.ru': 'Заголовок (Русский)',
    'property.form.description.uz': 'Описание (Узбекский)',
    'property.form.description.ru': 'Описание (Русский)',
    'property.form.price': 'Месячная цена (сум)',
    'property.form.location': 'Расположение',
    'property.form.address': 'Точный адрес',
    'property.form.university': 'Ближайший университет',
    'property.form.distance': 'Расстояние до университета (км)',
    'property.form.room.type': 'Тип комнаты',
    'property.form.gender': 'Пол',
    'property.form.total.rooms': 'Общее количество комнат',
    'property.form.available.rooms': 'Количество свободных комнат',
    'property.form.amenities': 'Удобства',
    'property.form.rules.uz': 'Правила (Узбекский)',
    'property.form.rules.ru': 'Правила (Русский)',
    'property.form.images': 'Изображения',
    'property.form.featured': 'Отметить как рекомендуемый',
    'property.form.save': 'Сохранить',
    'property.form.cancel': 'Отмена',
    
    // Applications
    'applications.title': 'Заявки студентов',
    'applications.pending': 'Ожидающие',
    'applications.accepted': 'Принятые',
    'applications.rejected': 'Отклоненные',
    'applications.expired': 'Истекшие',
    'applications.student.info': 'Информация о студенте',
    'applications.university': 'Университет',
    'applications.program': 'Направление обучения',
    'applications.move.date': 'Дата заселения',
    'applications.duration': 'Срок',
    'applications.message': 'Сообщение',
    'applications.documents': 'Документы',
    'applications.response': 'Ответить',
    'applications.accept': 'Принять',
    'applications.reject': 'Отклонить',
    'applications.contact': 'Связаться',
    
    // Analytics
    'analytics.title': 'Аналитика и отчеты',
    'analytics.overview': 'Обзор',
    'analytics.revenue.chart': 'График доходов',
    'analytics.applications.chart': 'График заявок',
    'analytics.occupancy.rate': 'Уровень заполненности',
    'analytics.popular.properties': 'Популярные объекты',
    
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