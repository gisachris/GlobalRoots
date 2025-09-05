import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Award, Star, Users, Clock, Target, Trophy, Medal, Crown } from 'lucide-react';

export const MentorAchievements: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Mentee',
      description: 'Successfully onboarded your first mentee',
      icon: Users,
      earned: true,
      earnedDate: '2024-01-15',
      category: 'milestone'
    },
    {
      id: 2,
      title: '100 Hours Mentor',
      description: 'Completed 100 hours of mentoring',
      icon: Clock,
      earned: true,
      earnedDate: '2024-03-20',
      category: 'time'
    },
    {
      id: 3,
      title: 'Circle Creator',
      description: 'Created your first mentorship circle',
      icon: Target,
      earned: true,
      earnedDate: '2024-02-10',
      category: 'milestone'
    },
    {
      id: 4,
      title: '5-Star Mentor',
      description: 'Maintained 5-star rating for 3 months',
      icon: Star,
      earned: true,
      earnedDate: '2024-05-01',
      category: 'excellence'
    },
    {
      id: 5,
      title: 'Super Mentor',
      description: 'Mentored 25+ mentees successfully',
      icon: Crown,
      earned: false,
      progress: 24,
      target: 25,
      category: 'milestone'
    },
    {
      id: 6,
      title: 'Marathon Mentor',
      description: 'Complete 500 hours of mentoring',
      icon: Trophy,
      earned: false,
      progress: 320,
      target: 500,
      category: 'time'
    }
  ];

  const stats = {
    totalAchievements: achievements.filter(a => a.earned).length,
    totalPossible: achievements.length,
    points: 2450,
    rank: 'Gold Mentor',
    nextRank: 'Platinum Mentor',
    pointsToNext: 550
  };

  const recentActivity = [
    {
      type: 'achievement',
      title: 'Earned "5-Star Mentor" badge',
      date: '2024-05-01',
      points: 500
    },
    {
      type: 'milestone',
      title: 'Completed 300th mentoring hour',
      date: '2024-04-28',
      points: 100
    },
    {
      type: 'feedback',
      title: 'Received excellent feedback from Jean-Paul',
      date: '2024-04-25',
      points: 50
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'bg-blue-100 text-blue-800';
      case 'time': return 'bg-green-100 text-green-800';
      case 'excellence': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (earned: boolean) => {
    return earned ? 'text-[#B45309]' : 'text-gray-400';
  };

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Achievements</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Track your mentoring milestones and progress</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#B45309] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Achievements</p>
                <p className="text-2xl font-bold">{stats.totalAchievements}/{stats.totalPossible}</p>
              </div>
              <Award className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#503314] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Points</p>
                <p className="text-2xl font-bold">{stats.points}</p>
              </div>
              <Star className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#92400E] to-[#B45309] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Current Rank</p>
                <p className="text-lg font-bold">{stats.rank}</p>
              </div>
              <Medal className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7C2D12] to-[#503314] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Next Rank</p>
                <p className="text-sm">{stats.pointsToNext} points to go</p>
              </div>
              <Trophy className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Rank */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-[#B45309]" />
            Progress to {stats.nextRank}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{stats.rank}</span>
              <span>{stats.nextRank}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#B45309] to-[#7C2D12] h-3 rounded-full" 
                style={{ width: `${((3000 - stats.pointsToNext) / 3000) * 100}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-[#7C2D12] dark:text-gray-300">
              {stats.points} / 3000 points ({stats.pointsToNext} points remaining)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => {
          const IconComponent = achievement.icon;
          return (
            <Card key={achievement.id} className={`${achievement.earned ? 'border-[#B45309] bg-[#B45309]/5' : 'border-gray-200'} transition-all hover:shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${achievement.earned ? 'bg-[#B45309]/10' : 'bg-gray-100'}`}>
                    <IconComponent className={`h-6 w-6 ${getIconColor(achievement.earned)}`} />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </span>
                </div>
                
                <h3 className={`font-semibold mb-2 ${achievement.earned ? 'text-[#503314] dark:text-white' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-4 ${achievement.earned ? 'text-[#7C2D12] dark:text-gray-300' : 'text-gray-400'}`}>
                  {achievement.description}
                </p>
                
                {achievement.earned ? (
                  <div className="flex items-center text-sm text-[#B45309]">
                    <Award className="h-4 w-4 mr-1" />
                    Earned on {achievement.earnedDate}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#B45309] h-2 rounded-full" 
                        style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-[#B45309]" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-[#B45309]/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B45309]/10 rounded-full">
                    <Award className="h-4 w-4 text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#503314] dark:text-white">{activity.title}</h4>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#B45309] font-semibold">+{activity.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};