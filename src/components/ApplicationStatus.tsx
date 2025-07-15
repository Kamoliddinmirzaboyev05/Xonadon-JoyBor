import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, Phone, MessageCircle } from 'lucide-react';
import { Application } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ApplicationStatusProps {
  applications: Application[];
  onViewProperty: (propertyId: string) => void;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ applications, onViewProperty }) => {
  const { language, t } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'accepted':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={20} className="text-red-500" />;
      case 'expired':
        return <AlertCircle size={20} className="text-gray-500" />;
      default:
        return <Clock size={20} className="text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('application.status.pending');
      case 'accepted':
        return t('application.status.accepted');
      case 'rejected':
        return t('application.status.rejected');
      case 'expired':
        return t('application.status.expired');
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <AlertCircle size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Hech qanday ariza yo'q</h3>
        <p className="text-gray-600">Birinchi arizangizni yuboring!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t('nav.applications')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Stats */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div className="text-sm text-yellow-700">Ko'rilmoqda</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
            <div className="text-sm text-green-700">Qabul qilindi</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === 'rejected').length}
            </div>
            <div className="text-sm text-red-700">Rad etildi</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {applications.length}
            </div>
            <div className="text-sm text-gray-700">Jami</div>
          </div>
        </div>
      </div>

      {/* Application Cards */}
      <div className="space-y-4">
        {applications.map((application) => {
          const property = application.property;
          const title = language === 'uz' ? property.title : property.titleRu;
          const location = language === 'uz' ? property.location : property.locationRu;

          return (
            <div key={application.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Property Image */}
                <div className="lg:w-48 flex-shrink-0">
                  <img
                    src={property.images[0]}
                    alt={title}
                    className="w-full h-32 lg:h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-gray-600 text-sm">{location}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      {getStatusText(application.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Ariza berilgan sana</p>
                      <p className="font-medium">{application.submittedAt.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kirish sanasi</p>
                      <p className="font-medium">{application.moveInDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Muddati</p>
                      <p className="font-medium">{application.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Narx</p>
                      <p className="font-medium">{property.price.toLocaleString()} so'm</p>
                    </div>
                  </div>

                  {application.landlordResponse && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Uy egasining javobi:</p>
                      <p className="text-sm text-gray-600">{application.landlordResponse}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onViewProperty(property.id)}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={16} />
                      Xonadonni ko'rish
                    </button>
                    <a
                      href={`tel:${property.landlord.phone}`}
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      <Phone size={16} />
                      Qo'ng'iroq qilish
                    </a>
                    <a
                      href={`https://t.me/${property.landlord.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      <MessageCircle size={16} />
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationStatus;