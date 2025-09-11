import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ChatInterface } from '../components/chat/ChatInterface';
import { MeetingScheduler } from '../components/meetings/MeetingScheduler';
import { MentorAvailability } from '../components/meetings/MentorAvailability';
export const MentorConnect = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [userType, setUserType] = useState<'mentor' | 'mentee'>('mentee');
  return <div className="min-h-screen bg-[#F5F5F0]/50 dark:bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#503314]">
            Mentor Connect
          </h1>
          <p className="text-[#7C2D12] dark:text-primary-300">
            Connect with mentors through chat, video calls, or schedule meetings
          </p>
        </div>
        {/* User Type Toggle */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-1 inline-flex">
            <button className={`px-4 py-2 rounded-md ${userType === 'mentee' ? 'bg-[#B45309] text-white' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`} onClick={() => setUserType('mentee')}>
              I am a Mentee
            </button>
            <button className={`px-4 py-2 rounded-md ${userType === 'mentor' ? 'bg-[#B45309] text-white' : 'text-[#503314] hover:bg-[#F5F5F0] dark:text-primary-300 dark:hover:bg-dark-700'}`} onClick={() => setUserType('mentor')}>
              I am a Mentor
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex justify-center space-x-4 border-b border-primary-200 dark:border-dark-600">
            <button className={`px-4 py-2 border-b-2 ${activeTab === 'chat' ? 'border-[#B45309] text-[#503314] dark:text-primary-300' : 'border-transparent text-[#7C2D12] dark:text-dark-300'}`} onClick={() => setActiveTab('chat')}>
              Chat
            </button>
            <button className={`px-4 py-2 border-b-2 ${activeTab === 'schedule' ? 'border-[#B45309] text-[#503314] dark:text-primary-300' : 'border-transparent text-[#7C2D12] dark:text-dark-300'}`} onClick={() => setActiveTab('schedule')}>
              Schedule Meeting
            </button>
            {userType === 'mentor' && <button className={`px-4 py-2 border-b-2 ${activeTab === 'availability' ? 'border-[#B45309] text-[#503314] dark:text-primary-300' : 'border-transparent text-[#7C2D12] dark:text-dark-300'}`} onClick={() => setActiveTab('availability')}>
                Set Availability
              </button>}
          </div>
        </div>
        {/* Content based on active tab */}
        <div className="mb-8">
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'schedule' && <MeetingScheduler />}
          {activeTab === 'availability' && userType === 'mentor' && <MentorAvailability />}
        </div>
      </div>
    </div>;
};