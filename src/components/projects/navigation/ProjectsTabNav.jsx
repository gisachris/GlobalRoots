import React from 'react';
import { FolderIcon, SearchIcon, PlusIcon } from 'lucide-react';

const tabIcons = {
  'my-projects': FolderIcon,
  'search-projects': SearchIcon,
  'create-projects': PlusIcon,
  'create-innovation': PlusIcon
};

const defaultLabels = {
  'my-projects': 'My Projects',
  'search-projects': 'Search Projects',
  'create-projects': 'Create Projects',
  'create-innovation': 'Create Innovation'
};

export const ProjectsTabNav = ({ activeTab, onTabChange, tabs, labels = {} }) => {
  return (
    <div className="border-b border-[#B45309]/20 dark:border-gray-600">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab];
          const label = labels[tab] || defaultLabels[tab];
          const isActive = activeTab === tab;
          
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#B45309] text-[#B45309]'
                  : 'border-transparent text-[#7C2D12] dark:text-gray-400 hover:text-[#B45309] hover:border-[#B45309]/50'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};