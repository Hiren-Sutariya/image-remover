import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'KO', name: '한국어', flag: '🇰🇷' },
];

const Footer = () => {
  const { currentLang, setCurrentLang, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Find current language object
  const activeLang = languages.find(l => l.code === currentLang) || languages[0];

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-12 px-6 font-sans border-t border-gray-800">
      <div className="container mx-auto max-w-7xl">

        {/* Top Link Sections */}
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-12 w-full max-w-5xl">
            {/* Features column */}
            <div className="text-left">
              <h4 className="font-bold text-[15px] mb-8 tracking-tight uppercase text-gray-300">{t('footer.features')}</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-gray-400 font-medium">
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.upscale')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.shadow')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.deoldify')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.enhance')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.sky')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.food')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.grocery')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.furniture')}</Link></li>
              </ul>
            </div>

            {/* Solutions column */}
            <div className="text-left">
              <h4 className="font-bold text-[15px] mb-8 tracking-tight uppercase text-gray-300">{t('footer.solutions')}</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-gray-400 font-medium">
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.individuals')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.photographers')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.advertising')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.developers')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.carDealers')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.news')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.ecommerce')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.enterprise')}</Link></li>
              </ul>
            </div>

            {/* Tools & API column */}
            <div className="text-left">
              <h4 className="font-bold text-[15px] mb-8 tracking-tight uppercase text-gray-300">{t('footer.tools')}</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-gray-400 font-medium">
                <li><Link to="/docs" className="hover:text-white transition-colors">{t('footer.links.apiDocs')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.videoRemover')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.videoEnhancer')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.videoUpscaler')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.batchVideo')}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t('footer.links.design')}</Link></li>
              </ul>
            </div>

            {/* Company column */}
            <div className="text-left">
              <h4 className="font-bold text-[15px] mb-8 tracking-tight uppercase text-gray-300">{t('footer.company')}</h4>
              <ul className="flex flex-col gap-4 text-[13px] text-gray-400 font-medium">
                <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.links.about')}</Link></li>
                
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('footer.links.terms')}</Link></li>
                <li><Link to="/general-terms" className="hover:text-white transition-colors">{t('footer.links.conditions')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.links.privacy')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.links.contact')}</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">{t('footer.links.help')}</Link></li>
                
                
              </ul>
            </div>
          </div>
        </div>

        {/* Brand and Follow Us Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center py-12 border-t border-gray-800/50">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="bg-[#0047FF] text-white p-1.5 rounded-lg shadow-lg shadow-blue-500/10">
                <Video size={18} strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl tracking-tighter text-white">Clearix AI</span>
            </Link>
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs font-medium">
              {t('footer.desc')}
            </p>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-[15px] mb-6 tracking-tight">{t('footer.followUs')}</h4>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Language Selector Popover */}
          <div className="flex justify-end relative" ref={langRef}>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full mb-4 right-0 bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6 shadow-2xl z-50 w-[420px]"
                >
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left hover:bg-white/5 ${currentLang === lang.code ? 'bg-white/10' : ''}`}
                      >
                        <span className="text-[18px]">{lang.flag}</span>
                        <span className="text-[14px] font-bold tracking-tight text-gray-200">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  {/* Arrow Tip */}
                  <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#0A0A0A] border-r border-b border-gray-800 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-[13px] font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-[18px]">{activeLang.flag}</span>
              {activeLang.code}
              <span className={`text-[10px] ml-1 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>
        </div>

        {/* Final Copyright Row */}
        <div className="pt-8 mt-4 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] text-white font-medium">
          <p className="opacity-90">{t('footer.copyright')}</p>
          <p className="max-w-md text-right md:text-right text-center opacity-70">
            {t('footer.disclaimer')}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
