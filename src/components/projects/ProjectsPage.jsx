import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProjectsTabNav } from './navigation/ProjectsTabNav';
import { SubTabNav } from './navigation/SubTabNav';
import { ProjectsList } from './my-projects/ProjectsList';
import { ProjectsAnalytics } from './my-projects/ProjectsAnalytics';
import { AllProjects } from './search/AllProjects';
import { RisingInnovations } from './search/RisingInnovations';
import { ProjectForm } from './create/ProjectForm';
import { ProjectVisualization } from './create/ProjectVisualization';

const tabConfig = {
  mentor: {
    mainTabs: ['my-projects', 'search-projects', 'create-projects'],
    subTabs: {
      'my-projects': ['list', 'analytics'],
      'search-projects': ['all-projects'],
      'create-projects': ['form', 'visualization']
    },
    labels: {
      'create-projects': 'Create Projects'
    }
  },
  youth: {
    mainTabs: ['my-projects', 'search-projects', 'create-innovation'],
    subTabs: {
      'my-projects': ['list', 'analytics'],
      'search-projects': ['all-projects', 'rising-innovations'],
      'create-innovation': ['form']
    },
    labels: {
      'create-innovation': 'Create Innovation'
    }
  }
};

export const ProjectsPage = () => {
  const { user } = useAuth();
  const [activeMainTab, setActiveMainTab] = useState('my-projects');
  const [activeSubTab, setActiveSubTab] = useState('list');

  const userRole = user?.role === 'mentor' ? 'mentor' : 'youth';
  const config = tabConfig[userRole];

  // Reset sub-tab when main tab changes
  useEffect(() => {
    const firstSubTab = config.subTabs[activeMainTab]?.[0];
    if (firstSubTab) {
      setActiveSubTab(firstSubTab);
    }
  }, [activeMainTab, config]);

  const renderContent = () => {
    const key = `${activeMainTab}-${activeSubTab}`;
    
    switch (key) {
      case 'my-projects-list':
        return <ProjectsList />;
      case 'my-projects-analytics':
        return <ProjectsAnalytics />;
      case 'search-projects-all-projects':
        return <AllProjects />;
      case 'search-projects-rising-innovations':
        return <RisingInnovations />;
      case 'create-projects-form':
      case 'create-innovation-form':
        return <ProjectForm userRole={userRole} />;
      case 'create-projects-visualization':
        return <ProjectVisualization />;
      default:
        return <ProjectsList />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#503314] dark:text-white">
            {userRole === 'mentor' ? 'Project Hub' : 'Innovation Hub'}
          </h1>
          <p className="text-xl text-[#7C2D12] dark:text-gray-300 max-w-2xl mx-auto">
            {userRole === 'mentor' 
              ? 'Manage and create impactful projects with your mentees'
              : 'Discover opportunities and showcase your innovations'
            }
          </p>
        </div>

        <ProjectsTabNav
          activeTab={activeMainTab}
          onTabChange={setActiveMainTab}
          tabs={config.mainTabs}
          labels={config.labels}
        />

        <SubTabNav
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onSubTabChange={setActiveSubTab}
          subTabs={config.subTabs[activeMainTab] || []}
          userRole={userRole}
        />

        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};