import React from 'react';
import { PlaceholderPage } from '../../components/ui/PlaceholderPage';
import { FileTextIcon } from 'lucide-react';
export const AdminContentPage = () => {
  return <PlaceholderPage title="Admin: Manage Content" description="This page will allow administrators to review, approve, and manage content across the platform." icon={<div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto">
          <FileTextIcon className="h-8 w-8 text-[#B45309]" />
        </div>} />;
};