import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../utils/auth';
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Github, 
  Globe, 
  Plus,
  Search,
  Filter
} from 'lucide-react';

export const UserPersonalProjects = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('personalProjects') || '[]');
    setProjects(savedProjects);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    return project.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Waiting for Response':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#503314] dark:text-white mb-2">
                My Projects
              </h1>
              <p className="text-[#7C2D12] dark:text-gray-300">
                Showcase of my personal and professional work
              </p>
            </div>
            <Link to="/projects">
              <Button className="bg-[#B45309] hover:bg-[#7C2D12] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Find New Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white " size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-10 pr-4 py-2 border dark:bg-gray-800 border-[#B45309]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <Button variant="outline" className="bg-[#B45309]/20">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-[#B45309] text-white' : 'bg-white text-[#503314] hover:bg-[#F5F5F0]'}`}
            >
              All Projects ({projects.length})
            </button>
            <button 
              onClick={() => setActiveTab('Waiting for Response')}
              className={`px-4 py-2 rounded-md ${activeTab === 'Waiting for Response' ? 'bg-[#B45309] text-white' : 'bg-white text-[#503314] hover:bg-[#F5F5F0]'}`}
            >
              Waiting ({projects.filter(p => p.status === 'Waiting for Response').length})
            </button>
            <button 
              onClick={() => setActiveTab('In Progress')}
              className={`px-4 py-2 rounded-md ${activeTab === 'In Progress' ? 'bg-[#B45309] text-white' : 'bg-white text-[#503314] hover:bg-[#F5F5F0]'}`}
            >
              In Progress ({projects.filter(p => p.status === 'In Progress').length})
            </button>
            <button 
              onClick={() => setActiveTab('Completed')}
              className={`px-4 py-2 rounded-md ${activeTab === 'Completed' ? 'bg-[#B45309] text-white' : 'bg-white text-[#503314] hover:bg-[#F5F5F0]'}`}
            >
              Completed ({projects.filter(p => p.status === 'Completed').length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-[#503314] dark:text-white">
                    {project.title}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#7C2D12] dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {(project.stack || project.technologies || []).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-[#B45309]/10 text-[#B45309] rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  {project.appliedDate ? (
                    <span>Applied: {new Date(project.appliedDate).toLocaleDateString()}</span>
                  ) : (
                    <>
                      <span>{project.startDate}</span>
                      {project.endDate && (
                        <>
                          <span className="mx-2">-</span>
                          <span>{project.endDate}</span>
                        </>
                      )}
                      {!project.endDate && (
                        <>
                          <Clock className="h-4 w-4 ml-2 mr-1" />
                          <span>Ongoing</span>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-[#503314] dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-[#7C2D12] dark:text-gray-300 mb-4">
              {activeTab === 'all' 
                ? "You haven't added any projects yet." 
                : `No ${activeTab.replace('-', ' ')} projects found.`
              }
            </p>
            <Link to="/projects">
              <Button className="bg-[#B45309] hover:bg-[#7C2D12] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Find New Projects
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};