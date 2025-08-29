import React, { useState } from 'react';
import { useLanguage, Language } from '../../utils/language';
import { GlobeIcon, ChevronDownIcon } from 'lucide-react';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#F5F5F0]/80 dark:hover:bg-gray-700 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <GlobeIcon className="h-4 w-4 text-[#503314] dark:text-gray-300" />
        <span className="text-sm text-[#503314] dark:text-gray-300">{currentLanguage?.flag}</span>
        <ChevronDownIcon className={`h-3 w-3 text-[#503314] dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-[#B45309]/20 dark:border-gray-600">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F0] dark:hover:bg-gray-600 flex items-center space-x-2 ${
                language === lang.code ? 'bg-[#F5F5F0] dark:bg-gray-600 text-[#B45309]' : 'text-[#503314] dark:text-gray-300'
              }`}
              onClick={() => {
                setLanguage(lang.code as Language);
                setIsOpen(false);
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};