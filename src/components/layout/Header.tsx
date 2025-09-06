import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useTheme } from '../../utils/theme';
import { useLanguage } from '../../utils/language';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../ui/Logo';
import { LoadingButton } from '../ui/LoadingButton';
import { initializeNotifications } from '../../utils/notifications';
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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const { user, signOut, isSigningOut } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    initializeNotifications();
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  // Handle scroll for hash links on home page
  useEffect(() => {
    if (location.pathname !== '/') return;
    
    const handleScroll = () => {
      const sections = ['hero', 'aboutUs', 'services', 'impact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.slice(0, 3);

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
    setNotificationOpen(false);
  }, [location.pathname]);
  const handleLogin = () => {
    navigate('/role-selection');
  };
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  return <header className={`sticky top-0 z-50 w-full bg-[#f5f5f0] dark:bg-gray-800 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo isFooter={false}/>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/" label="Home" currentPath={location.pathname} />
                {user?.role !== 'mentor' && (
                  <>
                    <NavLink to="/opportunities" label="Opportunities" currentPath={location.pathname} />
                    <NavLink to="/projects" label="Projects" currentPath={location.pathname} />
                    <NavLink to="/community" label="Community" currentPath={location.pathname} />
                  </>
                )}
                {user?.role === 'mentor' && (
                  <>
                    <NavLink to="/opportunities" label="Opportunities" currentPath={location.pathname} />
                    <NavLink to="/projects" label="Projects" currentPath={location.pathname} />
                    <NavLink to="/mentor/dashboard" label="Dashboard" currentPath={location.pathname} />
                  </>
                )}
                {user?.role === 'diaspora' && <NavLink to="/returnee" label="Returnship" currentPath={location.pathname} />}
              </>
            ) : (
              <>
                <HashNavLink to="/#hero" label="Home" activeSection={activeSection} section="hero" />
                <HashNavLink to="/#aboutUs" label="About Us" activeSection={activeSection} section="aboutUs" />
                <HashNavLink to="/#services" label="Services" activeSection={activeSection} section="services" />
                <HashNavLink to="/#impact" label="Impact" activeSection={activeSection} section="impact" />
              </>
            )}
          </nav>
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
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
              <div className="hidden lg:flex items-center space-x-3">
                <div className="relative">
                  <button 
                    className="relative p-2 rounded-full hover:bg-[#F5F5F0]/80 transition-all duration-300"
                    onClick={() => setNotificationOpen(!notificationOpen)}
                  >
                    <BellIcon className="h-5 w-5 text-[#503314] hover:text-[#B45309] transition-colors" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                    {notificationOpen && (
                      <>
                        <div onClick={() => setNotificationOpen(false)} className="fixed inset-0 z-40" />
                        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-600">
                          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="font-semibold text-[#B45309] dark:text-white">Notifications</h3>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {recentNotifications.length > 0 ? (
                              recentNotifications.map(notification => (
                                <div 
                                  key={notification.id} 
                                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-100 dark:border-gray-600 cursor-pointer"
                                  onClick={() => {
                                    setNotificationOpen(false);
                                    navigate(`/notifications?open=${notification.id}`);
                                  }}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-gray-800 dark:text-white">{notification.title}</p>
                                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">{notification.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-[#B45309] rounded-full ml-2 mt-1"></div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                                No notifications
                              </div>
                            )}
                          </div>
                          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                            <Link 
                              to="/notifications" 
                              className="text-sm text-[#cd7735] hover:text-[#6a3206] dark:text-blue-400"
                              onClick={() => setNotificationOpen(false)}
                            >
                              View all notifications
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                </div>
                <LoadingButton 
                  variant="outline" 
                  size="sm" 
                  loading={isSigningOut}
                  onClick={handleLogout}
                  className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
                  loadingText="Signing Out..."
                >
                  <LogOutIcon className="h-4 w-4 mr-1" />
                  Logout
                </LoadingButton>
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
          <MobileHashNavLink to="/#hero" label="Home" activeSection={activeSection} section="hero" onClick={() => setMobileMenuOpen(false)} />
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/opportunities" label="Opportunities" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/projects" label="Projects" onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/community" label="Community" onClick={() => setMobileMenuOpen(false)} />
                {user?.role === 'diaspora' && <MobileNavLink to="/returnee" label="Returnship" onClick={() => setMobileMenuOpen(false)} />}
              </>
            ) : (
              <>
                <MobileHashNavLink to="/#aboutUs" label="About Us" activeSection={activeSection} section="aboutUs" onClick={() => setMobileMenuOpen(false)} />
                <MobileHashNavLink to="/#services" label="Services" activeSection={activeSection} section="services" onClick={() => setMobileMenuOpen(false)} />
                <MobileHashNavLink to="/#impact" label="Impact" activeSection={activeSection} section="impact" onClick={() => setMobileMenuOpen(false)} />
              </>
            )}
            {isAuthenticated ? <>
                <div className="border-t border-primary-200 dark:border-dark-600 my-2 pt-2"></div>
                <MobileNavLink to="/dashboard" label={t('nav.dashboard')} onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/profile" label={t('nav.profile')} onClick={() => setMobileMenuOpen(false)} />
                <MobileNavLink to="/settings" label={t('nav.settings')} onClick={() => setMobileMenuOpen(false)} />
                <div className="px-3 pt-2">
                  <LoadingButton 
                    variant="outline" 
                    loading={isSigningOut}
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }} 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center"
                    loadingText="Signing Out..."
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    {t('nav.signOut')}
                  </LoadingButton>
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

// Hash Navigation Link Component
const HashNavLink = ({to, label, activeSection, section}: {to: string, label: string, activeSection: string, section: string}) => {
  const isActive = activeSection === section;
  return (
    <a href={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive ? 'text-[#B45309] font-semibold' : 'text-[#503314] dark:text-gray-300 hover:text-[#B45309]'
    }`}>
      {label}
    </a>
  );
};

// Mobile Hash Navigation Link Component
const MobileHashNavLink = ({to, label, activeSection, section, onClick}: {to: string, label: string, activeSection: string, section: string, onClick: () => void}) => {
  const isActive = activeSection === section;
  return (
    <a href={to} className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
      isActive ? 'text-[#B45309] font-semibold bg-[#F5F5F0]/80 dark:bg-gray-700' : 'text-[#503314] dark:text-gray-300 hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700'
    }`} onClick={onClick}>
      {label}
    </a>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({to,label,onClick}:{to:string,label:string,onClick:()=>void}) => {
  return (
    <Link to={to} className="block px-3 py-2 rounded-md text-base font-medium text-[#503314] dark:text-gray-300 hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-200" onClick={onClick}>
      {label}
    </Link>
    )
};