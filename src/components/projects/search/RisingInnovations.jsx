import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { TrendingUpIcon, StarIcon, ThumbsUpIcon, EyeIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';
import { useProjects } from '../../../context/ProjectsContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RisingInnovations = () => {
  const { risingInnovations, loading, loadRisingInnovations, toggleProjectStar } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('trending');

  useEffect(() => {
    loadRisingInnovations();
  }, [loadRisingInnovations]);

  const handleStarProject = async (projectId) => {
    if (!user?.id) return;
    try {
      await toggleProjectStar(projectId, user.id);
      loadRisingInnovations(); // Refresh to get updated star count
    } catch (error) {
      console.error('Failed to star project:', error);
    }
  };

  const handleShareProject = (project) => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.origin + `/project/${project.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/project/${project.id}`);
      alert('Project link copied to clipboard!');
    }
  };

  // Use real data instead of mock data
  const innovations = risingInnovations || [
    {
      id: 1,
      title: 'Smart Water Quality Monitor',
      description: 'IoT device for real-time water quality monitoring in rural communities',
      creator: 'Alice Uwimana',
      stars: 4.8,
      votes: 156,
      views: 2340,
      comments: 23,
      category: 'IoT',
      trending: true,
      createdAt: '2023-10-15'
    },
    {
      id: 2,
      title: 'AI-Powered Crop Disease Detection',
      description: 'Mobile app using computer vision to identify crop diseases',
      creator: 'Jean Baptiste',
      stars: 4.6,
      votes: 134,
      views: 1890,
      comments: 18,
      category: 'AI/ML',
      trending: true,
      createdAt: '2023-10-12'
    },
    {
      id: 3,
      title: 'Digital Marketplace for Artisans',
      description: 'E-commerce platform connecting local artisans with global buyers',
      creator: 'Grace Mukamana',
      stars: 4.4,
      votes: 98,
      views: 1560,
      comments: 15,
      category: 'E-commerce',
      trending: false,
      createdAt: '2023-10-10'
    },
    {
      id: 4,
      title: 'Renewable Energy Calculator',
      description: 'Tool to calculate optimal renewable energy solutions for homes',
      creator: 'David Nkurunziza',
      stars: 4.7,
      votes: 87,
      views: 1234,
      comments: 12,
      category: 'Green Tech',
      trending: true,
      createdAt: '2023-10-08'
    }
  ];

  const sortedInnovations = [...innovations].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.star_count - a.star_count;
      case 'views':
        return b.view_count - a.view_count;
      case 'recent':
        return new Date(b.created_at) - new Date(a.created_at);
      default: // trending
        return b.star_count - a.star_count; // Use star count as trending metric
    }
  });

  const renderStars = (starCount) => {
    return (
      <div className="flex items-center">
        <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
        <span className="text-sm font-medium">{starCount} stars</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">Rising Innovations</h2>
          <p className="text-[#7C2D12] dark:text-gray-300">Discover trending innovations from the community</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-[#B45309]/20 rounded-md focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
        >
          <option value="trending">Trending</option>
          <option value="stars">Most Starred</option>
          <option value="views">Most Viewed</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>

      {/* Trending Badge */}
      <div className="flex items-center p-4 bg-gradient-to-r from-[#B45309]/10 to-[#92400E]/10 rounded-lg border border-[#B45309]/20">
        <TrendingUpIcon className="h-6 w-6 text-[#B45309] mr-3" />
        <div>
          <h3 className="font-semibold text-[#503314] dark:text-white">What's Trending</h3>
          <p className="text-sm text-[#7C2D12] dark:text-gray-300">
            Innovations gaining momentum in the community
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B45309]"></div>
        </div>
      )}

      {/* Innovations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedInnovations.map((innovation) => (
            <Card key={innovation.id} className={`${innovation.star_count > 50 ? 'border-[#B45309]/40 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center">
                      {innovation.title}
                      {innovation.star_count > 50 && (
                        <div className="ml-2 px-2 py-1 bg-[#B45309] text-white text-xs rounded-full flex items-center">
                          <TrendingUpIcon className="h-3 w-3 mr-1" />
                          Trending
                        </div>
                      )}
                    </CardTitle>
                    <CardDescription>{innovation.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Created {new Date(innovation.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full capitalize">
                    {innovation.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    {renderStars(innovation.star_count)}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {innovation.view_count}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStarProject(innovation.id)}
                      className="flex items-center"
                    >
                      <StarIcon className="h-4 w-4 mr-1" />
                      Star
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareProject(innovation)}
                      className="flex items-center"
                    >
                      <ShareIcon className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="primary" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && sortedInnovations.length === 0 && (
        <div className="text-center py-12">
          <TrendingUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No rising innovations yet</h3>
          <p className="text-gray-500 mb-4">Be the first to share an innovative idea!</p>
          <Button 
            variant="primary"
            onClick={() => {
              const newPath = user?.role === 'mentor' ? '/mentor/projects/new' : '/projects/new';
              navigate(newPath);
            }}
          >
            Submit Innovation
          </Button>
        </div>
      )}

      {/* Call to Action */}
      {!loading && sortedInnovations.length > 0 && (
        <Card className="text-center bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 border-[#B45309]/20">
          <CardContent className="pt-6">
            <TrendingUpIcon className="h-12 w-12 text-[#B45309] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
              Share Your Innovation
            </h3>
            <p className="text-[#7C2D12] dark:text-gray-300 mb-4">
              Have a great idea? Share it with the community and get feedback from peers and mentors.
            </p>
            <Button 
              variant="primary"
              onClick={() => {
                const newPath = user?.role === 'mentor' ? '/mentor/projects/new' : '/projects/new';
                navigate(newPath);
              }}
            >
              Submit Innovation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};