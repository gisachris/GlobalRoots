import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  MessageSquare,
  Settings2, 
  LogOut,
  TableOfContents, 
  Folder, 
  X, 
  Calendar,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../utils/auth';
import { Button } from '../ui/Button';

interface YouthSidebarProps {
  onClose?: () => void;
  onWidthChange?: (isExpanded: boolean) => void;
}

export const YouthSidebar = ({ onClose, onWidthChange }: YouthSidebarProps) => {
  const location = useLocation();
  const [isPinned, setIsPinned] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, logout } = useAuth();
  const sidebarRef = useRef(null);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleLinkClick = () => {
    if (onClose && !isPinned) {
      onClose();
    }
  };

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsExpanded(true);
      onWidthChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsExpanded(false);
      onWidthChange?.(false);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsExpanded(true);
      onWidthChange?.(true);
    }
  };

  const sidebarWidth = isExpanded ? 'w-64 2xl:w-80' : 'w-16 2xl:w-40';
  const shouldShowText = isExpanded;

  return (
    <aside 
      ref={sidebarRef}
      className={`h-full ${sidebarWidth} bg-white dark:bg-gray-800 border-r border-[#B45309]/20 overflow-y-auto transition-all duration5300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header with pin/close buttons */}
      <div className="flex items-center justify-center p-2 border-b border-[#B45309]/20 min-h-[64px] transition-all ease-in-out duration-500">
        <div className={`flex w-full items-center ${isExpanded?'justify-start':'justify-center'} transition-all duration-500 ease-in-out`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={togglePin}
            className="hidden lg:flex hover:bg-[#B45309]/10 transition-all duration-500 ease-in-out"
            title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
          >
            <TableOfContents  className={`h-5 w-5 ${isPinned ? 'text-[#B45309]' : 'text-gray-400'} transition-all duration-500 ease-in-out`} />
          </Button>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* User Profile Section */}
      <div className={`${isExpanded?'p-4':'px-2 py-4'} transition-all duration-500 ease-in-out`}>
        <Link to='/' className={`flex items-center ${shouldShowText ? 'space-x-3' : 'justify-center'} my-4 transition-all duration-300`}>
          <img 
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=40&h=40&fit=crop&crop=face" 
            alt="Profile" 
            className={`${isExpanded?'w-10 h-10':'w-8 h-8'} rounded-full`}
          />
          {shouldShowText && (
            <div className="min-w-0">
              <div className="font-medium text-[#503314] dark:text-white truncate">
                {user?.name || 'Jean-Paul Habimana'}
              </div>
              <div className="text-xs text-[#7C2D12] dark:text-gray-300">
                Youth Member
              </div>
            </div>
          )}
        </Link>
      </div>

      <nav className="px-2 truncate transition-all duration-500 ease-in-out">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/dashboard" 
              onClick={handleLinkClick} 
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${
                isActive('/dashboard') && location.pathname === '/' 
                  ? 'bg-[#B45309]/10 text-[#B45309]' 
                  : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'
              } ${!shouldShowText ? 'justify-center' : ''}`}
              title={!shouldShowText ? "Dashboard" : ""}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              {shouldShowText && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/learning" 
              onClick={handleLinkClick} 
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${
                isActive('/learning') 
                  ? 'bg-[#B45309]/10 text-[#B45309]' 
                  : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'
              } ${!shouldShowText ? 'justify-center' : ''}`}
              title={!shouldShowText ? "Learning Resources" : ""}
            >
              <BookOpen className="h-5 w-5 flex-shrink-0" />
              {shouldShowText && <span className="ml-3">Learning Resources</span>}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/mentorconnect" 
              onClick={handleLinkClick} 
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${
                isActive('/chat') 
                  ? 'bg-[#B45309]/10 text-[#B45309]' 
                  : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'
              } ${!shouldShowText ? 'justify-center' : ''}`}
              title={!shouldShowText ? "Chat" : ""}
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              {shouldShowText && <span className="ml-3">Chat</span>}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/userProjects" 
              onClick={handleLinkClick} 
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${
                isActive('/userProjects') 
                  ? 'bg-[#B45309]/10 text-[#B45309]' 
                  : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'
              } ${!shouldShowText ? 'justify-center' : ''}`}
              title={!shouldShowText ? "Personal Projects" : ""}
            >
              <Folder className="h-5 w-5 flex-shrink-0" />
              {shouldShowText && <span className="ml-3">Personal Projects</span>}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/calendar" 
              onClick={handleLinkClick} 
              className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${
                isActive('/calendar') 
                  ? 'bg-[#B45309]/10 text-[#B45309]' 
                  : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700'
              } ${!shouldShowText ? 'justify-center' : ''}`}
              title={!shouldShowText ? "Calendar" : ""}
            >
              <Calendar className="h-5 w-5 flex-shrink-0" />
              {shouldShowText && <span className="ml-3">Calendar</span>}
            </Link>
          </li>
        </ul>
        
        <div className={`pt-6 mt-6 border-t border-[#B45309]/20 ${!shouldShowText ? 'mx-2' : ''}`}>
          <ul className="space-y-1">
            <li>
              <Link 
                to="/settings" 
                onClick={handleLinkClick} 
                className={`flex items-center px-4 py-3 rounded-md text-[#503314] hover:bg-[#F5F5F0] dark:text-white dark:hover:bg-gray-700 transition-all duration-200 ${!shouldShowText ? 'justify-center' : ''}`}
                title={!shouldShowText ? "Settings" : ""}
              >
                <Settings2 className="h-5 w-5 flex-shrink-0" />
                {shouldShowText && <span className="ml-3">Settings</span>}
              </Link>
            </li>
            <li>
              <button 
                onClick={() => { logout(); handleLinkClick(); }} 
                className={`flex items-center w-full px-4 py-3 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200 ${!shouldShowText ? 'justify-center' : ''}`}
                title={!shouldShowText ? "Log Out" : ""}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {shouldShowText && <span className="ml-3">Log Out</span>}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Expand button for collapsed state */}
      {!isExpanded && !isPinned && (
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="sm"
            className="w-6 h-8 p-0 bg-white dark:bg-gray-800 border-[#B45309]/20 hover:bg-[#F5F5F0]"
            onClick={() => setIsExpanded(true)}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      )}
    </aside>
  );
};