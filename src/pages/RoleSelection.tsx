import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, Globe, ArrowRight, CheckCircle, Star, Building } from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source') || 'get-started';

  const handleRoleSelect = (role: string) => {
    navigate(`/auth?role=${role}&source=${source}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F0] to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#503314] dark:text-white mb-3">
            Choose Your Path
          </h1>
          <p className="text-base text-[#7C2D12] dark:text-gray-300 max-w-xl mx-auto">
            Join Rwanda's tech ecosystem
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Mentee Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-[#B45309] cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#B45309] to-[#7C2D12] rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#503314] dark:text-white mb-1">
                  I'm a Youth/Mentee
                </h2>
                <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                  Ready to learn and grow
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Connect with Mentors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Join Learning Circles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Access Opportunities</span>
                </div>
              </div>

              <div className="bg-[#F5F5F0] dark:bg-gray-700 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-xs">
                  <div className="text-center">
                    <div className="font-bold text-[#B45309]">1000+</div>
                    <div className="text-[#7C2D12] dark:text-gray-300">Youth</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#B45309]">95%</div>
                    <div className="text-[#7C2D12] dark:text-gray-300">Success</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleRoleSelect('mentee')}
                className="w-full bg-[#B45309] hover:bg-[#7C2D12] text-white py-3 font-semibold"
              >
                Start as Mentee
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Mentor Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-[#B45309] cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#503314] to-[#92400E] rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#503314] dark:text-white mb-1">
                  I'm a Diaspora/Mentor
                </h2>
                <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                  Ready to share expertise
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Share Your Expertise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Create Learning Circles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm text-[#503314] dark:text-white">Make an Impact</span>
                </div>
              </div>

              <div className="bg-[#F5F5F0] dark:bg-gray-700 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-xs">
                  <div className="text-center">
                    <div className="font-bold text-[#B45309]">200+</div>
                    <div className="text-[#7C2D12] dark:text-gray-300">Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#B45309]">4.9★</div>
                    <div className="text-[#7C2D12] dark:text-gray-300">Rating</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleRoleSelect('mentor')}
                className="w-full bg-gradient-to-r from-[#503314] to-[#7C2D12] hover:from-[#7C2D12] hover:to-[#503314] text-white py-3 font-semibold"
              >
                Start as Mentor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white text-sm"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};