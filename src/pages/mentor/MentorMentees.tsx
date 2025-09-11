import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, MessageCircle, Calendar, Star, Search, Filter } from 'lucide-react';

export const MentorMentees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mentees = [
    {
      id: 1,
      name: 'Jean-Paul Habimana',
      role: 'Junior Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: '2024-01-15',
      progress: 75,
      lastSession: '2 days ago',
      skills: ['JavaScript', 'React', 'Node.js'],
      goals: 'Land first full-time developer role'
    },
    {
      id: 2,
      name: 'Alice Uwimana',
      role: 'CS Student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinDate: '2024-02-01',
      progress: 60,
      lastSession: '1 week ago',
      skills: ['Python', 'Data Science', 'ML'],
      goals: 'Transition to data science career'
    },
    {
      id: 3,
      name: 'Bob Nkurunziza',
      role: 'Bootcamp Graduate',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'completed',
      joinDate: '2023-11-10',
      progress: 100,
      lastSession: '1 month ago',
      skills: ['JavaScript', 'React', 'MongoDB'],
      goals: 'Successfully hired at TechCorp'
    }
  ];

  const filteredMentees = mentees.filter(mentee => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || mentee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">My Mentees</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage and track your mentees' progress</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search mentees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* Mentees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentees.map((mentee) => (
          <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={mentee.avatar}
                  alt={mentee.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#503314] dark:text-white">{mentee.name}</h3>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">{mentee.role}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mentee.status === 'active' ? 'bg-green-100 text-green-800' :
                  mentee.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {mentee.status}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{mentee.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#B45309] h-2 rounded-full" 
                      style={{ width: `${mentee.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-[#7C2D12] dark:text-gray-300">
                  <p><strong>Goal:</strong> {mentee.goals}</p>
                  <p><strong>Last Session:</strong> {mentee.lastSession}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {mentee.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="bg-[#B45309] hover:bg-[#7C2D12] flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309] flex-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};