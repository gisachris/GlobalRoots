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

export const circlesService = {
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

  async inviteToCircle(circleId: string, email: string): Promise<void> {
    const token = crypto.randomUUID();
    
    const { error } = await supabase
      .from('invitations')
      .insert([{
        circle_id: circleId,
        email,
        invited_by: (await supabase.auth.getUser()).data.user?.id,
        token,
        status: 'pending'
      }]);

    if (error) throw error;
  },

  async acceptInvitation(token: string): Promise<void> {
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .single();

    if (inviteError || !invitation) throw new Error('Invalid invitation');

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

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
  }
};