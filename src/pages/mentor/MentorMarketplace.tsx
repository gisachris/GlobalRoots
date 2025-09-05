import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Building, TrendingUp, Users, MapPin, DollarSign, Clock, Filter } from 'lucide-react';

export const MentorMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobMarketData = {
    totalJobs: 1247,
    avgSalary: '$85,000',
    topSkills: ['JavaScript', 'React', 'Python', 'Node.js', 'AWS'],
    growthRate: '+15%'
  };

  const jobOpportunities = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Rwanda',
      location: 'Kigali, Rwanda',
      salary: '$70,000 - $90,000',
      type: 'Full-time',
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 days ago',
      applicants: 45,
      category: 'frontend'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Innovation Hub',
      location: 'Remote',
      salary: '$80,000 - $110,000',
      type: 'Full-time',
      skills: ['JavaScript', 'Python', 'AWS'],
      posted: '1 week ago',
      applicants: 67,
      category: 'fullstack'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataTech Solutions',
      location: 'Kigali, Rwanda',
      salary: '$75,000 - $95,000',
      type: 'Full-time',
      skills: ['Python', 'Machine Learning', 'SQL'],
      posted: '3 days ago',
      applicants: 32,
      category: 'data'
    }
  ];

  const marketInsights = [
    {
      title: 'Most In-Demand Skills',
      data: [
        { skill: 'JavaScript', demand: 95 },
        { skill: 'React', demand: 87 },
        { skill: 'Python', demand: 82 },
        { skill: 'Node.js', demand: 78 },
        { skill: 'AWS', demand: 75 }
      ]
    },
    {
      title: 'Salary Trends',
      data: [
        { role: 'Senior Developer', salary: '$85,000', growth: '+12%' },
        { role: 'Full Stack Engineer', salary: '$90,000', growth: '+15%' },
        { role: 'Data Scientist', salary: '$95,000', growth: '+18%' },
        { role: 'DevOps Engineer', salary: '$88,000', growth: '+14%' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Jobs' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'data', label: 'Data Science' },
    { id: 'mobile', label: 'Mobile' }
  ];

  const filteredJobs = selectedCategory === 'all' 
    ? jobOpportunities 
    : jobOpportunities.filter(job => job.category === selectedCategory);

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Job Market Insights</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Stay updated with industry trends and opportunities</p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-[#B45309] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Jobs</p>
                <p className="text-2xl font-bold">{jobMarketData.totalJobs}</p>
              </div>
              <Building className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#503314] to-[#7C2D12] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Avg Salary</p>
                <p className="text-2xl font-bold">{jobMarketData.avgSalary}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#92400E] to-[#B45309] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Growth Rate</p>
                <p className="text-2xl font-bold">{jobMarketData.growthRate}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7C2D12] to-[#503314] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Top Skills</p>
                <p className="text-sm">{jobMarketData.topSkills.slice(0, 2).join(', ')}</p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {marketInsights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#B45309]" />
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insight.data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-[#503314] dark:text-white">
                      {'skill' in item ? item.skill : item.role}
                    </span>
                    <div className="flex items-center space-x-2">
                      {'demand' in item ? (
                        <>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#B45309] h-2 rounded-full" 
                              style={{ width: `${item.demand}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.demand}%</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">{item.salary}</span>
                          <span className="text-green-600 text-sm">{item.growth}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Opportunities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-[#B45309]" />
            Latest Job Opportunities
          </CardTitle>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#B45309] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-[#503314] dark:text-white hover:bg-[#B45309]/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="border border-[#B45309]/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-[#B45309] font-medium mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-[#7C2D12] dark:text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">{job.posted}</p>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">{job.applicants} applicants</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                    Share with Mentees
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};