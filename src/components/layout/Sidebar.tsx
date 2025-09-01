import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, BriefcaseIcon, BookOpenIcon, MessageSquareIcon, BarChartIcon, UserIcon, Settings2Icon, LogOutIcon, ShieldIcon, GlobeIcon, HeartIcon, ArrowLeftRightIcon, FolderIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../utils/auth';
import { Button } from '../ui/Button';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<'mentee' | 'mentor' | 'employer' | 'admin'>('mentee'); // In a real app, this would come from auth context
  // Function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  const { user, logout } = useAuth();
  
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return <aside className="h-full w-64 bg-white dark:bg-gray-800 border-r border-[#B45309]/20 overflow-y-auto">
      <div className="p-4">
        {/* Mobile close button */}
        {onClose && (
          <div className="flex justify-end p-4 lg:hidden">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-6 p-2">
            <div className="w-10 h-10 rounded-full bg-[#B45309]/10 flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-[#B45309]" />
            </div>
            <div>
              <div className="font-medium text-[#503314] dark:text-white">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-[#7C2D12] dark:text-gray-300 capitalize">
                {user?.role || userRole}
              </div>
            </div>
          </div>
          {/* Role Selector - For demo purposes */}
          <div className="mb-6 p-2 bg-[#F5F5F0] dark:bg-dark-700 rounded-md">
            <div className="text-xs font-medium mb-2 text-[#7C2D12] dark:text-primary-300">
              Demo: Switch Role
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className={`px-2 py-1 text-xs rounded ${userRole === 'mentee' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('mentee')}>
                Mentee
              </button>
              <button className={`px-2 py-1 text-xs rounded ${userRole === 'mentor' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('mentor')}>
                Mentor
              </button>
              <button className={`px-2 py-1 text-xs rounded ${userRole === 'employer' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('employer')}>
                Employer
              </button>
              <button className={`px-2 py-1 text-xs rounded ${userRole === 'admin' ? 'bg-[#B45309] text-white' : 'bg-white dark:bg-dark-600 text-[#503314] dark:text-primary-300'}`} onClick={() => setUserRole('admin')}>
                Admin
              </button>
            </div>
          </div>
        </div>
        <nav>
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/dashboard') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/profile') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <UserIcon className="h-5 w-5 mr-3" />
                <span>My Profile</span>
              </Link>
            </li>
            {/* Mentee-specific links */}
            {userRole === 'mentee' && <>
                <li>
                  <Link to="/mentors" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/mentors') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <UsersIcon className="h-5 w-5 mr-3" />
                    <span>Find Mentors</span>
                  </Link>
                </li>
                <li>
                  <Link to="/learning" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/learning') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BookOpenIcon className="h-5 w-5 mr-3" />
                    <span>Learning Resources</span>
                  </Link>
                </li>
              </>}
            {/* Mentor-specific links */}
            {userRole === 'mentor' && <>
                <li>
                  <Link to="/mentees" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/mentees') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <UsersIcon className="h-5 w-5 mr-3" />
                    <span>My Mentees</span>
                  </Link>
                </li>
                <li>
                  <Link to="/content" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/content') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BookOpenIcon className="h-5 w-5 mr-3" />
                    <span>Create Content</span>
                  </Link>
                </li>
              </>}
            {/* Employer-specific links */}
            {userRole === 'employer' && <>
                <li>
                  <Link to="/post-job" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/post-job') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BriefcaseIcon className="h-5 w-5 mr-3" />
                    <span>Post Jobs</span>
                  </Link>
                </li>
                <li>
                  <Link to="/candidates" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/candidates') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <UsersIcon className="h-5 w-5 mr-3" />
                    <span>Find Talent</span>
                  </Link>
                </li>
              </>}
            {/* Admin-specific links */}
            {userRole === 'admin' && <>
                <li>
                  <Link to="/admin/users" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/admin/users') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <UsersIcon className="h-5 w-5 mr-3" />
                    <span>Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/content" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/admin/content') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BookOpenIcon className="h-5 w-5 mr-3" />
                    <span>Manage Content</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/admin/jobs') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BriefcaseIcon className="h-5 w-5 mr-3" />
                    <span>Manage Jobs</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/analytics" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/admin/analytics') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                    <BarChartIcon className="h-5 w-5 mr-3" />
                    <span>Analytics</span>
                  </Link>
                </li>
              </>}
            {/* Common links for all roles */}
            <li>
              <Link to="/mentorconnect" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/mentorconnect') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <MessageSquareIcon className="h-5 w-5 mr-3" />
                <span>Mentor Connect</span>
              </Link>
            </li>
            <li>
              <Link to="/opportunities" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/opportunities') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                <span>Opportunities</span>
              </Link>
            </li>
            <li>
              <Link to="/community" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/community') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <GlobeIcon className="h-5 w-5 mr-3" />
                <span>Community</span>
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/projects') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <FolderIcon className="h-5 w-5 mr-3" />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/returnee" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/returnee') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <ArrowLeftRightIcon className="h-5 w-5 mr-3" />
                <span>Returnee Hub</span>
              </Link>
            </li>
            <li>
              <Link to="/impact" onClick={handleLinkClick} className={`flex items-center px-4 py-3 rounded-md ${isActive('/impact') ? 'bg-[#B45309]/10 text-[#B45309]' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'}`}>
                <HeartIcon className="h-5 w-5 mr-3" />
                <span>Impact</span>
              </Link>
            </li>
          </ul>
          <div className="pt-6 mt-6 border-t border-[#B45309]/20">
            <ul className="space-y-1">
              <li>
                <Link to="/settings" onClick={handleLinkClick} className="flex items-center px-4 py-3 rounded-md text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700">
                  <Settings2Icon className="h-5 w-5 mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button onClick={() => { logout(); handleLinkClick(); }} className="flex items-center w-full px-4 py-3 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>;
};