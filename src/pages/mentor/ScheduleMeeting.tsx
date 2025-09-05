import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, Users, Video, MessageCircle, Plus, X } from 'lucide-react';

export const ScheduleMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState({
    title: '',
    type: 'individual',
    date: '',
    time: '',
    duration: 60,
    attendees: [] as string[],
    description: '',
    meetingLink: '',
    recurring: false,
    recurringType: 'weekly'
  });

  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);

  const mentees = [
    { id: '1', name: 'Jean-Paul Habimana', email: 'jean@example.com' },
    { id: '2', name: 'Alice Uwimana', email: 'alice@example.com' },
    { id: '3', name: 'Bob Nkurunziza', email: 'bob@example.com' },
    { id: '4', name: 'Carol Mukamana', email: 'carol@example.com' }
  ];

  const circles = [
    { id: '1', name: 'Frontend Development Mastery', members: 12 },
    { id: '2', name: 'Career Transition Bootcamp', members: 8 },
    { id: '3', name: 'Startup Founders Circle', members: 6 }
  ];

  const handleInputChange = (field: string, value: any) => {
    setMeetingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMenteeToggle = (menteeId: string) => {
    setSelectedMentees(prev => 
      prev.includes(menteeId) 
        ? prev.filter(id => id !== menteeId)
        : [...prev, menteeId]
    );
  };

  const handleSchedule = () => {
    // Schedule meeting logic
    console.log('Meeting scheduled:', { ...meetingData, attendees: selectedMentees });
    navigate('/mentor/calendar');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#503314] dark:text-white mb-2">
          Schedule Meeting
        </h1>
        <p className="text-[#7C2D12] dark:text-gray-300">
          Create a new mentoring session or group meeting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#B45309]" />
              Meeting Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Meeting Title *
              </label>
              <input
                type="text"
                value={meetingData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                placeholder="e.g., React Fundamentals Review"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Meeting Type *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'individual', label: '1-on-1 Session', icon: Users },
                  { id: 'group', label: 'Group Session', icon: Users },
                  { id: 'circle', label: 'Circle Meeting', icon: MessageCircle }
                ].map(type => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('type', type.id)}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        meetingData.type === type.id
                          ? 'border-[#B45309] bg-[#B45309]/10 text-[#B45309]'
                          : 'border-gray-300 hover:border-[#B45309]/50'
                      }`}
                    >
                      <IconComponent className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={meetingData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  value={meetingData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Duration (minutes) *
              </label>
              <select
                value={meetingData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Description
              </label>
              <textarea
                value={meetingData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                placeholder="Meeting agenda, topics to discuss..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                Meeting Link (Optional)
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={meetingData.meetingLink}
                  onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                  placeholder="https://zoom.us/j/..."
                />
                <Button variant="outline" className="border-[#B45309] text-[#B45309]">
                  <Video className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="recurring"
                checked={meetingData.recurring}
                onChange={(e) => handleInputChange('recurring', e.target.checked)}
                className="h-4 w-4 text-[#B45309] focus:ring-[#B45309] border-gray-300 rounded"
              />
              <label htmlFor="recurring" className="text-sm font-medium text-[#503314] dark:text-white">
                Recurring Meeting
              </label>
              {meetingData.recurring && (
                <select
                  value={meetingData.recurringType}
                  onChange={(e) => handleInputChange('recurringType', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#B45309] focus:border-transparent text-sm"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Attendees Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#B45309]" />
              Select Attendees
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meetingData.type === 'circle' ? (
              <div className="space-y-3">
                <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                  Select a circle for the meeting:
                </p>
                {circles.map(circle => (
                  <div
                    key={circle.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-[#B45309] cursor-pointer transition-colors"
                  >
                    <h4 className="font-medium text-[#503314] dark:text-white">{circle.name}</h4>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300">{circle.members} members</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                  Select mentees to invite:
                </p>
                {mentees.map(mentee => (
                  <div key={mentee.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={mentee.id}
                      checked={selectedMentees.includes(mentee.id)}
                      onChange={() => handleMenteeToggle(mentee.id)}
                      className="h-4 w-4 text-[#B45309] focus:ring-[#B45309] border-gray-300 rounded"
                    />
                    <label htmlFor={mentee.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-[#503314] dark:text-white">{mentee.name}</div>
                      <div className="text-sm text-[#7C2D12] dark:text-gray-300">{mentee.email}</div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                Selected: {selectedMentees.length} attendees
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMentees.map(menteeId => {
                  const mentee = mentees.find(m => m.id === menteeId);
                  return mentee ? (
                    <span
                      key={menteeId}
                      className="inline-flex items-center px-2 py-1 bg-[#B45309]/10 text-[#B45309] text-xs rounded-full"
                    >
                      {mentee.name}
                      <button
                        onClick={() => handleMenteeToggle(menteeId)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => navigate('/mentor/calendar')}
          className="border-[#B45309] text-[#B45309]"
        >
          Cancel
        </Button>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-[#B45309] text-[#B45309]"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleSchedule}
            className="bg-[#B45309] hover:bg-[#7C2D12]"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};