import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useTheme } from '../../utils/theme';
import { useLanguage } from '../../utils/language';
import { useAuth } from '../../utils/auth';
import { Logo } from '../ui/Logo';
import { MenuIcon, SearchIcon, XIcon, BellIcon, LogOutIcon, MoonIcon, SunIcon, GlobeIcon } from 'lucide-react';
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    theme,
    toggleTheme
  } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { user,isAuthenticated, logout } = useAuth();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  // Add scroll event listener to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setLanguageMenuOpen(false);
  }, [location.pathname]);
  const handleLogin = () => {
    navigate('/auth');
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <header className={`sticky top-0 z-50 w-full bg-[#f5f5f0] dark:bg-gray-800 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo isFooter={false}/>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" label={t('nav.home')} currentPath={location.pathname} />
            <NavLink to="/opportunities" label={t('nav.opportunities')} currentPath={location.pathname} />
            <NavLink to="/projects" label={t('nav.projects')} currentPath={location.pathname} />
            <NavLink to="/community" label={t('nav.community')} currentPath={location.pathname} />
            {isAuthenticated&&user?.role==='diaspora'&&<NavLink to="/returnee" label={t('nav.returneeHub')} currentPath={location.pathname} />}
          </nav>
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300 hidden lg:flex" aria-label="Search">
              <SearchIcon className="h-5 w-5 text-[#503314] dark:text-gray-300 hover:text-[#B45309] transition-colors" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300 hidden lg:flex" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? <SunIcon className="h-5 w-5 text-[#503314] dark:text-gray-300 hover:text-[#B45309] transition-colors" /> : <MoonIcon className="h-5 w-5 text-[#503314] dark:text-gray-300 hover:text-[#B45309] transition-colors" />}
            </button>
            
            {/* Language Selector */}
            <div className="relative hidden lg:block">
              <button 
                className="p-2 rounded-full hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300 flex items-center" 
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                aria-label="Select language"
              >
                <GlobeIcon className="h-5 w-5 text-[#503314] dark:text-gray-300 hover:text-[#B45309] transition-colors" />
              </button>
              {languageMenuOpen && (
                <>
                  <div onClick={()=>setLanguageMenuOpen(false)} className="fixed inset-0 z-40"/>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-[#B45309]/20 dark:border-gray-600">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F0] dark:hover:bg-gray-600 flex items-center space-x-2 ${
                          language === lang.code ? 'bg-[#F5F5F0] dark:bg-gray-600 text-[#ff6f00] dark:text-[#F59E0B]' : 'text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setLanguageMenuOpen(false);
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {isAuthenticated ? 
              <div className="hidden lg:block relative">
                <div className="flex items-center space-x-3">
                  <button className="relative p-2 rounded-full hover:bg-[#F5F5F0]/80 transition-all duration-300">
                    <BellIcon className="h-5 w-5 text-[#503314] hover:text-[#B45309] transition-colors" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div> : 
              <div className="hidden lg:flex items-center">
                <Button variant="primary" size="sm" onClick={handleLogin} className="bg-[#B45309] hover:bg-[#92400E] text-white rounded-md px-6 py-5">
                  {t('nav.getStarted')}
                </Button>
              </div>}
              
            {/* Mobile menu button */}
            <button onClick={toggleMobileMenu} className="lg:hidden p-2 rounded-md hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {mobileMenuOpen ? <XIcon className="h-6 w-6 text-[#503314] dark:text-gray-300" /> : <MenuIcon className="h-6 w-6 text-[#503314] dark:text-gray-300" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation - Animated slide down */}
        {mobileMenuOpen && <div className="lg:hidden pt-4 pb-3 space-y-3 animate-slideIn">
            <MobileNavLink to="/" label={t('nav.home')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/opportunities" label={t('nav.opportunities')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/projects" label={t('nav.projects')} onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/community" label={t('nav.community')} onClick={() => setMobileMenuOpen(false)} />
            {isAuthenticated ? <>
                <div className="border-t border-primary-200 dark:border-dark-600 my-2 pt-2"></div>
                <MobileNavLink to="/dashboard" label={t('nav.dashboard')} onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/profile" label={t('nav.profile')} onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/settings" label={t('nav.settings')} onClick={() => setMobileMenuOpen(false)} />
                <div className="px-3 pt-2">
                  <Button variant="outline" fullWidth onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }} className="text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center">
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    {t('nav.signOut')}
                  </Button>
                </div>
              </> : <div className="px-3 pt-2">
                <Button variant="primary" fullWidth onClick={() => {
            handleLogin();
            setMobileMenuOpen(false);
          }} className="bg-[#B45309] hover:bg-[#92400E] text-white">
                  {t('nav.getStarted')}
                </Button>
              </div>}
            <div className="px-3 pt-2 flex justify-center space-x-2">
              <button className="p-2 rounded-full hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300" aria-label="Toggle theme" onClick={toggleTheme}>
                {theme === 'dark' ? <SunIcon className="h-5 w-5 text-[#503314] dark:text-gray-300" /> : <MoonIcon className="h-5 w-5 text-[#503314] dark:text-gray-300" />}
              </button>
              <div className="relative">
                <button 
                  className="p-2 rounded-full hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300" 
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  aria-label="Select language"
                >
                  <GlobeIcon className="h-5 w-5 text-[#503314] dark:text-gray-300" />
                </button>
                {languageMenuOpen && (
                  <>
                  <div onClick={()=>setLanguageMenuOpen(false)} className="fixed inset-0 z-40"/>
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-[#B45309]/20 dark:border-gray-600">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F0] dark:hover:bg-gray-600 flex items-center space-x-2 ${
                          language === lang.code ? 'bg-[#F5F5F0] dark:bg-gray-600 text-[#ff6f00] dark:text-[#F59E0B]' : 'text-[#503314] dark:text-gray-300'
                        }`}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setLanguageMenuOpen(false);
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>}
      </div>
    </header>;
};

// Desktop Navigation Link Component with active state
const NavLink = ({to,label,currentPath}:{to:string, label:string, currentPath:string}) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);
  return (
    <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive ? 'text-[#B45309] font-semibold' : 'text-[#503314] dark:text-gray-300 hover:text-[#B45309]'}`}>
      {label}
    </Link>
  )
};

// Mobile Navigation Link Component
const MobileNavLink = ({to,label,onClick}:{to:string,label:string,onClick:()=>void}) => {
  return (
    <Link to={to} className="block px-3 py-2 rounded-md text-base font-medium text-[#503314] dark:text-gray-300 hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-200" onClick={onClick}>
      {label}
    </Link>
    )
};