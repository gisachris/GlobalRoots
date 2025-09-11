import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UsersIcon, MessageSquareIcon, CalendarIcon, TrendingUpIcon, CheckIcon, ClockIcon, StarIcon, MoreHorizontalIcon } from 'lucide-react';

export const MenteesPage = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Mock mentees data
  const mentees = [
    {
      id: 1,
      name: 'Alice Uwimana',
      role: 'Junior Developer',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      startDate: 'March 2023',
      progress: 75,
      goals: ['Learn React', 'Build Portfolio', 'Get First Job'],
      completedGoals: 2,
      nextSession: 'Tomorrow, 3:00 PM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Eric Mugisha',
      role: 'UI/UX Designer',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      startDate: 'January 2023',
      progress: 90,
      goals: ['Master Figma', 'User Research', 'Design System'],
      completedGoals: 3,
      nextSession: 'Friday, 2:00 PM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Marie Nkusi',
      role: 'Data Analyst',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      startDate: 'February 2023',
      progress: 100,
      goals: ['Learn Python', 'SQL Mastery', 'Data Visualization'],
      completedGoals: 3,
      nextSession: null,
      status: 'completed'
    }
  ];

  const filteredMentees = mentees.filter(mentee => {
    if (activeTab === 'all') return true;
    return mentee.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">My Mentees</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Track progress and manage your mentoring relationships
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Total Mentees</p>
                  <p className="text-2xl font-bold text-[#503314] dark:text-white">{mentees.length}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-[#B45309]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Active</p>
                  <p className="text-2xl font-bold text-[#503314] dark:text-white">{mentees.filter(m => m.status === 'active').length}</p>
                </div>
                <TrendingUpIcon className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-[#503314] dark:text-white">{mentees.filter(m => m.status === 'completed').length}</p>
                </div>
                <CheckIcon className="h-8 w-8 text-[#B45309]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Avg Progress</p>
                  <p className="text-2xl font-bold text-[#503314] dark:text-white">{Math.round(mentees.reduce((acc, m) => acc + m.progress, 0) / mentees.length)}%</p>
                </div>
                <StarIcon className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeTab === 'all' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-gray-800 text-[#503314] dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Mentees
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeTab === 'active' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-gray-800 text-[#503314] dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeTab === 'completed' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-gray-800 text-[#503314] dark:text-gray-300'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Mentees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentees.map(mentee => (
            <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img src={mentee.imageUrl} alt={mentee.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#503314] dark:text-white">{mentee.name}</CardTitle>
                      <CardDescription>{mentee.role}</CardDescription>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <MoreHorizontalIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-[#503314] dark:text-white">Progress</span>
                      <span className="text-sm text-[#7C2D12] dark:text-gray-300">{mentee.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-[#B45309] rounded-full" 
                        style={{ width: `${mentee.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#503314] dark:text-white mb-2">Goals</h4>
                    <div className="space-y-1">
                      {mentee.goals.map((goal, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckIcon className={`h-3 w-3 mr-2 ${idx < mentee.completedGoals ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={idx < mentee.completedGoals ? 'line-through text-gray-500' : 'text-[#503314] dark:text-gray-300'}>
                            {goal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-[#7C2D12] dark:text-gray-400">
                    Started: {mentee.startDate}
                  </div>

                  {mentee.nextSession && (
                    <div className="flex items-center text-sm text-[#B45309]">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Next: {mentee.nextSession}
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="primary" className="flex-1 flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};