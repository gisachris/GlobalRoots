import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HomeIcon, CheckIcon, PhoneIcon, CreditCardIcon, WifiIcon, BuildingIcon, UsersIcon, MapPinIcon, BriefcaseIcon, ChevronRightIcon, InfoIcon } from 'lucide-react';
export const ReturneeHub = () => {
  const [activeSection, setActiveSection] = useState('checklist');
  // Mock checklist data
  const checklistItems = [{
    id: 1,
    category: 'Housing',
    items: [{
      id: 'h1',
      text: 'Research neighborhoods in Kigali',
      completed: true
    }, {
      id: 'h2',
      text: 'Contact real estate agents',
      completed: true
    }, {
      id: 'h3',
      text: 'Schedule property viewings',
      completed: false
    }, {
      id: 'h4',
      text: 'Understand lease terms and requirements',
      completed: false
    }],
    icon: <HomeIcon className="h-5 w-5" />
  }, {
    id: 2,
    category: 'Connectivity',
    items: [{
      id: 'c1',
      text: 'Research mobile carriers',
      completed: true
    }, {
      id: 'c2',
      text: 'Get a local SIM card',
      completed: false
    }, {
      id: 'c3',
      text: 'Set up home internet',
      completed: false
    }],
    icon: <WifiIcon className="h-5 w-5" />
  }, {
    id: 3,
    category: 'Banking',
    items: [{
      id: 'b1',
      text: 'Research local banks',
      completed: true
    }, {
      id: 'b2',
      text: 'Prepare documents for account opening',
      completed: true
    }, {
      id: 'b3',
      text: 'Open a local bank account',
      completed: false
    }, {
      id: 'b4',
      text: 'Set up mobile banking',
      completed: false
    }],
    icon: <CreditCardIcon className="h-5 w-5" />
  }, {
    id: 4,
    category: 'Workspace',
    items: [{
      id: 'w1',
      text: 'Research coworking spaces',
      completed: true
    }, {
      id: 'w2',
      text: 'Visit potential workspaces',
      completed: false
    }, {
      id: 'w3',
      text: 'Join tech hub communities',
      completed: false
    }],
    icon: <BuildingIcon className="h-5 w-5" />
  }, {
    id: 5,
    category: 'Networking',
    items: [{
      id: 'n1',
      text: 'Join local tech meetups',
      completed: false
    }, {
      id: 'n2',
      text: 'Connect with Rwanda tech communities',
      completed: true
    }, {
      id: 'n3',
      text: 'Schedule coffee meetings with contacts',
      completed: false
    }],
    icon: <UsersIcon className="h-5 w-5" />
  }];
  // Mock buddy data
  const buddies = [{
    id: 1,
    name: 'Emmanuel Kwizera',
    role: 'Software Engineer',
    company: 'RwandaTech',
    location: 'Kigali',
    bio: 'Returned to Rwanda 2 years ago after working in Germany. Happy to help with housing and networking.',
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    areas: ['Housing', 'Tech Community', 'Work Permits']
  }, {
    id: 2,
    name: 'Claire Mugisha',
    role: 'UX Designer',
    company: 'Design Hub',
    location: 'Kigali',
    bio: 'Moved back from Canada 3 years ago. Can help with settling in and finding the best neighborhoods.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    areas: ['Workspaces', 'Design Community', 'Daily Life']
  }, {
    id: 3,
    name: 'Jean-Paul Habimana',
    role: 'Tech Entrepreneur',
    company: 'Kigali Startups',
    location: 'Kigali',
    bio: 'Returned from the US 5 years ago to start a tech company. Can advise on business setup and funding.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    areas: ['Entrepreneurship', 'Investment', 'Regulations']
  }];
  // Mock employer data
  const employers = [{
    id: 1,
    name: 'Rwanda Tech Solutions',
    industry: 'Software Development',
    description: 'Leading software development company building solutions for African markets.',
    openings: 5,
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    returneeProgram: true
  }, {
    id: 2,
    name: 'FinTech Rwanda',
    industry: 'Financial Technology',
    description: 'Innovative fintech company revolutionizing financial services across East Africa.',
    openings: 3,
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    returneeProgram: true
  }, {
    id: 3,
    name: 'Kigali Innovation Hub',
    industry: 'Technology & Innovation',
    description: 'Co-working space and accelerator supporting tech entrepreneurs in Rwanda.',
    openings: 2,
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    returneeProgram: true
  }];
  // Toggle checklist item completion
  const toggleChecklist = (categoryId, itemId) => {
    // In a real app, this would update state or call an API
    console.log(`Toggled ${itemId} in category ${categoryId}`);
  };
  return <div className="min-h-screen bg-primary-50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-lg mb-8">
          <div className="px-6 py-12 md:py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome Home to Rwanda's Tech Ecosystem
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
              Everything you need for a smooth transition back to Rwanda, from
              housing to networking
            </p>
            <Button variant="secondary" size="lg">
              Start Your Return Journey
            </Button>
          </div>
        </div>
        {/* Section Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'checklist' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveSection('checklist')}>
              Relocation Checklist
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'buddies' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveSection('buddies')}>
              Returnee Buddies
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'employers' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveSection('employers')}>
              Employer Spotlight
            </button>
            <button className={`px-4 py-2 rounded-md whitespace-nowrap ${activeSection === 'resources' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setActiveSection('resources')}>
              Resources
            </button>
          </div>
        </div>
        {/* Checklist Section */}
        {activeSection === 'checklist' && <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Relocation Checklist</h2>
              <p className="text-dark-600 dark:text-primary-300">
                Track your progress as you prepare for your return to Rwanda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checklistItems.map(category => <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mr-3">
                        {category.icon}
                      </div>
                      <CardTitle>{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map(item => <li key={item.id} className="flex items-center">
                          <button className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${item.completed ? 'bg-secondary-500 text-white' : 'border border-dark-300 dark:border-dark-500'}`} onClick={() => toggleChecklist(category.id, item.id)}>
                            {item.completed && <CheckIcon className="h-3 w-3" />}
                          </button>
                          <span className={item.completed ? 'line-through text-dark-400 dark:text-dark-400' : ''}>
                            {item.text}
                          </span>
                        </li>)}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-primary-600 text-sm">
                      View Resources
                    </Button>
                  </CardFooter>
                </Card>)}
            </div>
            {/* Progress Overview */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Your Return Journey Progress</CardTitle>
                <CardDescription>
                  Track your overall preparation progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm">40%</span>
                  </div>
                  <div className="w-full h-2 bg-primary-100 dark:bg-primary-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600" style={{
                  width: '40%'
                }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                      5/16
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-300">
                      Tasks Completed
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                      2
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-300">
                      Buddies Matched
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                      4
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-300">
                      Resources Saved
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                      60
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-300">
                      Days to Return
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>}
        {/* Buddies Section */}
        {activeSection === 'buddies' && <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Returnee Buddies</h2>
              <p className="text-dark-600 dark:text-primary-300">
                Connect with diaspora members who have already returned to
                Rwanda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buddies.map(buddy => <Card key={buddy.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img src={buddy.imageUrl} alt={buddy.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {buddy.name}
                      </h3>
                      <p className="text-primary-600 text-sm">{buddy.role}</p>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        {buddy.company}, {buddy.location}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-dark-600 dark:text-primary-300 text-sm">
                        {buddy.bio}
                      </p>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">
                        Can help with:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {buddy.areas.map((area, idx) => <span key={idx} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                            {area}
                          </span>)}
                      </div>
                    </div>
                    <Button variant="primary" fullWidth>
                      Connect
                    </Button>
                  </CardContent>
                </Card>)}
              {/* Become a Buddy Card */}
              <Card className="hover:shadow-md transition-shadow border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4">
                    <UsersIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Become a Buddy</h3>
                  <p className="text-dark-500 dark:text-dark-300 text-center mb-6">
                    Help others returning to Rwanda by sharing your experience
                  </p>
                  <Button variant="outline">Sign Up as Buddy</Button>
                </CardContent>
              </Card>
            </div>
            {/* Buddy Pairing */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Buddy Pairing System</CardTitle>
                <CardDescription>
                  How our returnee buddy system works
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary-600">
                        1
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">Complete Your Profile</h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm">
                      Tell us about your background, skills, and what you need
                      help with
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary-600">
                        2
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">Get Matched</h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm">
                      Our system matches you with returnees who have similar
                      backgrounds
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary-600">
                        3
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">
                      Connect & Receive Guidance
                    </h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm">
                      Schedule calls, ask questions, and get personalized advice
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="primary">Start Buddy Matching</Button>
              </CardFooter>
            </Card>
          </>}
        {/* Employers Section */}
        {activeSection === 'employers' && <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Employer Spotlight</h2>
              <p className="text-dark-600 dark:text-primary-300">
                Companies in Rwanda with returnee-friendly programs and
                opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {employers.map(employer => <Card key={employer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                        {employer.logoUrl ? <img src={employer.logoUrl} alt={employer.name} className="w-full h-full object-cover" /> : <BuildingIcon className="h-6 w-6 text-primary-600" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {employer.name}
                        </CardTitle>
                        <CardDescription>{employer.industry}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-600 dark:text-primary-300 text-sm mb-4">
                      {employer.description}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="p-1 rounded-full bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400 mr-2">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">
                        Returnee Program Available
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium text-primary-600">
                          {employer.openings}
                        </span>{' '}
                        open positions
                      </div>
                      <Button variant="outline" size="sm">
                        View Jobs
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
            {/* Returnee Program Benefits */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Returnee Program Benefits</CardTitle>
                <CardDescription>
                  What you can expect from returnee-friendly employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 h-fit mr-3">
                      <HomeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        Relocation Assistance
                      </h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Help with finding housing, moving expenses, and
                        temporary accommodation
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 h-fit mr-3">
                      <BriefcaseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Flexible Start Dates</h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Time to settle in before beginning your role
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 h-fit mr-3">
                      <UsersIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Mentorship & Support</h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Guidance from other returnees within the company
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 h-fit mr-3">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Local Integration</h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Help with administrative procedures and community
                        connections
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="primary">Explore All Returnee Programs</Button>
              </CardFooter>
            </Card>
          </>}
        {/* Resources Section */}
        {activeSection === 'resources' && <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Returnee Resources</h2>
              <p className="text-dark-600 dark:text-primary-300">
                Helpful guides and information for your return to Rwanda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Housing Guide</CardTitle>
                  <CardDescription>
                    Finding the right place to live in Kigali
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Popular neighborhoods for tech professionals
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Average rental prices and what to expect
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Recommended real estate agents
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Lease negotiation tips
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Read Full Guide</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Banking & Finance</CardTitle>
                  <CardDescription>
                    Managing your finances in Rwanda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Comparing local banks and their services
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Mobile money and payment systems
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Currency exchange considerations
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Tax implications for returnees
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Read Full Guide</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tech Ecosystem Map</CardTitle>
                  <CardDescription>
                    Navigate Rwanda's growing tech landscape
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Key tech hubs and innovation centers
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Major tech employers and startups
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Tech events and meetup groups
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Coworking spaces and tech facilities
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Ecosystem Map</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Legal & Administrative</CardTitle>
                  <CardDescription>
                    Important procedures and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Residency and work permit procedures
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Business registration process
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Healthcare and insurance options
                    </li>
                    <li className="flex items-center text-dark-600 dark:text-primary-300">
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Vehicle import and driving regulations
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Read Full Guide</Button>
                </CardFooter>
              </Card>
            </div>
            {/* Webinars */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">
                Upcoming Returnee Webinars
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-dark-800 border border-primary-200 dark:border-dark-600 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Navigating the Housing Market in Kigali
                      </h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Aug 28, 2023 • 3:00 PM
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-dark-800 border border-primary-200 dark:border-dark-600 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Tax Considerations for Returnees
                      </h4>
                      <p className="text-dark-500 dark:text-dark-300 text-sm">
                        Sep 5, 2023 • 5:00 PM
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Register
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions from returnees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <InfoIcon className="h-4 w-4 mr-2 text-primary-600" />
                      How long does it take to process a work permit?
                    </h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm mt-1 ml-6">
                      Work permits typically take 2-3 weeks to process once all
                      documentation is submitted correctly. The Rwanda
                      Development Board has streamlined the process for
                      returning professionals.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center">
                      <InfoIcon className="h-4 w-4 mr-2 text-primary-600" />
                      Can I bring my personal vehicle to Rwanda?
                    </h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm mt-1 ml-6">
                      Yes, you can import your vehicle, but import duties apply
                      based on the vehicle's age and value. Returnees may be
                      eligible for certain tax exemptions under specific
                      programs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center">
                      <InfoIcon className="h-4 w-4 mr-2 text-primary-600" />
                      What internet speeds can I expect in Kigali?
                    </h4>
                    <p className="text-dark-500 dark:text-dark-300 text-sm mt-1 ml-6">
                      Kigali offers fiber internet with speeds up to 100Mbps in
                      many areas. Coworking spaces typically provide reliable
                      high-speed connections suitable for remote work.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-primary-600 w-full">
                  View All FAQs
                </Button>
              </CardFooter>
            </Card>
          </>}
        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Come Home?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-6">
            Take the first step in your journey back to Rwanda's thriving tech
            ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Create Return Plan
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-primary-700">
              Talk to a Returnee
            </Button>
          </div>
        </div>
      </div>
    </div>;
};