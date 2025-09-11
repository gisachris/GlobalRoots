import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { useProjects } from '../../../context/ProjectsContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProjectsList = () => {
  const { projects, loading, error, loadUserProjects, setFilters, filters } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    if (user?.id) {
      loadUserProjects(user.id);
    }
  }, [user?.id, loadUserProjects, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ search: searchInput });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B45309] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading projects: {error}</p>
        <Button onClick={() => loadUserProjects(user?.id)}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#503314] dark:text-white">My Projects</h2>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage your active projects</p>
        </div>
        <Button variant="primary" className="flex items-center" onClick={() => navigate('/projects?tab=create-projects&subtab=form')}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
          />
        </form>
        <select
          value={filters.type || ''}
          onChange={(e) => handleFilterChange('type', e.target.value || null)}
          className="px-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="">All Types</option>
          <option value="project">Projects</option>
          <option value="innovation">Innovations</option>
        </select>
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value || null)}
          className="px-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : project.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    project.type === 'innovation'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.type}
                  </span>
                </div>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Views: {project.view_count}</span>
                  {project.type === 'innovation' && (
                    <span>⭐ {project.star_count}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs ${
                    project.visibility === 'public'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {project.visibility}
                  </span>
                  <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" className="w-full" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/project/${project.id}/edit`);
                }}>
                  Edit Project
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <PlusIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 mb-4">
            {filters.search || filters.type || filters.status ? 'Try adjusting your filters' : 'Get started by creating your first project'}
          </p>
          <Button variant="primary" onClick={() => navigate('/projects?tab=create-projects&subtab=form')}>Create Project</Button>
        </div>
      )}
    </div>
  );
};