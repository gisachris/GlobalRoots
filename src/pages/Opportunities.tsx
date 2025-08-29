import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, StarIcon, MapPinIcon, ClockIcon, BriefcaseIcon, GlobeIcon, UserIcon, CheckIcon, ChevronDownIcon, TrendingUpIcon } from 'lucide-react';
export const Opportunities = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  
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
    
    const cards = document.querySelectorAll('.opportunity-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [activeTab]);
  // Mock opportunities data
  const opportunities = [{
    id: 1,
    type: 'mentor',
    name: 'David Mugisha',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Remote (USA)',
    skills: ['React', 'Node.js', 'Cloud Architecture'],
    match: 95,
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 2,
    type: 'job',
    title: 'Frontend Developer',
    company: 'TechRwanda',
    location: 'Kigali, Rwanda',
    duration: 'Full-time',
    skills: ['JavaScript', 'React', 'Tailwind CSS'],
    match: 92,
    stipend: '$800/month',
    deadline: 'Aug 30, 2023',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 3,
    type: 'mentor',
    name: 'Sarah Johnson',
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Remote (UK)',
    skills: ['Product Strategy', 'UX/UI', 'Agile'],
    match: 88,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 4,
    type: 'microinternship',
    title: 'Mobile App Development',
    company: 'FinTech Startup',
    location: 'Remote',
    duration: '6 weeks',
    skills: ['Flutter', 'Firebase', 'UI Design'],
    match: 85,
    stipend: '$500 total',
    deadline: 'Sep 15, 2023',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 5,
    type: 'returnship',
    title: 'Tech Lead Returnship',
    company: 'Rwanda Innovation Hub',
    location: 'Kigali, Rwanda',
    duration: '6 months',
    skills: ['Leadership', 'Full-stack', 'Mentoring'],
    match: 90,
    stipend: '$2000/month',
    deadline: 'Oct 1, 2023',
    benefits: ['Housing assistance', 'Relocation support'],
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 6,
    type: 'job',
    title: 'Backend Developer',
    company: 'Global Solutions',
    location: 'Remote / Kigali',
    duration: 'Full-time',
    skills: ['Python', 'Django', 'PostgreSQL'],
    match: 87,
    stipend: '$1200/month',
    deadline: 'Sep 20, 2023',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }];
  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'all') return true;
    return opp.type === activeTab;
  });
  return <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900 scroll-smooth">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-4">
            <TrendingUpIcon className="h-4 w-4 text-[#B45309] mr-2" />
            <span className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Career Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#503314] dark:text-white">Opportunities</h1>
          <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-2xl mx-auto">
            Discover mentors, jobs, micro-internships, and returnships tailored
            to your skills and career goals
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <input type="text" placeholder="Search opportunities..." className="input pl-10 w-full" />
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
                  <label className="block text-sm font-medium mb-2">
                    Skills
                  </label>
                  <select className="input">
                    <option value="">All Skills</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <select className="input">
                    <option value="">All Locations</option>
                    <option value="kigali">Kigali, Rwanda</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration
                  </label>
                  <select className="input">
                    <option value="">Any Duration</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="short">Short-term ( 3 months)</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset
                </Button>
                <Button variant="primary">Apply Filters</Button>
              </div>
            </div>}
        </div>
        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'all' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('all')}>
              All
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'mentor' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('mentor')}>
              Mentors
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'job' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('job')}>
              Jobs
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'microinternship' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('microinternship')}>
              Micro-internships
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'returnship' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('returnship')}>
              Returnships
            </button>
          </div>
        </div>
        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map(opportunity => <Card key={opportunity.id} className="opportunity-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700">
              {opportunity.type === 'mentor' ?
          // Mentor Card
          <>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img src={opportunity.imageUrl} alt={opportunity.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-secondary-500 rounded-full p-1">
                          <CheckIcon className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-lg text-[#503314] dark:text-white">
                          {opportunity.name}
                        </h3>
                        <p className="text-primary-600 text-sm">
                          {opportunity.title}
                        </p>
                        <p className="text-dark-500 dark:text-dark-300 text-sm">
                          {opportunity.company}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm mb-2">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                        <GlobeIcon className="h-4 w-4 mr-1" />
                        <span>Available for mentoring</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1 text-[#503314] dark:text-white">
                        Skills overlap
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, idx) => <span key={idx} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                            {skill}
                          </span>)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-primary-100 dark:bg-primary-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary-500" style={{
                      width: `${opportunity.match}%`
                    }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {opportunity.match}%
                        </span>
                      </div>
                      <div className="text-xs text-dark-500 dark:text-dark-300">
                        Match
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button variant="primary" className="flex-1">
                        Request Mentoring
                      </Button>
                    </div>
                  </CardContent>
                </> :
          // Job/Internship/Returnship Card
          <>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                          {opportunity.logoUrl ? <img src={opportunity.logoUrl} alt={opportunity.company} className="w-full h-full object-cover" /> : <BriefcaseIcon className="h-6 w-6 text-primary-600" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {opportunity.title}
                          </CardTitle>
                          <CardDescription>
                            {opportunity.company}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded text-xs h-fit">
                        {opportunity.type === 'job' ? 'Job' : opportunity.type === 'microinternship' ? 'Micro-internship' : 'Returnship'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{opportunity.duration}</span>
                      </div>
                      {opportunity.stipend && <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                          <BriefcaseIcon className="h-4 w-4 mr-2" />
                          <span>{opportunity.stipend}</span>
                        </div>}
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-1 text-[#503314] dark:text-white">
                        Required Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, idx) => <span key={idx} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                            {skill}
                          </span>)}
                      </div>
                    </div>
                    {opportunity.benefits && <div className="mb-4">
                        <div className="text-sm font-medium mb-1 text-[#503314] dark:text-white">Benefits</div>
                        <ul className="text-sm text-dark-600 dark:text-primary-300">
                          {opportunity.benefits.map((benefit, idx) => <li key={idx} className="flex items-center">
                              <CheckIcon className="h-3 w-3 text-secondary-500 mr-2" />
                              {benefit}
                            </li>)}
                        </ul>
                      </div>}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-primary-100 dark:bg-primary-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary-500" style={{
                      width: `${opportunity.match}%`
                    }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {opportunity.match}%
                        </span>
                      </div>
                      <div className="text-xs text-dark-500 dark:text-dark-300">
                        Match
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-dark-500 dark:text-dark-300">
                        Deadline: {opportunity.deadline}
                      </div>
                      <Button variant="primary">Apply Now</Button>
                    </div>
                  </CardContent>
                </>}
            </Card>)}
        </div>
        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>;
};