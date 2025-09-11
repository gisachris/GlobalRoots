import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BarChartIcon, PieChartIcon, TrendingUpIcon, UsersIcon, BriefcaseIcon, HomeIcon, AwardIcon, GlobeIcon, ChevronRightIcon, StarIcon, CheckIcon } from 'lucide-react';
export const ImpactDashboard = () => {
  const [timeframe, setTimeframe] = useState('yearly');
  // Mock impact data
  const impactData = {
    mentoringSessions: {
      total: 1248,
      increase: 24,
      monthly: 156
    },
    jobsPlaced: {
      total: 342,
      increase: 18,
      monthly: 32
    },
    returnees: {
      total: 87,
      increase: 35,
      monthly: 12
    },
    communityMembers: {
      total: 2450,
      increase: 15,
      monthly: 180
    },
    skillsAcquired: {
      total: 5680,
      increase: 22,
      monthly: 420
    }
  };
  // Mock personal impact data
  const personalImpactData = {
    mentoringSessions: 24,
    projectsContributed: 3,
    peopleHelped: 18,
    skillsShared: 7,
    testimonials: [{
      id: 1,
      text: "Jean's mentorship helped me land my first developer job. Forever grateful!",
      author: 'Marie K.',
      role: 'Junior Developer'
    }, {
      id: 2,
      text: 'The project guidance was invaluable. My skills improved tremendously.',
      author: 'David R.',
      role: 'UI/UX Designer'
    }],
    badges: [{
      id: 1,
      name: 'Mentor Star',
      description: 'Completed 20+ mentoring sessions',
      icon: <StarIcon className="h-4 w-4" />
    }, {
      id: 2,
      name: 'Project Leader',
      description: 'Led a community project',
      icon: <CheckIcon className="h-4 w-4" />
    }, {
      id: 3,
      name: 'Skill Sharer',
      description: 'Shared 5+ skills with the community',
      icon: <AwardIcon className="h-4 w-4" />
    }]
  };
  // Mock impact stories
  const impactStories = [{
    id: 1,
    title: 'From Mentee to Google Engineer',
    description: 'How Jean Marie went from a mentorship on Global Roots to a role at Google.',
    imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 2,
    title: 'Startup Founded After Returnship',
    description: "Claire's journey back to Rwanda led to founding a successful EdTech startup.",
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }, {
    id: 3,
    title: 'Rural Tech Training Impact',
    description: 'How our community projects brought tech skills to rural Rwanda.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }];
  return <div className="min-h-screen bg-primary-50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Impact Dashboard</h1>
          <p className="text-dark-600 dark:text-primary-300">
            Tracking the real-world impact of Global Roots on Rwanda's tech
            ecosystem
          </p>
        </div>
        {/* Timeframe Selector */}
        <div className="mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeframe === 'monthly' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setTimeframe('monthly')}>
              Monthly
            </button>
            <button className={`px-4 py-2 text-sm font-medium ${timeframe === 'quarterly' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setTimeframe('quarterly')}>
              Quarterly
            </button>
            <button className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeframe === 'yearly' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400'}`} onClick={() => setTimeframe('yearly')}>
              Yearly
            </button>
          </div>
        </div>
        {/* Global Impact Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Global Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <div className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 px-2 py-1 rounded text-xs">
                    +{impactData.mentoringSessions.increase}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  {impactData.mentoringSessions.total.toLocaleString()}
                </h3>
                <p className="text-dark-500 dark:text-dark-300">
                  Mentoring Sessions
                </p>
                <div className="mt-4 text-xs text-dark-400 dark:text-dark-400">
                  {impactData.mentoringSessions.monthly} new sessions this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  <div className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 px-2 py-1 rounded text-xs">
                    +{impactData.jobsPlaced.increase}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  {impactData.jobsPlaced.total.toLocaleString()}
                </h3>
                <p className="text-dark-500 dark:text-dark-300">Jobs Placed</p>
                <div className="mt-4 text-xs text-dark-400 dark:text-dark-400">
                  {impactData.jobsPlaced.monthly} new placements this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                    <HomeIcon className="h-6 w-6" />
                  </div>
                  <div className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 px-2 py-1 rounded text-xs">
                    +{impactData.returnees.increase}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  {impactData.returnees.total.toLocaleString()}
                </h3>
                <p className="text-dark-500 dark:text-dark-300">
                  Returnees Supported
                </p>
                <div className="mt-4 text-xs text-dark-400 dark:text-dark-400">
                  {impactData.returnees.monthly} new returnees this month
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Growth</CardTitle>
              <CardDescription>
                Total members and monthly growth rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="p-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                  <BarChartIcon className="h-12 w-12" />
                </div>
                <div className="ml-6">
                  <div className="text-4xl font-bold">
                    {impactData.communityMembers.total.toLocaleString()}
                  </div>
                  <div className="text-dark-500 dark:text-dark-300">
                    Total Community Members
                  </div>
                  <div className="mt-2 flex items-center">
                    <TrendingUpIcon className="h-4 w-4 text-secondary-600 mr-1" />
                    <span className="text-secondary-600 font-medium">
                      {impactData.communityMembers.increase}% growth
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>
                Skills acquired through mentorship and projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="p-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                  <PieChartIcon className="h-12 w-12" />
                </div>
                <div className="ml-6">
                  <div className="text-4xl font-bold">
                    {impactData.skillsAcquired.total.toLocaleString()}
                  </div>
                  <div className="text-dark-500 dark:text-dark-300">
                    Skills Acquired
                  </div>
                  <div className="mt-2 flex items-center">
                    <TrendingUpIcon className="h-4 w-4 text-secondary-600 mr-1" />
                    <span className="text-secondary-600 font-medium">
                      {impactData.skillsAcquired.increase}% growth
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Personal Impact */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Personal Impact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>
                    Your contribution to the Global Roots community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {personalImpactData.mentoringSessions}
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        Mentoring Sessions
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {personalImpactData.projectsContributed}
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        Projects
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {personalImpactData.peopleHelped}
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        People Helped
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                        {personalImpactData.skillsShared}
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        Skills Shared
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Impact Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      {personalImpactData.badges.map(badge => <div key={badge.id} className="flex items-center p-2 border border-primary-200 dark:border-dark-600 rounded-lg">
                          <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mr-2">
                            {badge.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {badge.name}
                            </div>
                            <div className="text-xs text-dark-500 dark:text-dark-300">
                              {badge.description}
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>Impact in their words</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {personalImpactData.testimonials.map(testimonial => <div key={testimonial.id} className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                        <p className="text-dark-600 dark:text-primary-300 text-sm italic mb-2">
                          "{testimonial.text}"
                        </p>
                        <div className="text-xs text-dark-500 dark:text-dark-300 font-medium">
                          {testimonial.author}, {testimonial.role}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Impact Stories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Impact Stories</h2>
            <Button variant="ghost" className="text-primary-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStories.map(story => <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
                  <p className="text-dark-600 dark:text-primary-300 text-sm mb-4">
                    {story.description}
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    Read Story <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
        {/* Geographic Impact */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Geographic Impact</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="h-80 flex items-center justify-center">
                <div className="p-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                  <GlobeIcon className="h-16 w-16" />
                </div>
                <div className="ml-6">
                  <div className="text-2xl font-bold mb-2">
                    Global Connections
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
                      <span>28 countries represented</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
                      <span>5 continents connected</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-accent-blue mr-2"></div>
                      <span>15 Rwandan provinces impacted</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Economic Impact */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Economic Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mb-4">
                    <TrendingUpIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">$1.2M</h3>
                  <p className="text-dark-500 dark:text-dark-300">
                    Income Generated
                  </p>
                </div>
                <p className="text-sm text-dark-600 dark:text-primary-300 text-center">
                  Estimated total income generated through job placements and
                  projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mb-4">
                    <BriefcaseIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">24</h3>
                  <p className="text-dark-500 dark:text-dark-300">
                    Startups Launched
                  </p>
                </div>
                <p className="text-sm text-dark-600 dark:text-primary-300 text-center">
                  New businesses started by community members and returnees
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mb-4">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">450+</h3>
                  <p className="text-dark-500 dark:text-dark-300">
                    Jobs Created
                  </p>
                </div>
                <p className="text-sm text-dark-600 dark:text-primary-300 text-center">
                  New tech jobs created through Global Roots initiatives
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Impact Ledger */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Impact Ledger</CardTitle>
            <CardDescription>
              Transparent tracking of our community's growth and impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-primary-200 dark:border-dark-600 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mr-3">
                      <UsersIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">
                        New Mentorship Milestone
                      </div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        1,000 mentorship sessions completed
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-dark-400 dark:text-dark-400">
                    July 2023
                  </div>
                </div>
              </div>
              <div className="p-4 border border-primary-200 dark:border-dark-600 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mr-3">
                      <BriefcaseIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Job Placement Record</div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        50 job placements in a single month
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-dark-400 dark:text-dark-400">
                    June 2023
                  </div>
                </div>
              </div>
              <div className="p-4 border border-primary-200 dark:border-dark-600 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mr-3">
                      <HomeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Returnee Program Launch</div>
                      <div className="text-sm text-dark-500 dark:text-dark-300">
                        Structured program for diaspora professionals returning
                        to Rwanda
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-dark-400 dark:text-dark-400">
                    May 2023
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Get Involved CTA */}
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Make Your Impact
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-6">
            Join our community and contribute to Rwanda's tech future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Become a Mentor
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-primary-700">
              Share Your Skills
            </Button>
          </div>
        </div>
      </div>
    </div>;
};