import React from 'react';
import { useTheme } from '../../utils/theme';
import { useLanguage } from '../../utils/language';
import { Button } from './Button';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { MoonIcon, SunIcon, GlobeIcon } from 'lucide-react';

export const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme & Language Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme Test */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#503314] dark:text-white">Current Theme: {theme}</h3>
            <Button onClick={toggleTheme} className="flex items-center space-x-2">
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              <span>Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </Button>
          </div>

          {/* Language Test */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#503314] dark:text-white">Current Language: {language}</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage(lang.code as any)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Translation Test */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#503314] dark:text-white">Translation Test:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Navigation:</strong>
                <ul className="list-disc list-inside space-y-1 text-[#7C2D12] dark:text-gray-300">
                  <li>{t('nav.home')}</li>
                  <li>{t('nav.opportunities')}</li>
                  <li>{t('nav.community')}</li>
                  <li>{t('nav.projects')}</li>
                </ul>
              </div>
              <div>
                <strong>Dashboard:</strong>
                <ul className="list-disc list-inside space-y-1 text-[#7C2D12] dark:text-gray-300">
                  <li>{t('dashboard.title')}</li>
                  <li>{t('dashboard.skillPassport')}</li>
                  <li>{t('dashboard.yourSkills')}</li>
                  <li>{t('dashboard.sessions')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dark Mode Visual Test */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#503314] dark:text-white">Visual Elements Test:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-gray-800 border border-[#B45309]/20 dark:border-gray-600 rounded-lg">
                <p className="text-[#503314] dark:text-white">Card Background</p>
                <p className="text-[#7C2D12] dark:text-gray-300 text-sm">Secondary text</p>
              </div>
              <div className="p-4 bg-[#F5F5F0] dark:bg-gray-700 rounded-lg">
                <p className="text-[#503314] dark:text-white">Light Background</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#B45309] to-[#92400E] rounded-lg">
                <p className="text-white">Gradient Background</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};