import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../../utils/animation';
import { Sidebar } from './Sidebar';
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({
  children
}: LayoutProps) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  usePageTransition();
  // Determine if the current page should show the sidebar
  useEffect(() => {
    const dashboardPages = ['/dashboard', '/profile', '/mentors', '/mentorconnect', '/learning', '/jobs', '/admin', '/opportunities', '/community', '/projects', '/returnee', '/impact'];
    const shouldShowSidebar = dashboardPages.some(page => location.pathname === page || location.pathname.startsWith(`${page}/`));
    setShowSidebar(shouldShowSidebar);
  }, [location]);
  return <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow animate-fadeIn ${showSidebar ? 'md:ml-64' : ''}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>;
};