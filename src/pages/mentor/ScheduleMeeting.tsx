import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { meetingService } from '../../services/meetings';
import { supabase } from '../../lib/supabase-client';
import { Calendar, Clock, Users, Video, MessageCircle, Plus, X, AlertCircle, CheckCircle } from 'lucide-react';

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
  const [selectedCircle, setSelectedCircle] = useState<string>('');
  const [mentees, setMentees] = useState<any[]>([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadMenteesAndCircles();
  }, []);

  const loadMenteesAndCircles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Use RPC to get users with mentee user_type from auth.users
      const { data: menteeUsers, error: menteeError } = await supabase
        .rpc('get_users_by_metadata', { 
          metadata_key: 'user_type', 
          metadata_value: 'mentee' 
        });

      if (menteeError) {
        console.error('RPC error:', menteeError);
        setMentees([]);
      } else {
        const formattedMentees = menteeUsers?.map((u: any) => ({
          id: u.id,
          full_name: u.raw_user_meta_data?.full_name || u.email,
          email: u.email
        })) || [];
        
        setMentees(formattedMentees);
        console.log('Found mentees:', formattedMentees.length);
      }

      const circlesResult = await supabase
        .from('circles')
        .select('id, title')
        .eq('mentor_id', user.id)
        .eq('status', 'active')
        .order('title');

      setCircles(circlesResult.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setMentees([]);
      setCircles([]);
    }
  };

  const generateMeetingLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const roomName = meetingData.title.replace(/\s+/g, '-').toLowerCase();
    const link = `https://meet.jit.si/${roomName}-${meetingId}`;
    handleInputChange('meetingLink', link);
  };

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

  const validateForm = () => {
    if (!meetingData.title.trim()) return 'Meeting title is required';
    if (!meetingData.date) return 'Meeting date is required';
    if (!meetingData.time) return 'Meeting time is required';
    if (meetingData.type === 'circle' && !selectedCircle) return 'Please select a circle';
    if (meetingData.type !== 'circle' && selectedMentees.length === 0) return 'Please select at least one attendee';
    return null;
  };

  const handleSchedule = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const attendees = meetingData.type === 'circle' ? [] : selectedMentees;
      
      await meetingService.createMeeting({
        title: meetingData.title,
        description: meetingData.description,
        meeting_type: meetingData.type as 'individual' | 'group' | 'circle',
        circle_id: meetingData.type === 'circle' ? selectedCircle : undefined,
        meeting_date: meetingData.date,
        meeting_time: meetingData.time,
        duration_minutes: meetingData.duration,
        meeting_link: meetingData.meetingLink,
        is_recurring: meetingData.recurring,
        recurring_type: meetingData.recurring ? meetingData.recurringType as 'weekly' | 'biweekly' | 'monthly' : undefined,
        attendees
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/mentor/calendar');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700 dark:text-green-300">Meeting scheduled successfully! Redirecting...</span>
              </div>
            )}
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
                  min={(() => {
                    // Get current date in Rwanda timezone
                    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Kigali' }));
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                  })()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                  Time * <span className="text-xs text-[#7C2D12] dark:text-gray-400">(Rwanda Time - GMT+2)</span>
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
                <Button 
                  type="button"
                  onClick={generateMeetingLink}
                  variant="outline" 
                  className="border-[#B45309] text-[#B45309]"
                >
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
                <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                  Select Circle *
                </label>
                <select
                  value={selectedCircle}
                  onChange={(e) => setSelectedCircle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                >
                  <option value="">Choose a circle...</option>
                  {circles.map(circle => (
                    <option key={circle.id} value={circle.id}>
                      {circle.title}
                    </option>
                  ))}
                </select>
                {selectedCircle && (
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                    All members of this circle will receive the meeting invitation.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#503314] dark:text-white mb-2">
                  Select Attendees *
                </label>
                <select
                  onChange={(e) => {
                    const menteeId = e.target.value;
                    if (menteeId && !selectedMentees.includes(menteeId)) {
                      setSelectedMentees(prev => [...prev, menteeId]);
                    }
                    e.target.value = '';
                  }}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#B45309] focus:border-transparent"
                >
                  <option value="">Add attendee...</option>
                  {mentees.length === 0 ? (
                    <option disabled>No mentees found</option>
                  ) : (
                    mentees
                      .filter(mentee => !selectedMentees.includes(mentee.id))
                      .map(mentee => (
                        <option key={mentee.id} value={mentee.id}>
                          {mentee.full_name} ({mentee.email})
                        </option>
                      ))
                  )}
                </select>
                {selectedMentees.length > 0 && (
                  <p className="text-sm text-[#7C2D12] dark:text-gray-300">
                    Selected attendees will receive the meeting link via email.
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="text-sm text-[#7C2D12] dark:text-gray-300 mb-3">
                Selected: {meetingData.type === 'circle' && selectedCircle ? 
                  `1 circle (${circles.find(c => c.id === selectedCircle)?.title || 'Unknown'})` :
                  `${selectedMentees.length} attendee${selectedMentees.length !== 1 ? 's' : ''}`
                }
              </div>
              
              {meetingData.type === 'circle' && selectedCircle ? (
                <div className="p-3 bg-[#B45309]/10 border border-[#B45309]/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#B45309] font-medium">
                        {circles.find(c => c.id === selectedCircle)?.title}
                      </span>
                      <p className="text-xs text-[#7C2D12] dark:text-gray-400 mt-1">
                        Meeting link will be sent to all circle members
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCircle('')}
                      className="text-[#B45309] hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedMentees.map(menteeId => {
                    const mentee = mentees.find(m => m.id === menteeId);
                    return mentee ? (
                      <div
                        key={menteeId}
                        className="flex items-center justify-between p-2 bg-[#B45309]/10 border border-[#B45309]/20 rounded-lg"
                      >
                        <div>
                          <span className="text-[#B45309] font-medium">{mentee.full_name}</span>
                          <p className="text-xs text-[#7C2D12] dark:text-gray-400">
                            Meeting link will be sent to {mentee.email}
                          </p>
                        </div>
                        <button
                          onClick={() => handleMenteeToggle(menteeId)}
                          className="text-[#B45309] hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null;
                  })}
                  {selectedMentees.length === 0 && meetingData.type !== 'circle' && (
                    <p className="text-sm text-gray-500 italic">
                      No attendees selected - use dropdown above to add attendees
                    </p>
                  )}
                </div>
              )}
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
            disabled={loading || success}
            loading={loading}
            className="bg-[#B45309] hover:bg-[#7C2D12]"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {success ? 'Meeting Scheduled!' : 'Schedule Meeting'}
          </Button>
        </div>
      </div>
    </div>
  );
};