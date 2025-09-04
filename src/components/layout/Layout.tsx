import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { usePageTransition } from '../../utils/animation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({
  children
}: LayoutProps) => {

  usePageTransition();
  // Determine if the current page should show the sidebar
  return <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <main className="flex-grow animate-fadeIn">
          {children}
        </main>
      </div>
      <Footer />
    </div>;
};