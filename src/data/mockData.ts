import { Property, University, Application, DashboardStats } from '../types';

export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Toshkent Axborot Texnologiyalari Universiteti',
    nameRu: 'Ташкентский университет информационных технологий',
    location: 'Toshkent',
    locationRu: 'Ташкент'
  },
  {
    id: '2',
    name: 'O\'zbekiston Milliy Universiteti',
    nameRu: 'Национальный университет Узбекистана',
    location: 'Toshkent',
    locationRu: 'Ташкент'
  },
  {
    id: '3',
    name: 'Toshkent Irrigatsiya va Qishloq Xo\'jaligi Mexanizatsiyasi Instituti',
    nameRu: 'Ташкентский институт ирригации и механизации сельского хозяйства',
    location: 'Toshkent',
    locationRu: 'Ташкент'
  },
  {
    id: '4',
    name: 'Samarqand Davlat Universiteti',
    nameRu: 'Самаркандский государственный университет',
    location: 'Samarqand',
    locationRu: 'Самарканд'
  },
  {
    id: '5',
    name: 'Buxoro Davlat Universiteti',
    nameRu: 'Бухарский государственный университет',
    location: 'Buxoro',
    locationRu: 'Бухара'
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Zamonaviy xonadon TATU yaqinida',
    titleRu: 'Современная квартира рядом с TATU',
    description: 'Universitetdan 5 daqiqa masofada joylashgan zamonaviy xonadon. Barcha qulayliklar mavjud.',
    descriptionRu: 'Современная квартира в 5 минутах от университета. Все удобства в наличии.',
    price: 1200000,
    location: 'Chilonzor tumani, Toshkent',
    locationRu: 'Чиланзарский район, Ташкент',
    address: 'Chilonzor ko\'chasi, 15-uy',
    university: 'TATU',
    distanceFromUniversity: 0.5,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Konditsioner', 'Kir yuvish mashinasi', 'Oshxona', 'Parking'],
    amenitiesRu: ['WiFi', 'Кондиционер', 'Стиральная машина', 'Кухня', 'Парковка'],
    rating: 4.8,
    reviewCount: 24,
    roomType: 'shared',
    gender: 'coed',
    available: true,
    totalRooms: 4,
    availableRooms: 2,
    landlordId: '1',
    rules: ['Sigaret chekish taqiqlangan', 'Hayvon boqish mumkin emas', 'Kechqurun ovoz chiqarish taqiqlangan'],
    rulesRu: ['Курение запрещено', 'Животные не разрешены', 'Тишина после 22:00'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    status: 'active',
    featured: true
  },
  {
    id: '2',
    title: 'Qulay xonadon NUUz yaqinida',
    titleRu: 'Удобная квартира рядом с НУУз',
    description: 'Shahar markazida joylashgan qulay xonadon. Transport bog\'lanishi yaxshi.',
    descriptionRu: 'Удобная квартира в центре города. Хорошее транспортное сообщение.',
    price: 1500000,
    location: 'Olmazor tumani, Toshkent',
    locationRu: 'Алмазарский район, Ташкент',
    address: 'Olmazor ko\'chasi, 25-uy',
    university: 'NUUz',
    distanceFromUniversity: 0.8,
    images: [
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Issiq suv', 'Muzlatgich', 'Oshxona', 'Balkon'],
    amenitiesRu: ['WiFi', 'Горячая вода', 'Холодильник', 'Кухня', 'Балкон'],
    rating: 4.5,
    reviewCount: 18,
    roomType: 'single',
    gender: 'female',
    available: true,
    totalRooms: 2,
    availableRooms: 1,
    landlordId: '1',
    rules: ['Faqat qizlar uchun', 'Mehmon taqiqlangan', 'Toza saqlash majburiy'],
    rulesRu: ['Только для девушек', 'Гости запрещены', 'Обязательно содержать в чистоте'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    status: 'active',
    featured: false
  },
  {
    id: '3',
    title: 'Arzon xonadon TIQXMMI yaqinida',
    titleRu: 'Недорогая квартира рядом с ТИХММИ',
    description: 'Talabalar uchun qulay narxda xonadon. Asosiy qulayliklar mavjud.',
    descriptionRu: 'Квартира по доступной цене для студентов. Основные удобства в наличии.',
    price: 900000,
    location: 'Sergeli tumani, Toshkent',
    locationRu: 'Сергелийский район, Ташкент',
    address: 'Sergeli ko\'chasi, 10-uy',
    university: 'TIQXMMI',
    distanceFromUniversity: 1.2,
    images: [
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Issiq suv', 'Oshxona', 'Kir yuvish joyi'],
    amenitiesRu: ['WiFi', 'Горячая вода', 'Кухня', 'Место для стирки'],
    rating: 4.2,
    reviewCount: 12,
    roomType: 'shared',
    gender: 'male',
    available: false,
    totalRooms: 3,
    availableRooms: 0,
    landlordId: '1',
    rules: ['Faqat o\'g\'il talabalar', 'Sigaret chekish taqiqlangan', 'Kechqurun tinchlik'],
    rulesRu: ['Только для студентов мужского пола', 'Курение запрещено', 'Тишина вечером'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    status: 'active',
    featured: false
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    propertyId: '1',
    property: mockProperties[0],
    status: 'pending',
    submittedAt: new Date('2024-01-22'),
    studentInfo: {
      fullName: 'Aziza Karimova',
      email: 'aziza.karimova@student.uz',
      phone: '+998901234567',
      university: 'TATU',
      studyProgram: 'Kompyuter injinirligi',
      studentId: 'ST2024001'
    },
    moveInDate: new Date('2024-02-01'),
    duration: '1 yil',
    message: 'Assalomu alaykum! Men TATU 2-kurs talabasi. Xonadon juda yoqdi, ariza bermoqchiman.',
    documents: ['student_id.pdf', 'passport.pdf']
  },
  {
    id: '2',
    propertyId: '2',
    property: mockProperties[1],
    status: 'accepted',
    submittedAt: new Date('2024-01-20'),
    studentInfo: {
      fullName: 'Nilufar Saidova',
      email: 'nilufar.saidova@student.uz',
      phone: '+998901234568',
      university: 'NUUz',
      studyProgram: 'Matematika',
      studentId: 'ST2024002'
    },
    moveInDate: new Date('2024-02-15'),
    duration: '6 oy',
    message: 'Salom! Xonadon juda chiroyli ko\'rinadi. Qabul qilsangiz juda xursand bo\'laman.',
    landlordResponse: 'Assalomu alaykum! Arizangiz qabul qilindi. Ertaga uchrashib gaplashamiz.',
    documents: ['student_id.pdf']
  },
  {
    id: '3',
    propertyId: '1',
    property: mockProperties[0],
    status: 'rejected',
    submittedAt: new Date('2024-01-18'),
    studentInfo: {
      fullName: 'Bekzod Alimov',
      email: 'bekzod.alimov@student.uz',
      phone: '+998901234569',
      university: 'TATU',
      studyProgram: 'Dasturiy injiniring',
      studentId: 'ST2024003'
    },
    moveInDate: new Date('2024-01-25'),
    duration: '1 yil',
    message: 'Salom! Bu xonadon menga juda mos keladi. Ariza beraman.',
    landlordResponse: 'Kechirasiz, boshqa talaba tanlandi.',
    documents: ['student_id.pdf', 'passport.pdf']
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 3,
  activeProperties: 3,
  totalApplications: 15,
  pendingApplications: 5,
  acceptedApplications: 8,
  monthlyRevenue: 4500000,
  occupancyRate: 75
};

export const regions = [
  { value: 'toshkent', label: 'Toshkent', labelRu: 'Ташкент' },
  { value: 'samarqand', label: 'Samarqand', labelRu: 'Самарканд' },
  { value: 'buxoro', label: 'Buxoro', labelRu: 'Бухара' },
  { value: 'andijon', label: 'Andijon', labelRu: 'Андижан' },
  { value: 'fargona', label: 'Farg\'ona', labelRu: 'Фергана' },
  { value: 'namangan', label: 'Namangan', labelRu: 'Наманган' },
  { value: 'qashqadaryo', label: 'Qashqadaryo', labelRu: 'Кашкадарья' },
  { value: 'surxondaryo', label: 'Surxondaryo', labelRu: 'Сурхандарья' },
  { value: 'sirdaryo', label: 'Sirdaryo', labelRu: 'Сырдарья' },
  { value: 'jizzax', label: 'Jizzax', labelRu: 'Джизак' },
  { value: 'navoiy', label: 'Navoiy', labelRu: 'Навои' },
  { value: 'xorazm', label: 'Xorazm', labelRu: 'Хорезм' },
  { value: 'qoraqalpogiston', label: 'Qoraqalpog\'iston', labelRu: 'Каракалпакстан' }
];

export const roomTypes = [
  { value: 'single', label: '1 kishilik', labelRu: 'Одноместная' },
  { value: 'shared', label: '2 kishilik', labelRu: 'Двухместная' },
  { value: 'family', label: 'Oilaviy', labelRu: 'Семейная' }
];

export const genderOptions = [
  { value: 'male', label: 'Faqat o\'g\'il bolalar', labelRu: 'Только для мужчин' },
  { value: 'female', label: 'Faqat qizlar', labelRu: 'Только для женщин' },
  { value: 'coed', label: 'Aralash', labelRu: 'Смешанное' }
];