import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Globe, 
  BookOpen, 
  MessageCircle, 
  TrendingUp, 
  Settings,
  Building,
  Target,
  Award,
  Bell,
  Menu,
  X
} from 'lucide-react';

interface MentorLayoutProps {
  children: React.ReactNode;
}

export const MentorLayout: React.FC<MentorLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/mentor/dashboard', icon: LayoutDashboard },
    { name: 'My Mentees', href: '/mentor/mentees', icon: Users },
    { name: 'My Circles', href: '/mentor/circles', icon: Globe },
    { name: 'Calendar', href: '/mentor/calendar', icon: Calendar },
    { name: 'Resources', href: '/mentor/resources', icon: BookOpen },
    { name: 'Messages', href: '/mentor/messages', icon: MessageCircle },
    { name: 'Job Market', href: '/mentor/marketplace', icon: Building },
    { name: 'Analytics', href: '/mentor/analytics', icon: TrendingUp },
    { name: 'Achievements', href: '/mentor/achievements', icon: Award },
    { name: 'Settings', href: '/mentor/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
          </div>
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
            <span className="text-lg font-semibold text-[#503314] dark:text-white">Mentor Panel</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-[#B45309] text-white shadow-lg'
                      : 'text-[#503314] dark:text-gray-300 hover:bg-[#B45309]/10 hover:text-[#B45309]'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mentor Stats Card */}
          <div className="mx-4 mt-8 p-4 bg-gradient-to-br from-[#B45309] to-[#7C2D12] rounded-lg text-white">
            <h3 className="font-semibold mb-2">Your Impact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Mentees Guided</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between">
                <span>Hours This Month</span>
                <span className="font-bold">32h</span>
              </div>
              <div className="flex justify-between">
                <span>Rating</span>
                <span className="font-bold">4.9★</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mx-4 mt-4 space-y-2">
            <Link
              to="/mentor/circles/create"
              className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-[#B45309] rounded-lg hover:bg-[#7C2D12] transition-colors"
            >
              Create New Circle
            </Link>
            <Link
              to="/mentor/schedule"
              className="block w-full px-4 py-2 text-sm font-medium text-center text-[#B45309] border border-[#B45309] rounded-lg hover:bg-[#B45309] hover:text-white transition-colors"
            >
              Schedule Meeting
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed top-20 left-4 z-40 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Page content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};