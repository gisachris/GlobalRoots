import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../utils/auth';
import { MenuIcon, HomeIcon, BriefcaseIcon, UserIcon } from 'lucide-react';

interface YouthHeaderProps {
  onMenuClick: () => void;
}

export const YouthHeader = ({ onMenuClick }: YouthHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-[#B45309]/20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-3"
            onClick={onMenuClick}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/youth-dashboard" 
              className="flex items-center text-[#503314] hover:text-[#B45309] font-medium transition-colors"
            >
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link 
              to="/opportunities" 
              className="flex items-center text-[#503314] hover:text-[#B45309] font-medium transition-colors"
            >
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              Opportunities
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center text-[#503314] hover:text-[#B45309] font-medium transition-colors"
            >
              <UserIcon className="h-4 w-4 mr-1" />
              Profile
            </Link>
          </nav>
        </div>
        
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-[#503314] dark:text-white">
              {user?.name || 'Jean-Paul Habimana'}
            </p>
            <p className="text-xs text-[#7C2D12] dark:text-gray-300">
              Youth Member
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=32&h=32&fit=crop&crop=face" 
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};