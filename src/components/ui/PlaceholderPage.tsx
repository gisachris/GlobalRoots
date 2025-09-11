import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { HomeIcon, LayoutDashboardIcon } from 'lucide-react';
interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
export const PlaceholderPage = ({
  title,
  description,
  icon
}: PlaceholderPageProps) => {
  return <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]/50 dark:bg-dark-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          {icon || <div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto">
              <LayoutDashboardIcon className="h-8 w-8 text-[#B45309]" />
            </div>}
        </div>
        <h1 className="text-3xl font-bold mb-4 text-[#503314] dark:text-primary-100">
          {title}
        </h1>
        <p className="text-[#7C2D12] dark:text-primary-300 mb-8">
          {description || 'This page is under construction. Please check back later.'}
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <HomeIcon className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary" className="bg-[#B45309] hover:bg-[#92400E] text-white flex items-center">
              <LayoutDashboardIcon className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};