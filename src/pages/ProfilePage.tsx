import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon, LinkIcon, CalendarIcon, GlobeIcon, EditIcon, PlusIcon, TrashIcon, CheckIcon, XIcon } from 'lucide-react';
export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState<'mentee' | 'mentor' | 'employer'>('mentee');
  // Mock profile data
  const [profile, setProfile] = useState({
    name: 'Jean-Paul Habimana',
    role: 'Junior Software Developer',
    location: 'Kigali, Rwanda',
    bio: 'Passionate software developer with a focus on web technologies. Looking to grow my skills in React and Node.js through mentorship and practical projects.',
    education: [{
      id: 1,
      school: 'University of Rwanda',
      degree: 'Bachelor of Computer Science',
      year: '2018 - 2022'
    }],
    experience: [{
      id: 1,
      company: 'TechRwanda',
      position: 'Junior Developer',
      duration: 'Jan 2022 - Present',
      description: 'Working on frontend development using React and Tailwind CSS.'
    }],
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Tailwind CSS', 'Node.js (Basic)', 'Git'],
    languages: ['English (Fluent)', 'Kinyarwanda (Native)', 'French (Basic)'],
    links: [{
      id: 1,
      name: 'GitHub',
      url: 'https://github.com/jeanpaul'
    }, {
      id: 2,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/jeanpaul'
    }],
    profileImage: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  });
  // Mentee-specific data
  const menteeData = {
    careerGoals: 'Become a full-stack developer specializing in React and Node.js ecosystems.',
    interests: ['Web Development', 'Mobile Apps', 'UI/UX Design'],
    mentorshipPreferences: 'Looking for mentors with experience in modern JavaScript frameworks and career development in tech.'
  };
  // Mentor-specific data
  const mentorData = {
    expertise: ['Frontend Development', 'React Ecosystem', 'Career Guidance'],
    yearsOfExperience: 8,
    availability: 'Weekends, 2-4 hours per week',
    mentorshipStyle: 'Collaborative problem-solving with regular check-ins. I prefer to guide rather than provide direct solutions.',
    mentees: [{
      id: 1,
      name: 'Sarah Uwimana',
      duration: '3 months'
    }, {
      id: 2,
      name: 'Eric Mugisha',
      duration: '1 month'
    }]
  };
  // Employer-specific data
  const employerData = {
    company: 'TechRwanda',
    industry: 'Information Technology',
    companySize: '10-50 employees',
    website: 'https://techrwanda.com',
    jobsPosted: [{
      id: 1,
      title: 'Frontend Developer',
      applicants: 12
    }, {
      id: 2,
      title: 'UX Designer',
      applicants: 8
    }]
  };
  return <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#503314]">My Profile</h1>
          <div className="flex space-x-2">
            {isEditing ? <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex items-center">
                  <XIcon className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsEditing(false)} className="flex items-center bg-[#B45309] hover:bg-[#92400E]">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </> : <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center">
                <EditIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-dark-600 shadow-md">
                    <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                  {isEditing && <button className="absolute bottom-4 right-0 bg-[#B45309] text-white p-2 rounded-full shadow-md hover:bg-[#92400E] transition-colors">
                      <EditIcon className="h-4 w-4" />
                    </button>}
                </div>
                {isEditing ? <div className="w-full space-y-3 mt-2">
                    <div>
                      <label className="text-sm text-[#7C2D12] block mb-1">
                        Name
                      </label>
                      <input type="text" value={profile.name} onChange={e => setProfile({
                    ...profile,
                    name: e.target.value
                  })} className="input w-full" />
                    </div>
                    <div>
                      <label className="text-sm text-[#7C2D12] block mb-1">
                        Role
                      </label>
                      <input type="text" value={profile.role} onChange={e => setProfile({
                    ...profile,
                    role: e.target.value
                  })} className="input w-full" />
                    </div>
                    <div>
                      <label className="text-sm text-[#7C2D12] block mb-1">
                        Location
                      </label>
                      <input type="text" value={profile.location} onChange={e => setProfile({
                    ...profile,
                    location: e.target.value
                  })} className="input w-full" />
                    </div>
                  </div> : <>
                    <h3 className="font-semibold text-xl mb-1 text-[#503314]">
                      {profile.name}
                    </h3>
                    <p className="text-[#B45309] mb-1">{profile.role}</p>
                    <div className="flex items-center justify-center text-[#7C2D12] text-sm mb-4">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>
                  </>}
                {/* Role selector for demo */}
                <div className="w-full mb-6 p-2 bg-white dark:bg-dark-700 rounded-md shadow-sm">
                  <div className="text-xs font-medium mb-2 text-[#7C2D12] dark:text-primary-300">
                    Profile Type
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button className={`px-2 py-1 text-xs rounded ${userRole === 'mentee' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('mentee')}>
                      Mentee
                    </button>
                    <button className={`px-2 py-1 text-xs rounded ${userRole === 'mentor' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('mentor')}>
                      Mentor
                    </button>
                    <button className={`px-2 py-1 text-xs rounded ${userRole === 'employer' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('employer')}>
                      Employer
                    </button>
                  </div>
                </div>
                {/* Links */}
                <div className="w-full mb-4">
                  <h4 className="font-medium text-[#503314] mb-2 text-left">
                    Links
                  </h4>
                  {isEditing ? <div className="space-y-2">
                      {profile.links.map((link, index) => <div key={link.id} className="flex items-center space-x-2">
                          <input type="text" value={link.name} onChange={e => {
                      const newLinks = [...profile.links];
                      newLinks[index].name = e.target.value;
                      setProfile({
                        ...profile,
                        links: newLinks
                      });
                    }} className="input flex-1" placeholder="Name" />
                          <input type="text" value={link.url} onChange={e => {
                      const newLinks = [...profile.links];
                      newLinks[index].url = e.target.value;
                      setProfile({
                        ...profile,
                        links: newLinks
                      });
                    }} className="input flex-1" placeholder="URL" />
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>)}
                      <button className="flex items-center text-[#B45309] hover:text-[#92400E] text-sm">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Link
                      </button>
                    </div> : <div className="space-y-2">
                      {profile.links.map(link => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-white dark:bg-dark-700 rounded hover:shadow transition-all text-[#503314] dark:text-primary-300">
                          <LinkIcon className="h-4 w-4 mr-2 text-[#B45309]" />
                          <span>{link.name}</span>
                        </a>)}
                    </div>}
                </div>
                {/* Languages */}
                <div className="w-full mb-4">
                  <h4 className="font-medium text-[#503314] mb-2 text-left">
                    Languages
                  </h4>
                  {isEditing ? <div className="space-y-2">
                      {profile.languages.map((language, index) => <div key={index} className="flex items-center space-x-2">
                          <input type="text" value={language} onChange={e => {
                      const newLanguages = [...profile.languages];
                      newLanguages[index] = e.target.value;
                      setProfile({
                        ...profile,
                        languages: newLanguages
                      });
                    }} className="input flex-1" />
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>)}
                      <button className="flex items-center text-[#B45309] hover:text-[#92400E] text-sm">
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Language
                      </button>
                    </div> : <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language, index) => <span key={index} className="px-3 py-1 bg-white dark:bg-dark-700 rounded-full text-sm text-[#503314] dark:text-primary-300">
                          {language}
                        </span>)}
                    </div>}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314]">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? <textarea value={profile.bio} onChange={e => setProfile({
                ...profile,
                bio: e.target.value
              })} className="input w-full h-32" placeholder="Write a short bio about yourself..." /> : <p className="text-[#503314] dark:text-primary-300">
                    {profile.bio}
                  </p>}
              </CardContent>
            </Card>
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314]">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => <div key={index} className="flex items-center px-3 py-1 bg-white dark:bg-dark-700 rounded-full text-sm text-[#503314] dark:text-primary-300">
                          <span>{skill}</span>
                          <button className="ml-2 text-red-500 hover:text-red-700">
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>)}
                    </div>
                    <div className="flex items-center mt-2">
                      <input type="text" placeholder="Add a skill..." className="input flex-1 mr-2" />
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </div> : <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => <span key={index} className="px-3 py-1 bg-[#B45309]/10 rounded-full text-sm text-[#B45309] dark:text-[#B45309]">
                        {skill}
                      </span>)}
                  </div>}
              </CardContent>
            </Card>
            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314]">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.experience.length > 0 ? <div className="space-y-4">
                    {profile.experience.map(exp => <div key={exp.id} className={`${isEditing ? 'border border-primary-200 dark:border-dark-600 rounded-md p-4' : ''}`}>
                        {isEditing ? <div className="space-y-3">
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Company
                              </label>
                              <input type="text" value={exp.company} className="input w-full" />
                            </div>
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Position
                              </label>
                              <input type="text" value={exp.position} className="input w-full" />
                            </div>
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Duration
                              </label>
                              <input type="text" value={exp.duration} className="input w-full" />
                            </div>
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Description
                              </label>
                              <textarea value={exp.description} className="input w-full" rows={3} />
                            </div>
                            <div className="flex justify-end">
                              <button className="text-red-500 hover:text-red-700 flex items-center">
                                <TrashIcon className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div> : <>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-[#503314] dark:text-primary-300">
                                  {exp.position}
                                </h4>
                                <p className="text-[#B45309] text-sm">
                                  {exp.company}
                                </p>
                              </div>
                              <span className="text-sm text-[#7C2D12] dark:text-primary-400">
                                {exp.duration}
                              </span>
                            </div>
                            <p className="mt-2 text-[#503314] dark:text-primary-300 text-sm">
                              {exp.description}
                            </p>
                          </>}
                      </div>)}
                    {isEditing && <Button variant="outline" className="w-full flex items-center justify-center">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>}
                  </div> : <div className="text-center py-4">
                    <p className="text-[#7C2D12] dark:text-primary-400">
                      No experience added yet
                    </p>
                    {isEditing && <Button variant="outline" className="mt-2">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>}
                  </div>}
              </CardContent>
            </Card>
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#503314]">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.education.length > 0 ? <div className="space-y-4">
                    {profile.education.map(edu => <div key={edu.id} className={`${isEditing ? 'border border-primary-200 dark:border-dark-600 rounded-md p-4' : ''}`}>
                        {isEditing ? <div className="space-y-3">
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                School
                              </label>
                              <input type="text" value={edu.school} className="input w-full" />
                            </div>
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Degree
                              </label>
                              <input type="text" value={edu.degree} className="input w-full" />
                            </div>
                            <div>
                              <label className="text-sm text-[#7C2D12] block mb-1">
                                Year
                              </label>
                              <input type="text" value={edu.year} className="input w-full" />
                            </div>
                            <div className="flex justify-end">
                              <button className="text-red-500 hover:text-red-700 flex items-center">
                                <TrashIcon className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div> : <>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-[#503314] dark:text-primary-300">
                                  {edu.degree}
                                </h4>
                                <p className="text-[#B45309] text-sm">
                                  {edu.school}
                                </p>
                              </div>
                              <span className="text-sm text-[#7C2D12] dark:text-primary-400">
                                {edu.year}
                              </span>
                            </div>
                          </>}
                      </div>)}
                    {isEditing && <Button variant="outline" className="w-full flex items-center justify-center">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>}
                  </div> : <div className="text-center py-4">
                    <p className="text-[#7C2D12] dark:text-primary-400">
                      No education added yet
                    </p>
                    {isEditing && <Button variant="outline" className="mt-2">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>}
                  </div>}
              </CardContent>
            </Card>
            {/* Role-specific sections */}
            {userRole === 'mentee' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Career Goals & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Career Goals
                      </h4>
                      {isEditing ? <textarea className="input w-full h-24" value={menteeData.careerGoals} /> : <p className="text-[#503314] dark:text-primary-300">
                          {menteeData.careerGoals}
                        </p>}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Interests
                      </h4>
                      {isEditing ? <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {menteeData.interests.map((interest, index) => <div key={index} className="flex items-center px-3 py-1 bg-white dark:bg-dark-700 rounded-full text-sm text-[#503314] dark:text-primary-300">
                                <span>{interest}</span>
                                <button className="ml-2 text-red-500 hover:text-red-700">
                                  <XIcon className="h-3 w-3" />
                                </button>
                              </div>)}
                          </div>
                          <div className="flex items-center mt-2">
                            <input type="text" placeholder="Add an interest..." className="input flex-1 mr-2" />
                            <Button variant="outline" size="sm">
                              Add
                            </Button>
                          </div>
                        </div> : <div className="flex flex-wrap gap-2">
                          {menteeData.interests.map((interest, index) => <span key={index} className="px-3 py-1 bg-[#3d7f36]/10 rounded-full text-sm text-[#3d7f36]">
                              {interest}
                            </span>)}
                        </div>}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Mentorship Preferences
                      </h4>
                      {isEditing ? <textarea className="input w-full h-24" value={menteeData.mentorshipPreferences} /> : <p className="text-[#503314] dark:text-primary-300">
                          {menteeData.mentorshipPreferences}
                        </p>}
                    </div>
                  </div>
                </CardContent>
              </Card>}
            {userRole === 'mentor' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Mentorship Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Areas of Expertise
                      </h4>
                      {isEditing ? <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {mentorData.expertise.map((area, index) => <div key={index} className="flex items-center px-3 py-1 bg-white dark:bg-dark-700 rounded-full text-sm text-[#503314] dark:text-primary-300">
                                <span>{area}</span>
                                <button className="ml-2 text-red-500 hover:text-red-700">
                                  <XIcon className="h-3 w-3" />
                                </button>
                              </div>)}
                          </div>
                          <div className="flex items-center mt-2">
                            <input type="text" placeholder="Add an area of expertise..." className="input flex-1 mr-2" />
                            <Button variant="outline" size="sm">
                              Add
                            </Button>
                          </div>
                        </div> : <div className="flex flex-wrap gap-2">
                          {mentorData.expertise.map((area, index) => <span key={index} className="px-3 py-1 bg-[#3d7f36]/10 rounded-full text-sm text-[#3d7f36]">
                              {area}
                            </span>)}
                        </div>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Years of Experience
                        </h4>
                        {isEditing ? <input type="number" value={mentorData.yearsOfExperience} className="input w-full" /> : <p className="text-[#503314] dark:text-primary-300">
                            {mentorData.yearsOfExperience} years
                          </p>}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Availability
                        </h4>
                        {isEditing ? <input type="text" value={mentorData.availability} className="input w-full" /> : <p className="text-[#503314] dark:text-primary-300">
                            {mentorData.availability}
                          </p>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Mentorship Style
                      </h4>
                      {isEditing ? <textarea className="input w-full h-24" value={mentorData.mentorshipStyle} /> : <p className="text-[#503314] dark:text-primary-300">
                          {mentorData.mentorshipStyle}
                        </p>}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Current Mentees
                      </h4>
                      <div className="space-y-2">
                        {mentorData.mentees.map(mentee => <div key={mentee.id} className="flex justify-between items-center p-3 bg-white dark:bg-dark-700 rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center mr-3">
                                <UserIcon className="h-4 w-4 text-[#B45309]" />
                              </div>
                              <span className="text-[#503314] dark:text-primary-300">
                                {mentee.name}
                              </span>
                            </div>
                            <span className="text-sm text-[#7C2D12] dark:text-primary-400">
                              {mentee.duration}
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
            {userRole === 'employer' && <Card>
                <CardHeader>
                  <CardTitle className="text-[#503314]">
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Company Name
                        </h4>
                        {isEditing ? <input type="text" value={employerData.company} className="input w-full" /> : <p className="text-[#503314] dark:text-primary-300">
                            {employerData.company}
                          </p>}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Industry
                        </h4>
                        {isEditing ? <input type="text" value={employerData.industry} className="input w-full" /> : <p className="text-[#503314] dark:text-primary-300">
                            {employerData.industry}
                          </p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Company Size
                        </h4>
                        {isEditing ? <input type="text" value={employerData.companySize} className="input w-full" /> : <p className="text-[#503314] dark:text-primary-300">
                            {employerData.companySize}
                          </p>}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#503314] mb-2">
                          Website
                        </h4>
                        {isEditing ? <input type="text" value={employerData.website} className="input w-full" /> : <a href={employerData.website} target="_blank" rel="noopener noreferrer" className="text-[#B45309] hover:underline">
                            {employerData.website}
                          </a>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#503314] mb-2">
                        Jobs Posted
                      </h4>
                      <div className="space-y-2">
                        {employerData.jobsPosted.map(job => <div key={job.id} className="flex justify-between items-center p-3 bg-white dark:bg-dark-700 rounded-md">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#B45309]/10 flex items-center justify-center mr-3">
                                <BriefcaseIcon className="h-4 w-4 text-[#B45309]" />
                              </div>
                              <span className="text-[#503314] dark:text-primary-300">
                                {job.title}
                              </span>
                            </div>
                            <span className="text-sm text-[#7C2D12] dark:text-primary-400">
                              {job.applicants} applicants
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
};