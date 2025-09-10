import { supabase } from '../lib/supabase-client';

export interface Circle {
  id: string;
  title: string;
  description: string;
  category: string;
  max_participants: number;
  mentor_id: string;
  status: string;
  created_at: string;
}

export interface CircleMember {
  id: string;
  circle_id: string;
  user_id: string;
  role: 'admin' | 'member';
  status: 'pending' | 'accepted' | 'rejected';
  joined_at: string;
}

export interface CreateCircleData {
  title: string;
  description: string;
  category: string;
  max_participants: number;
  duration_weeks: number;
  meeting_days: string[];
  meeting_time: string;
  timezone: string;
  objectives: string[];
  prerequisites?: string;
  is_public: boolean;
}

export const circlesService = {
  async createCircle(data: CreateCircleData): Promise<Circle> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data: circle, error } = await supabase
      .from('circles')
      .insert([{
        ...data,
        mentor_id: user.id
      }])
      .select()
      .single();

    if (error) throw error;

    // Add mentor as admin participant
    const { error: participantError } = await supabase
      .from('circle_participants')
      .insert([{
        circle_id: circle.id,
        user_id: user.id,
        status: 'accepted',
        role: 'admin'
      }]);

    if (participantError) throw participantError;

    return circle;
  },

  async getUserCircles(userId: string): Promise<Circle[]> {
    // Get circles where user is mentor
    const { data: mentorCircles, error: mentorError } = await supabase
      .from('circles')
      .select('*')
      .eq('mentor_id', userId)
      .eq('status', 'active');

    if (mentorError) throw mentorError;

    // Get circles where user is participant
    const { data: participantData, error: participantError } = await supabase
      .from('circle_participants')
      .select('circle_id, circles(*)')
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (participantError) throw participantError;

    const participantCircles = participantData?.map(p => p.circles).filter(Boolean) || [];
    
    // Combine and deduplicate
    const allCircles = [...(mentorCircles || []), ...participantCircles];
    const uniqueCircles = allCircles.filter((circle, index, self) => 
      index === self.findIndex(c => c.id === circle.id)
    );

    return uniqueCircles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getUserCircleIds(userId: string): Promise<string> {
    const { data } = await supabase
      .from('circle_participants')
      .select('circle_id')
      .eq('user_id', userId)
      .eq('status', 'accepted');

    return data?.map(p => p.circle_id).join(',') || '';
  },

  async getCircleMembers(circleId: string): Promise<CircleMember[]> {
    const { data, error } = await supabase
      .from('circle_participants')
      .select(`
        *,
        user:auth.users!circle_participants_user_id_fkey(id, email, user_metadata)
      `)
      .eq('circle_id', circleId)
      .eq('status', 'accepted');

    if (error) throw error;
    return data || [];
  },

  async inviteToCircle(circleId: string, email: string): Promise<{ success: boolean; message: string }> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const token = crypto.randomUUID();
    
    // Check if invitation already exists for this email and circle
    const { data: existingInvite } = await supabase
      .from('invitations')
      .select('id')
      .eq('circle_id', circleId)
      .eq('email', email)
      .eq('status', 'pending')
      .maybeSingle();

    if (existingInvite) {
      throw new Error('Invitation already sent to this email');
    }

    // Insert invitation (trigger will automatically send email)
    const { data: invitation, error } = await supabase
      .from('invitations')
      .insert([{
        circle_id: circleId,
        email,
        invited_by: user.id,
        token,
        status: 'pending'
      }])
      .select('id')
      .single();

    if (error) throw error;

    // Wait a moment for email to be sent via trigger
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email was sent successfully
    const { data: sentInvite } = await supabase
      .from('invitations')
      .select('email_sent')
      .eq('id', invitation.id)
      .single();

    return {
      success: true,
      message: sentInvite?.email_sent ? 'Invitation sent successfully!' : 'Invitation created (email pending)'
    };
  },

  async acceptInvitation(token: string): Promise<void> {
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .maybeSingle();

    if (inviteError || !invitation) throw new Error('Invalid or expired invitation');

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    // Check if user is already a participant
    const { data: existingParticipant } = await supabase
      .from('circle_participants')
      .select('id')
      .eq('circle_id', invitation.circle_id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingParticipant) {
      throw new Error('You are already a member of this circle');
    }

    // Add user to circle
    const { error: participantError } = await supabase
      .from('circle_participants')
      .insert([{
        circle_id: invitation.circle_id,
        user_id: user.id,
        status: 'accepted',
        role: 'member'
      }]);

    if (participantError) throw participantError;

    // Update invitation status
    const { error: updateError } = await supabase
      .from('invitations')
      .update({ status: 'accepted' })
      .eq('id', invitation.id);

    if (updateError) throw updateError;
  },

  async generateInviteLink(circleId: string): Promise<string> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const token = crypto.randomUUID();
    
    // Store the invitation in the database
    const { error } = await supabase
      .from('invitations')
      .insert([{
        circle_id: circleId,
        email: '', // Empty email for link-based invitations
        invited_by: user.id,
        token,
        status: 'pending'
      }]);

    if (error) throw error;

    // Use environment variable for base URL, fallback to window.location.origin
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    return `${baseUrl}/invite/${token}`;
  },

  async getPendingInvitations(email: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('invitations')
      .select(`
        *,
        circle:circles(id, title, description, category)
      `)
      .eq('email', email)
      .eq('status', 'pending');

    if (error) throw error;
    return data || [];
  }
};