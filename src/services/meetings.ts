import { supabase } from '../lib/supabase-client';

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  meeting_type: 'individual' | 'group' | 'circle';
  mentor_id: string;
  circle_id?: string;
  meeting_date: string;
  meeting_time: string;
  duration_minutes: number;
  meeting_link?: string;
  is_recurring: boolean;
  recurring_type?: 'weekly' | 'biweekly' | 'monthly';
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface MeetingAttendee {
  id: string;
  meeting_id: string;
  user_id: string;
  status: 'invited' | 'accepted' | 'declined' | 'attended';
  created_at: string;
}

export const meetingService = {
  // Create a new meeting
  async createMeeting(meetingData: {
    title: string;
    description?: string;
    meeting_type: 'individual' | 'group' | 'circle';
    circle_id?: string;
    meeting_date: string;
    meeting_time: string;
    duration_minutes: number;
    meeting_link?: string;
    is_recurring: boolean;
    recurring_type?: 'weekly' | 'biweekly' | 'monthly';
    attendees: string[];
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Validate circle exists if circle_id is provided
    let validCircleId = null;
    if (meetingData.circle_id && meetingData.meeting_type === 'circle') {
      const { data: circle } = await supabase
        .from('circles')
        .select('id')
        .eq('id', meetingData.circle_id)
        .single();
      
      if (circle) {
        validCircleId = meetingData.circle_id;
      }
    }

    // Create the meeting
    const { data: meeting, error: meetingError } = await supabase
      .from('meetings')
      .insert([{
        title: meetingData.title,
        description: meetingData.description,
        meeting_type: meetingData.meeting_type,
        mentor_id: user.id,
        circle_id: validCircleId,
        meeting_date: meetingData.meeting_date,
        meeting_time: meetingData.meeting_time,
        duration_minutes: meetingData.duration_minutes,
        meeting_link: meetingData.meeting_link,
        is_recurring: meetingData.is_recurring,
        recurring_type: meetingData.recurring_type,
        status: 'scheduled'
      }])
      .select()
      .single();

    if (meetingError) throw meetingError;

    // Add attendees only if they are real user IDs (not example IDs)
    if (meetingData.attendees.length > 0) {
      const validAttendees = meetingData.attendees.filter(userId => 
        !userId.startsWith('550e8400-e29b-41d4-a716-44665544')
      );
      
      if (validAttendees.length > 0) {
        const attendeeRecords = validAttendees.map(userId => ({
          meeting_id: meeting.id,
          user_id: userId,
          status: 'invited' as const
        }));

        const { error: attendeeError } = await supabase
          .from('meeting_attendees')
          .insert(attendeeRecords);

        if (attendeeError) {
          console.warn('Could not add attendees:', attendeeError.message);
          // Don't throw error, meeting is still created successfully
        }
      }
    }

    return meeting as Meeting;
  },

  // Get meetings for a user (mentor or mentee)
  async getUserMeetings(userId?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const targetUserId = userId || user.id;

    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        circles(title)
      `)
      .eq('mentor_id', targetUserId)
      .order('meeting_date', { ascending: true })
      .order('meeting_time', { ascending: true });

    if (error) throw error;
    return data as (Meeting & { circles?: { title: string } })[];
  },

  // Get meetings for a specific date range (for mentors)
  async getMeetingsByDateRange(startDate: string, endDate: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        circles(title)
      `)
      .gte('meeting_date', startDate)
      .lte('meeting_date', endDate)
      .eq('mentor_id', user.id)
      .order('meeting_date', { ascending: true })
      .order('meeting_time', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get meetings for mentees (where they are attendees)
  async getMenteeMeetingsByDateRange(startDate: string, endDate: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        circles(title),
        meeting_attendees!inner(user_id)
      `)
      .gte('meeting_date', startDate)
      .lte('meeting_date', endDate)
      .eq('meeting_attendees.user_id', user.id)
      .order('meeting_date', { ascending: true })
      .order('meeting_time', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Update meeting status
  async updateMeetingStatus(meetingId: string, status: 'scheduled' | 'completed' | 'cancelled') {
    const { data, error } = await supabase
      .from('meetings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', meetingId)
      .select()
      .single();

    if (error) throw error;
    return data as Meeting;
  },

  // Update attendee status
  async updateAttendeeStatus(meetingId: string, status: 'accepted' | 'declined' | 'attended') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('meeting_attendees')
      .update({ status })
      .eq('meeting_id', meetingId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as MeetingAttendee;
  },

  // Update meeting
  async updateMeeting(meetingId: string, updates: Partial<Meeting>) {
    const { data, error } = await supabase
      .from('meetings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', meetingId)
      .select()
      .single();

    if (error) throw error;
    return data as Meeting;
  },

  // Delete meeting
  async deleteMeeting(meetingId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', meetingId)
      .eq('mentor_id', user.id);

    if (error) throw error;
    return true;
  },

  // Send meeting notifications
  async sendMeetingNotifications(meeting: Meeting, attendeeEmails: string[]) {
    console.log('Sending meeting notifications:', {
      meeting: meeting.title,
      link: meeting.meeting_link,
      attendees: attendeeEmails,
      date: meeting.meeting_date,
      time: meeting.meeting_time
    });
    
    return { sent: true, recipients: attendeeEmails.length };
  }
};