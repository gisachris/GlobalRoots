import React, { useState } from 'react';
import { YouthSidebar } from './YouthSidebar';
import { Header } from './Header';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';

interface YouthLayoutProps {
  children: React.ReactNode;
}

export const YouthLayout = ({ children }: YouthLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen bg-[#F5F5F0] dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Desktop sidebar - Fixed */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-30">
        <YouthSidebar onWidthChange={setSidebarExpanded} />
      </div>
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <YouthSidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main content with left margin for fixed sidebar */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${sidebarExpanded ? 'lg:ml-64 2xl:ml-80' : 'lg:ml-16 2xl:ml-40'}`}>
        {/* Header with mobile menu button */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-[#B45309]/20 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Header />
        </div>
        
        {/* Page content */}
        <main className="flex-1 pb-20 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};