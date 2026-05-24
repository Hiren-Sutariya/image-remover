import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const GeneralTerms = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#404040] mb-8 tracking-tight">{t('generalTerms.title')}</h1>
        <p className="text-[13px] text-gray-500 mb-12 italic font-medium">{t('generalTerms.lastUpdated')}</p>

        <div className="prose prose-blue max-w-none space-y-10">
          <p className="text-base text-[#555555] font-bold leading-relaxed mb-8">
             {t('generalTerms.intro')}
          </p>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('generalTerms.s1_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('generalTerms.s1_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('generalTerms.s2_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('generalTerms.s2_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('generalTerms.s3_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('generalTerms.s3_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('generalTerms.s4_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('generalTerms.s4_text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GeneralTerms;
