import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useTheme } from '../utils/theme';
import { useLanguage, Language } from '../utils/language';
import { UserIcon, LockIcon, BellIcon, GlobeIcon, ShieldIcon, TrashIcon, CheckIcon, XIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const SettingsPage = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Jean-Paul Habimana',
    email: user?.email || 'jeanpaul@example.com',
    phone: '+250 78 123 4567'
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    console.log('Saving user data:', formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || 'Jean-Paul Habimana',
      email: user?.email || 'jeanpaul@example.com',
      phone: '+250 78 123 4567'
    });
    setIsEditing(false);
  };
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];
  return <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-700/60">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">{t('nav.settings')}</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <Card className="md:col-span-1">
            <CardContent className="p-4">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => setActiveTab('account')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'account' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      <UserIcon className="h-5 w-5 mr-3" />
                      <span>Account</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('security')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'security' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      <LockIcon className="h-5 w-5 mr-3" />
                      <span>Security</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('notifications')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'notifications' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      <BellIcon className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('appearance')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'appearance' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      {theme === 'dark' ? <MoonIcon className="h-5 w-5 mr-3" /> : <SunIcon className="h-5 w-5 mr-3" />}
                      <span>Appearance</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('language')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'language' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      <GlobeIcon className="h-5 w-5 mr-3" />
                      <span>Language</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('privacy')} className={`flex items-center w-full px-4 py-3 rounded-md ${activeTab === 'privacy' ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`}>
                      <ShieldIcon className="h-5 w-5 mr-3" />
                      <span>Privacy</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </CardContent>
          </Card>
          {/* Settings Content */}
          <div className="md:col-span-3">
            {activeTab === 'account' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input flex-1 mr-2" 
                        disabled={!isEditing} 
                      />
                      {!isEditing && (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                          Change
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                      Name
                    </label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input w-full" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input w-full" 
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                    <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                      Danger Zone
                    </h3>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>}
            {activeTab === 'security' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                          Current Password
                        </label>
                        <input type="password" className="input w-full" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                          New Password
                        </label>
                        <input type="password" className="input w-full" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                          Confirm New Password
                        </label>
                        <input type="password" className="input w-full" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                    <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#503314] dark:text-primary-300">
                          Add an extra layer of security to your account
                        </p>
                        <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                          Currently disabled
                        </p>
                      </div>
                      <Button variant="outline" className="bg-[#F5F5F0] dark:bg-dark-700">
                        Enable
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                    <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                      Active Sessions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-dark-700 rounded-md">
                        <div>
                          <p className="font-medium text-[#503314] dark:text-primary-300">
                            Chrome on Windows
                          </p>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Current session • Kigali, Rwanda
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-dark-700 rounded-md">
                        <div>
                          <p className="font-medium text-[#503314] dark:text-primary-300">
                            Safari on iPhone
                          </p>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Last active: 2 days ago • Kigali, Rwanda
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>}
            {activeTab === 'notifications' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#503314] dark:text-primary-300">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                          Receive updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                      </label>
                    </div>
                    <div className="pl-6 space-y-3">
                      <div className="flex items-center">
                        <input id="email-mentorship" type="checkbox" className="h-4 w-4 rounded border-primary-300 text-[#B45309] focus:ring-[#B45309]" checked />
                        <label htmlFor="email-mentorship" className="ml-2 block text-[#503314] dark:text-primary-300">
                          Mentorship messages and updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="email-opportunities" type="checkbox" className="h-4 w-4 rounded border-primary-300 text-[#B45309] focus:ring-[#B45309]" checked />
                        <label htmlFor="email-opportunities" className="ml-2 block text-[#503314] dark:text-primary-300">
                          New opportunities matching your skills
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="email-community" type="checkbox" className="h-4 w-4 rounded border-primary-300 text-[#B45309] focus:ring-[#B45309]" />
                        <label htmlFor="email-community" className="ml-2 block text-[#503314] dark:text-primary-300">
                          Community events and announcements
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="email-marketing" type="checkbox" className="h-4 w-4 rounded border-primary-300 text-[#B45309] focus:ring-[#B45309]" />
                        <label htmlFor="email-marketing" className="ml-2 block text-[#503314] dark:text-primary-300">
                          Marketing and promotional emails
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#503314] dark:text-primary-300">
                            Browser Notifications
                          </h3>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#503314] dark:text-primary-300">
                            SMS Notifications
                          </h3>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Receive important updates via SMS
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>}
            {activeTab === 'appearance' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314] dark:text-white">
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>
                    Customize how Global Roots looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                        Theme
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => theme === 'dark' && toggleTheme()} className={`p-4 rounded-lg border ${theme === 'light' ? 'border-[#B45309] bg-[#F5F5F0]' : 'border-primary-200 dark:border-dark-600 bg-white dark:bg-dark-700'}`}>
                          <div className="flex items-center mb-2">
                            <SunIcon className="h-5 w-5 mr-2 text-[#B45309]" />
                            <span className="font-medium text-[#503314] dark:text-primary-300">
                              Light
                            </span>
                          </div>
                          <div className="h-16 rounded-md bg-[#F5F5F0] border border-primary-200"></div>
                        </button>
                        <button onClick={() => theme === 'light' && toggleTheme()} className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-[#B45309] bg-dark-800' : 'border-primary-200 dark:border-dark-600 bg-white dark:bg-dark-700'}`}>
                          <div className="flex items-center mb-2">
                            <MoonIcon className="h-5 w-5 mr-2 text-[#B45309]" />
                            <span className="font-medium text-[#503314] dark:text-primary-300">
                              Dark
                            </span>
                          </div>
                          <div className="h-16 rounded-md bg-dark-800 border border-dark-600"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
            {activeTab === 'language' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314] dark:text-white">
                    Language Settings
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred language
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#503314] dark:text-gray-300">
                        Display Language
                      </label>
                      <div className="space-y-3">
                        {languages.map((lang) => (
                          <div key={lang.code} className="flex items-center">
                            <input
                              type="radio"
                              id={`lang-${lang.code}`}
                              name="language"
                              value={lang.code}
                              checked={language === lang.code}
                              onChange={(e) => setLanguage(e.target.value as Language)}
                              className="h-4 w-4 text-[#B45309] focus:ring-[#B45309] border-gray-300"
                            />
                            <label htmlFor={`lang-${lang.code}`} className="ml-3 flex items-center space-x-2 text-[#503314] dark:text-gray-300">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-[#7C2D12] dark:text-gray-400">
                        This will change the language used throughout the platform.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">{t('common.cancel')}</Button>
                  <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white">
                    {t('common.save')}
                  </Button>
                </CardFooter>
              </Card>}
            {activeTab === 'privacy' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy and data preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#503314] dark:text-primary-300">
                          Profile Visibility
                        </h3>
                        <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                          Control who can see your profile
                        </p>
                      </div>
                      <select className="input w-48">
                        <option value="public">Public</option>
                        <option value="members">Members Only</option>
                        <option value="connections">Connections Only</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#503314] dark:text-primary-300">
                            Show Online Status
                          </h3>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Let others see when you're online
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-[#503314] dark:text-primary-300">
                            Data Usage
                          </h3>
                          <p className="text-sm text-[#7C2D12] dark:text-primary-400">
                            Allow us to use your data to improve your experience
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
                        </label>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary-200 dark:border-dark-600">
                      <h3 className="font-medium text-[#503314] dark:text-primary-300 mb-4">
                        Data Export & Deletion
                      </h3>
                      <div className="flex space-x-2">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                          Request Data Deletion
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
};