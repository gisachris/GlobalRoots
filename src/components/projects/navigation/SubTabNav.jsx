import React from 'react';
import { ListIcon, BarChartIcon, GlobeIcon, TrendingUpIcon, FileTextIcon, NetworkIcon } from 'lucide-react';

const subTabConfig = {
  list: { icon: ListIcon, label: 'Projects List' },
  analytics: { icon: BarChartIcon, label: 'Analytics' },
  'all-projects': { icon: GlobeIcon, label: 'All Public Projects' },
  'rising-innovations': { icon: TrendingUpIcon, label: 'Rising Innovations' },
  form: { icon: FileTextIcon, label: 'Project Details' },
  visualization: { icon: NetworkIcon, label: 'Visualization Schema' }
};

export const SubTabNav = ({ activeMainTab, activeSubTab, onSubTabChange, subTabs, userRole }) => {
  if (!subTabs || subTabs.length <= 1) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-[#B45309]/20 dark:border-gray-600 p-1">
      <nav className="flex space-x-1">
        {subTabs.map((subTab) => {
          const config = subTabConfig[subTab];
          if (!config) return null;

          // Hide rising-innovations for mentors
          if (subTab === 'rising-innovations' && userRole === 'mentor') return null;
          // Hide visualization for youth
          if (subTab === 'visualization' && userRole === 'youth') return null;

          const Icon = config.icon;
          const isActive = activeSubTab === subTab;
          
          return (
            <button
              key={subTab}
              onClick={() => onSubTabChange(subTab)}
              className={`flex items-center px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                isActive
                  ? 'bg-[#B45309] text-white'
                  : 'text-[#7C2D12] dark:text-gray-300 hover:bg-[#B45309]/10 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {config.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};