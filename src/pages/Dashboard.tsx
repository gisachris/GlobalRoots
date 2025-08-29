import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../utils/language';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  FolderIcon,
  BarChartIcon,
  SettingsIcon,
  CalendarIcon,
  MessageSquareIcon,
  GithubIcon,
  LinkedinIcon,
  PlusIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  TrendingUpIcon,
  StarIcon,
} from "lucide-react";
export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".dashboard-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  // Mock user data
  const userData = {
    name: "Jean-Paul Habimana",
    role: "Junior Software Developer",
    location: "Kigali, Rwanda",
    profileImage:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    stats: {
      mentoringSessions: 12,
      projectsCompleted: 3,
      skillsEndorsed: 7,
    },
    upcomingSessions: [
      {
        id: 1,
        title: "Frontend Development Mentoring",
        mentor: "Sarah Johnson",
        time: "Today, 3:00 PM",
        duration: "45 min",
      },
      {
        id: 2,
        title: "Code Review: E-commerce Project",
        mentor: "David Mutabazi",
        time: "Tomorrow, 10:00 AM",
        duration: "60 min",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "HTML/CSS",
      "Git",
      "UI/UX Basics",
    ],
    recommendedOpportunities: [
      {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechRwanda",
        type: "Remote Internship",
        match: "92% match",
      },
      {
        id: 2,
        title: "Junior Web Developer",
        company: "Global Solutions",
        type: "Part-time",
        match: "87% match",
      },
    ],
  };
  return (
    <div className="flex min-h-screen bg-[#F5F5F0] dark:bg-gray-900 scroll-smooth">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Navigation */}
          <div className="md:hidden mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                {t('dashboard.title')}
              </button>
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === "opportunities"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400"
                }`}
                onClick={() => setActiveTab("opportunities")}
              >
                {t('nav.opportunities')}
              </button>
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === "circles"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400"
                }`}
                onClick={() => setActiveTab("circles")}
              >
                {t('nav.community')}
              </button>
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === "projects"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400"
                }`}
                onClick={() => setActiveTab("projects")}
              >
                {t('nav.projects')}
              </button>
              <button
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeTab === "impact"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-dark-800 text-dark-600 dark:text-primary-400"
                }`}
                onClick={() => setActiveTab("impact")}
              >
                Impact
              </button>
            </div>
          </div>
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 dashboard-card border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-[#F5F5F0] dark:from-gray-800 dark:to-gray-700">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={userData.profileImage}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-1 text-[#503314] dark:text-white">
                    {userData.name}
                  </h3>
                  <p className="text-[#B45309] font-semibold mb-1">
                    {userData.role}
                  </p>
                  <p className="text-[#7C2D12] dark:text-gray-300 text-sm mb-4">
                    {userData.location}
                  </p>
                  <div className="flex justify-between w-full mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-semibold">
                        {userData.stats.mentoringSessions}
                      </div>
                      <div className="text-sm text-[#7C2D12] dark:text-gray-300">{t('dashboard.sessions')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#B45309]">
                        {userData.stats.projectsCompleted}
                      </div>
                      <div className="text-sm text-[#7C2D12] dark:text-gray-300">{t('dashboard.projects')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#B45309]">
                        {userData.stats.skillsEndorsed}
                      </div>
                      <div className="text-sm text-[#7C2D12] dark:text-gray-300">{t('dashboard.skills')}</div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mb-6">
                    <button className="p-3 rounded-full bg-[#B45309]/10 text-[#B45309] hover:bg-[#B45309] hover:text-white transition-all duration-200">
                      <GithubIcon className="h-5 w-5" />
                    </button>
                    <button className="p-3 rounded-full bg-[#B45309]/10 text-[#B45309] hover:bg-[#B45309] hover:text-white transition-all duration-200">
                      <LinkedinIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white"
                  >
                    {t('dashboard.editProfile')}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Skill Passport */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t('dashboard.skillPassport')}</CardTitle>
                <CardDescription>
                  {t('dashboard.verifiedSkills')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-[#503314] dark:text-white">{t('dashboard.yourSkills')}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-600"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" /> {t('dashboard.addSkill')}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-[#503314] dark:text-white">{t('dashboard.connectedAccounts')}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-600"
                    >
                      {t('dashboard.refresh')}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border border-primary-200 dark:border-dark-600 rounded-lg">
                      <GithubIcon className="h-6 w-6 mr-3 text-dark-600 dark:text-primary-300" />
                      <div className="flex-1">
                        <div className="font-medium text-[#503314] dark:text-white">GitHub</div>
                        <div className="text-sm text-dark-500 dark:text-dark-300">
                          12 repositories, 256 contributions
                        </div>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div className="flex items-center p-3 border border-primary-200 dark:border-dark-600 rounded-lg">
                      <LinkedinIcon className="h-6 w-6 mr-3 text-dark-600 dark:text-primary-300" />
                      <div className="flex-1">
                        <div className="font-medium text-[#503314] dark:text-white">LinkedIn</div>
                        <div className="text-sm text-dark-500 dark:text-dark-300">
                          Profile connected, 3 endorsements
                        </div>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-secondary-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Upcoming Sessions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t('dashboard.upcomingSessions')}</CardTitle>
                <CardDescription>
                  {t('dashboard.scheduledSessions')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-start p-4 border border-primary-200 dark:border-dark-600 rounded-lg"
                    >
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-md mr-4">
                        <CalendarIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#503314] dark:text-white">{session.title}</h4>
                        <p className="text-sm text-dark-500 dark:text-dark-300">
                          with {session.mentor}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-dark-600 dark:text-primary-300">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>
                            {session.time} ({session.duration})
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="ghost" className="text-primary-600 w-full">
                    View All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with these activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="flex items-center w-full p-3 border border-primary-200 dark:border-dark-600 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors">
                    <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-md mr-3">
                      <UsersIcon className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-[#503314] dark:text-white">Book a Mentor</h4>
                      <p className="text-sm text-dark-500 dark:text-dark-300">
                        Find guidance from experienced professionals
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-dark-400" />
                  </button>
                  <button className="flex items-center w-full p-3 border border-primary-200 dark:border-dark-600 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors">
                    <div className="p-2 bg-accent-blue/10 rounded-md mr-3">
                      <BriefcaseIcon className="h-5 w-5 text-accent-blue" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-[#503314] dark:text-white">Explore Jobs</h4>
                      <p className="text-sm text-dark-500 dark:text-dark-300">
                        Browse available opportunities
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-dark-400" />
                  </button>
                  <button className="flex items-center w-full p-3 border border-primary-200 dark:border-dark-600 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors">
                    <div className="p-2 bg-accent-orange/10 rounded-md mr-3">
                      <MessageSquareIcon className="h-5 w-5 text-accent-orange" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-[#503314] dark:text-white">Join a Circle</h4>
                      <p className="text-sm text-dark-500 dark:text-dark-300">
                        Connect with like-minded professionals
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-dark-400" />
                  </button>
                  <button className="flex items-center w-full p-3 border border-primary-200 dark:border-dark-600 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors">
                    <div className="p-2 bg-accent-green/10 rounded-md mr-3">
                      <BookOpenIcon className="h-5 w-5 text-accent-green" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-[#503314] dark:text-white">Learning Resources</h4>
                      <p className="text-sm text-dark-500 dark:text-dark-300">
                        Access courses and materials
                      </p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-dark-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
            {/* Recommended Opportunities */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recommended Opportunities</CardTitle>
                <CardDescription>
                  Matched based on your skills and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.recommendedOpportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="border border-primary-200 dark:border-dark-600 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-[#503314] dark:text-white">{opportunity.title}</h4>
                        <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 rounded text-xs">
                          {opportunity.match}
                        </span>
                      </div>
                      <p className="text-primary-600 text-sm mb-2">
                        {opportunity.company}
                      </p>
                      <p className="text-sm text-dark-500 dark:text-dark-300 mb-4">
                        {opportunity.type}
                      </p>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="primary" size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="ghost" className="text-primary-600 w-full">
                    View All Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
