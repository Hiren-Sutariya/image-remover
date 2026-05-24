import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Showcase from '../components/Showcase';
import Features from '../components/Features';
import FeatureCard from '../components/FeatureCard';
import FAQ from '../components/FAQ';
import AnimatedButton from '../components/AnimatedButton';
import SolutionsOverview from '../components/SolutionsOverview';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Film, Layers, Terminal, Shield, Download, UploadCloud, Wand2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-[#404040] mb-4 tracking-tight uppercase">
              {t('home_workflow.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: 1, icon: <UploadCloud className="text-blue-500" />, title: t('home_workflow.s1_title'), desc: t('home_workflow.s1_desc') },
              { id: 2, icon: <Wand2 className="text-purple-500" />, title: t('home_workflow.s2_title'), desc: t('home_workflow.s2_desc') },
              { id: 3, icon: <Download className="text-green-500" />, title: t('home_workflow.s3_title'), desc: t('home_workflow.s3_desc') }
            ].map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                   {React.cloneElement(step.icon, { size: 32 })}
                </div>
                <h3 className="text-lg font-black text-[#404040] mb-3">{step.title}</h3>
                <p className="text-sm text-[#555555] font-medium leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase Slider Section */}
      <Features />

      {/* Showcase Section */}
      <Showcase />

      {/* One AI Solution Section */}
      <SolutionsOverview />



      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-[#404040] mb-4 tracking-tight">{t('faq.title')}</h2>
            <p className="text-sm text-[#555555] font-medium leading-relaxed">{t('faq.subtitle')}</p>
          </div>
          <FAQ />
        </div>
      </section>

    </div>
  );
};

export default Home;
