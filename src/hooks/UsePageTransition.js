import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const location = useLocation();

  useEffect(() => {
    // Add page transition animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    const timer = setTimeout(() => {
      document.body.style.transition = 'all 0.5s ease-in-out';
      document.body.style.opacity = '1';
      document.body.style.transform = 'translateY(0)';
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.transition = '';
    };
  }, [location.pathname]);
};