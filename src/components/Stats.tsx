import React from 'react';
import { Users, Home, GraduationCap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Stats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: '10,000+',
      label: t('stats.students'),
      color: 'text-blue-600'
    },
    {
      icon: Home,
      number: '2,500+',
      label: t('stats.properties'),
      color: 'text-green-600'
    },
    {
      icon: GraduationCap,
      number: '50+',
      label: t('stats.universities'),
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      number: '98%',
      label: 'Muvaffaqiyat darajasi',
      color: 'text-amber-600'
    }
  ];

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;