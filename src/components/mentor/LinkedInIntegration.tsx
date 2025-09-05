import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Linkedin, 
  CheckCircle, 
  Loader, 
  User, 
  Building, 
  Award, 
  MapPin,
  Calendar,
  Users,
  Sparkles
} from 'lucide-react';

interface LinkedInProfile {
  name: string;
  headline: string;
  company: string;
  location: string;
  experience: string;
  skills: string[];
  connections: number;
  verified: boolean;
}

export const LinkedInIntegration: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  const [profileGenerated, setProfileGenerated] = useState(false);
  const [linkedInProfile, setLinkedInProfile] = useState<LinkedInProfile | null>(null);

  // Simulated LinkedIn profile data
  const mockLinkedInProfile: LinkedInProfile = {
    name: "Sarah Johnson",
    headline: "Senior Software Engineer at Google | Full-Stack Developer | Tech Mentor",
    company: "Google",
    location: "San Francisco, CA (Originally from Kigali, Rwanda)",
    experience: "8+ years",
    skills: ["JavaScript", "React", "Node.js", "Python", "Cloud Computing", "Team Leadership"],
    connections: 2847,
    verified: true
  };

  const handleLinkedInConnect = async () => {
    setIsConnecting(true);
    
    // Simulate LinkedIn OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setLinkedInProfile(mockLinkedInProfile);
      setIsConnecting(false);
    }, 2000);
  };

  const handleGenerateProfile = async () => {
    setIsGeneratingProfile(true);
    
    // Simulate AI profile generation
    setTimeout(() => {
      setProfileGenerated(true);
      setIsGeneratingProfile(false);
    }, 3000);
  };

  if (!isConnected) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Linkedin className="h-6 w-6 mr-2 text-blue-600" />
            Connect Your LinkedIn Profile
          </CardTitle>
          <p className="text-[#7C2D12] dark:text-gray-300 mt-2">
            Connect your LinkedIn to automatically verify your professional background and generate your mentor profile
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Linkedin className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
              Why Connect LinkedIn?
            </h3>
            <ul className="text-sm text-[#7C2D12] dark:text-gray-300 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Verify your professional experience
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Auto-populate your mentor profile
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Build trust with mentees
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Access job market insights
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={handleLinkedInConnect}
            disabled={isConnecting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            {isConnecting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Linkedin className="h-4 w-4 mr-2" />
                Connect with LinkedIn
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            We'll only access your public profile information
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* LinkedIn Profile Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            LinkedIn Profile Connected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#503314] dark:text-white">
                {linkedInProfile?.name}
              </h3>
              <p className="text-[#7C2D12] dark:text-gray-300 mb-2">
                {linkedInProfile?.headline}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-[#B45309]" />
                  {linkedInProfile?.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#B45309]" />
                  {linkedInProfile?.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#B45309]" />
                  {linkedInProfile?.experience} experience
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-[#B45309]" />
                  {linkedInProfile?.connections} connections
                </div>
              </div>
            </div>
            {linkedInProfile?.verified && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Profile Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#B45309]" />
            AI-Powered Profile Generation
          </CardTitle>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Our AI will analyze your LinkedIn profile and create an optimized mentor profile
          </p>
        </CardHeader>
        <CardContent>
          {!profileGenerated ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#B45309]/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-[#B45309]" />
                </div>
                <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
                  Generate Your Mentor Profile
                </h3>
                <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-4">
                  AI will create your profile based on your LinkedIn experience, skills, and background
                </p>
              </div>
              
              <Button 
                onClick={handleGenerateProfile}
                disabled={isGeneratingProfile}
                className="bg-[#B45309] hover:bg-[#7C2D12] px-8 py-3"
              >
                {isGeneratingProfile ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Generating Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Profile with AI
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center text-green-600 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Profile Generated Successfully!</span>
              </div>
              
              {/* Generated Profile Preview */}
              <div className="bg-[#F5F5F0] dark:bg-gray-800 rounded-lg p-6">
                <h4 className="font-semibold text-[#503314] dark:text-white mb-4">
                  Generated Mentor Profile
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-[#B45309] mb-2">Bio</h5>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                      Experienced Senior Software Engineer with 8+ years at Google, specializing in full-stack development and cloud computing. Originally from Kigali, Rwanda, passionate about mentoring the next generation of African tech talent. Expert in JavaScript, React, Node.js, and Python with proven leadership experience.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-[#B45309] mb-2">Expertise Areas</h5>
                    <div className="flex flex-wrap gap-2">
                      {linkedInProfile?.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-[#B45309]/10 text-[#B45309] text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-[#B45309] mb-2">Mentorship Focus</h5>
                    <ul className="text-sm text-[#7C2D12] dark:text-gray-300 space-y-1">
                      <li>• Career transition into tech</li>
                      <li>• Full-stack web development</li>
                      <li>• Technical interview preparation</li>
                      <li>• Leadership and team management</li>
                      <li>• Working at big tech companies</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={() => navigate('/mentor/dashboard')}
                  className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
                >
                  Accept & Continue to Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/mentor/profile/edit')}
                  variant="outline" 
                  className="border-[#B45309] text-[#B45309] flex-1"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};