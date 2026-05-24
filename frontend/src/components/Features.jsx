import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, CircleDashed, Maximize } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const featuresData = [
  {
    id: 'background',
    nameKey: 'nav.greenScreen',
    icon: ImageIcon,
    before: 'https://res.cloudinary.com/demo/image/upload/docs/headphones.jpg',
    after: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/headphones.png',
    afterBg: 'bg-gradient-to-tr from-pink-200 to-purple-300',
    translationKey: 'home.features.bg'
  },
  {
    id: 'enhance',
    nameKey: 'nav.upscaling',
    icon: Sparkles,
    before: 'https://res.cloudinary.com/demo/image/upload/e_blur:300/kitten.jpg',
    after: 'https://res.cloudinary.com/demo/image/upload/kitten.jpg',
    afterBg: 'bg-gray-100',
    translationKey: 'home.features.enhance'
  },
  {
    id: 'shadow',
    nameKey: 'nav.batch',
    icon: CircleDashed,
    before: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/chair.png',
    after: 'https://res.cloudinary.com/demo/image/upload/e_shadow,x_20,y_20,co_black,o_40/e_background_removal/docs/chair.png',
    afterBg: 'bg-gray-100',
    beforeBg: 'bg-gray-100',
    translationKey: 'home.features.shadow'
  },
  {
    id: 'upscale',
    nameKey: 'nav.upscaling',
    icon: Maximize,
    before: 'https://res.cloudinary.com/demo/image/upload/w_200,e_pixelate:5/bird.jpg',
    after: 'https://res.cloudinary.com/demo/image/upload/bird.jpg',
    afterBg: 'bg-gray-100',
    translationKey: 'home.features.upscale'
  }
];

const ImageSlider = ({ beforeImage, afterImage, beforeBg, afterBg }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className={`relative w-full aspect-square rounded-[2rem] overflow-hidden select-none bg-gray-100 border border-gray-100 shadow-sm`}>
      <div className={`absolute inset-0 w-full h-full ${afterBg || 'bg-gray-100'}`}>
        <img src={afterImage} className="absolute inset-0 w-full h-full object-cover" draggable="false" />
      </div>
      <div 
        className={`absolute inset-0 w-full h-full ${beforeBg || 'bg-gray-100'}`} 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} className="absolute inset-0 w-full h-full object-cover" draggable="false" />
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition}
        onChange={(e) => setSliderPosition(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white/40 backdrop-blur-md border border-white rounded-full flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow">
            <path d="M13 17l5-5-5-5"/>
            <path d="M11 17l-5-5 5-5"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(featuresData[0].id);
  const activeFeature = featuresData.find(f => f.id === activeTab);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="w-full max-w-[1000px] mx-auto px-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          {featuresData.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-[13px] md:text-sm font-bold transition-all ${
                  isActive
                    ? 'border-[#0047FF] text-[#0047FF] bg-white shadow-sm'
                    : 'border-gray-200 text-[#737373] bg-white hover:border-gray-300 hover:text-[#404040]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0047FF]' : 'text-[#737373]'}`} />
                {t(`${tab.translationKey}.title`)}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="w-full max-w-sm mx-auto md:max-w-none">
            <ImageSlider 
              key={activeFeature.id}
              beforeImage={activeFeature.before}
              afterImage={activeFeature.after}
              beforeBg={activeFeature.beforeBg}
              afterBg={activeFeature.afterBg}
            />
          </div>

          <div className="w-full">
            <h3 className="text-3xl md:text-4xl font-black text-[#404040] mb-6 tracking-tight">
              {t(`${activeFeature.translationKey}.title`)}
            </h3>
            <p className="text-[#555555] font-medium leading-relaxed mb-6 text-sm md:text-base">
              {t(`${activeFeature.translationKey}.desc1`)}
            </p>
            {t(`${activeFeature.translationKey}.desc2`) && (
              <p className="text-[#555555] font-medium leading-relaxed mb-10 text-sm md:text-base">
                {t(`${activeFeature.translationKey}.desc2`)}
              </p>
            )}
            <button className="bg-[#0047FF] hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-[0.8rem] transition-colors flex items-center gap-2 text-sm">
              {t('home.features.exploreBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
