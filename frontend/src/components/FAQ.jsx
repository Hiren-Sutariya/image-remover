import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`mb-4 overflow-hidden rounded-[24px] border transition-all duration-500 ${
        isOpen 
          ? 'bg-white border-[#0047FF]/20 shadow-xl shadow-blue-500/5' 
          : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full py-6 px-8 flex items-center justify-between text-left focus:outline-none"
      >
        <span className={`text-base md:text-lg font-black tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#0047FF]' : 'text-[#404040]'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#0047FF] text-white rotate-180' : 'bg-white text-gray-400 border border-gray-100'}`}>
          {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
        </div>
      </button>
      
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-8">
          <p className="text-sm md:text-base text-[#555555] font-medium leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={index === openIndex}
          onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default FAQ;
