import React from 'react';
import { PlaceholderPage } from '../../components/ui/PlaceholderPage';
import { BarChartIcon } from 'lucide-react';
export const AdminAnalyticsPage = () => {
  return <PlaceholderPage title="Admin: Analytics Dashboard" description="This page will provide administrators with insights and metrics about platform usage, engagement, and impact." icon={<div className="w-16 h-16 rounded-full bg-[#B45309]/10 flex items-center justify-center mx-auto">
          <BarChartIcon className="h-8 w-8 text-[#B45309]" />
        </div>} />;
};