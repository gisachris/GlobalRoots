import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { SearchIcon, FilterIcon, UsersIcon, CalendarIcon, StarIcon } from 'lucide-react';

export const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock public projects data
  const projects = [
    {
      id: 1,
      title: 'AgriTech Mobile Platform',
      description: 'Connecting farmers with market data and weather forecasts',
      category: 'Agriculture',
      status: 'Recruiting',
      teamSize: 3,
      maxTeamSize: 6,
      deadline: 'Dec 2023',
      featured: true,
      mentor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Education Management System',
      description: 'Digital platform for school administration and student tracking',
      category: 'Education',
      status: 'In Progress',
      teamSize: 5,
      maxTeamSize: 8,
      deadline: 'Jan 2024',
      featured: false,
      mentor: 'Prof. Michael Chen'
    },
    {
      id: 3,
      title: 'Community Health Tracker',
      description: 'Mobile app for tracking community health metrics',
      category: 'Healthcare',
      status: 'Recruiting',
      teamSize: 2,
      maxTeamSize: 5,
      deadline: 'Nov 2023',
      featured: true,
      mentor: 'Dr. Aisha Patel'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">Discover Projects</h2>
        <p className="text-[#7C2D12] dark:text-gray-300">Find exciting projects to join and contribute to</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="Recruiting">Recruiting</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Featured Projects */}
      {filteredProjects.some(p => p.featured) && (
        <div>
          <div className="flex items-center mb-4">
            <StarIcon className="h-5 w-5 text-[#B45309] mr-2" />
            <h3 className="text-lg font-semibold text-[#503314] dark:text-white">Featured Projects</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredProjects.filter(p => p.featured).map((project) => (
              <Card key={project.id} className="border-[#B45309]/30 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center">
                        {project.title}
                        <StarIcon className="h-4 w-4 text-[#B45309] ml-2 fill-current" />
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                      project.status === 'Recruiting' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        <span>{project.teamSize}/{project.maxTeamSize} members</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Mentor: </span>
                      <span className="font-medium text-[#503314] dark:text-white">{project.mentor}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="primary" className="flex-1">Apply to Join</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-4">All Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.filter(p => !p.featured).map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'Recruiting' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs text-[#B45309] font-medium">{project.category}</div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      <span>{project.teamSize}/{project.maxTeamSize}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};