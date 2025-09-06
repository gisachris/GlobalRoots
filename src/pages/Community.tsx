import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UsersIcon, CalendarIcon, MessageSquareIcon, PlusIcon, ChevronRightIcon, UserPlusIcon, MapPinIcon, ClockIcon, GlobeIcon, SearchIcon, FilterIcon, TrendingUpIcon, StarIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const Community = () => {
  const [activeTab, setActiveTab] = useState('circles');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [joinedCircles, setJoinedCircles] = useState<number[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<any>(null);
  const {user} = useAuth()
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.community-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [activeTab]);
  const handleJoinCircle = (circleId: number) => {
    setJoinedCircles(prev => [...prev, circleId]);
  };

  const handleLeaveCircle = (circleId: number) => {
    setJoinedCircles(prev => prev.filter(id => id !== circleId));
  };

  const handleViewCircle = (circle: any) => {
    setSelectedCircle(circle);
  };

  const closeCircleView = () => {
    setSelectedCircle(null);
  };

  // Mock community data
  const communityCircles = [{
    id: 1,
    name: 'Rwanda Web Developers',
    description: 'A group for web developers in Rwanda to share knowledge and opportunities.',
    members: 248,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Web Development', 'JavaScript', 'React']
  }, {
    id: 2,
    name: 'Diaspora Returnees',
    description: 'Support group for IT professionals returning to Rwanda.',
    members: 124,
    category: 'Career',
    imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Returnees', 'Career', 'Networking']
  }, {
    id: 3,
    name: 'Women in Tech Rwanda',
    description: "Empowering women in Rwanda's tech ecosystem.",
    members: 189,
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Women in Tech', 'Mentorship', 'Leadership']
  }, {
    id: 4,
    name: 'Data Science & AI',
    description: 'Discussing the latest in data science, machine learning, and AI.',
    members: 156,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Data Science', 'AI', 'Machine Learning']
  }, {
    id: 5,
    name: 'Kigali Startups',
    description: 'For tech entrepreneurs building startups in Kigali.',
    members: 132,
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Startups', 'Entrepreneurship', 'Funding']
  }, {
    id: 6,
    name: 'Mobile Dev Rwanda',
    description: 'Mobile app developers sharing knowledge and best practices.',
    members: 97,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    tags: ['Mobile', 'Android', 'iOS']
  }];
  const upcomingEvents = [{
    id: 1,
    title: 'Web Development Workshop',
    date: 'Aug 25, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Online',
    circle: 'Rwanda Web Developers',
    attendees: 45
  }, {
    id: 2,
    title: 'Returnee Networking Mixer',
    date: 'Sep 2, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'Kigali Innovation City',
    circle: 'Diaspora Returnees',
    attendees: 28
  }, {
    id: 3,
    title: 'Women in Tech Mentorship Session',
    date: 'Sep 8, 2023',
    time: '4:00 PM - 6:00 PM',
    location: 'Online',
    circle: 'Women in Tech Rwanda',
    attendees: 32
  }];
  return <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900 scroll-smooth">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-4">
            <UsersIcon className="h-4 w-4 text-[#B45309] mr-2" />
            <span className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Community Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#503314] dark:text-white">Community Circles</h1>
          <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-2xl mx-auto">
            Connect with like-minded professionals in Rwanda's tech ecosystem and build meaningful relationships
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7C2D12]" size={18} />
              <input 
                type="text" 
                placeholder="Search communities..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#B45309]/20 rounded-xl bg-white text-[#503314] placeholder-[#7C2D12] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-transparent transition-all duration-200" 
              />
            </div>
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white px-6 py-3 rounded-xl"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FilterIcon className="mr-2" size={18} />
                Filter
              </Button>
              {filterOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-[#B45309]/20 rounded-lg p-4 shadow-lg z-10 w-48">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-2 border border-[#B45309]/20 rounded"
                  >
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Career">Career</option>
                    <option value="Community">Community</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              )}
            </div>
            {user?.role==='diaspora'&&<Button variant="primary" className="flex items-center bg-[#B45309] hover:bg-[#92400E] px-6 py-3 rounded-xl">
              <PlusIcon className="mr-2" size={18} />
              Create Circle
            </Button>}
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
            <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'circles' ? 'bg-[#B45309] text-white shadow-md' : 'text-[#7C2D12] dark:text-gray-300 hover:bg-[#F5F5F0] dark:hover:bg-gray-700 hover:text-[#B45309]'}`} onClick={() => setActiveTab('circles')}>
              Circles
            </button>
            <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'events' ? 'bg-[#B45309] text-white shadow-md' : 'text-[#7C2D12] dark:text-gray-300 hover:bg-[#F5F5F0] dark:hover:bg-gray-700 hover:text-[#B45309]'}`} onClick={() => setActiveTab('events')}>
              Upcoming Events
            </button>
            <button className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'my-circles' ? 'bg-[#B45309] text-white shadow-md' : 'text-[#7C2D12] dark:text-gray-300 hover:bg-[#F5F5F0] dark:hover:bg-gray-700 hover:text-[#B45309]'}`} onClick={() => setActiveTab('my-circles')}>
              My Circles
            </button>
          </div>
        </div>
        {/* Content based on active tab */}
        {activeTab === 'circles' && (() => {
          const filteredCircles = communityCircles.filter(circle => {
            const matchesSearch = circle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                circle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                circle.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = !categoryFilter || circle.category === categoryFilter;
            return matchesSearch && matchesCategory;
          });
          
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCircles.map(circle => {
                const isJoined = joinedCircles.includes(circle.id);
                return (
                  <Card key={circle.id} className="community-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 overflow-hidden flex flex-col h-full">
                <div className="h-40 overflow-hidden">
                  <img src={circle.imageUrl} alt={circle.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{circle.name}</CardTitle>
                  <CardDescription>{circle.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {circle.tags.map((tag, idx) => <span key={idx} className="px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-xs font-medium">
                        {tag}
                      </span>)}
                  </div>
                  <div className="flex items-center text-[#7C2D12] dark:text-gray-300 text-sm font-medium">
                    <UsersIcon className="h-4 w-4 mr-2" />
                    <span>{circle.members} members</span>
                  </div>
                </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        className="flex items-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                        onClick={() => handleViewCircle(circle)}
                      >
                        <ChevronRightIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {isJoined ? (
                        <Button 
                          variant="outline" 
                          className="flex items-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => handleLeaveCircle(circle.id)}
                        >
                          Leave
                        </Button>
                      ) : (
                        <Button 
                          variant="primary" 
                          className="flex items-center bg-[#B45309] hover:bg-[#92400E]"
                          onClick={() => handleJoinCircle(circle.id)}
                        >
                          <UserPlusIcon className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          );
        })()}
        {activeTab === 'events' && <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>By {event.circle}</CardDescription>
                      </div>
                      <div className="bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 px-3 py-1 rounded-full text-sm">
                        {event.attendees} attending
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-dark-500 dark:text-dark-300">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-dark-500 dark:text-dark-300">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-dark-500 dark:text-dark-300">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Details</Button>
                    <Button variant="primary">RSVP</Button>
                  </CardFooter>
                </Card>)}
              {user?.role==='diaspora'&&<>{/* Create Event Card */}
              <Card className="hover:shadow-md transition-shadow border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4">
                    <CalendarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#503314] dark:text-white">Host an Event</h3>
                  <p className="text-dark-500 dark:text-dark-300 text-center mb-6">
                    Share knowledge or organize a meetup with your community
                  </p>
                  <Button variant="outline" className="flex items-center">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </CardContent>
              </Card></>}
            </div>
          </div>}
        {activeTab === 'my-circles' && (() => {
          const myCircles = communityCircles.filter(circle => joinedCircles.includes(circle.id));
          
          if (myCircles.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4">
                  <UsersIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#503314] dark:text-white">
                  Join Your First Circle
                </h3>
                <p className="text-dark-500 dark:text-dark-300 text-center max-w-md mb-6">
                  Connect with like-minded professionals, share knowledge, and grow your network
                </p>
                <Button variant="primary" onClick={() => setActiveTab('circles')}>
                  Explore Circles
                </Button>
              </div>
            );
          }
          
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myCircles.map(circle => (
                <Card key={circle.id} className="community-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 overflow-hidden flex flex-col h-full">
                  <div className="h-40 overflow-hidden">
                    <img src={circle.imageUrl} alt={circle.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{circle.name}</CardTitle>
                    <CardDescription>{circle.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {circle.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-[#7C2D12] dark:text-gray-300 text-sm font-medium">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      <span>{circle.members} members</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      className="flex items-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                      onClick={() => handleViewCircle(circle)}
                    >
                      <ChevronRightIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleLeaveCircle(circle.id)}
                    >
                      Leave
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          );
        })()}
        {/* Forum Discussions Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#503314] dark:text-white">Popular Discussions</h2>
            <Link to="/discussions">
              <Button variant="ghost" className="text-primary-600">
                View All
              </Button>
            </Link>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-lg border border-primary-200 dark:border-dark-600 overflow-hidden">
            {[1, 2, 3].map(item => <div key={item} className={`p-4 ${item !== 3 ? 'border-b border-primary-200 dark:border-dark-600' : ''}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="User avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium mr-2 text-[#503314] dark:text-white">
                        {item === 1 ? 'Best resources for learning React in Rwanda?' : item === 2 ? 'Relocating back to Kigali - housing advice needed' : 'Mentorship opportunities for junior developers'}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full">
                        {item === 1 ? 'Rwanda Web Developers' : item === 2 ? 'Diaspora Returnees' : 'Women in Tech Rwanda'}
                      </span>
                    </div>
                    <p className="text-dark-500 dark:text-dark-300 text-sm mb-2">
                      {item === 1 ? "I'm looking for Rwanda-specific resources for learning React. Any recommendations for local bootcamps or mentors?" : item === 2 ? "After 5 years abroad, I'm moving back to Kigali next month. Any tips on finding tech-friendly housing?" : 'Are there any structured mentorship programs for junior devs in Rwanda? Especially interested in backend development.'}
                    </p>
                    <div className="flex items-center text-dark-500 dark:text-dark-300 text-xs">
                      <span className="mr-4">
                        Posted by John{' '}
                        {item === 1 ? 'Mugabo' : item === 2 ? 'Rwema' : 'Nkusi'}
                      </span>
                      <span className="mr-4">
                        {item === 1 ? '2' : item === 2 ? '4' : '1'} hours ago
                      </span>
                      <span className="mr-4">
                        {item === 1 ? '12' : item === 2 ? '8' : '5'} replies
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary-600">
                    <MessageSquareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </div>
        {/* Community Stats */}
        <div className="mt-12 bg-gradient-to-br from-[#B45309] to-[#92400E] rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Community Impact</h2>
            <p className="text-white/90">Building Rwanda's tech ecosystem together</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">28</div>
              <div className="text-white/80 font-medium">Active Circles</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">1,450+</div>
              <div className="text-white/80 font-medium">Community Members</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">120</div>
              <div className="text-white/80 font-medium">Events This Year</div>
            </div>
          </div>
        </div>

        {/* Circle View Modal */}
        {selectedCircle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeCircleView}>
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img src={selectedCircle.imageUrl} alt={selectedCircle.name} className="w-full h-48 object-cover" />
                <button 
                  onClick={closeCircleView}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#503314] dark:text-white mb-2">{selectedCircle.name}</h2>
                    <p className="text-[#7C2D12] dark:text-gray-300">{selectedCircle.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <UsersIcon className="h-5 w-5 mr-2 text-[#B45309]" />
                  <span className="text-[#503314] dark:text-white font-medium">{selectedCircle.members} members</span>
                  <span className="mx-3 text-gray-300">•</span>
                  <span className="text-[#7C2D12] dark:text-gray-300">{selectedCircle.category}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCircle.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  {joinedCircles.includes(selectedCircle.id) ? (
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleLeaveCircle(selectedCircle.id)}
                    >
                      Leave Circle
                    </Button>
                  ) : (
                    <Button 
                      className="bg-[#B45309] hover:bg-[#7C2D12] text-white"
                      onClick={() => handleJoinCircle(selectedCircle.id)}
                    >
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Join Circle
                    </Button>
                  )}
                  <Button variant="outline" className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    View Discussions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>;
};