import React from 'react';
import { PlaceholderPage } from '../../components/ui/PlaceholderPage';
import { BriefcaseIcon } from 'lucide-react';
export const AdminJobsPage = () => {
  return <PlaceholderPage title="Admin: Manage Jobs" description="This page will allow administrators to review, approve, and manage job postings on the platform." icon={<div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto">
          <BriefcaseIcon className="h-8 w-8 text-[#B45309]" />
        </div>} />;
};