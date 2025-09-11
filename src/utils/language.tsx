import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.opportunities': 'Opportunities',
    'nav.community': 'Community',
    'nav.projects': 'Projects',
    'nav.returneeHub': 'Returnee Hub',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.signOut': 'Sign out',
    'nav.getStarted': 'Get Started',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.editProfile': 'Edit Profile',
    'dashboard.skillPassport': 'Skill Passport',
    'dashboard.verifiedSkills': 'Your verified skills and achievements',
    'dashboard.yourSkills': 'Your Skills',
    'dashboard.addSkill': 'Add Skill',
    'dashboard.connectedAccounts': 'Connected Accounts',
    'dashboard.refresh': 'Refresh',
    'dashboard.upcomingSessions': 'Upcoming Sessions',
    'dashboard.scheduledSessions': 'Your scheduled mentoring sessions',
    'dashboard.sessions': 'Sessions',
    'dashboard.projects': 'Projects',
    'dashboard.skills': 'Skills',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.viewAll': 'View All',
    'common.learnMore': 'Learn More',
    
    // Auth
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    
    // Settings
    'settings.title': 'Settings',
    'settings.account': 'Account',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.privacy': 'Privacy',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.opportunities': 'Oportunidades',
    'nav.community': 'Comunidad',
    'nav.projects': 'Proyectos',
    'nav.returneeHub': 'Centro de Retorno',
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.signOut': 'Cerrar sesión',
    'nav.getStarted': 'Comenzar',
    
    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.editProfile': 'Editar Perfil',
    'dashboard.skillPassport': 'Pasaporte de Habilidades',
    'dashboard.verifiedSkills': 'Tus habilidades y logros verificados',
    'dashboard.yourSkills': 'Tus Habilidades',
    'dashboard.addSkill': 'Agregar Habilidad',
    'dashboard.connectedAccounts': 'Cuentas Conectadas',
    'dashboard.refresh': 'Actualizar',
    'dashboard.upcomingSessions': 'Próximas Sesiones',
    'dashboard.scheduledSessions': 'Tus sesiones de mentoría programadas',
    'dashboard.sessions': 'Sesiones',
    'dashboard.projects': 'Proyectos',
    'dashboard.skills': 'Habilidades',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.viewAll': 'Ver Todo',
    'common.learnMore': 'Saber Más',
    
    // Auth
    'auth.signIn': 'Iniciar Sesión',
    'auth.signUp': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.createAccount': 'Crear Cuenta',
    'auth.alreadyHaveAccount': '¿Ya tienes una cuenta?',
    'auth.dontHaveAccount': '¿No tienes una cuenta?',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.account': 'Cuenta',
    'settings.security': 'Seguridad',
    'settings.notifications': 'Notificaciones',
    'settings.appearance': 'Apariencia',
    'settings.language': 'Idioma',
    'settings.privacy': 'Privacidad',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.opportunities': 'Opportunités',
    'nav.community': 'Communauté',
    'nav.projects': 'Projets',
    'nav.returneeHub': 'Centre de Retour',
    'nav.dashboard': 'Tableau de Bord',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.signOut': 'Se déconnecter',
    'nav.getStarted': 'Commencer',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.editProfile': 'Modifier le Profil',
    'dashboard.skillPassport': 'Passeport de Compétences',
    'dashboard.verifiedSkills': 'Vos compétences et réalisations vérifiées',
    'dashboard.yourSkills': 'Vos Compétences',
    'dashboard.addSkill': 'Ajouter une Compétence',
    'dashboard.connectedAccounts': 'Comptes Connectés',
    'dashboard.refresh': 'Actualiser',
    'dashboard.upcomingSessions': 'Sessions à Venir',
    'dashboard.scheduledSessions': 'Vos sessions de mentorat programmées',
    'dashboard.sessions': 'Sessions',
    'dashboard.projects': 'Projets',
    'dashboard.skills': 'Compétences',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.viewAll': 'Voir Tout',
    'common.learnMore': 'En Savoir Plus',
    
    // Auth
    'auth.signIn': 'Se Connecter',
    'auth.signUp': "S'inscrire",
    'auth.email': 'Email',
    'auth.password': 'Mot de Passe',
    'auth.confirmPassword': 'Confirmer le Mot de Passe',
    'auth.forgotPassword': 'Mot de passe oublié?',
    'auth.createAccount': 'Créer un Compte',
    'auth.alreadyHaveAccount': 'Vous avez déjà un compte?',
    'auth.dontHaveAccount': "Vous n'avez pas de compte?",
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.account': 'Compte',
    'settings.security': 'Sécurité',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Apparence',
    'settings.language': 'Langue',
    'settings.privacy': 'Confidentialité',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.opportunities': 'Möglichkeiten',
    'nav.community': 'Gemeinschaft',
    'nav.projects': 'Projekte',
    'nav.returneeHub': 'Rückkehrer-Hub',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profil',
    'nav.settings': 'Einstellungen',
    'nav.signOut': 'Abmelden',
    'nav.getStarted': 'Loslegen',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.editProfile': 'Profil Bearbeiten',
    'dashboard.skillPassport': 'Fähigkeiten-Pass',
    'dashboard.verifiedSkills': 'Ihre verifizierten Fähigkeiten und Erfolge',
    'dashboard.yourSkills': 'Ihre Fähigkeiten',
    'dashboard.addSkill': 'Fähigkeit Hinzufügen',
    'dashboard.connectedAccounts': 'Verbundene Konten',
    'dashboard.refresh': 'Aktualisieren',
    'dashboard.upcomingSessions': 'Kommende Sitzungen',
    'dashboard.scheduledSessions': 'Ihre geplanten Mentoring-Sitzungen',
    'dashboard.sessions': 'Sitzungen',
    'dashboard.projects': 'Projekte',
    'dashboard.skills': 'Fähigkeiten',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.viewAll': 'Alle Anzeigen',
    'common.learnMore': 'Mehr Erfahren',
    
    // Auth
    'auth.signIn': 'Anmelden',
    'auth.signUp': 'Registrieren',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.confirmPassword': 'Passwort Bestätigen',
    'auth.forgotPassword': 'Passwort vergessen?',
    'auth.createAccount': 'Konto Erstellen',
    'auth.alreadyHaveAccount': 'Haben Sie bereits ein Konto?',
    'auth.dontHaveAccount': 'Haben Sie kein Konto?',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.account': 'Konto',
    'settings.security': 'Sicherheit',
    'settings.notifications': 'Benachrichtigungen',
    'settings.appearance': 'Erscheinungsbild',
    'settings.language': 'Sprache',
    'settings.privacy': 'Datenschutz',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.opportunities': 'الفرص',
    'nav.community': 'المجتمع',
    'nav.projects': 'المشاريع',
    'nav.returneeHub': 'مركز العائدين',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.signOut': 'تسجيل الخروج',
    'nav.getStarted': 'ابدأ الآن',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.editProfile': 'تعديل الملف الشخصي',
    'dashboard.skillPassport': 'جواز المهارات',
    'dashboard.verifiedSkills': 'مهاراتك وإنجازاتك المتحققة',
    'dashboard.yourSkills': 'مهاراتك',
    'dashboard.addSkill': 'إضافة مهارة',
    'dashboard.connectedAccounts': 'الحسابات المتصلة',
    'dashboard.refresh': 'تحديث',
    'dashboard.upcomingSessions': 'الجلسات القادمة',
    'dashboard.scheduledSessions': 'جلسات الإرشاد المجدولة',
    'dashboard.sessions': 'الجلسات',
    'dashboard.projects': 'المشاريع',
    'dashboard.skills': 'المهارات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.viewAll': 'عرض الكل',
    'common.learnMore': 'اعرف المزيد',
    
    // Auth
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.createAccount': 'إنشاء حساب',
    'auth.alreadyHaveAccount': 'هل لديك حساب بالفعل؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.account': 'الحساب',
    'settings.security': 'الأمان',
    'settings.notifications': 'الإشعارات',
    'settings.appearance': 'المظهر',
    'settings.language': 'اللغة',
    'settings.privacy': 'الخصوصية',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Set document direction for RTL languages
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};