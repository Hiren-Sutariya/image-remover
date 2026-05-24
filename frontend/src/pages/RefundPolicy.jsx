import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const RefundPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#404040] mb-8 tracking-tight">{t('refund.title')}</h1>
        <p className="text-[13px] text-gray-500 mb-12 italic font-medium">{t('refund.lastUpdated')}</p>

        <div className="prose prose-blue max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('refund.s1_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('refund.s1_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('refund.s2_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('refund.s2_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('refund.s3_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('refund.s3_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('refund.s4_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('refund.s4_text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
