import React from 'react';
import { Home, FileText, Users, DollarSign, TrendingUp, Clock, CheckCircle, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockDashboardStats, mockApplications, mockProperties } from '../data/mockData';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const stats = mockDashboardStats;
  const recentApplications = mockApplications.slice(0, 3);
  const recentProperties = mockProperties.slice(0, 3);

  const statsCards = [
    {
      title: t('dashboard.stats.properties'),
      value: stats.totalProperties,
      icon: Home,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: t('dashboard.stats.active'),
      value: stats.activeProperties,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: t('dashboard.stats.applications'),
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: t('dashboard.stats.pending'),
      value: stats.pendingApplications,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: t('dashboard.stats.revenue'),
      value: `${stats.monthlyRevenue.toLocaleString()} ${t('common.sum')}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: t('dashboard.stats.occupancy'),
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('applications.pending');
      case 'accepted':
        return t('applications.accepted');
      case 'rejected':
        return t('applications.rejected');
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Bugun {new Date().toLocaleDateString('uz-UZ', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('dashboard.recent.applications')}
            </h2>
            <button
              onClick={() => onViewChange('applications')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Barchasini ko'rish
            </button>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{application.studentInfo.fullName}</h3>
                  <p className="text-sm text-gray-600">{application.property.title}</p>
                  <p className="text-xs text-gray-500">
                    {application.submittedAt.toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                  {getStatusText(application.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('dashboard.recent.properties')}
            </h2>
            <button
              onClick={() => onViewChange('properties')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Barchasini ko'rish
            </button>
          </div>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm font-medium text-blue-600">
                    {property.price.toLocaleString()} {t('common.sum')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {property.availableRooms}/{property.totalRooms} bo'sh
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tezkor amallar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onViewChange('properties')}
            className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Yangi xonadon qo'shish
          </button>
          <button
            onClick={() => onViewChange('applications')}
            className="flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FileText size={20} className="mr-2" />
            Arizalarni ko'rish
          </button>
          <button
            onClick={() => onViewChange('analytics')}
            className="flex items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TrendingUp size={20} className="mr-2" />
            Statistikani ko'rish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;