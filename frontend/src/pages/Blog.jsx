import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
  const { t } = useLanguage();

  const posts = [
    { id: 1, key: 'p1' },
    { id: 2, key: 'p2' },
    { id: 3, key: 'p3' },
    { id: 4, key: 'p4' },
  ];

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#404040] mb-6 tracking-tight">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-[#555555] font-medium leading-relaxed max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-gray-50 rounded-[32px] mb-8 border border-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                {/* Placeholder for blog image */}
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                   <div className="w-16 h-1 bg-current rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full"><Calendar size={12} /> May 11, 2026</span>
                <span className="flex items-center gap-1.5"><User size={12} /> Admin</span>
              </div>
              <h3 className="text-xl font-black text-[#404040] mb-4 group-hover:text-[#0047FF] transition-colors leading-tight">
                {t(`blog.${post.key}_title`)}
              </h3>
              <p className="text-base text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">
                {t(`blog.${post.key}_desc`)}
              </p>
              <div className="flex items-center gap-2 text-[#0047FF] font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                {t('blog.readMore')} <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
