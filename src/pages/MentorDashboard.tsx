import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Users, 
  MessageCircle,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Plus,
  User,
  Building,
  Award,
  Globe,
  Target,
  BookOpen,
  Video,
  CheckCircle
} from 'lucide-react';

export const MentorDashboard = () => {
  const { user } = useAuth();

  // Mock mentor data
  const mentorStats = {
    totalMentees: 24,
    activeCircles: 3,
    upcomingMeetings: 5,
    completedSessions: 156,
    rating: 4.9,
    monthlyHours: 32
  };

  const upcomingMeetings = [
    {
      id: 1,
      title: "Frontend Development Circle",
      mentees: ["Alice K.", "Bob M.", "Carol S."],
      time: "Today, 2:00 PM",
      duration: "60 min",
      type: "Circle Meeting"
    },
    {
      id: 2,
      title: "1-on-1 with Jean-Paul",
      mentees: ["Jean-Paul H."],
      time: "Tomorrow, 10:00 AM", 
      duration: "45 min",
      type: "Individual Session"
    },
    {
      id: 3,
      title: "Career Guidance Session",
      mentees: ["Marie U.", "Patrick K."],
      time: "Dec 16, 3:00 PM",
      duration: "90 min",
      type: "Group Session"
    }
  ];

  const myCircles = [
    {
      id: 1,
      name: "Frontend Development Mastery",
      members: 12,
      maxMembers: 15,
      nextMeeting: "Today, 2:00 PM",
      progress: 75,
      description: "Learn modern React, TypeScript, and best practices"
    },
    {
      id: 2,
      name: "Career Transition Bootcamp", 
      members: 8,
      maxMembers: 10,
      nextMeeting: "Dec 18, 4:00 PM",
      progress: 60,
      description: "Navigate career changes in tech industry"
    },
    {
      id: 3,
      name: "Startup Founders Circle",
      members: 6,
      maxMembers: 8,
      nextMeeting: "Dec 20, 6:00 PM", 
      progress: 40,
      description: "Build and scale your tech startup"
    }
  ];

  const menteeRequests = [
    {
      id: 1,
      name: "Grace Uwimana",
      role: "Junior Developer",
      message: "Looking for guidance in full-stack development",
      skills: ["JavaScript", "React", "Node.js"],
      requestDate: "2 hours ago"
    },
    {
      id: 2,
      name: "David Nkurunziza", 
      role: "CS Student",
      message: "Need help with career planning and skill development",
      skills: ["Python", "Data Science", "ML"],
      requestDate: "1 day ago"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "session_completed",
      message: "Completed session with Jean-Paul H.",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "circle_update",
      message: "Posted new project in Frontend Circle",
      time: "5 hours ago"
    },
    {
      id: 3,
      type: "new_mentee",
      message: "Alice K. joined your circle",
      time: "1 day ago"
    }
  ];

  return (
    <div className="px-4 space-y-8 pt-20">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#503314] dark:text-white mb-2">
          Welcome back, {user?.name || 'Sarah Johnson'}!
        </h1>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Ready to inspire and guide the next generation? Here's your mentorship overview.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#B45309] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Mentees</p>
                <p className="text-3xl font-bold">{mentorStats.totalMentees}</p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#503314] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Active Circles</p>
                <p className="text-3xl font-bold">{mentorStats.activeCircles}</p>
              </div>
              <Globe className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#92400E] to-[#B45309] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">This Month</p>
                <p className="text-3xl font-bold">{mentorStats.monthlyHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7C2D12] to-[#503314] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Rating</p>
                <p className="text-3xl font-bold">{mentorStats.rating}</p>
              </div>
              <Star className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#B45309]" />
            Upcoming Meetings
          </CardTitle>
          <Link to="/mentor/calendar">
            <Button variant="ghost" size="sm" className="text-[#B45309]">
              View Calendar <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center p-4 border border-[#B45309]/20 rounded-lg hover:bg-[#F5F5F0] dark:hover:bg-gray-900/80 transition-all">
                <div className="p-2 bg-[#B45309]/10 rounded-md mr-4">
                  <Video className="h-5 w-5 text-[#B45309]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#503314] dark:text-white">{meeting.title}</h4>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                    {meeting.mentees.join(", ")} • {meeting.type}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-[#7C2D12] dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-1" />
                    {meeting.time} ({meeting.duration})
                  </div>
                </div>
                <Button size="sm" className="bg-[#B45309] hover:bg-[#7C2D12]">
                  Join Meeting
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Circles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-[#B45309]" />
            My Mentorship Circles
          </CardTitle>
          <Link to="/mentor/circles/create">
            <Button size="sm" className="bg-[#B45309] hover:bg-[#7C2D12]">
              <Plus className="h-4 w-4 mr-1" /> Create Circle
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myCircles.map((circle) => (
              <div key={circle.id} className="border border-[#B45309]/20 rounded-lg p-4 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#503314] dark:text-white">{circle.name}</h4>
                  <span className="text-sm text-[#B45309] font-medium">
                    {circle.members}/{circle.maxMembers}
                  </span>
                </div>
                <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                  {circle.description}
                </p>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{circle.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#B45309] h-2 rounded-full" 
                      style={{ width: `${circle.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  Next: {circle.nextMeeting}
                </div>
                <Button size="sm" variant="outline" className="w-full border-[#B45309] text-[#B45309]">
                  Manage Circle
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mentee Requests & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mentee Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-[#B45309]" />
              Mentee Requests
            </CardTitle>
            <span className="bg-[#B45309] text-white text-xs px-2 py-1 rounded-full">
              {menteeRequests.length}
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menteeRequests.map((request) => (
                <div key={request.id} className="border border-[#B45309]/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#503314] dark:text-white">{request.name}</h4>
                      <p className="text-sm text-[#7C2D12] dark:text-gray-300">{request.role}</p>
                    </div>
                    <span className="text-xs text-[#7C2D12] dark:text-gray-300">{request.requestDate}</span>
                  </div>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-3">{request.message}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {request.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-[#B45309] hover:bg-[#7C2D12] flex-1">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309] flex-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#B45309]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-[#B45309]/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-[#B45309]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#503314] dark:text-white">{activity.message}</p>
                    <p className="text-xs text-[#7C2D12] dark:text-gray-300">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="text-[#B45309] w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/mentor/circles/create">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                <Plus className="h-6 w-6 mb-1" />
                Create Circle
              </Button>
            </Link>
            <Link to="/mentor/schedule">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                <Calendar className="h-6 w-6 mb-1" />
                Schedule Meeting
              </Button>
            </Link>
            <Link to="/mentor/resources">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                <BookOpen className="h-6 w-6 mb-1" />
                Upload Resources
              </Button>
            </Link>
            <Link to="/mentor/marketplace">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                <Building className="h-6 w-6 mb-1" />
                Job Market Insights
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};