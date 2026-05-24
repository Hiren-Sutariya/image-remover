import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';

const Contact = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (location.state && location.state.subject) {
      setSubject(location.state.subject);
    }
  }, [location]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email || !subject || !message) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await apiService.submitContact({ name, email, subject, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      const errMsg = err.response && err.response.data && err.response.data.error 
        ? err.response.data.error 
        : 'Failed to submit contact request. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#404040] mb-8 tracking-tight">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-[#555555] font-medium leading-relaxed mb-12 max-w-lg">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100">
                  <Mail className="w-5 h-5 text-[#0047FF]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-lg font-black text-[#404040]">{t('contact.info_email')}</p>
                </div>
              </div>
            </div>

            {/* Talk to Sales */}
            <div className="bg-blue-50 rounded-[32px] p-8 border border-blue-100">
               <h3 className="text-lg font-black text-[#0047FF] mb-3">{t('contact.sales_title')}</h3>
               <p className="text-sm text-blue-800/70 font-medium leading-relaxed">
                 {t('contact.sales_text')}
               </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-gray-50 rounded-[40px] p-10 md:p-14 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Form alerts */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[13px] font-bold text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Contact form submitted successfully! We will get back to you shortly.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{t('contact.form_name')}</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-[#404040] font-bold focus:outline-none focus:border-[#0047FF] transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{t('contact.form_email')}</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-[#404040] font-bold focus:outline-none focus:border-[#0047FF] transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{t('contact.form_subject')}</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-[#404040] font-bold focus:outline-none focus:border-[#0047FF] transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">{t('contact.form_message')}</label>
                <textarea 
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-[#404040] font-bold focus:outline-none focus:border-[#0047FF] transition-colors resize-none text-sm"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#0047FF] text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : t('contact.form_submit')} <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
