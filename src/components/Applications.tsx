import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Phone, MessageCircle, Eye, Download, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockApplications } from '../data/mockData';
import { Application } from '../types';
import { Helmet } from 'react-helmet-async';

const Applications: React.FC = () => {
  const { language, t } = useLanguage();
  const [applications, setApplications] = useState(mockApplications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [responseText, setResponseText] = useState('');

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      case 'oldest':
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      default:
        return 0;
    }
  });

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
        return t('applications.pending');
      case 'accepted':
        return t('applications.accepted');
      case 'rejected':
        return t('applications.rejected');
      case 'expired':
        return t('applications.expired');
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

  const handleStatusChange = (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus, landlordResponse: responseText }
        : app
    ));
    setSelectedApplication(null);
    setResponseText('');
  };

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    expired: applications.filter(app => app.status === 'expired').length,
  };

  return (
    <main>
      <Helmet>
        <title>Arizalar | Joy Bor</title>
        <meta name="description" content="Talabalar arizalarini ko‘rish va boshqarish." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/applications" />
      </Helmet>
      <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Arizalar</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{applications.length} ta ariza</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-blue-500`}>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{statusCounts.all}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Jami arizalar</div>
          </div>
          <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-yellow-500`}>
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{statusCounts.pending}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('applications.pending')}</div>
          </div>
          <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-green-500`}>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{statusCounts.accepted}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('applications.accepted')}</div>
          </div>
          <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-red-500`}>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{statusCounts.rejected}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('applications.rejected')}</div>
          </div>
          <div className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border-l-4 border-gray-500`}>
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{statusCounts.expired}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('applications.expired')}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Barcha arizalar</option>
              <option value="pending">{t('applications.pending')}</option>
              <option value="accepted">{t('applications.accepted')}</option>
              <option value="rejected">{t('applications.rejected')}</option>
              <option value="expired">{t('applications.expired')}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Eng yangi</option>
              <option value="oldest">Eng eski</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Filter size={14} />
              Qo'shimcha filtrlar
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-8">
          {sortedApplications.map((application) => {
            const propertyTitle = language === 'uz' ? application.property.title : application.property.titleRu;
            const propertyLocation = language === 'uz' ? application.property.location : application.property.locationRu;

            return (
              <div key={application.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 dark:border dark:border-gray-700">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={application.property.images[0]}
                      alt={propertyTitle}
                      className="w-full h-32 lg:h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{propertyTitle}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{propertyLocation}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)} dark:${getStatusColor(application.status).replace('bg-', 'bg-').replace('text-', 'text-').replace('100', '900/50').replace('800', '300')}`}> {/* fallback for status color */}
                        {getStatusIcon(application.status)}
                        {getStatusText(application.status)}
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('applications.student.info')}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{application.studentInfo.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.studentInfo.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.studentInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('applications.university')}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{application.studentInfo.university}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.studentInfo.studyProgram}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('applications.move.date')}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{application.moveInDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('applications.duration')}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{application.duration}</p>
                      </div>
                    </div>

                    {/* Message */}
                    {application.message && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{t('applications.message')}:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{application.message}</p>
                      </div>
                    )}

                    {/* Landlord Response */}
                    {application.landlordResponse && (
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Sizning javobingiz:</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{application.landlordResponse}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${application.studentInfo.phone}`}
                        className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <Phone size={16} />
                        {t('applications.contact')}
                      </a>
                      <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <MessageCircle size={16} />
                        Telegram
                      </button>
                      <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <Download size={16} />
                        {t('applications.documents')}
                      </button>
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Eye size={16} />
                        Batafsil
                      </button>
                      
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(application.id, 'accepted')}
                            className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          >
                            <CheckCircle size={16} />
                            {t('applications.accept')}
                          </button>
                          <button
                            onClick={() => handleStatusChange(application.id, 'rejected')}
                            className="flex items-center gap-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          >
                            <XCircle size={16} />
                            {t('applications.reject')}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedApplications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <AlertCircle size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hech qanday ariza yo'q</h3>
            <p className="text-gray-600 dark:text-gray-400">Tanlangan filtr bo'yicha arizalar topilmadi.</p>
          </div>
        )}

        {/* Response Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('applications.response')}</h3>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Talabaga javob yozing..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApplication.id, 'accepted')}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t('applications.accept')}
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t('applications.reject')}
                </button>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Applications;