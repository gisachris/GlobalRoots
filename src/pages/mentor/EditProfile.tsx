import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Building, Award, MapPin, Save, ArrowLeft } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    headline: 'Senior Software Engineer at Google | Full-Stack Developer | Tech Mentor',
    company: 'Google',
    location: 'San Francisco, CA (Originally from Kigali, Rwanda)',
    bio: 'Experienced Senior Software Engineer with 8+ years at Google, specializing in full-stack development and cloud computing. Originally from Kigali, Rwanda, passionate about mentoring the next generation of African tech talent. Expert in JavaScript, React, Node.js, and Python with proven leadership experience.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Cloud Computing', 'Team Leadership'],
    mentorshipFocus: [
      'Career transition into tech',
      'Full-stack web development', 
      'Technical interview preparation',
      'Leadership and team management',
      'Working at big tech companies'
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillsChange = (skills: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: skills.split(',').map(skill => skill.trim())
    }));
  };

  const handleFocusChange = (focus: string) => {
    setProfileData(prev => ({
      ...prev,
      mentorshipFocus: focus.split('\n').filter(item => item.trim())
    }));
  };

  const handleSave = () => {
    // Save profile data
    navigate('/mentor/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/mentor/onboarding')}
          className="text-[#B45309] mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Onboarding
        </Button>
        <h1 className="text-3xl font-bold text-[#503314] dark:text-white mb-2">
          Edit Your Mentor Profile
        </h1>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Customize your profile to better connect with mentees
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2 text-[#B45309]" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Company
              </label>
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
              Professional Headline
            </label>
            <input
              type="text"
              value={profileData.headline}
              onChange={(e) => handleInputChange('headline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={profileData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              placeholder="JavaScript, React, Node.js, Python..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
              Mentorship Focus Areas (one per line)
            </label>
            <textarea
              value={profileData.mentorshipFocus.join('\n')}
              onChange={(e) => handleFocusChange(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              placeholder="Career transition into tech&#10;Full-stack web development&#10;Technical interview preparation..."
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <Button 
              onClick={handleSave}
              className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Continue to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/mentor/onboarding')}
              className="border-[#B45309] text-[#B45309] flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};