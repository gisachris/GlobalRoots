import { useState } from 'react';
import { YouthSidebar } from '../components/layout/YouthSidebar';
import { YouthDashboard } from './YouthDashboard';
import { useAuth } from '../utils/auth';

export const YouthHomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Fixed position */}
        <div className={`fixed inset-y-0 left-0 top-16 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:flex-shrink-0`}>
          <YouthSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <YouthDashboard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};