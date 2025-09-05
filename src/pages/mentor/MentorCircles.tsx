import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Globe, Users, Calendar, Plus, Settings, Play, Pause } from 'lucide-react';

export const MentorCircles: React.FC = () => {
  const circles = [
    {
      id: 1,
      name: 'Frontend Development Mastery',
      description: 'Learn modern React, TypeScript, and best practices',
      category: 'Web Development',
      members: 12,
      maxMembers: 15,
      status: 'active',
      progress: 75,
      nextMeeting: 'Today, 2:00 PM',
      schedule: 'Mon, Wed, Fri at 2:00 PM',
      duration: '8 weeks',
      startDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Career Transition Bootcamp',
      description: 'Navigate career changes in tech industry',
      category: 'Career Development',
      members: 8,
      maxMembers: 10,
      status: 'active',
      progress: 60,
      nextMeeting: 'Dec 18, 4:00 PM',
      schedule: 'Tue, Thu at 4:00 PM',
      duration: '6 weeks',
      startDate: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Startup Founders Circle',
      description: 'Build and scale your tech startup',
      category: 'Entrepreneurship',
      members: 6,
      maxMembers: 8,
      status: 'paused',
      progress: 40,
      nextMeeting: 'Dec 20, 6:00 PM',
      schedule: 'Sat at 6:00 PM',
      duration: '12 weeks',
      startDate: '2023-12-01',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">My Circles</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage your mentorship circles</p>
        </div>
        <Link to="/mentor/circles/create">
          <Button className="bg-[#B45309] hover:bg-[#7C2D12]">
            <Plus className="h-4 w-4 mr-2" />
            Create New Circle
          </Button>
        </Link>
      </div>

      {/* Circles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {circles.map((circle) => (
          <Card key={circle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={circle.image} 
                alt={circle.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  circle.status === 'active' ? 'bg-green-100 text-green-800' :
                  circle.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {circle.status}
                </span>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#503314] dark:text-white mb-2">
                  {circle.name}
                </h3>
                <p className="text-[#7C2D12] dark:text-gray-300 text-sm mb-3">
                  {circle.description}
                </p>
                <span className="inline-block px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                  {circle.category}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#7C2D12] dark:text-gray-300">Members</span>
                  <span className="font-medium">{circle.members}/{circle.maxMembers}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#7C2D12] dark:text-gray-300">Progress</span>
                  <span className="font-medium">{circle.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#B45309] h-2 rounded-full" 
                    style={{ width: `${circle.progress}%` }}
                  ></div>
                </div>

                <div className="text-sm text-[#7C2D12] dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Next: {circle.nextMeeting}
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Schedule: {circle.schedule}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Manage
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-[#B45309] text-[#B45309]"
                >
                  {circle.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-[#B45309] text-[#B45309]"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};