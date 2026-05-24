import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    setLoading(true);
    const result = await signup({ firstName, lastName, email, password });
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="bg-white flex flex-col items-center pt-20 pb-20 px-6 font-sans">
      <div className="w-full max-w-[420px]">
        
        {/* Minimalist Heading */}
        <div className="text-center mb-5">
          <h1 className="text-[22px] font-black text-[#0F172A] tracking-tight">{t('auth.signup')}</h1>
          <p className="text-gray-400 text-[13px] mt-0.5 font-bold tracking-tight">Join Clearix AI today.</p>
        </div>

        {/* Google Signup */}
        <button 
          type="button"
          onClick={() => alert('Google authentication is not configured in this demo.')}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-2.5 rounded-xl text-[14px] font-bold text-[#0F172A] hover:bg-gray-50 transition-all mb-5 shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
          Sign up with Google
        </button>

        <div className="relative flex items-center mb-5">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-3 text-gray-300 text-[10px] font-black uppercase tracking-widest">or email</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[13px] font-bold text-center">
            {error}
          </div>
        )}

        {/* Ultra Compact Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.firstName')}</label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[14px] font-medium transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.lastName')}</label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[14px] font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.email')}</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[14px] font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.password')}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[14px] font-medium transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.confirm')}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[14px] font-medium transition-all"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2 pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0047FF] focus:ring-[#0047FF] cursor-pointer" 
              />
              <span className="text-[12px] text-gray-500 font-medium leading-tight select-none">
                I agree to the <Link to="/terms" className="text-[#0047FF] hover:underline font-bold">Terms</Link> and <Link to="/privacy" className="text-[#0047FF] hover:underline font-bold">Privacy Policy</Link>.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0047FF] focus:ring-[#0047FF] cursor-pointer" />
              <span className="text-[12px] text-gray-500 font-medium leading-tight select-none">
                I want to receive product updates and special offers.
              </span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0047FF] text-white font-bold py-3.5 rounded-xl text-[16px] hover:bg-blue-700 transition-all mt-4 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : t('auth.signup')}
          </button>
        </form>

        {/* Minimal Footer */}
        <div className="text-center mt-6">
          <p className="text-[12px] text-gray-400 font-bold">
            Already have an account? <Link to="/login" className="text-[#0047FF] hover:underline ml-1">{t('auth.login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
