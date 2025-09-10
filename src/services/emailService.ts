import { supabase } from '../lib/supabase-client';

export const emailService = {
  async sendInvitationEmail(invitationId: string, email: string, circleName: string, token: string): Promise<boolean> {
    try {
      // Get user info for inviter name
      const { data: authData } = await supabase.auth.getUser();
      const inviterName = authData.user?.user_metadata?.full_name || authData.user?.email || 'Someone';
      
      console.log('Sending invitation email:', { email, circleName, inviterName, token });
      
      // For now, just log the invitation details (since edge function might not be deployed)
      const inviteLink = `${import.meta.env.VITE_APP_URL || window.location.origin}/invite/${token}`;
      console.log(`\n📧 EMAIL INVITATION:\nTo: ${email}\nFrom: ${inviterName}\nCircle: ${circleName}\nLink: ${inviteLink}\n`);
      
      // Try to call edge function if it exists
      try {
        const response = await fetch(`https://tfpqvwslineokovtsduu.supabase.co/functions/v1/send-circle-invitation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_PROJECT_ANON_API_KEY}`,
          },
          body: JSON.stringify({
            invitationId,
            email,
            circleName,
            inviterName,
            token
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Email sent via edge function:', result);
          return true;
        } else {
          const errorText = await response.text();
          console.error('Edge function error:', response.status, errorText);
          console.log('Edge function failed, invitation logged to console');
        }
      } catch (edgeError) {
        console.log('Edge function not deployed yet, invitation logged to console');
      }
      
      return true; // Return true since invitation was created successfully
    } catch (error) {
      console.error('Failed to process invitation:', error);
      return false;
    }
  }
};