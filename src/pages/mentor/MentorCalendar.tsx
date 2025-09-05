import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, Users, Video, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const MentorCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const meetings = [
    {
      id: 1,
      title: 'Frontend Development Circle',
      type: 'Circle Meeting',
      time: '14:00',
      duration: 60,
      attendees: ['Alice K.', 'Bob M.', 'Carol S.'],
      date: '2024-12-15',
      status: 'confirmed'
    },
    {
      id: 2,
      title: '1-on-1 with Jean-Paul',
      type: 'Individual Session',
      time: '10:00',
      duration: 45,
      attendees: ['Jean-Paul H.'],
      date: '2024-12-16',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Career Guidance Session',
      type: 'Group Session',
      time: '15:00',
      duration: 90,
      attendees: ['Marie U.', 'Patrick K.'],
      date: '2024-12-16',
      status: 'pending'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMeetingsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return meetings.filter(meeting => meeting.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#503314] dark:text-white">Calendar</h1>
          <p className="text-[#7C2D12] dark:text-gray-300">Manage your mentoring schedule</p>
        </div>
        <Button className="bg-[#B45309] hover:bg-[#7C2D12]">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#B45309]" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="border-[#B45309] text-[#B45309]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="border-[#B45309] text-[#B45309]"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-[#7C2D12] dark:text-gray-300">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2 h-20"></div>;
                }
                
                const dayMeetings = getMeetingsForDate(day);
                const isSelected = formatDate(day) === formatDate(selectedDate);
                const isToday = formatDate(day) === formatDate(new Date());
                
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 h-20 border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-[#B45309]/10 transition-colors ${
                      isSelected ? 'bg-[#B45309]/20 border-[#B45309]' : ''
                    } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                  >
                    <div className={`text-sm font-medium ${
                      isToday ? 'text-blue-600' : 'text-[#503314] dark:text-white'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayMeetings.slice(0, 2).map(meeting => (
                        <div
                          key={meeting.id}
                          className="text-xs p-1 bg-[#B45309] text-white rounded truncate"
                        >
                          {meeting.time} {meeting.title}
                        </div>
                      ))}
                      {dayMeetings.length > 2 && (
                        <div className="text-xs text-[#B45309] font-medium">
                          +{dayMeetings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-[#B45309]" />
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getMeetingsForDate(selectedDate).length === 0 ? (
                <p className="text-[#7C2D12] dark:text-gray-300 text-center py-8">
                  No meetings scheduled for this day
                </p>
              ) : (
                getMeetingsForDate(selectedDate).map(meeting => (
                  <div key={meeting.id} className="border border-[#B45309]/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-[#503314] dark:text-white">
                        {meeting.title}
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        meeting.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                      {meeting.type}
                    </p>
                    <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {meeting.time} ({meeting.duration} min)
                    </div>
                    <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      {meeting.attendees.join(', ')}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-[#B45309] hover:bg-[#7C2D12] flex-1">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309]">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};