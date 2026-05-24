import React from 'react';
import { Link } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import { useLanguage } from '../context/LanguageContext';

const RemoveBG = () => {
  const { t } = useLanguage();
  const samples = [
    { id: 1, thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=200&auto=format&fit=crop' }, // Film/Studio
    { id: 2, thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop' }, // City/Traffic
    { id: 3, thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=200&auto=format&fit=crop' }, // Nature/Water
    { id: 4, thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=200&auto=format&fit=crop' }, // Movie
  ];

  const renderSubtitle = (subtitle) => {
    if (subtitle.includes('Free')) {
      const parts = subtitle.split('Free');
      return (
        <>
          {parts[0]}
          <span className="text-[#0047FF]">Free</span>
          {parts[1]}
        </>
      );
    }
    if (subtitle.includes('무료')) {
      const parts = subtitle.split('무료');
      return (
        <>
          {parts[0]}
          <span className="text-[#0047FF]">무료</span>
          {parts[1]}
        </>
      );
    }
    return subtitle;
  };

  return (
    <div className="min-h-[80vh] bg-white flex flex-col items-center pt-14 md:pt-24 px-6 pb-24">

      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Header Section - Centered */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-[#2D2D2D] tracking-tight leading-tight mb-4">
            {t('videoObjectRemover.title1')} {t('videoObjectRemover.title2')}
          </h1>
          <p className="text-base md:text-lg font-bold text-[#404040]">
            {renderSubtitle(t('videoObjectRemover.subtitle'))}
          </p>
        </div>

        {/* Functional Upload Container */}
        <div className="w-full mb-12">
          <UploadBox type="video" />
        </div>

        {/* Footer/Samples Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 text-[#555555] font-bold text-[14px]">
              <span className="text-center">{t('videoObjectRemover.noVideo')} <br className="hidden md:block" />{t('videoObjectRemover.trySample')}</span>
              <div className="flex gap-2">
                {samples.map((sample) => (
                  <div
                    key={sample.id}
                    className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group cursor-pointer"
                  >
                    <img src={sample.thumbnail} alt="sample video thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black">
                        <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-xl mx-auto">
            By uploading a video you hereby agree to our <Link to="/terms" className="text-[#0047FF] hover:underline">Terms of Service</Link>. This site is protected by reCAPTCHA and the Google <Link to="/privacy" className="text-[#0047FF] hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-[#0047FF] hover:underline">Terms of Service</Link> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RemoveBG;
