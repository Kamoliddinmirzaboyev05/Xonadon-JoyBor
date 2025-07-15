import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Home, Eye, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockDashboardStats } from '../data/mockData';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const stats = mockDashboardStats;

  // Mock data for charts
  const revenueData = [
    { month: 'Yanvar', revenue: 3200000 },
    { month: 'Fevral', revenue: 3800000 },
    { month: 'Mart', revenue: 4200000 },
    { month: 'Aprel', revenue: 4500000 },
    { month: 'May', revenue: 4800000 },
    { month: 'Iyun', revenue: 5200000 },
  ];

  const applicationData = [
    { month: 'Yanvar', applications: 12 },
    { month: 'Fevral', applications: 18 },
    { month: 'Mart', applications: 25 },
    { month: 'Aprel', applications: 22 },
    { month: 'May', revenue: 28 },
    { month: 'Iyun', applications: 32 },
  ];

  const popularProperties = [
    { name: 'Zamonaviy xonadon TATU yaqinida', views: 245, applications: 12 },
    { name: 'Qulay xonadon NUUz yaqinida', views: 189, applications: 8 },
    { name: 'Arzon xonadon TIQXMMI yaqinida', views: 156, applications: 6 },
  ];

  const kpiCards = [
    {
      title: 'Jami daromad',
      value: `${stats.monthlyRevenue.toLocaleString()} so'm`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Band bo\'lish darajasi',
      value: `${stats.occupancyRate}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Oylik arizalar',
      value: '32',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'O\'rtacha javob vaqti',
      value: '2.5 soat',
      change: '-15.4%',
      trend: 'down',
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('analytics.title')}</h1>
        <p className="text-gray-600">Biznes ko'rsatkichlari va hisobotlar</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <kpi.icon size={24} className={kpi.color} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {kpi.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('analytics.revenue.chart')}</h2>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.month}</span>
                <div className="flex items-center flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(data.revenue / 5200000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data.revenue.toLocaleString()} so'm
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('analytics.applications.chart')}</h2>
          <div className="space-y-4">
            {applicationData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.month}</span>
                <div className="flex items-center flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(data.applications / 32) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data.applications} ta
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Properties */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('analytics.popular.properties')}</h2>
          <div className="space-y-4">
            {popularProperties.map((property, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{property.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Eye size={14} className="mr-1" />
                      {property.views} ko'rishlar
                    </span>
                    <span className="text-sm text-gray-600 flex items-center">
                      <Users size={14} className="mr-1" />
                      {property.applications} arizalar
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">
                    {((property.applications / property.views) * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">konversiya</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('analytics.occupancy.rate')}</h2>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.occupancyRate}%</div>
            <p className="text-gray-600">Umumiy band bo'lish darajasi</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Faol xonadonlar</span>
              <span className="text-sm font-medium text-gray-900">{stats.activeProperties}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Band xonalar</span>
              <span className="text-sm font-medium text-gray-900">6/8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bo'sh xonalar</span>
              <span className="text-sm font-medium text-gray-900">2/8</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Tavsiyalar</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Bo'sh xonalar uchun narxni kamaytiring</li>
              <li>• Yangi qulayliklar qo'shing</li>
              <li>• Marketing faoliyatini kuchaytiring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Umumiy xulosalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">Yaxshi</div>
            <p className="text-sm text-green-700">Daromad o'sishi</p>
            <p className="text-xs text-green-600 mt-1">Oldingi oyga nisbatan +12.5%</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">O'rtacha</div>
            <p className="text-sm text-blue-700">Band bo'lish darajasi</p>
            <p className="text-xs text-blue-600 mt-1">75% - yaxshilash mumkin</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600 mb-2">Diqqat</div>
            <p className="text-sm text-amber-700">Javob berish vaqti</p>
            <p className="text-xs text-amber-600 mt-1">Tezroq javob bering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;