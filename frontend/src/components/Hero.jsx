import UploadBox from './UploadBox';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

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
    <section className="relative pt-20 lg:pt-28 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 to-white">
      <div className="w-full max-w-6xl px-8 md:px-12 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">

          {/* Left Column: Headings */}
          <div className="flex-1 w-full max-w-lg text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#404040] tracking-tight leading-[1.1] mb-6">
              {t('hero.title1')} <br className="hidden lg:block" />{t('hero.title2')}
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-[#555555] font-bold tracking-tight">
              {renderSubtitle(t('hero.subtitle'))}
            </p>
          </div>

          {/* Right Column: Upload Box Card & Sub-Content */}
          <div className="flex-1 w-full max-w-2xl flex flex-col items-center lg:items-start">
            {/* Upload Box Container */}
            <div className="relative w-full mb-6">
              {/* Subtle glow behind the card */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl z-0"></div>

              <div className="relative z-10 w-full">
                <UploadBox />
              </div>
            </div>

            {/* Sample Images section */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4 w-full">
              <span className="text-sm md:text-base text-gray-500 font-bold text-center lg:text-left">
                {t('hero.noVideo')} <br className="hidden sm:block" />{t('hero.trySample')}
              </span>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=100&auto=format&fit=crop" alt="Sample 1" className="w-full h-full object-cover" />
                </button>
                <button className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=100&auto=format&fit=crop" alt="Sample 2" className="w-full h-full object-cover" />
                </button>
                <button className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=100&auto=format&fit=crop" alt="Sample 3" className="w-full h-full object-cover" />
                </button>
                <button className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-md transition-all">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Sample 4" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Disclaimer Text */}
            <p className="text-[11px] text-gray-400 max-w-md text-center lg:text-left leading-relaxed">
              By uploading an image you hereby agree to our <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>. This site is protected by reCAPTCHA and the Google <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a> and <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a> apply.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
