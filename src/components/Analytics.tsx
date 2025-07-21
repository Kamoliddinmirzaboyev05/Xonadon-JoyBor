import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Home, 
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockDashboardStats, mockProperties, mockApplications } from '../data/mockData';
import { Helmet } from 'react-helmet-async';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const stats = mockDashboardStats;

  // Mock data for charts
  const revenueData = [
    { month: 'Yan', amount: 3200000 },
    { month: 'Fev', amount: 3800000 },
    { month: 'Mar', amount: 4100000 },
    { month: 'Apr', amount: 3900000 },
    { month: 'May', amount: 4500000 },
    { month: 'Iyun', amount: 4500000 },
  ];

  const applicationData = [
    { month: 'Yan', applications: 8, accepted: 5 },
    { month: 'Fev', applications: 12, accepted: 8 },
    { month: 'Mar', applications: 15, accepted: 10 },
    { month: 'Apr', amount: 10, accepted: 7 },
    { month: 'May', amount: 18, accepted: 12 },
    { month: 'Iyun', amount: 15, accepted: 8 },
  ];

  const propertyPerformance = mockProperties.map(property => ({
    ...property,
    views: Math.floor(Math.random() * 500) + 100,
    applications: Math.floor(Math.random() * 20) + 5,
    revenue: property.price * (property.totalRooms - property.availableRooms)
  }));

  const maxRevenue = Math.max(...revenueData.map(d => d.amount));
  const maxApplications = Math.max(...applicationData.map(d => d.applications));

  return (
    <main>
      <Helmet>
        <title>Statistika | Joy Bor</title>
        <meta name="description" content="Xonadon va arizalar bo‘yicha statistik tahlil." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/analytics" />
      </Helmet>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Statistika va hisobotlar
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Biznesingiz haqida batafsil ma'lumot
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Bu hafta</option>
              <option value="month">Bu oy</option>
              <option value="quarter">Bu chorak</option>
              <option value="year">Bu yil</option>
            </select>
            <button className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              <Download size={14} />
              Hisobotni yuklash
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Jami daromad</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {(stats.monthlyRevenue / 1000000).toFixed(1)}M so'm
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400 font-medium">+12.5%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">o'tgan oyga nisbatan</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Band bo'lish darajasi</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.occupancyRate}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400 font-medium">+5.2%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">o'tgan oyga nisbatan</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Qabul qilingan arizalar</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.acceptedApplications}</p>
              </div>
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400 mr-1" />
              <span className="text-red-600 dark:text-red-400 font-medium">-2.1%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">o'tgan oyga nisbatan</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">O'rtacha javob vaqti</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">2.5 soat</p>
              </div>
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400 font-medium">Yaxshilandi</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">o'tgan oyga nisbatan</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Daromad grafigi</h2>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <div className="space-y-3">
              {revenueData.map((data, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 text-xs text-gray-600 dark:text-gray-400">{data.month}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.amount / maxRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-xs font-medium text-gray-900 dark:text-gray-100 text-right">
                    {(data.amount / 1000000).toFixed(1)}M
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Arizalar grafigi</h2>
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <div className="space-y-3">
              {applicationData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{data.month}</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {data.accepted}/{data.applications}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-green-500 dark:bg-green-400 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(data.accepted / data.applications) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-gray-400 dark:bg-gray-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${((data.applications - data.accepted) / data.applications) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Qabul qilingan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Rad etilgan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Xonadonlar samaradorligi</h2>
              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                <Filter size={14} />
                Filtr
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Xonadon</th>
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Ko'rishlar</th>
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Arizalar</th>
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Band bo'lish</th>
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Daromad</th>
                    <th className="pb-3 text-xs font-medium text-gray-600 dark:text-gray-400">Reyting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {propertyPerformance.slice(0, 5).map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{property.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{property.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{property.views}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{property.applications}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full"
                              style={{ 
                                width: `${((property.totalRooms - property.availableRooms) / property.totalRooms) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {Math.round(((property.totalRooms - property.availableRooms) / property.totalRooms) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {(property.revenue / 1000000).toFixed(1)}M so'm
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{property.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 ${
                                  i < Math.floor(property.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                }`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;