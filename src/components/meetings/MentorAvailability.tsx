import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Save, Check } from 'lucide-react';
interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}
export const MentorAvailability = () => {
  const [availabilitySchedule, setAvailabilitySchedule] = useState<TimeSlot[]>([{
    id: '1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00'
  }, {
    id: '2',
    day: 'Monday',
    startTime: '14:00',
    endTime: '15:00'
  }, {
    id: '3',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '12:00'
  }, {
    id: '4',
    day: 'Friday',
    startTime: '13:00',
    endTime: '14:00'
  }]);
  const [newSlot, setNewSlot] = useState<Omit<TimeSlot, 'id'>>({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00'
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeOptions = Array.from({
    length: 24 * 2
  }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });
  const addTimeSlot = () => {
    const newId = (Math.max(0, ...availabilitySchedule.map(slot => parseInt(slot.id))) + 1).toString();
    setAvailabilitySchedule([...availabilitySchedule, {
      id: newId,
      ...newSlot
    }]);
  };
  const removeTimeSlot = (id: string) => {
    setAvailabilitySchedule(availabilitySchedule.filter(slot => slot.id !== id));
  };
  const saveAvailability = () => {
    // In a real app, this would call an API to save the availability
    console.log('Saving availability:', availabilitySchedule);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  return <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-[#503314]">
          Set Your Availability
        </CardTitle>
        <CardDescription className="text-[#7C2D12]">
          Define when you're available for mentoring sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Availability */}
        <div className="mb-6">
          <h3 className="text-[#503314] font-medium mb-3">
            Your Current Availability
          </h3>
          {availabilitySchedule.length === 0 ? <p className="text-[#7C2D12] italic text-center py-4">
              No availability set. Add time slots below.
            </p> : <div className="space-y-2">
              {availabilitySchedule.map(slot => <div key={slot.id} className="flex items-center justify-between bg-[#F5F5F0] p-3 rounded-md">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-[#B45309] mr-2" />
                    <span className="text-[#503314] font-medium">
                      {slot.day}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-[#B45309] mr-2" />
                    <span className="text-[#503314]">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <button onClick={() => removeTimeSlot(slot.id)} className="text-red-500 hover:text-red-600 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>)}
            </div>}
        </div>
        {/* Add New Time Slot */}
        <div className="bg-[#F5F5F0]/50 p-4 rounded-lg">
          <h3 className="text-[#503314] font-medium mb-3">Add New Time Slot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Day Select */}
            <div>
              <label className="block text-sm text-[#7C2D12] mb-1">Day</label>
              <select value={newSlot.day} onChange={e => setNewSlot({
              ...newSlot,
              day: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309]">
                {weekdays.map(day => <option key={day} value={day}>
                    {day}
                  </option>)}
              </select>
            </div>
            {/* Start Time */}
            <div>
              <label className="block text-sm text-[#7C2D12] mb-1">
                Start Time
              </label>
              <select value={newSlot.startTime} onChange={e => setNewSlot({
              ...newSlot,
              startTime: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309]">
                {timeOptions.map(time => <option key={`start-${time}`} value={time}>
                    {time}
                  </option>)}
              </select>
            </div>
            {/* End Time */}
            <div>
              <label className="block text-sm text-[#7C2D12] mb-1">
                End Time
              </label>
              <select value={newSlot.endTime} onChange={e => setNewSlot({
              ...newSlot,
              endTime: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309]">
                {timeOptions.map(time => <option key={`end-${time}`} value={time}>
                    {time}
                  </option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={addTimeSlot} className="bg-[#B45309] hover:bg-[#92400E] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Time Slot
            </Button>
          </div>
        </div>
        {/* Recurring Settings */}
        <div className="mt-6">
          <h3 className="text-[#503314] font-medium mb-3">
            Recurring Settings
          </h3>
          <div className="bg-[#F5F5F0]/50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <input type="checkbox" id="recurring" className="h-4 w-4 text-[#B45309] focus:ring-[#B45309] rounded" />
              <label htmlFor="recurring" className="ml-2 text-[#503314]">
                Make this schedule recurring
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#7C2D12] mb-1">
                  Repeat Every
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309]" defaultValue="1">
                  {[1, 2, 3, 4].map(num => <option key={num} value={num}>
                      {num}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#7C2D12] mb-1">
                  Period
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B45309] focus:border-[#B45309]" defaultValue="week">
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {saveSuccess && <div className="flex items-center mr-4 text-green-600">
            <Check className="h-4 w-4 mr-1" />
            <span>Saved successfully!</span>
          </div>}
        <Button onClick={saveAvailability} className="bg-[#B45309] hover:bg-[#92400E] text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Availability
        </Button>
      </CardFooter>
    </Card>;
};