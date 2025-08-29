import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Calendar as CalendarIcon, Clock, Video as VideoIcon, Users as UsersIcon, MessageSquare as MessageSquareIcon, Check, X } from 'lucide-react';
interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}
interface MentorAvailability {
  mentorId: string;
  date: string;
  slots: TimeSlot[];
}
interface MeetingSchedulerProps {
  mentorId?: string;
  mentorName?: string;
  mentorImage?: string;
}
export const MeetingScheduler = ({
  mentorId = 'mentor-1',
  mentorName = 'David Mutabazi',
  mentorImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
}: MeetingSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('2023-09-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<'video' | 'group' | 'chat'>('video');
  const [topic, setTopic] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  // Mock availability data
  const availabilityData: MentorAvailability[] = [{
    mentorId: 'mentor-1',
    date: '2023-09-15',
    slots: [{
      id: '1',
      startTime: '09:00',
      endTime: '09:30',
      available: true
    }, {
      id: '2',
      startTime: '10:00',
      endTime: '10:30',
      available: true
    }, {
      id: '3',
      startTime: '11:00',
      endTime: '11:30',
      available: false
    }, {
      id: '4',
      startTime: '13:00',
      endTime: '13:30',
      available: true
    }, {
      id: '5',
      startTime: '14:00',
      endTime: '14:30',
      available: true
    }, {
      id: '6',
      startTime: '15:00',
      endTime: '15:30',
      available: false
    }]
  }, {
    mentorId: 'mentor-1',
    date: '2023-09-16',
    slots: [{
      id: '7',
      startTime: '09:00',
      endTime: '09:30',
      available: true
    }, {
      id: '8',
      startTime: '10:00',
      endTime: '10:30',
      available: true
    }, {
      id: '9',
      startTime: '11:00',
      endTime: '11:30',
      available: true
    }, {
      id: '10',
      startTime: '13:00',
      endTime: '13:30',
      available: false
    }, {
      id: '11',
      startTime: '14:00',
      endTime: '14:30',
      available: true
    }]
  }, {
    mentorId: 'mentor-1',
    date: '2023-09-17',
    slots: [{
      id: '12',
      startTime: '10:00',
      endTime: '10:30',
      available: true
    }, {
      id: '13',
      startTime: '11:00',
      endTime: '11:30',
      available: true
    }, {
      id: '14',
      startTime: '15:00',
      endTime: '15:30',
      available: true
    }, {
      id: '15',
      startTime: '16:00',
      endTime: '16:30',
      available: true
    }]
  }];
  const availableDates = ['2023-09-15', '2023-09-16', '2023-09-17'];
  const getSlotsForDate = (date: string): TimeSlot[] => {
    const dayData = availabilityData.find(d => d.date === date);
    return dayData ? dayData.slots : [];
  };
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };
  const handleBookMeeting = () => {
    // In a real app, this would call an API to book the meeting
    setBookingConfirmed(true);
  };
  const resetForm = () => {
    setSelectedDate('2023-09-15');
    setSelectedTimeSlot(null);
    setMeetingType('video');
    setTopic('');
    setBookingConfirmed(false);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  return <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src={mentorImage} alt={mentorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <CardTitle className="text-xl text-[#503314]">
              Schedule a Meeting with {mentorName}
            </CardTitle>
            <CardDescription className="text-[#7C2D12]">
              Select a date and time that works for you
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {bookingConfirmed ? <CardContent className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#503314] mb-2">
            Meeting Scheduled!
          </h3>
          <p className="text-[#7C2D12] mb-6">
            Your {meetingType} meeting with {mentorName} is confirmed for{' '}
            {formatDate(selectedDate)} at{' '}
            {getSlotsForDate(selectedDate).find(slot => slot.id === selectedTimeSlot)?.startTime}
            .
          </p>
          <div className="bg-[#F5F5F0] p-4 rounded-lg max-w-md mx-auto mb-6">
            <div className="flex items-center mb-3">
              <CalendarIcon className="h-5 w-5 text-[#B45309] mr-2" />
              <span className="text-[#503314]">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-[#B45309] mr-2" />
              <span className="text-[#503314]">
                {getSlotsForDate(selectedDate).find(slot => slot.id === selectedTimeSlot)?.startTime}{' '}
                -{' '}
                {getSlotsForDate(selectedDate).find(slot => slot.id === selectedTimeSlot)?.endTime}
              </span>
            </div>
            <div className="flex items-center">
              {meetingType === 'video' && <VideoIcon className="h-5 w-5 text-[#B45309] mr-2" />}
              {meetingType === 'group' && <UsersIcon className="h-5 w-5 text-[#B45309] mr-2" />}
              {meetingType === 'chat' && <MessageSquareIcon className="h-5 w-5 text-[#B45309] mr-2" />}
              <span className="text-[#503314] capitalize">
                {meetingType} Meeting
              </span>
            </div>
          </div>
          <Button onClick={resetForm} className="bg-[#B45309] hover:bg-[#92400E] text-white">
            Schedule Another Meeting
          </Button>
        </CardContent> : <>
          <CardContent>
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-[#503314] font-medium mb-3">Select a Date</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {availableDates.map(date => <button key={date} onClick={() => handleDateChange(date)} className={`px-4 py-2 rounded-md whitespace-nowrap ${selectedDate === date ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] text-[#503314] hover:bg-[#F5F5F0]/80'}`}>
                    {formatDate(date)}
                  </button>)}
              </div>
            </div>
            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="text-[#503314] font-medium mb-3">Select a Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getSlotsForDate(selectedDate).map(slot => <button key={slot.id} onClick={() => slot.available && handleTimeSlotSelect(slot.id)} disabled={!slot.available} className={`px-3 py-2 rounded-md text-center ${selectedTimeSlot === slot.id ? 'bg-[#B45309] text-white' : slot.available ? 'bg-[#F5F5F0] text-[#503314] hover:bg-[#F5F5F0]/80' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                    {slot.startTime} - {slot.endTime}
                  </button>)}
              </div>
            </div>
            {/* Meeting Type */}
            <div className="mb-6">
              <h3 className="text-[#503314] font-medium mb-3">Meeting Type</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setMeetingType('video')} className={`flex items-center px-4 py-2 rounded-md ${meetingType === 'video' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] text-[#503314] hover:bg-[#F5F5F0]/80'}`}>
                  <VideoIcon className="h-4 w-4 mr-2" />
                  Video Call
                </button>
                <button onClick={() => setMeetingType('group')} className={`flex items-center px-4 py-2 rounded-md ${meetingType === 'group' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] text-[#503314] hover:bg-[#F5F5F0]/80'}`}>
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Group Session
                </button>
                <button onClick={() => setMeetingType('chat')} className={`flex items-center px-4 py-2 rounded-md ${meetingType === 'chat' ? 'bg-[#B45309] text-white' : 'bg-[#F5F5F0] text-[#503314] hover:bg-[#F5F5F0]/80'}`}>
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Chat
                </button>
              </div>
            </div>
            {/* Topic */}
            <div className="mb-6">
              <h3 className="text-[#503314] font-medium mb-3">Meeting Topic</h3>
              <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder="Briefly describe what you'd like to discuss..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309] text-[#503314]" rows={3} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm} className="border-[#B45309] text-[#B45309]">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleBookMeeting} disabled={!selectedTimeSlot} className="bg-[#B45309] hover:bg-[#92400E] text-white">
              <Check className="h-4 w-4 mr-2" />
              Book Meeting
            </Button>
          </CardFooter>
        </>}
    </Card>;
};