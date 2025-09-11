import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, MapPinIcon, BriefcaseIcon, CheckIcon, StarIcon, GlobeIcon, ChevronDownIcon, MessageSquareIcon, CalendarIcon } from 'lucide-react';
export const MentorsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  // Mock mentors data
  const mentors = [{
    id: 1,
    name: 'David Mugisha',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Remote (USA)',
    skills: ['React', 'Node.js', 'Cloud Architecture'],
    availability: 'Weekends, 2-3 hours',
    match: 95,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: true
  }, {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Product Manager',
    company: 'Microsoft',
    location: 'Remote (UK)',
    skills: ['Product Strategy', 'UX/UI', 'Agile'],
    availability: 'Weekdays evenings',
    match: 88,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: true
  }, {
    id: 3,
    name: 'Eric Ndayishimiye',
    title: 'Frontend Developer',
    company: 'Amazon',
    location: 'Remote (Canada)',
    skills: ['JavaScript', 'React', 'CSS', 'UI Design'],
    availability: 'Flexible',
    match: 92,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: true
  }, {
    id: 4,
    name: 'Marie Uwase',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Remote (USA)',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    availability: 'Weekends',
    match: 85,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: true
  }, {
    id: 5,
    name: 'Jean Hakizimana',
    title: 'Backend Engineer',
    company: 'Shopify',
    location: 'Remote (Germany)',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    availability: 'Weekdays evenings',
    match: 78,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: false
  }, {
    id: 6,
    name: 'Diane Karenzi',
    title: 'UX Designer',
    company: 'Apple',
    location: 'Remote (USA)',
    skills: ['UI/UX Design', 'Figma', 'User Research'],
    availability: 'Weekends',
    match: 82,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    verified: true
  }];
  return <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314]">
            Find a Mentor
          </h1>
          <p className="text-[#7C2D12] dark:text-primary-300">
            Connect with experienced professionals who can guide your career
            journey
          </p>
        </div>
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" size={18} />
              <input type="text" placeholder="Search mentors by name, skills, or company..." className="input pl-10 w-full" />
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
                    Skills
                  </label>
                  <select className="input">
                    <option value="">All Skills</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="python">Python</option>
                    <option value="ux">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-primary-300">
                    Availability
                  </label>
                  <select className="input">
                    <option value="">Any Availability</option>
                    <option value="weekends">Weekends</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#503314] dark:text-primary-300">
                    Industry
                  </label>
                  <select className="input">
                    <option value="">All Industries</option>
                    <option value="tech">Tech</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
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
        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map(mentor => <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img src={mentor.imageUrl} alt={mentor.name} className="w-full h-full object-cover" />
                    </div>
                    {mentor.verified && <div className="absolute -bottom-1 -right-1 bg-[#3d7f36] rounded-full p-1">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </div>}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-[#503314] dark:text-primary-300">
                      {mentor.name}
                    </h3>
                    <p className="text-[#B45309] text-sm">{mentor.title}</p>
                    <p className="text-[#7C2D12] dark:text-primary-400 text-sm">
                      {mentor.company}
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center text-[#7C2D12] dark:text-primary-400 text-sm mb-2">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{mentor.location}</span>
                  </div>
                  <div className="flex items-center text-[#7C2D12] dark:text-primary-400 text-sm mb-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>Available: {mentor.availability}</span>
                  </div>
                  <div className="flex items-center text-[#7C2D12] dark:text-primary-400 text-sm">
                    <GlobeIcon className="h-4 w-4 mr-1" />
                    <span>English, French</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-1 text-[#503314] dark:text-primary-300">
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill, idx) => <span key={idx} className="px-2 py-1 bg-[#B45309]/10 rounded-full text-xs text-[#B45309]">
                        {skill}
                      </span>)}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-[#F5F5F0] dark:bg-dark-700 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d7f36]" style={{
                    width: `${mentor.match}%`
                  }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-[#503314] dark:text-primary-300">
                      {mentor.match}%
                    </span>
                  </div>
                  <div className="text-xs text-[#7C2D12] dark:text-primary-400">
                    Match
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="primary" className="flex-1 bg-[#B45309] hover:bg-[#92400E] text-white flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </CardContent>
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