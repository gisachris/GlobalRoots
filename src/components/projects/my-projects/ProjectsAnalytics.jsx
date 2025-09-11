import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { BarChartIcon, TrendingUpIcon, UsersIcon, ClockIcon } from 'lucide-react';

export const ProjectsAnalytics = () => {
  // Mock analytics data
  const stats = [
    { label: 'Total Projects', value: '12', icon: BarChartIcon, change: '+2 this month' },
    { label: 'Active Projects', value: '8', icon: TrendingUpIcon, change: '+1 this week' },
    { label: 'Team Members', value: '24', icon: UsersIcon, change: '+3 this month' },
    { label: 'Avg. Completion Time', value: '3.2 months', icon: ClockIcon, change: '-0.5 months' }
  ];

  const recentActivity = [
    { project: 'E-commerce Platform', action: 'Progress updated to 65%', time: '2 hours ago' },
    { project: 'Healthcare App', action: 'New team member added', time: '1 day ago' },
    { project: 'Tourism Guide', action: 'Milestone completed', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">Analytics Dashboard</h2>
        <p className="text-[#7C2D12] dark:text-gray-300">Track your project performance and team metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#B45309]/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#B45309]" />
                  </div>
                  <div className="text-2xl font-bold text-[#503314] dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChartIcon className="h-12 w-12 mx-auto mb-2" />
                <p>Chart visualization will be implemented here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUpIcon className="h-12 w-12 mx-auto mb-2" />
                <p>Performance metrics will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-[#B45309] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-[#503314] dark:text-white">{activity.project}</p>
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};