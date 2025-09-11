import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  isPinned: boolean;
  setIsExpanded: (expanded: boolean) => void;
  setIsPinned: (pinned: boolean) => void;
  toggleExpanded: () => void;
  togglePinned: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const togglePinned = () => setIsPinned(!isPinned);

  return (
    <SidebarContext.Provider value={{
      isExpanded,
      isPinned,
      setIsExpanded,
      setIsPinned,
      toggleExpanded,
      togglePinned
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};