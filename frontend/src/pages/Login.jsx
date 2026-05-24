import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState('login'); // 'login' or 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    alert('Password reset instructions have been simulated to your inbox.');
    setView('login');
  };

  if (view === 'forgot') {
    return (
      <div className="bg-white flex flex-col items-center pt-20 pb-20 px-6 font-sans">
        <div className="w-full max-w-[340px]">
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-black text-[#0F172A] tracking-tight">{t('auth.forgot')}</h1>
            <p className="text-gray-500 text-[13px] mt-1 font-medium leading-tight">Instructions will be sent to your email.</p>
          </div>

          <form className="space-y-3" onSubmit={handleForgotSubmit}>
            <div className="space-y-1">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.email')}</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[15px] font-medium transition-all"
              />
            </div>

            <button type="submit" className="w-full bg-[#0047FF] text-white font-bold py-3.5 rounded-xl text-[15px] hover:bg-blue-700 transition-all mt-4 shadow-lg shadow-blue-500/20">
              Reset Password
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => setView('login')}
              className="inline-flex items-center gap-2 text-gray-400 text-[13px] font-bold hover:text-[#0047FF] transition-all"
            >
              <ArrowLeft size={14} /> Back to Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center pt-20 pb-20 px-6 font-sans">
      <div className="w-full max-w-[340px]">
        
        {/* Minimalist Heading */}
        <div className="text-center mb-6">
          <h1 className="text-[24px] font-black text-[#0F172A] tracking-tight">Welcome back</h1>
        </div>

        {/* Google Login */}
        <button 
          type="button"
          onClick={() => alert('Google authentication is not configured in this demo.')}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-2.5 rounded-xl text-[15px] font-bold text-[#0F172A] hover:bg-gray-50 transition-all mb-6 shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
          Continue with Google
        </button>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-3 text-gray-300 text-[11px] font-black uppercase tracking-widest">or email</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[13px] font-bold text-center">
            {error}
          </div>
        )}

        {/* Compact Form */}
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">{t('auth.email')}</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[15px] font-medium transition-all"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between px-1">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{t('auth.password')}</label>
              <button 
                type="button"
                onClick={() => setView('forgot')}
                className="text-[11px] font-bold text-[#0047FF] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white focus:border-[#0047FF] text-[15px] font-medium transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0047FF] text-white font-bold py-3.5 rounded-xl text-[15px] hover:bg-blue-700 transition-all mt-4 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : t('auth.login')}
          </button>
        </form>

        {/* Minimal Footer */}
        <div className="text-center mt-8">
          <p className="text-[12px] text-gray-400 font-bold">
            New here? <Link to="/signup" className="text-[#0047FF] hover:underline ml-1">{t('auth.signup')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
