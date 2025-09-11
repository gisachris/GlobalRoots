import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { TrendingUpIcon, StarIcon, ThumbsUpIcon, EyeIcon, MessageCircleIcon } from 'lucide-react';

export const RisingInnovations = () => {
  const [sortBy, setSortBy] = useState('trending');

  // Mock innovations data with star ratings and engagement metrics
  const innovations = [
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
        return b.stars - a.stars;
      case 'votes':
        return b.votes - a.votes;
      case 'views':
        return b.views - a.views;
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default: // trending
        return b.trending ? 1 : -1;
    }
  });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : i < rating 
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
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
          <option value="stars">Highest Rated</option>
          <option value="votes">Most Voted</option>
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

      {/* Innovations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedInnovations.map((innovation) => (
          <Card key={innovation.id} className={`${innovation.trending ? 'border-[#B45309]/40 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center">
                    {innovation.title}
                    {innovation.trending && (
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
                  by <span className="font-medium text-[#503314] dark:text-white">{innovation.creator}</span>
                </span>
                <span className="text-xs px-2 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full">
                  {innovation.category}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  {renderStars(innovation.stars)}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                      {innovation.votes}
                    </div>
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {innovation.views}
                    </div>
                    <div className="flex items-center">
                      <MessageCircleIcon className="h-4 w-4 mr-1" />
                      {innovation.comments}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Rate Innovation
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="text-center bg-gradient-to-br from-[#B45309]/5 to-[#92400E]/5 border-[#B45309]/20">
        <CardContent className="pt-6">
          <TrendingUpIcon className="h-12 w-12 text-[#B45309] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#503314] dark:text-white mb-2">
            Share Your Innovation
          </h3>
          <p className="text-[#7C2D12] dark:text-gray-300 mb-4">
            Have a great idea? Share it with the community and get feedback from peers and mentors.
          </p>
          <Button variant="primary">Submit Innovation</Button>
        </CardContent>
      </Card>
    </div>
  );
};