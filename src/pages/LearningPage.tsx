import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, BookOpenIcon, PlayIcon, FileTextIcon, ClockIcon, StarIcon, DownloadIcon, CheckIcon, ChevronDownIcon, TagIcon, UserIcon, ListIcon } from 'lucide-react';
export const LearningPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  // Mock learning resources data
  const resources = [{
    id: 1,
    title: 'Introduction to React',
    type: 'course',
    author: 'David Mugisha',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '4 hours',
    level: 'Beginner',
    description: 'Learn the basics of React, including components, props, and state management.',
    tags: ['React', 'Frontend', 'JavaScript'],
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    progress: 25
  }, {
    id: 2,
    title: 'Building RESTful APIs with Node.js',
    type: 'video',
    author: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '45 minutes',
    level: 'Intermediate',
    description: 'Learn how to create RESTful APIs using Node.js and Express.',
    tags: ['Node.js', 'Backend', 'API'],
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 3,
    title: 'Frontend Developer Roadmap 2023',
    type: 'guide',
    author: 'Eric Ndayishimiye',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '20 min read',
    level: 'All Levels',
    description: 'A comprehensive guide to becoming a frontend developer in 2023.',
    tags: ['Career', 'Frontend', 'Roadmap'],
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 4,
    title: 'Advanced TypeScript Patterns',
    type: 'course',
    author: 'Marie Uwase',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '6 hours',
    level: 'Advanced',
    description: 'Master advanced TypeScript patterns for better type safety and code quality.',
    tags: ['TypeScript', 'Advanced', 'JavaScript'],
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    progress: 60
  }, {
    id: 5,
    title: 'UI/UX Design Principles',
    type: 'video',
    author: 'Diane Karenzi',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '1 hour',
    level: 'Intermediate',
    description: 'Learn essential UI/UX design principles for creating better user experiences.',
    tags: ['UI', 'UX', 'Design'],
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 6,
    title: 'Getting Started with Docker',
    type: 'guide',
    author: 'Jean Hakizimana',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    duration: '15 min read',
    level: 'Beginner',
    description: 'A beginner-friendly guide to Docker and containerization.',
    tags: ['Docker', 'DevOps', 'Containers'],
    rating: 4.4,
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  const filteredResources = resources.filter(resource => {
    if (activeTab === 'all') return true;
    return resource.type === activeTab;
  });
  // Get resource type icon
  const getResourceIcon = type => {
    switch (type) {
      case 'course':
        return <ListIcon className="h-5 w-5 text-[#B45309]" />;
      case 'video':
        return <PlayIcon className="h-5 w-5 text-[#B45309]" />;
      case 'guide':
        return <FileTextIcon className="h-5 w-5 text-[#B45309]" />;
      default:
        return <BookOpenIcon className="h-5 w-5 text-[#B45309]" />;
    }
  };
  return <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314]">
            Learning Resources
          </h1>
          <p className="text-[#7C2D12] dark:text-primary-300">
            Discover courses, videos, and guides to enhance your skills
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <input type="text" placeholder="Search resources by title, author, or tags..." className="input pl-10 w-full" />
            </div>
            <Button variant="outline" className="flex items-center" onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon className="mr-2" size={18} />
              Filters
              <ChevronDownIcon className={`ml-2 transition-transform ${filterOpen ? 'rotate-180' : ''}`} size={18} />
            </Button>
          </div>
          {/* Filter panel */}
          {filterOpen && <div className="mt-4 p-4 bg-white dark:bg-dark-800 rounded-lg border border-primary-200 dark:border-dark-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-primary-300">
                    Topics
                  </label>
                  <select className="input">
                    <option value="">All Topics</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="design">Design</option>
                    <option value="devops">DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-primary-300">
                    Level
                  </label>
                  <select className="input">
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-primary-300">
                    Duration
                  </label>
                  <select className="input">
                    <option value="">Any Duration</option>
                    <option value="short">Short ( 30 min)</option>
                    <option value="medium">Medium (30 min - 2 hours)</option>
                    <option value="long">Long ({'>'} 2 hours)</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset
                </Button>
                <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white">
                  Apply Filters
                </Button>
              </div>
            </div>}
        </div>
        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'all' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-800 text-[#503314] dark:text-primary-300 hover:bg-[#F5F5F0] dark:hover:bg-dark-700'}`} onClick={() => setActiveTab('all')}>
              All Resources
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap flex items-center ${activeTab === 'course' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-800 text-[#503314] dark:text-primary-300 hover:bg-[#F5F5F0] dark:hover:bg-dark-700'}`} onClick={() => setActiveTab('course')}>
              <ListIcon className="h-4 w-4 mr-1" />
              Courses
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap flex items-center ${activeTab === 'video' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-800 text-[#503314] dark:text-primary-300 hover:bg-[#F5F5F0] dark:hover:bg-dark-700'}`} onClick={() => setActiveTab('video')}>
              <PlayIcon className="h-4 w-4 mr-1" />
              Videos
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap flex items-center ${activeTab === 'guide' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-800 text-[#503314] dark:text-primary-300 hover:bg-[#F5F5F0] dark:hover:bg-dark-700'}`} onClick={() => setActiveTab('guide')}>
              <FileTextIcon className="h-4 w-4 mr-1" />
              Guides
            </button>
          </div>
        </div>
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => <Card key={resource.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-40">
                <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-white dark:bg-dark-800 rounded-full text-xs font-medium text-[#503314] dark:text-primary-300 flex items-center">
                  {getResourceIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </div>
                {resource.progress !== undefined && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F5F5F0] dark:bg-dark-700">
                    <div className="h-full bg-[#B45309]" style={{
                width: `${resource.progress}%`
              }}></div>
                  </div>}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-[#503314] dark:text-primary-300">
                    {resource.title}
                  </CardTitle>
                  <div className="flex items-center bg-[#F5F5F0] dark:bg-dark-700 px-2 py-1 rounded">
                    <StarIcon className="h-3 w-3 text-[#B45309] mr-1" />
                    <span className="text-xs font-medium text-[#503314] dark:text-primary-300">
                      {resource.rating}
                    </span>
                  </div>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img src={resource.authorImage} alt={resource.author} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm text-[#7C2D12] dark:text-primary-400">
                    {resource.author}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.tags.map((tag, idx) => <span key={idx} className="px-2 py-1 bg-[#B45309]/10 rounded-full text-xs text-[#B45309]">
                      {tag}
                    </span>)}
                </div>
                <div className="flex justify-between text-sm text-[#7C2D12] dark:text-primary-400">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{resource.duration}</span>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-[#F5F5F0] dark:bg-dark-700 rounded text-xs">
                      {resource.level}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  {resource.progress !== undefined ? 'Continue' : 'Start'}
                </Button>
                <Button variant="outline" className="flex items-center">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-md border border-primary-200 dark:border-dark-600 text-[#7C2D12] dark:text-primary-400 hover:bg-[#F5F5F0] dark:hover:bg-dark-700">
              Previous
            </button>
            <button className="px-3 py-2 rounded-md bg-[#B45309] text-white">
              1
            </button>
            <button className="px-3 py-2 rounded-md border border-primary-200 dark:border-dark-600 text-[#7C2D12] dark:text-primary-400 hover:bg-[#F5F5F0] dark:hover:bg-dark-700">
              2
            </button>
            <button className="px-3 py-2 rounded-md border border-primary-200 dark:border-dark-600 text-[#7C2D12] dark:text-primary-400 hover:bg-[#F5F5F0] dark:hover:bg-dark-700">
              3
            </button>
            <button className="px-3 py-2 rounded-md border border-primary-200 dark:border-dark-600 text-[#7C2D12] dark:text-primary-400 hover:bg-[#F5F5F0] dark:hover:bg-dark-700">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>;
};