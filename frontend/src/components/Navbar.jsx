import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, 
  Maximize, Film, LayoutTemplate, Terminal,
  User, ShoppingCart, Camera, Monitor, Megaphone, Car, Code, Building, Server,
  Video, LogOut
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const FullWidthDropdown = ({ isOpen, children }) => (
  <>
    {isOpen && (
      <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden z-50 transition-opacity duration-200">
        <div className="w-full px-8 md:px-16 py-12">
          {children}
        </div>
      </div>
    )}
  </>
);

const SolutionsDropdown = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-3 gap-y-12 gap-x-12">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 group cursor-default">
            <User size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.individuals')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Monitor size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.news')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Code size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.developers')}</span>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 group cursor-default">
            <ShoppingCart size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.ecommerce')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Megaphone size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.marketers')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Building size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.enterprise')}</span>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 group cursor-default">
            <Camera size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.photographers')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Car size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.dealers')}</span>
          </div>
          <div className="flex items-center gap-4 group cursor-default">
            <Server size={22} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="font-semibold text-gray-700 group-hover:text-foreground text-[16px] transition-colors">{t('home.solutions.onPremise')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesDropdown = () => {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
      <div className="col-span-1">
        <h3 className="text-lg font-bold text-foreground mb-4">{t('nav.coreCaps')}</h3>
        <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
          Discover our powerful suite of video editing tools designed for creators, editors, and developers.
        </p>
      </div>
      <div className="col-span-1">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('nav.videoTools')}</h4>
        <ul className="space-y-4">
          <li>
            <div className="flex items-start gap-4 group cursor-default">
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Maximize size={20} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">{t('nav.upscaling')}</p>
                <p className="text-[13px] text-gray-500 mt-1">Enhance video resolution</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-start gap-4 group cursor-default">
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <LayoutTemplate size={20} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">{t('nav.greenScreen')}</p>
                <p className="text-[13px] text-gray-500 mt-1">Virtual background replacement</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="col-span-1">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{t('nav.automation')}</h4>
        <ul className="space-y-4">
          <li>
            <div className="flex items-start gap-4 group cursor-default">
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Film size={20} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">{t('nav.batch')}</p>
                <p className="text-[13px] text-gray-500 mt-1">Process multiple videos</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-primary mb-4">
            New Release
          </div>
          <h4 className="text-[16px] font-bold text-foreground mb-2 tracking-tight">Rotoscoping AI v2.0</h4>
          <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
            Perfect edge detection for complex video backgrounds like hair and motion blur.
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClose = () => setProfileMenuOpen(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [profileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || activeDropdown ? 'bg-white/95 backdrop-blur-md border-b border-gray-100' : 'bg-transparent'
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="w-full px-8 md:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group mr-12" onMouseEnter={() => setActiveDropdown(null)} onClick={() => setActiveDropdown(null)}>
          <div className="bg-foreground text-white p-2 rounded-lg group-hover:scale-105 transition-transform shadow-sm">
            <Video size={24} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">Clearix AI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 flex-1 h-full">
          <Link to="/remove-bg" className="text-[16px] text-gray-600 hover:text-foreground font-semibold transition-colors py-2" onMouseEnter={() => setActiveDropdown(null)}>
            {t('nav.removeVideoBg')}
          </Link>
          <div className="h-full flex items-center" onMouseEnter={() => setActiveDropdown('features')}>
            <span className={`flex items-center gap-1 text-[16px] font-semibold cursor-default transition-colors py-2 ${activeDropdown === 'features' ? 'text-primary' : 'text-gray-600 hover:text-foreground'}`}>
              {t('nav.features')} <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'features' ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
            </span>
          </div>
          <Link to="/docs" className="text-[16px] text-gray-600 hover:text-foreground font-semibold transition-colors py-2" onMouseEnter={() => setActiveDropdown(null)}>
            {t('nav.tools')}
          </Link>
          <div className="h-full flex items-center" onMouseEnter={() => setActiveDropdown('solutions')}>
            <span className={`flex items-center gap-1 text-[16px] font-semibold cursor-default transition-colors py-2 ${activeDropdown === 'solutions' ? 'text-primary' : 'text-gray-600 hover:text-foreground'}`}>
              {t('nav.solutions')} <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
            </span>
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-6" onMouseEnter={() => setActiveDropdown(null)}>
          {user ? (
            <div className="relative flex items-center gap-3">
              {/* Profile Avatar Trigger Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileMenuOpen(!profileMenuOpen);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 border border-gray-100 transition-all select-none relative focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-[#0047FF] flex items-center justify-center font-bold text-[14px] border border-blue-200 shadow-sm">
                  {(user.firstName ? (user.firstName[0] + (user.lastName ? user.lastName[0] : '')).toUpperCase() : 'U')}
                </div>
                <ChevronDown size={14} className={`text-gray-400 mr-1 transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div 
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                  className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2.5"
                >
                  {/* User Profile Header */}
                  <div className="px-4 py-3 border-b border-gray-50 flex flex-col">
                    <p className="font-bold text-slate-800 text-sm truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-400 font-medium truncate mb-2">{user.email}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 border border-gray-200">
                        Free Plan
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Actions */}
                  <div className="px-1.5 py-1 flex flex-col gap-0.5">
                    <button 
                      onClick={() => {
                        setProfileMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={14} className="text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-foreground font-bold transition-colors px-2">
                {t('nav.login')}
              </Link>
              <Link to="/signup" className="bg-[#0047FF] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-md">
                {t('nav.signup')}
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <FullWidthDropdown isOpen={activeDropdown === 'features'}>
        <FeaturesDropdown />
      </FullWidthDropdown>
      <FullWidthDropdown isOpen={activeDropdown === 'solutions'}>
        <SolutionsDropdown />
      </FullWidthDropdown>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full overflow-hidden shadow-2xl">
          <div className="px-8 py-6 flex flex-col gap-4">
            <Link to="/remove-bg" className="text-gray-600 hover:text-foreground font-semibold text-lg py-3 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>{t('nav.removeVideoBg')}</Link>
            <span className="text-gray-600 font-semibold text-lg py-3 border-b border-gray-50">{t('nav.features')}</span>
            <Link to="/docs" className="text-gray-600 hover:text-foreground font-semibold text-lg py-3 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>{t('nav.tools')}</Link>
            <span className="text-gray-600 font-semibold text-lg py-3 border-b border-gray-50">{t('nav.solutions')}</span>

            
            {user ? (
              <div className="flex flex-col gap-4 mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0047FF] flex items-center justify-center font-bold text-base border border-blue-200">
                    {(user.firstName ? (user.firstName[0] + (user.lastName ? user.lastName[0] : '')).toUpperCase() : 'U')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#0F172A]">{user.firstName} {user.lastName}</p>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 border border-gray-200">
                        Free
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }} 
                  className="flex items-center justify-center w-full border border-gray-200 hover:bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-6">
                <Link to="/login" className="flex items-center justify-center w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-lg" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.login')}
                </Link>
                <Link to="/signup" className="flex items-center justify-center w-full bg-[#0047FF] text-white py-3 rounded-xl font-bold text-lg" onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
