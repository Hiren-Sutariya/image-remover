import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Activity, ShieldCheck, Globe } from 'lucide-react';

const PlatformStatus = () => {
  const { t } = useLanguage();

  const systems = [
    { id: 'api', icon: <Activity className="text-[#0047FF]" />, name: t('status.systems.api'), status: t('status.operational') },
    { id: 'web', icon: <Globe className="text-[#0047FF]" />, name: t('status.systems.web'), status: t('status.operational') },
    { id: 'gpu', icon: <Activity className="text-[#0047FF]" />, name: t('status.systems.gpu'), status: t('status.operational') },
    { id: 'cdn', icon: <ShieldCheck className="text-[#0047FF]" />, name: t('status.systems.cdn'), status: t('status.operational') },
  ];

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-black text-[#404040] mb-4 tracking-tight">{t('status.title')}</h1>
          <p className="text-base text-[#555555] font-medium">{t('status.subtitle')}</p>
        </div>

        <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 mb-12">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-200/50">
             <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-lg font-black text-[#404040]">All Systems Operational</span>
          </div>

          <div className="space-y-6">
            {systems.map((system) => (
              <div key={system.id} className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                    {React.cloneElement(system.icon, { size: 20 })}
                  </div>
                  <span className="text-sm font-bold text-[#404040]">{system.name}</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-green-500" />
                   <span className="text-[13px] font-black text-green-500 uppercase tracking-wider">{system.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-10 border border-gray-100">
           <h2 className="text-xl font-black text-[#404040] mb-6">{t('status.incidents')}</h2>
           <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-gray-400 font-medium">{t('status.noIncidents')}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatus;
