import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, UserIcon, MapPinIcon, StarIcon, CheckIcon, MessageSquareIcon } from 'lucide-react';

export const CandidatesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const candidates = [
    {
      id: 1,
      name: 'Alice Uwimana',
      title: 'Frontend Developer',
      location: 'Kigali, Rwanda',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      experience: '2 years',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      verified: true
    },
    {
      id: 2,
      name: 'Eric Mugisha',
      title: 'UI/UX Designer',
      location: 'Kigali, Rwanda',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      experience: '3 years',
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314] dark:text-white">Find Candidates</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">
            Discover qualified candidates with mentor endorsements
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search candidates by name, skills, or location..." className="input pl-10 w-full" />
            </div>
            <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
              <FilterIcon className="mr-2" size={18} />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-full object-cover" />
                    </div>
                    {candidate.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-[#503314] dark:text-white">{candidate.name}</h3>
                    <p className="text-[#B45309] text-sm">{candidate.title}</p>
                    <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {candidate.location}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-2 text-[#503314] dark:text-white">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-[#B45309]/10 rounded-full text-xs text-[#B45309]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{candidate.rating}</span>
                  </div>
                  <div className="text-sm text-[#7C2D12] dark:text-gray-300">
                    {candidate.experience} experience
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="primary" className="flex-1">
                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};