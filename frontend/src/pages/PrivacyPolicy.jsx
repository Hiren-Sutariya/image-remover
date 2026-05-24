import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#404040] mb-8 tracking-tight">{t('legal.privacy.title')}</h1>
        <p className="text-[13px] text-gray-500 mb-12 italic font-medium">{t('legal.privacy.lastUpdated')}</p>

        <div className="prose prose-blue max-w-none space-y-10">
          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s1_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s1_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s2_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium mb-4">
              {t('legal.privacy.s2_text')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-[#555555] font-medium">
              {(t('legal.privacy.s2_list') || []).map((item, idx) => (
                <li key={idx}><strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s3_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s3_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s4_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s4_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s5_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s5_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s6_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s6_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s7_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s7_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s8_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s8_text')}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#404040] mb-3">{t('legal.privacy.s9_title')}</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-medium">
              {t('legal.privacy.s9_text')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
