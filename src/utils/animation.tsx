import React, { useEffect, Children } from 'react';
// Animation utility for smooth page transitions
export const pageTransition = {
  hidden: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
};
// Smooth hover transition for cards and buttons
export const hoverTransition = {
  transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s'
};
// Staggered children animation
export const staggerContainer = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};
// Hook to add smooth page transitions
export const usePageTransition = () => {
  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
    // Add page transition class
    document.body.classList.add('page-transition');
    return () => {
      document.body.classList.remove('page-transition');
    };
  }, []);
};