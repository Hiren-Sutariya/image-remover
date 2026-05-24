import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, CreditCard, Code, Image, HelpCircle } from 'lucide-react';
import FAQ from '../components/FAQ';

const Help = () => {
  const { t } = useLanguage();

  const categories = [
    { id: 'account', icon: <CreditCard className="text-blue-500" />, label: t('helpPage.categories.account'), desc: t('helpPage.categories.account_desc') },
    { id: 'api', icon: <Code className="text-purple-500" />, label: t('helpPage.categories.api'), desc: t('helpPage.categories.api_desc') },
    { id: 'processing', icon: <Image className="text-green-500" />, label: t('helpPage.categories.processing'), desc: t('helpPage.categories.processing_desc') },
    { id: 'security', icon: <HelpCircle className="text-orange-500" />, label: t('helpPage.categories.security'), desc: t('helpPage.categories.security_desc') },
  ];

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header & Search */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-black text-[#404040] mb-8 tracking-tight">
            {t('helpPage.title')}
          </h1>
          <div className="max-w-2xl mx-auto relative group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0047FF] transition-colors" size={20} />
             <input 
              type="text" 
              placeholder={t('helpPage.search')}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-8 text-[#404040] font-bold focus:outline-none focus:bg-white focus:border-[#0047FF] focus:shadow-xl focus:shadow-blue-50/50 transition-all text-base"
             />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {categories.map((cat) => (
            <div key={cat.id} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(cat.icon, { size: 24 })}
              </div>
              <h3 className="text-lg font-black text-[#404040] mb-2">{cat.label}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">{cat.desc}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest group-hover:text-[#0047FF] transition-colors">Learn more</p>
            </div>
          ))}
        </div>

        {/* Redesigned FAQ Section */}
        <div className="mb-32">
           <div className="text-center mb-12">
             <h2 className="text-2xl md:text-3xl font-black text-[#404040] mb-4 tracking-tight">Most Popular Questions</h2>
             <p className="text-base text-[#555555] font-medium">Quick answers to common queries about Clearix AI.</p>
           </div>
           <FAQ />
        </div>

        {/* Still Need Help? */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-[#0047FF] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 cursor-pointer hover:scale-105 active:scale-95 transition-all text-sm">
             <HelpCircle size={20} />
             Still have questions? Contact Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
