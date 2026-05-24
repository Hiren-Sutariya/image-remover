import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye } from 'lucide-react';

const categoryData = {
  'People': {
    id: 'people',
    original: 'https://res.cloudinary.com/demo/image/upload/docs/model.jpg',
    cutout: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/model.png',
    bg: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop'
  },
  'Product': {
    id: 'product',
    original: 'https://res.cloudinary.com/demo/image/upload/docs/shoes.jpg',
    cutout: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/shoes.png',
    bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  'Animals': {
    id: 'animals',
    original: 'https://res.cloudinary.com/demo/image/upload/docs/dog.jpg',
    cutout: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/dog.png',
    bg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop'
  },
  'Real Estate': {
    id: 'realEstate',
    original: 'https://res.cloudinary.com/demo/image/upload/docs/house.jpg',
    cutout: 'https://res.cloudinary.com/demo/image/upload/e_background_removal/docs/house.png',
    bg: 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=800&auto=format&fit=crop'
  }
};

const Showcase = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('People');
  const [bgType, setBgType] = useState('transparent');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const tabs = Object.keys(categoryData);
  const activeData = categoryData[activeTab];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleSliderClick = (e) => {
    if (isDragging) return;
    handleMove(e.clientX);
  };

  const getAfterBgStyle = () => {
    switch (bgType) {
      case 'scene':
        return { backgroundImage: `url(${activeData.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' };
      case 'red':
        return { background: 'linear-gradient(135deg, #f43f5e, #be123c)' };
      case 'blue':
        return { background: 'linear-gradient(135deg, #0047FF, #1e3a8a)' };
      case 'dark':
        return { backgroundColor: '#1e293b' };
      default:
        return {};
    }
  };

  const bgOptions = [
    [
      { type: 'transparent', label: 'Transparent', swatch: 'custom-checkerboard border border-gray-200' },
      { type: 'scene',       label: 'Preset Scene', swatch: 'bg-slate-200 border border-slate-300' },
    ],
    [
      { type: 'red',  label: 'Rose Red',    swatch: 'bg-gradient-to-br from-rose-500 to-rose-600' },
      { type: 'blue', label: 'Clearix Blue', swatch: 'bg-gradient-to-br from-[#0047FF] to-blue-700' },
    ],
  ];

  return (
    <section className="py-24 bg-white font-sans border-t border-gray-50">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12">

        {/* Title Block */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#404040] mb-6 tracking-tight">
            {t('home.remove100Title')}
          </h2>
          <p className="text-sm md:text-base text-[#555555] font-medium max-w-4xl mx-auto leading-relaxed">
            {t('home.remove100Desc')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center border-b border-gray-100 mb-14 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 md:gap-12 px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] font-black whitespace-nowrap transition-all relative ${
                  activeTab === tab ? 'text-[#0047FF]' : 'text-[#737373] hover:text-[#404040]'
                }`}
              >
                {t(`home.tabs.${categoryData[tab].id}`)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0047FF] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Slider (left) + Change Background (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Before/After Slider */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:mx-0">
            <div
              ref={containerRef}
              onClick={handleSliderClick}
              className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 cursor-ew-resize select-none bg-gray-50"
            >
              {/* Background underlay for After side */}
              <div
                style={getAfterBgStyle()}
                className={`absolute inset-0 w-full h-full ${bgType === 'transparent' ? 'custom-checkerboard' : ''}`}
              />

              {/* After: cutout */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <img src={activeData.cutout} alt="Removed background" className="w-full h-full object-cover" />
              </div>

              {/* Before: original, clipped */}
              <div
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <img src={activeData.original} alt="Original" className="w-full h-full object-cover" />
              </div>

              {/* Draggable divider */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-ew-resize"
                onMouseDown={(e) => { e.stopPropagation(); setIsDragging(true); }}
                onTouchStart={(e) => { e.stopPropagation(); setIsDragging(true); }}
              >
                <div className="w-9 h-9 rounded-full bg-white shadow-xl border border-gray-200 flex items-center justify-center select-none scale-105 hover:scale-110 active:scale-95 transition-transform">
                  <Eye size={16} className="text-slate-500" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-black uppercase text-white tracking-widest pointer-events-none select-none z-10">
                Before
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#0047FF] rounded-xl text-[10px] font-black uppercase text-white tracking-widest pointer-events-none select-none z-10">
                After
              </div>
            </div>
          </div>

          {/* Right Column: Change Background */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            <div className="mb-2">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                Change Background
              </span>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Click any option below to instantly preview it on the cutout.
              </p>
            </div>

            {/* Rows 1 & 2: two columns each */}
            {bgOptions.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-2 gap-3 w-full">
                {row.map((btn) => (
                  <button
                    key={btn.type}
                    onClick={() => setBgType(btn.type)}
                    className={`px-4 py-3.5 text-xs font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all select-none hover:scale-[1.02] active:scale-[0.98] border-2 bg-white ${
                      bgType === btn.type
                        ? 'border-[#0047FF] shadow-md shadow-blue-50 text-slate-800'
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md shrink-0 ${btn.swatch}`} />
                    {btn.label}
                  </button>
                ))}
              </div>
            ))}

            {/* Row 3: Slate Dark — full width */}
            <button
              onClick={() => setBgType('dark')}
              className={`w-full px-4 py-3.5 text-xs font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all select-none hover:scale-[1.01] active:scale-[0.98] border-2 bg-white ${
                bgType === 'dark'
                  ? 'border-[#0047FF] shadow-md shadow-blue-50 text-slate-800'
                  : 'border-gray-100 text-gray-500 hover:border-gray-200'
              }`}
            >
              <div className="w-4 h-4 rounded-md shrink-0 bg-slate-700" />
              Slate Dark
            </button>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-checkerboard {
          background-color: #ffffff;
          background-image:
            linear-gradient(45deg, #f3f4f6 25%, transparent 25%),
            linear-gradient(-45deg, #f3f4f6 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f3f4f6 75%),
            linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
          background-size: 16px 16px;
          background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default Showcase;
