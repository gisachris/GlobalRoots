import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { scrapeLinkedInProfile, mapLinkedInDataToUserProfile, LinkedInProfileData } from '../services/linkedin-scraper';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { CheckCircleIcon, LinkedinIcon, UserIcon, BriefcaseIcon, MapPinIcon, PlusIcon, XIcon } from 'lucide-react';

export const Onboarding = () => {
  const { user, completeProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [scrapedData, setScrapedData] = useState<LinkedInProfileData | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState('');

  // Redirect if profile already completed
  useEffect(() => {
    if (user?.profileCompleted) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLinkedInScrape = async () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter a LinkedIn profile URL');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      console.log('=== ONBOARDING: Starting LinkedIn scrape ===');
      const profileData = await scrapeLinkedInProfile(linkedinUrl);
      console.log('=== ONBOARDING: Scraping completed ===');
      
      const mapped = mapLinkedInDataToUserProfile(profileData, user?.role || 'mentor');
      console.log('=== ONBOARDING: Data mapped ===');
      console.log('Final mapped data:', mapped);
      
      setScrapedData(profileData);
      setFormData(mapped);
      console.log('=== ONBOARDING: Form data set, moving to step 3 ===');
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipLinkedIn = () => {
    // Create empty form data based on user role (default to mentor for testing)
    const emptyData = (user?.role || 'mentor') === 'mentor' ? {
      fullName: user?.fullName || '',
      about: '',
      currentRole: '',
      currentCompany: '',
      location: '',
      hometown: '',
      industry: '',
      yearsOfExperience: 0,
      education: [],
      certifications: [],
      fieldOfStudy: '',
      skills: []
    } : {
      fullName: user?.fullName || '',
      about: '',
      currentStatus: 'Student',
      currentRole: '',
      location: '',
      desiredIndustry: '',
      careerStage: 'Early Career',
      education: [],
      skills: []
    };
    
    setFormData(emptyData);
    setStep(3);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove)
    }));
  };

  const handleCompleteOnboarding = async () => {
    setIsCompleting(true);
    try {
      await completeProfile(formData);
      navigate('/');
    } catch (err: any) {
      setError('Failed to complete profile. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#503314] mb-2">
              Analyzing Your LinkedIn Profile
            </h3>
            <p className="text-[#7C2D12]">
              This may take a few moments...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-[#B45309] text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-[#B45309]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-[#B45309] text-white' : 'bg-gray-300'}`}>
              2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-[#B45309]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-[#B45309] text-white' : 'bg-gray-300'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: LinkedIn URL Input */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#503314] mb-2">
                Connect Your LinkedIn Profile
              </CardTitle>
              <p className="text-[#7C2D12]">
                We'll import your professional information to create your profile
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <LinkedinIcon className="h-6 w-6 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Why LinkedIn?</h4>
                  <p className="text-sm text-blue-700">
                    We'll automatically fill your profile with your professional experience, education, and skills
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#503314] mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleLinkedInScrape}
                  className="flex-1 bg-[#B45309] hover:bg-[#7C2D12] text-white"
                >
                  Import from LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSkipLinkedIn}
                  className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                >
                  Skip for Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Profile Form */}
        {step === 3 && formData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#503314] flex items-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
                  Profile Information Retrieved
                </CardTitle>
                <p className="text-[#7C2D12]">
                  Review and edit your information before completing your profile
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#503314] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#503314] mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Role-specific fields */}
                {(user?.role || 'mentor') === 'mentor' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Current Role *
                        </label>
                        <input
                          type="text"
                          value={formData.currentRole}
                          onChange={(e) => handleInputChange('currentRole', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="Your current job title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Current Company *
                        </label>
                        <input
                          type="text"
                          value={formData.currentCompany}
                          onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Hometown/Origin
                        </label>
                        <input
                          type="text"
                          value={formData.hometown}
                          onChange={(e) => handleInputChange('hometown', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="Where you're originally from"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Industry/Field *
                        </label>
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="Technology, Finance, etc."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#503314] mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={formData.yearsOfExperience || ''}
                        onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                        placeholder="Years of professional experience"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Current Status *
                        </label>
                        <select
                          value={formData.currentStatus}
                          onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                        >
                          <option value="Student">Student</option>
                          <option value="Recent Graduate">Recent Graduate</option>
                          <option value="Early Career">Early Career</option>
                          <option value="Career Switcher">Career Switcher</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Current Role/Studies
                        </label>
                        <input
                          type="text"
                          value={formData.currentRole}
                          onChange={(e) => handleInputChange('currentRole', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="What you're currently doing"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Desired Industry *
                        </label>
                        <input
                          type="text"
                          value={formData.desiredIndustry}
                          onChange={(e) => handleInputChange('desiredIndustry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                          placeholder="Industry you want to work in"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#503314] mb-2">
                          Career Stage
                        </label>
                        <select
                          value={formData.careerStage}
                          onChange={(e) => handleInputChange('careerStage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                        >
                          <option value="Early Career">Early Career</option>
                          <option value="Mid Career">Mid Career</option>
                          <option value="Career Change">Career Change</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* About */}
                <div>
                  <label className="block text-sm font-medium text-[#503314] mb-2">
                    About *
                  </label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                    placeholder="Tell us about yourself, your goals, and what you're looking for..."
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-[#503314] mb-2">
                    Skills
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="flex items-center px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-sm"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-[#B45309] hover:text-[#7C2D12]"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                        placeholder="Add a skill"
                      />
                      <Button
                        onClick={handleAddSkill}
                        variant="outline"
                        className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    onClick={handleCompleteOnboarding}
                    disabled={isCompleting || !formData.fullName || !formData.location}
                    className="flex-1 bg-[#B45309] hover:bg-[#7C2D12] text-white disabled:opacity-50"
                  >
                    {isCompleting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Completing Profile...
                      </>
                    ) : (
                      'Complete Profile Setup'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isCompleting}
                    className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                  >
                    Back to LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};