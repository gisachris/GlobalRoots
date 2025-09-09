import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { meetingService } from '../../services/meetings';
import { Calendar, Clock, Users, Video, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const MentorCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMeeting, setEditingMeeting] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadMeetings();
  }, [currentDate]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const meetingsData = await meetingService.getMeetingsByDateRange(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      setMeetings(meetingsData || []);
    } catch (error) {
      console.error('Error loading meetings:', error);
      // Fallback to example data
      setMeetings([
        {
          id: 'example-1',
          title: 'Frontend Development Circle',
          meeting_type: 'circle',
          meeting_time: '14:00',
          duration_minutes: 60,
          meeting_date: '2024-12-15',
          status: 'scheduled',
          meeting_link: 'https://meet.jit.si/example-room'
        },
        {
          id: 'example-2',
          title: '1-on-1 with Jean-Paul',
          meeting_type: 'individual',
          meeting_time: '10:00',
          duration_minutes: 45,
          meeting_date: '2024-12-16',
          status: 'scheduled',
          meeting_link: 'https://meet.jit.si/example-room-2'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    try {
      await meetingService.deleteMeeting(meetingId);
      setShowDeleteConfirm(null);
      // Reload meetings from database
      await loadMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const handleEditMeeting = (meeting: any) => {
    setEditingMeeting(meeting);
  };

  const handleUpdateMeeting = async (updates: any) => {
    try {
      await meetingService.updateMeeting(editingMeeting.id, updates);
      setEditingMeeting(null);
      // Reload meetings from database
      await loadMeetings();
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  };

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
    // Convert to Rwanda timezone (CAT - UTC+2)
    const rwandaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Africa/Kigali' }));
    const year = rwandaDate.getFullYear();
    const month = String(rwandaDate.getMonth() + 1).padStart(2, '0');
    const day = String(rwandaDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getMeetingsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return meetings.filter(meeting => meeting.meeting_date === dateStr);
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
        <Link to="/mentor/schedule-meeting">
          <Button className="bg-[#B45309] hover:bg-[#7C2D12]">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </Link>
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
                          {meeting.meeting_time} {meeting.title}
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
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#B45309]" />
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <span className="text-sm text-[#7C2D12] dark:text-gray-400 font-normal">
                Rwanda Time (GMT+2)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p className="text-[#7C2D12] dark:text-gray-300 text-center py-8">
                  Loading meetings...
                </p>
              ) : getMeetingsForDate(selectedDate).length === 0 ? (
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
                        meeting.status === 'scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {meeting.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                      {meeting.meeting_type === 'individual' ? 'Individual Session' :
                       meeting.meeting_type === 'group' ? 'Group Session' : 'Circle Meeting'}
                    </p>
                    <div className="flex items-center text-sm text-[#7C2D12] dark:text-gray-300 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {meeting.meeting_time} ({meeting.duration_minutes} min) - Rwanda Time
                    </div>
                    <div className="flex space-x-2">
                      {meeting.meeting_link ? (
                        <Button 
                          size="sm" 
                          className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
                          onClick={() => window.open(meeting.meeting_link, '_blank')}
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="border-[#B45309] text-[#B45309] flex-1">
                          No Link
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#B45309] text-[#B45309]"
                        onClick={() => handleEditMeeting(meeting)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(meeting.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Meeting Modal */}
      {editingMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Meeting</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editingMeeting.title}
                onChange={(e) => setEditingMeeting({...editingMeeting, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Meeting title"
              />
              <input
                type="time"
                value={editingMeeting.meeting_time}
                onChange={(e) => setEditingMeeting({...editingMeeting, meeting_time: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="url"
                value={editingMeeting.meeting_link || ''}
                onChange={(e) => setEditingMeeting({...editingMeeting, meeting_link: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Meeting link"
              />
            </div>
            <div className="flex space-x-2 mt-6">
              <Button 
                onClick={() => handleUpdateMeeting({
                  title: editingMeeting.title,
                  meeting_time: editingMeeting.meeting_time,
                  meeting_link: editingMeeting.meeting_link
                })}
                className="bg-[#B45309] hover:bg-[#7C2D12] flex-1"
              >
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditingMeeting(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Delete Meeting</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this meeting? This action cannot be undone.
            </p>
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleDeleteMeeting(showDeleteConfirm)}
                className="bg-red-500 hover:bg-red-600 text-white flex-1"
              >
                Delete
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};