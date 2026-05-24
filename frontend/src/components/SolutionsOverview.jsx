import React, { useState } from 'react';
import { User, Camera, Megaphone, Code, ShoppingCart, Building, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const solutions = [
  {
    id: 'individuals',
    nameKey: 'home.solutions.individuals',
    icon: User,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
    title: 'Individuals',
    desc: 'Ever spend hours tweaking your selfies? Our AI fixes, upscales, and perfects your photos in seconds—so you can just snap, upload, and share!',
    linkText: 'Read Individual'
  },
  {
    id: 'photographers',
    nameKey: 'home.solutions.photographers',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1600&auto=format&fit=crop',
    title: 'Photographers',
    desc: 'Focus on the art of photography while our AI handles the tedious background removal and enhancement tasks with pixel-perfect precision.',
    linkText: 'Read Photographer'
  },
  {
    id: 'marketers',
    nameKey: 'home.solutions.marketers',
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1600&auto=format&fit=crop',
    title: 'Marketers',
    desc: 'Struggling to produce on-brand visuals at scale? Our AI converts text into polished images, logos & backgrounds in seconds—empowering enterprise campaigns with instant ROI.',
    linkText: 'Read Marketers'
  },
  {
    id: 'developers',
    nameKey: 'home.solutions.developers',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    title: 'Developers',
    desc: 'Need scalable image editing? Our API integrates seamlessly for enterprise bulk processing. Automate editing & enhancing—finish fast without slowing dev cycles.',
    linkText: 'Read Developers'
  },
  {
    id: 'ecommerce',
    nameKey: 'home.solutions.ecommerce',
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
    title: 'Ecommerce',
    desc: 'Boost your sales with professional product photos. Remove backgrounds and add realistic shadows automatically at scale.',
    linkText: 'Read Ecommerce'
  },
  {
    id: 'enterprise',
    nameKey: 'home.solutions.enterprise',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
    title: 'Enterprise',
    desc: 'Custom solutions for high-volume needs. Dedicated support, on-premise deployment, and tailored AI models.',
    linkText: 'Read Enterprise'
  }
];

const SolutionsOverview = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState('developers'); 
  const activeSolution = solutions.find(s => s.id === activeId);

  return (
    <section className="py-16 bg-white overflow-hidden font-sans">
      {/* Heading Section */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 text-center mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#404040] mb-3 tracking-tight leading-[1.1]">
          {t('home.oneAiTitle')}
        </h2>
        <p className="text-sm md:text-base text-[#555555] font-medium leading-relaxed mb-6 max-w-[850px] mx-auto opacity-90">
          {t('home.oneAiDesc')}
        </p>
      </div>


      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          
          {/* Left Side Buttons */}
          <div className="flex flex-col gap-4 w-full lg:w-56">
            {solutions.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-200 text-left ${
                  activeId === item.id 
                  ? 'border-transparent bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] text-[#0047FF]' 
                  : 'border-transparent bg-white text-[#737373] hover:shadow-lg'
                }`}
              >
                <item.icon size={18} className={activeId === item.id ? 'text-[#0047FF]' : 'text-gray-400'} />
                <span className="text-[14px] font-bold tracking-tight">{t(item.nameKey)}</span>
              </button>
            ))}
          </div>

          {/* Center Image Container */}
          <div className="relative w-full max-w-2xl">
            {/* Main Rounded Image */}
            <div className="relative aspect-[1.5/1] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] bg-gray-50">
              <img 
                key={activeId}
                src={activeSolution.image} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt={t(activeSolution.nameKey)} 
              />
            </div>
            
            {/* Overlapping Info Card */}
            <div className="absolute -bottom-16 left-6 right-6 z-10">
              {/* Card Body */}
              <div className="bg-white rounded-[2rem] p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-50">
                <h3 className="text-xl font-black text-[#404040] mb-4 tracking-tight leading-none">
                  {t(activeSolution.nameKey)}
                </h3>
                <p className="text-[14px] text-[#555555] font-medium leading-[1.6] mb-8">
                  {activeSolution.desc}
                </p>
                <button className="text-[#0047FF] text-[14px] font-bold hover:underline transition-all">
                  Read {t(activeSolution.nameKey)}
                </button>
              </div>
            </div>

          </div>

          {/* Right Side Buttons */}
          <div className="flex flex-col gap-4 w-full lg:w-56">
            {solutions.slice(3).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-200 text-left ${
                  activeId === item.id 
                  ? 'border-transparent bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] text-[#0047FF]' 
                  : 'border-transparent bg-white text-[#737373] hover:shadow-lg'
                }`}
              >
                <item.icon size={18} className={activeId === item.id ? 'text-[#0047FF]' : 'text-gray-400'} />
                <span className="text-[14px] font-bold tracking-tight">{t(item.nameKey)}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
      
      {/* Bottom Spacer to account for overlapping card */}
      <div className="h-16"></div>
    </section>
  );
};

export default SolutionsOverview;
