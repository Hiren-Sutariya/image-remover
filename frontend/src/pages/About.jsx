import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Target, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-black text-[#404040] mb-6 tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-lg text-[#555555] font-medium leading-relaxed max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="bg-gray-50 rounded-[40px] p-12 border border-gray-100 aspect-video flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF]/5 to-transparent"></div>
             <Target className="w-20 h-20 text-[#0047FF] relative z-10" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#404040] mb-6 tracking-tight">{t('about.missionTitle')}</h2>
            <p className="text-base text-[#555555] font-medium leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>
        </div>

        {/* Journey Section */}
        <div className="bg-gray-50 rounded-[60px] p-12 md:p-20 mb-32 border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-black text-[#404040] mb-8 tracking-tight">{t('about.journeyTitle')}</h2>
            <p className="text-base text-[#555555] font-medium leading-relaxed italic">
              "{t('about.journeyText')}"
            </p>
          </div>
        </div>

        {/* Why Us Section */}
        <div className="mb-32">
          <h2 className="text-2xl font-black text-[#404040] mb-12 text-center tracking-tight">{t('about.whyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-[#0047FF]" />
              </div>
              <h4 className="text-lg font-bold text-[#404040] mb-4">{t('about.why1_title')}</h4>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{t('about.why1_text')}</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-[#404040] mb-4">{t('about.why2_title')}</h4>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{t('about.why2_text')}</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="text-lg font-bold text-[#404040] mb-4">{t('about.why3_title')}</h4>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{t('about.why3_text')}</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
              <h4 className="text-lg font-bold text-[#404040] mb-4">{t('about.why4_title')}</h4>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{t('about.why4_text')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
