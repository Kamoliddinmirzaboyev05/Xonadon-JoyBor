import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Eye,
  Edit,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockDashboardStats, mockProperties, mockApplications } from '../data/mockData';
import { Property } from '../types';
import { Helmet } from 'react-helmet-async';

interface DashboardProps {
  onAddProperty: () => void;
  onEditProperty: (property: Property) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddProperty, onEditProperty }) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = mockDashboardStats;
  const recentProperties = mockProperties.slice(0, 3);
  const recentApplications = mockApplications.slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'accepted':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  return (
    <main>
      <Helmet>
        <title>Dashboard | Joy Bor</title>
        <meta name="description" content="Boshqaruv paneli: xonadonlaringiz va arizalaringiz statistikasi." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/dashboard" />
      </Helmet>
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Xush kelibsiz, {user?.name}!
      </h1>
      <section>
        <h2 className="text-lg font-semibold mb-4">Statistika</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Jami xonadonlar</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.totalProperties}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-green-600 dark:text-green-400 font-medium">+2</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">bu oyda</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Faol xonadonlar</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.activeProperties}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">
                {Math.round((stats.activeProperties / stats.totalProperties) * 100)}% faol
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Kutilayotgan arizalar</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingApplications}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">Javob kutmoqda</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Oylik daromad</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {(stats.monthlyRevenue / 1000000).toFixed(1)}M so'm
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400 mr-1" />
              <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">o'tgan oyga nisbatan</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">So'nggi xonadonlar</h2>
              <button
                onClick={onAddProperty}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
              >
                <Plus size={14} />
                Yangi qo'shish
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{property.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{property.location}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {(property.price / 1000000).toFixed(1)}M so'm/oy
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-400" fill="currentColor" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditProperty(property)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">So'nggi arizalar</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                Barchasini ko'rish
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{application.studentInfo.fullName}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{application.property.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {application.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      application.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
                      application.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                      'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                    }`}>
                      {application.status === 'pending' ? 'Kutilmoqda' :
                       application.status === 'accepted' ? 'Qabul qilindi' : 'Rad etildi'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Tezkor amallar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={onAddProperty}
            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Yangi xonadon</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">E'lon berish</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Arizalarni ko'rish</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Javob berish</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Statistika</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Hisobotlar</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;