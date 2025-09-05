import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Settings, User, Bell, Shield, Calendar, Globe, Save } from 'lucide-react';

export const MentorSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      bio: 'Experienced Senior Software Engineer with 8+ years at Google...',
      timezone: 'CAT',
      language: 'English'
    },
    availability: {
      maxMentees: 25,
      hoursPerWeek: 10,
      sessionDuration: 60,
      bufferTime: 15,
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      workingHours: { start: '09:00', end: '17:00' }
    },
    notifications: {
      emailNotifications: true,
      sessionReminders: true,
      newMenteeRequests: true,
      circleUpdates: true,
      weeklyReports: false,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLinkedIn: true,
      allowDirectMessages: true,
      requireApproval: true
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Bio
        </label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Timezone
          </label>
          <select
            value={settings.profile.timezone}
            onChange={(e) => handleSettingChange('profile', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value="CAT">CAT (Central Africa Time)</option>
            <option value="EAT">EAT (East Africa Time)</option>
            <option value="UTC">UTC</option>
            <option value="EST">EST (Eastern Standard Time)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Language
          </label>
          <select
            value={settings.profile.language}
            onChange={(e) => handleSettingChange('profile', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Kinyarwanda">Kinyarwanda</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAvailabilitySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Maximum Mentees
          </label>
          <input
            type="number"
            value={settings.availability.maxMentees}
            onChange={(e) => handleSettingChange('availability', 'maxMentees', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Hours per Week
          </label>
          <input
            type="number"
            value={settings.availability.hoursPerWeek}
            onChange={(e) => handleSettingChange('availability', 'hoursPerWeek', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Default Session Duration (minutes)
          </label>
          <select
            value={settings.availability.sessionDuration}
            onChange={(e) => handleSettingChange('availability', 'sessionDuration', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={90}>90 minutes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
            Buffer Time (minutes)
          </label>
          <select
            value={settings.availability.bufferTime}
            onChange={(e) => handleSettingChange('availability', 'bufferTime', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value={0}>No buffer</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-3">
          Working Hours
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#7C2D12] dark:text-gray-300 mb-1">Start Time</label>
            <input
              type="time"
              value={settings.availability.workingHours.start}
              onChange={(e) => handleSettingChange('availability', 'workingHours', {
                ...settings.availability.workingHours,
                start: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-[#7C2D12] dark:text-gray-300 mb-1">End Time</label>
            <input
              type="time"
              value={settings.availability.workingHours.end}
              onChange={(e) => handleSettingChange('availability', 'workingHours', {
                ...settings.availability.workingHours,
                end: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-[#503314] dark:text-white">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h4>
            <p className="text-sm text-[#7C2D12] dark:text-gray-300">
              {key === 'emailNotifications' && 'Receive email notifications for important updates'}
              {key === 'sessionReminders' && 'Get reminders before scheduled sessions'}
              {key === 'newMenteeRequests' && 'Notifications when new mentees request mentorship'}
              {key === 'circleUpdates' && 'Updates about your mentorship circles'}
              {key === 'weeklyReports' && 'Weekly summary of your mentoring activity'}
              {key === 'marketingEmails' && 'Promotional emails and platform updates'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
          Profile Visibility
        </label>
        <select
          value={settings.privacy.profileVisibility}
          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="public">Public - Anyone can see your profile</option>
          <option value="mentees">Mentees Only - Only your mentees can see details</option>
          <option value="private">Private - Hidden from search</option>
        </select>
      </div>

      <div className="space-y-4">
        {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-[#503314] dark:text-white">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                {key === 'showEmail' && 'Display your email address on your profile'}
                {key === 'showLinkedIn' && 'Show LinkedIn profile link'}
                {key === 'allowDirectMessages' && 'Allow mentees to send direct messages'}
                {key === 'requireApproval' && 'Require approval for new mentee requests'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#B45309]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B45309]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Settings</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage your account preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-[#B45309] hover:bg-[#7C2D12]">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#B45309] text-white'
                        : 'text-[#503314] dark:text-white hover:bg-[#B45309]/10'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-[#B45309]" />
              {tabs.find(tab => tab.id === activeTab)?.label} Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'availability' && renderAvailabilitySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};