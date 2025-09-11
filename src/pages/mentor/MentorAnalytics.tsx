import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, Users, Clock, Star, Calendar, Download, Filter } from 'lucide-react';

export const MentorAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const analyticsData = {
    totalMentees: 24,
    activeSessions: 156,
    avgRating: 4.9,
    totalHours: 320,
    completionRate: 87,
    responseTime: '2.3 hours'
  };

  const monthlyData = [
    { month: 'Jan', sessions: 12, hours: 18, mentees: 8 },
    { month: 'Feb', sessions: 15, hours: 22, mentees: 10 },
    { month: 'Mar', sessions: 18, hours: 27, mentees: 12 },
    { month: 'Apr', sessions: 22, hours: 33, mentees: 15 },
    { month: 'May', sessions: 25, hours: 38, mentees: 18 },
    { month: 'Jun', sessions: 28, hours: 42, mentees: 20 }
  ];

  const topPerformingCircles = [
    {
      name: 'Frontend Development Mastery',
      members: 12,
      completionRate: 92,
      avgRating: 4.8,
      totalSessions: 48
    },
    {
      name: 'Career Transition Bootcamp',
      members: 8,
      completionRate: 88,
      avgRating: 4.9,
      totalSessions: 32
    },
    {
      name: 'Startup Founders Circle',
      members: 6,
      completionRate: 75,
      avgRating: 4.7,
      totalSessions: 24
    }
  ];

  const menteeProgress = [
    {
      name: 'Jean-Paul Habimana',
      progress: 85,
      sessionsAttended: 12,
      lastActive: '2 days ago',
      status: 'excellent'
    },
    {
      name: 'Alice Uwimana',
      progress: 72,
      sessionsAttended: 9,
      lastActive: '1 week ago',
      status: 'good'
    },
    {
      name: 'Bob Nkurunziza',
      progress: 95,
      sessionsAttended: 15,
      lastActive: '1 day ago',
      status: 'excellent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs-attention': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Analytics</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Track your mentoring performance and impact</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" className="border-[#B45309] text-[#B45309]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#B45309] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Mentees</p>
                <p className="text-3xl font-bold">{analyticsData.totalMentees}</p>
                <p className="text-orange-200 text-sm">+3 this month</p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#503314] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Sessions Completed</p>
                <p className="text-3xl font-bold">{analyticsData.activeSessions}</p>
                <p className="text-orange-200 text-sm">+12 this month</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#92400E] to-[#B45309] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Average Rating</p>
                <p className="text-3xl font-bold">{analyticsData.avgRating}</p>
                <p className="text-orange-200 text-sm">Excellent feedback</p>
              </div>
              <Star className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#7C2D12] dark:text-gray-300">Total Hours</p>
                <p className="text-2xl font-bold text-[#503314] dark:text-white">{analyticsData.totalHours}h</p>
                <p className="text-[#B45309] text-sm">+25h this month</p>
              </div>
              <Clock className="h-8 w-8 text-[#B45309]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#7C2D12] dark:text-gray-300">Completion Rate</p>
                <p className="text-2xl font-bold text-[#503314] dark:text-white">{analyticsData.completionRate}%</p>
                <p className="text-green-600 text-sm">Above average</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#B45309]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#7C2D12] dark:text-gray-300">Response Time</p>
                <p className="text-2xl font-bold text-[#503314] dark:text-white">{analyticsData.responseTime}</p>
                <p className="text-green-600 text-sm">Very responsive</p>
              </div>
              <Clock className="h-8 w-8 text-[#B45309]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#B45309]" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#503314] dark:text-white font-medium">{data.month}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-[#B45309] font-semibold">{data.sessions}</div>
                      <div className="text-[#7C2D12] dark:text-gray-300">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#B45309] font-semibold">{data.hours}h</div>
                      <div className="text-[#7C2D12] dark:text-gray-300">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#B45309] font-semibold">{data.mentees}</div>
                      <div className="text-[#7C2D12] dark:text-gray-300">Mentees</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Circles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-[#B45309]" />
              Top Performing Circles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingCircles.map((circle, index) => (
                <div key={index} className="border border-[#B45309]/20 rounded-lg p-4">
                  <h4 className="font-semibold text-[#503314] dark:text-white mb-2">{circle.name}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#7C2D12] dark:text-gray-300">Members: </span>
                      <span className="font-medium">{circle.members}</span>
                    </div>
                    <div>
                      <span className="text-[#7C2D12] dark:text-gray-300">Sessions: </span>
                      <span className="font-medium">{circle.totalSessions}</span>
                    </div>
                    <div>
                      <span className="text-[#7C2D12] dark:text-gray-300">Completion: </span>
                      <span className="font-medium text-green-600">{circle.completionRate}%</span>
                    </div>
                    <div>
                      <span className="text-[#7C2D12] dark:text-gray-300">Rating: </span>
                      <span className="font-medium text-yellow-600">{circle.avgRating}★</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mentee Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-[#B45309]" />
            Mentee Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {menteeProgress.map((mentee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-[#B45309]/20 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-[#503314] dark:text-white">{mentee.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-[#7C2D12] dark:text-gray-300 mt-1">
                    <span>{mentee.sessionsAttended} sessions</span>
                    <span>Last active: {mentee.lastActive}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-[#7C2D12] dark:text-gray-300">Progress</div>
                    <div className="font-semibold text-[#503314] dark:text-white">{mentee.progress}%</div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#B45309] h-2 rounded-full" 
                      style={{ width: `${mentee.progress}%` }}
                    ></div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentee.status)}`}>
                    {mentee.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};