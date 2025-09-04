import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon } from 'lucide-react';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSession, setNewSession] = useState({
    title: '',
    time: '',
    duration: '60',
    type: 'meeting'
  });

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('calendarSessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const saveSessions = (updatedSessions) => {
    setSessions(updatedSessions);
    localStorage.setItem('calendarSessions', JSON.stringify(updatedSessions));
  };

  const addSession = () => {
    if (!newSession.title || !newSession.time || !selectedDate) return;
    
    const session = {
      id: Date.now(),
      date: selectedDate.toISOString().split('T')[0],
      ...newSession
    };
    
    const updatedSessions = [...sessions, session];
    saveSessions(updatedSessions);
    setShowAddModal(false);
    setNewSession({ title: '', time: '', duration: '60', type: 'meeting' });
  };

  const getSessionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-300">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === month;
          const daySessions = getSessionsForDate(day);
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                !isCurrentMonth ? 'text-gray-400 bg-gray-50 dark:bg-gray-800' : ''
              }`}
              onClick={() => {
                setSelectedDate(day);
                setShowAddModal(true);
              }}
            >
              <div className="font-medium">{day.getDate()}</div>
              {daySessions.map(session => (
                <div key={session.id} className="text-xs bg-blue-100 text-blue-800 p-1 rounded mt-1 truncate">
                  {session.time} {session.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="grid grid-cols-8 gap-1">
        <div className="border-r border-gray-200 dark:border-gray-700">
          <div className="h-12 border-b border-gray-200 dark:border-gray-700"></div>
          {timeSlots.map(time => (
            <div key={time} className="h-16 border-b border-gray-200 dark:border-gray-700 p-2 text-sm text-gray-600 dark:text-gray-300">
              {time}
            </div>
          ))}
        </div>
        {weekDays.map((day, index) => {
          const daySessions = getSessionsForDate(day);
          
          return (
            <div key={index} className="border-r border-gray-200 dark:border-gray-700">
              <div className="h-12 p-2 bg-gray-50 dark:bg-gray-800 font-semibold text-center border-b border-gray-200 dark:border-gray-700">
                {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </div>
              {timeSlots.map(timeSlot => {
                const sessionAtTime = daySessions.find(s => s.time === timeSlot);
                return (
                  <div 
                    key={timeSlot}
                    className="h-16 border-b border-gray-200 dark:border-gray-700 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSelectedDate(day);
                      setNewSession({...newSession, time: timeSlot});
                      setShowAddModal(true);
                    }}
                  >
                    {sessionAtTime && (
                      <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs h-full">
                        <div className="font-medium truncate">{sessionAtTime.title}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const daySessions = getSessionsForDate(currentDate);
    
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          {timeSlots.map(timeSlot => {
            const sessionAtTime = daySessions.find(s => s.time === timeSlot);
            return (
              <div key={timeSlot} className="flex border border-gray-200 dark:border-gray-700 rounded">
                <div className="w-20 p-3 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">
                  {timeSlot}
                </div>
                <div 
                  className="flex-1 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => {
                    setSelectedDate(currentDate);
                    setNewSession({...newSession, time: timeSlot});
                    setShowAddModal(true);
                  }}
                >
                  {sessionAtTime ? (
                    <div className="bg-blue-100 text-blue-800 p-2 rounded">
                      <div className="font-semibold">{sessionAtTime.title}</div>
                      <div className="text-sm">{sessionAtTime.duration} minutes • {sessionAtTime.type}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">Click to add session</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#503314] dark:text-white mb-4">Calendar</h1>
          
          {/* Navigation and View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigateDate(-1)}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white min-w-[200px] text-center">
                {view === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {view === 'week' && `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {view === 'day' && currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              
              <Button variant="outline" onClick={() => navigateDate(1)}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button 
                variant={view === 'month' ? 'primary' : 'outline'}
                onClick={() => setView('month')}
              >
                Month
              </Button>
              <Button 
                variant={view === 'week' ? 'primary' : 'outline'}
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button 
                variant={view === 'day' ? 'primary' : 'outline'}
                onClick={() => setView('day')}
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Views */}
        <Card>
          <CardContent className="p-6">
            {view === 'month' && renderMonthView()}
            {view === 'week' && renderWeekView()}
            {view === 'day' && renderDayView()}
          </CardContent>
        </Card>

        {/* Add Session Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Add Session</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      placeholder="Session title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                      value={newSession.time}
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                    <select
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                      value={newSession.type}
                      onChange={(e) => setNewSession({...newSession, type: e.target.value})}
                    >
                      <option value="meeting">Meeting</option>
                      <option value="mentoring">Mentoring</option>
                      <option value="interview">Interview</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={addSession}>
                    Add Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};