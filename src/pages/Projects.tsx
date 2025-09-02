import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, FolderIcon, UserIcon, CodeIcon, CalendarIcon, GlobeIcon, ChevronRightIcon, CheckIcon, PlusIcon, TrendingUpIcon, StarIcon } from 'lucide-react';
export const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  
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
    
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [activeTab]);
  // Mock projects data
  const projects = [{
    id: 1,
    title: 'E-commerce Platform for Local Artisans',
    description: 'Building a marketplace for Rwandan artisans to sell their products globally.',
    status: 'In Progress',
    progress: 65,
    stack: ['React', 'Node.js', 'MongoDB'],
    team: 4,
    duration: '3 months',
    deadline: 'Oct 15, 2023',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 2,
    title: 'Healthcare Appointment System',
    description: 'A mobile app for scheduling healthcare appointments in rural Rwanda.',
    status: 'Recruiting',
    progress: 10,
    stack: ['React Native', 'Firebase', 'Node.js'],
    team: 3,
    duration: '4 months',
    deadline: 'Dec 1, 2023',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 3,
    title: 'Farmer Market Analytics',
    description: 'Data platform to help farmers optimize crop prices and distribution.',
    status: 'Completed',
    progress: 100,
    stack: ['Python', 'React', 'PostgreSQL'],
    team: 5,
    duration: '2 months',
    deadline: 'Jul 30, 2023',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 4,
    title: 'EdTech Platform for Schools',
    description: 'Digital learning management system for Rwandan schools.',
    status: 'In Progress',
    progress: 40,
    stack: ['Vue.js', 'Express', 'MongoDB'],
    team: 6,
    duration: '6 months',
    deadline: 'Nov 20, 2023',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 5,
    title: 'Tourism Guide App',
    description: "Interactive guide for tourists visiting Rwanda's national parks.",
    status: 'Recruiting',
    progress: 25,
    stack: ['Flutter', 'Firebase', 'Google Maps API'],
    team: 3,
    duration: '4 months',
    deadline: 'Jan 15, 2024',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 6,
    title: 'Community Waste Management',
    description: 'Platform connecting waste collectors with recycling facilities.',
    status: 'Planning',
    progress: 5,
    stack: ['React', 'Node.js', 'PostgreSQL'],
    team: 4,
    duration: '5 months',
    deadline: 'Feb 28, 2024',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'featured') return project.featured;
    if (activeTab === 'recruiting') return project.status === 'Recruiting';
    if (activeTab === 'in-progress') return project.status === 'In Progress';
    if (activeTab === 'completed') return project.status === 'Completed';
    return true;
  });
  // Featured projects for the carousel
  const featuredProjects = projects.filter(project => project.featured);
  return <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900 scroll-smooth">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-4">
            <FolderIcon className="h-4 w-4 text-[#B45309] mr-2" />
            <span className="text-sm font-medium text-[#7C2D12] dark:text-gray-300">Innovation Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#503314] dark:text-white">Project Hub</h1>
          <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-2xl mx-auto">
            Collaborate on impactful tech projects with the Rwandan community and build solutions that matter
          </p>
        </div>
        {/* Featured Projects Carousel */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-4">
              <StarIcon className="h-4 w-4 text-[#B45309] mr-2" />
              <span className="text-sm font-medium text-[#7C2D12]">Spotlight</span>
            </div>
            <h2 className="text-3xl font-bold text-[#503314] dark:text-white">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => <Card key={project.id} className="project-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700 overflow-hidden relative">
                <div className="h-40 overflow-hidden">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#B45309] to-[#92400E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${project.status === 'In Progress' ? 'bg-accent-blue/10 text-accent-blue' : project.status === 'Recruiting' ? 'bg-accent-orange/10 text-accent-orange' : project.status === 'Completed' ? 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400' : 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300'}`}>
                      {project.status}
                    </span>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F5F5F0] rounded-full overflow-hidden">
                      <div className={`h-full ${project.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-[#B45309] to-[#92400E]'}`} style={{
                    width: `${project.progress}%`
                  }}></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, idx) => <span key={idx} className="px-3 py-1 bg-[#B45309]/10 text-[#B45309] rounded-full text-xs font-medium">
                        {tech}
                      </span>)}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white">
                    <ChevronRightIcon className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E]">
                    {project.status === 'Recruiting' ? 'Apply' : 'View Project'}
                  </Button>
                </CardFooter>
              </Card>)}
          </div>
        </div>
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <input type="text" placeholder="Search projects..." className="input pl-10 w-full" />
            </div>
            <Button variant="outline" className="flex items-center">
              <FilterIcon className="mr-2" size={18} />
              Filter
            </Button>
            <Button variant="primary" className="flex items-center">
              <PlusIcon className="mr-2" size={18} />
              Submit Project
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'all' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('all')}>
              All Projects
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'featured' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('featured')}>
              Featured
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'recruiting' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('recruiting')}>
              Recruiting
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'in-progress' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('in-progress')}>
              In Progress
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'completed' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveTab('completed')}>
              Completed
            </button>
          </div>
        </div>
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => <Card key={project.id} className="project-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${project.status === 'In Progress' ? 'bg-accent-blue/10 text-accent-blue' : project.status === 'Recruiting' ? 'bg-accent-orange/10 text-accent-orange' : project.status === 'Completed' ? 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400' : 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300'}`}>
                    {project.status}
                  </span>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-primary-100 dark:bg-primary-900/50 rounded-full overflow-hidden">
                    <div className={`h-full ${project.status === 'Completed' ? 'bg-secondary-500' : 'bg-primary-600'}`} style={{
                  width: `${project.progress}%`
                }}></div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                    <CodeIcon className="h-4 w-4 mr-2" />
                    <span>Stack: {project.stack.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span>Team: {project.team} members</span>
                  </div>
                  <div className="flex items-center text-dark-500 dark:text-dark-300 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Duration: {project.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mr-1" />
                  Details
                </Button>
                <Button variant="primary">
                  {project.status === 'Recruiting' ? 'Apply' : 'View Project'}
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        {/* Project Contribution Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#503314] dark:text-white">How to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4">
                    <UserIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#503314] dark:text-white">
                    Apply as Developer
                  </h3>
                  <p className="text-dark-500 dark:text-dark-300 mb-4">
                    Join a project team and contribute your coding skills to
                    build impactful solutions.
                  </p>
                  <Button variant="outline">Browse Projects</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mb-4">
                    <FolderIcon className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#503314] dark:text-white">
                    Submit a Project
                  </h3>
                  <p className="text-dark-500 dark:text-dark-300 mb-4">
                    Have an idea? Submit your project proposal and recruit
                    talented team members.
                  </p>
                  <Button variant="primary">Submit Idea</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mb-4">
                    <GlobeIcon className="h-8 w-8 text-accent-blue" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#503314] dark:text-white">Mentor a Team</h3>
                  <p className="text-dark-500 dark:text-dark-300 mb-4">
                    Share your expertise by mentoring a project team and helping
                    them succeed.
                  </p>
                  <Button variant="outline">Become a Mentor</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Success Stories */}
        <div className="mt-12 bg-gradient-to-br from-[#B45309] to-[#92400E] rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
            <p className="text-white/90">Projects that made a real impact in Rwanda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Project image" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">AgriTech Mobile App</h3>
                <p className="text-dark-500 dark:text-dark-300 text-sm mb-2">
                  A team of 6 developers built an app that now helps over 3,000
                  farmers track crop prices and weather patterns.
                </p>
                <div className="flex items-center text-primary-600">
                  <span className="text-sm font-medium">Read case study</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Project image" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">EdTech Learning Platform</h3>
                <p className="text-dark-500 dark:text-dark-300 text-sm mb-2">
                  Started as a project on Global Roots, now adopted by 50+
                  schools across Rwanda, reaching 15,000 students.
                </p>
                <div className="flex items-center text-primary-600">
                  <span className="text-sm font-medium">Read case study</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};