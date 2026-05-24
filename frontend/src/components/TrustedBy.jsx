import React from 'react';

const TrustedBy = () => {
  const brands = [
    {
      name: "Visme",
      logo: (
        <div className="flex items-center gap-1.5 font-sans">
          <div className="flex flex-col gap-[2px]">
            <div className="flex gap-[2px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#39E09B]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFB039]"></div>
            </div>
            <div className="flex gap-[2px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#39C6FF]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF3939]"></div>
            </div>
          </div>
          <span className="font-bold text-[#404040] text-xl tracking-tight">visme</span>
        </div>
      )
    },
    {
      name: "PlanetART",
      logo: (
        <div className="font-serif italic font-bold text-[#404040] text-2xl tracking-tight">
          PlanetART
        </div>
      )
    },
    {
      name: "photoAiD",
      logo: (
        <div className="flex items-center gap-2 font-sans font-bold text-[#404040] text-xl">
          <div className="w-6 h-5 border-2 border-[#404040] rounded flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#404040]"></div>
          </div>
          photoAiD
        </div>
      )
    },
    {
      name: "ladipage",
      logo: (
        <div className="flex items-center gap-2 font-sans font-black text-[#404040] text-xl">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border-2 border-white"></div>
          </div>
          ladipage
        </div>
      )
    }
  ];

  return (
    <section className="py-10 bg-white border-b border-gray-50 overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-12 mb-10 text-center">
        <h2 className="text-[15px] font-black text-[#404040] uppercase tracking-[0.2em] leading-none">
          TRUSTED BY GLOBAL BRANDS
        </h2>
      </div>
      
      <div className="relative w-full overflow-hidden flex items-center h-16 bg-white">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

        {/* Continuous Marquee Animation */}
        <div className="flex animate-marquee whitespace-nowrap">
          {/* We repeat the set multiple times to ensure full coverage on all screen sizes */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center shrink-0">
               {brands.map((brand, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center justify-center px-10 md:px-16 opacity-80 hover:opacity-100 transition-opacity duration-300">
                    <div className="scale-90 md:scale-100">
                      {brand.logo}
                    </div>
                  </div>
               ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedBy;
